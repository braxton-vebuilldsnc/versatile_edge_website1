import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const endpoint = path.join(root, "dist", "client", "api", "inquiries.php");
const privateValues = ["test-user", "test-password", "test-secret"];

function hostingRootFor(documentRoot) {
  return documentRoot.includes(`${path.sep}clickandbuilds${path.sep}`)
    ? path.dirname(path.dirname(documentRoot))
    : path.dirname(documentRoot);
}

async function createConfig(documentRoot) {
  const hostingRoot = hostingRootFor(documentRoot);
  const privateDirectory = path.join(hostingRoot, "versatile-edge-private");
  const rateLimitDirectory = path.join(hostingRoot, "rate-limits");
  await mkdir(documentRoot, { recursive: true });
  await mkdir(privateDirectory, { recursive: true });
  await writeFile(
    path.join(privateDirectory, "inquiry-config.php"),
    `<?php return [
      'smtp_host' => 'smtp.example.test',
      'smtp_username' => 'test-user',
      'smtp_password' => 'test-password',
      'from_email' => 'from@example.test',
      'to_email' => 'to@example.test',
      'turnstile_secret' => 'test-secret',
      'turnstile_allowed_hostnames' => ['versatileedgellc.com'],
      'rate_limit_directory' => ${JSON.stringify(rateLimitDirectory)},
    ];`,
    { mode: 0o600 },
  );
}

function invoke(endpointPath, documentRoot, post = {}, files = {}) {
  const encodedPost = Buffer.from(JSON.stringify(post)).toString("base64");
  const encodedFiles = Buffer.from(JSON.stringify(files)).toString("base64");
  const php = spawnSync(
    "php",
    [
      "-r",
      `$_SERVER['REQUEST_METHOD']='POST'; $_SERVER['DOCUMENT_ROOT']=${JSON.stringify(documentRoot)}; $_SERVER['HTTP_HOST']='versatileedgellc.com'; $_SERVER['REMOTE_ADDR']='127.0.0.1'; $_POST=json_decode(base64_decode('${encodedPost}'), true); $_FILES=json_decode(base64_decode('${encodedFiles}'), true); include ${JSON.stringify(endpointPath)};`,
    ],
    { encoding: "utf8", env: { ...process.env, VERSATILE_EDGE_CONFIG_PATH: "" } },
  );
  assert.equal(php.error, undefined);
  assert.equal(php.status, 0, php.stderr);
  for (const value of privateValues) assert.doesNotMatch(php.stdout + php.stderr, new RegExp(value));
  return JSON.parse(php.stdout);
}

const validFields = {
  projectType: "Whole-Home Renovations",
  timeline: "Planning ahead",
  budget: "Not sure yet",
  description: "A sufficiently detailed residential renovation test request.",
  referral: "Other",
  street: "100 Test Street",
  city: "Raleigh",
  state: "NC",
  zip: "27601",
  firstName: "Test",
  lastName: "Person",
  email: "test@example.test",
  phone: "9195550100",
};

test("inquiry config resolves outside staging and nested production document roots", async () => {
  const temporaryRoot = await mkdtemp(path.join(tmpdir(), "ve-inquiry-config-"));
  try {
    for (const documentRoot of [
      path.join(temporaryRoot, "staging", "versatile-edge-staging"),
      path.join(temporaryRoot, "production", "clickandbuilds", "VerstatileEdgeLLC"),
    ]) {
      await createConfig(documentRoot);
      assert.equal(invoke(endpoint, documentRoot).code, "required_fields");
    }
  } finally {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
});

test("missing inquiry configuration fails safely without credential leakage", async () => {
  const temporaryRoot = await mkdtemp(path.join(tmpdir(), "ve-inquiry-missing-"));
  try {
    const documentRoot = path.join(temporaryRoot, "clickandbuilds", "VerstatileEdgeLLC");
    await mkdir(documentRoot, { recursive: true });
    assert.equal(invoke(endpoint, documentRoot).code, "not_configured");
  } finally {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
});

test("inquiry validation preserves honeypot, consent, Turnstile, and attachment gates", async () => {
  const temporaryRoot = await mkdtemp(path.join(tmpdir(), "ve-inquiry-chain-"));
  try {
    const documentRoot = path.join(temporaryRoot, "clickandbuilds", "VerstatileEdgeLLC");
    await createConfig(documentRoot);
    assert.equal(invoke(endpoint, documentRoot, { companyWebsite: "bot.example" }).code, "accepted");
    assert.equal(invoke(endpoint, documentRoot, validFields).code, "consent_required");
    assert.equal(invoke(endpoint, documentRoot, { ...validFields, consent: "on" }).code, "turnstile_required");

    const source = await readFile(endpoint, "utf8");
    const mocked = source.replace(
      /function http_post_form\(string \$url, array \$fields\): array\n\{[\s\S]*?\n\}\n\nfunction verify_turnstile/,
      `function http_post_form(string $url, array $fields): array
{
    return ($fields['response'] ?? '') === 'valid-token'
        ? ['success' => true, 'hostname' => 'versatileedgellc.com']
        : ['success' => false, 'hostname' => 'versatileedgellc.com'];
}

function verify_turnstile`,
    );
    assert.notEqual(mocked, source, "Turnstile transport mock should replace only the temporary test copy");
    const mockedEndpoint = path.join(temporaryRoot, "inquiries-mocked.php");
    await writeFile(mockedEndpoint, mocked, { mode: 0o600 });

    assert.equal(invoke(mockedEndpoint, documentRoot, {
      ...validFields, consent: "on", "cf-turnstile-response": "invalid-token",
    }).code, "turnstile_failed");

    const sixFiles = {
      files: {
        name: Array.from({ length: 6 }, (_, index) => `file-${index}.jpg`),
        tmp_name: Array(6).fill("/nonexistent"),
        error: Array(6).fill(0),
        size: Array(6).fill(100),
      },
    };
    assert.equal(invoke(mockedEndpoint, documentRoot, {
      ...validFields, consent: "on", "cf-turnstile-response": "valid-token",
    }, sixFiles).code, "too_many_files");
  } finally {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
});
