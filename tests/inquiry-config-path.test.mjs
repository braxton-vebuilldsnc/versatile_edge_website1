import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const endpoint = path.resolve(import.meta.dirname, "..", "dist", "client", "api", "inquiries.php");

async function verifyLayout(documentRoot) {
  const hostingRoot = documentRoot.includes(`${path.sep}clickandbuilds${path.sep}`)
    ? path.dirname(path.dirname(documentRoot))
    : path.dirname(documentRoot);
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
      'rate_limit_directory' => ${JSON.stringify(rateLimitDirectory)},
    ];`,
    { mode: 0o600 },
  );

  const php = spawnSync(
    "php",
    [
      "-r",
      `$_SERVER['REQUEST_METHOD']='POST'; $_SERVER['DOCUMENT_ROOT']=${JSON.stringify(documentRoot)}; include ${JSON.stringify(endpoint)};`,
    ],
    {
      encoding: "utf8",
      env: { ...process.env, VERSATILE_EDGE_CONFIG_PATH: "" },
    },
  );
  assert.equal(php.error, undefined);
  assert.equal(php.status, 0, php.stderr);
  const response = JSON.parse(php.stdout);
  assert.equal(response.code, "required_fields", php.stdout);
  assert.doesNotMatch(php.stdout + php.stderr, /not_configured/);
}

test("inquiry config resolves outside staging and nested production document roots", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "ve-inquiry-config-"));
  try {
    await verifyLayout(path.join(root, "versatile-edge-staging"));
    await verifyLayout(path.join(root, "clickandbuilds", "VerstatileEdgeLLC"));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
