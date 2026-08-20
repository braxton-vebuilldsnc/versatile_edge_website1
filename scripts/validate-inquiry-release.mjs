import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const output = path.join(root, "dist", "client");
const publicConfig = JSON.parse(await readFile(path.join(root, "deployment", "production-public-config.json"), "utf8"));
const siteKey = String(publicConfig.turnstileSiteKey ?? "").trim();
const contact = await readFile(path.join(output, "contact.html"), "utf8");
const endpoint = await readFile(path.join(output, "api", "inquiries.php"), "utf8");

async function javascriptFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory()
      ? javascriptFiles(file)
      : entry.isFile() && path.extname(entry.name) === ".js"
        ? [file]
        : [];
  }));
  return nested.flat();
}

function requireMatch(value, pattern, message) {
  if (!pattern.test(value)) throw new Error(message);
}

if (!/^0x4[A-Za-z0-9_-]{20,}$/.test(siteKey)) {
  throw new Error("Approved public Turnstile site key is missing or malformed");
}
requireMatch(contact, /class="cf-turnstile"/, "Exported Contact page is missing the Turnstile container");
requireMatch(contact, /class="inquiry-form"/, "Exported Contact page is missing the inquiry form");

const clientJavascript = (await Promise.all(
  (await javascriptFiles(path.join(output, "_next", "static"))).map((file) => readFile(file, "utf8")),
)).join("\n");
if (!clientJavascript.includes(siteKey)) throw new Error("Approved Turnstile site key is absent from exported client code");
if (!clientJavascript.includes("https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit")) {
  throw new Error("Exported client code is missing the Turnstile loader");
}
requireMatch(clientJavascript, /\/api\/inquiries\.php/, "Exported client code is missing the inquiry endpoint");
requireMatch(clientJavascript, /FormData/, "Exported client code is not submitting the complete form payload");
requireMatch(endpoint, /field\('cf-turnstile-response', 4096\)/, "PHP endpoint is missing the exact Turnstile response field");
requireMatch(endpoint, /challenges\.cloudflare\.com\/turnstile\/v0\/siteverify/, "PHP endpoint is missing server-side Turnstile verification");

for (const forbidden of ["turnstile_secret", "smtp_password", "smtp_username"]) {
  if (contact.includes(forbidden) || clientJavascript.includes(forbidden)) {
    throw new Error(`Private configuration name leaked into browser output: ${forbidden}`);
  }
}

console.log(`Inquiry release validation passed (Turnstile site-key SHA-256 ${createHash("sha256").update(siteKey).digest("hex")}).`);
