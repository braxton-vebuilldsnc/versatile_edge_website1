import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const output = path.join(root, "dist", "client");

async function javascript(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory()
      ? javascript(file)
      : entry.isFile() && path.extname(entry.name) === ".js"
        ? [readFile(file, "utf8")]
        : [];
  }));
  return (await Promise.all(nested.flat())).join("\n");
}

test("production artifact contains the approved public Turnstile integration without private values", async () => {
  const publicConfig = JSON.parse(await readFile(path.join(root, "deployment", "production-public-config.json"), "utf8"));
  const siteKey = publicConfig.turnstileSiteKey;
  const contact = await readFile(path.join(output, "contact.html"), "utf8");
  const endpoint = await readFile(path.join(output, "api", "inquiries.php"), "utf8");
  const client = await javascript(path.join(output, "_next", "static"));

  assert.match(siteKey, /^0x4[A-Za-z0-9_-]{20,}$/);
  assert.match(contact, /class="cf-turnstile"/);
  assert.ok(client.includes(siteKey), "client must contain the approved public site key");
  assert.ok(client.includes("https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"));
  assert.match(client, /\/api\/inquiries\.php/);
  assert.match(client, /FormData/);
  assert.match(endpoint, /field\('cf-turnstile-response', 4096\)/);
  assert.match(endpoint, /challenges\.cloudflare\.com\/turnstile\/v0\/siteverify/);
  assert.doesNotMatch(contact + client, /turnstile_secret|smtp_password|smtp_username/);
});
