import { readFile } from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = path.resolve(import.meta.dirname, "..");
const configPath = path.join(root, "deployment", "production-public-config.json");
const config = JSON.parse(await readFile(configPath, "utf8"));
const approvedSiteKey = String(config.turnstileSiteKey ?? "").trim();
const suppliedSiteKey = String(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "").trim();

if (!/^0x4[A-Za-z0-9_-]{20,}$/.test(approvedSiteKey)) {
  throw new Error("deployment/production-public-config.json is missing the approved public Turnstile site key");
}
if (suppliedSiteKey && suppliedSiteKey !== approvedSiteKey) {
  throw new Error("NEXT_PUBLIC_TURNSTILE_SITE_KEY does not match the approved production public configuration");
}

const cli = path.join(root, "node_modules", "vinext", "dist", "cli.js");
const result = spawnSync(process.execPath, [cli, "build"], {
  cwd: root,
  env: { ...process.env, NEXT_PUBLIC_TURNSTILE_SITE_KEY: approvedSiteKey },
  stdio: "inherit",
});

if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
