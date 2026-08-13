import assert from "node:assert/strict";
import { cp, mkdtemp, readFile, writeFile } from "node:fs/promises";
import http from "node:http";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const builtOutput = path.join(root, "dist", "client");

async function availablePort() {
  const server = net.createServer();
  await new Promise((resolve, reject) => server.listen(0, "127.0.0.1", resolve).once("error", reject));
  const { port } = server.address();
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  return port;
}

function request(port, requestPath, host, forwardedProto = "https") {
  return new Promise((resolve, reject) => {
    const request = http.request({
      hostname: "127.0.0.1",
      port,
      path: requestPath,
      headers: { Host: host, "X-Forwarded-Proto": forwardedProto },
    }, (response) => {
      let body = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => { body += chunk; });
      response.on("end", () => resolve({
        status: response.statusCode,
        location: response.headers.location,
        robots: response.headers["x-robots-tag"],
        body,
      }));
    });
    request.once("error", reject);
    request.end();
  });
}

test("Apache applies route normalization and renders non-recursive true 404s", { timeout: 30_000 }, async (t) => {
  const runtime = await mkdtemp(path.join(os.tmpdir(), "versatile-edge-apache-"));
  const documentRoot = path.join(runtime, "public");
  await cp(builtOutput, documentRoot, { recursive: true });
  const port = await availablePort();
  const config = path.join(runtime, "httpd.conf");
  const modules = "/usr/libexec/apache2";
  await writeFile(config, `
ServerRoot "${runtime}"
PidFile "${runtime}/httpd.pid"
Listen 127.0.0.1:${port}
ServerName 127.0.0.1
LoadModule mpm_prefork_module "${modules}/mod_mpm_prefork.so"
LoadModule authn_core_module "${modules}/mod_authn_core.so"
LoadModule authz_core_module "${modules}/mod_authz_core.so"
LoadModule authz_host_module "${modules}/mod_authz_host.so"
LoadModule unixd_module "${modules}/mod_unixd.so"
LoadModule env_module "${modules}/mod_env.so"
LoadModule setenvif_module "${modules}/mod_setenvif.so"
LoadModule headers_module "${modules}/mod_headers.so"
LoadModule mime_module "${modules}/mod_mime.so"
LoadModule dir_module "${modules}/mod_dir.so"
LoadModule alias_module "${modules}/mod_alias.so"
LoadModule rewrite_module "${modules}/mod_rewrite.so"
LoadModule negotiation_module "${modules}/mod_negotiation.so"
TypesConfig "/private/etc/apache2/mime.types"
ErrorLog "${runtime}/error.log"
LogLevel warn
DocumentRoot "${documentRoot}"
<Directory "${documentRoot}">
  AllowOverride All
  Options FollowSymLinks
  Require all granted
</Directory>
`, "utf8");

  const apache = spawn("/usr/sbin/httpd", ["-X", "-f", config], { stdio: ["ignore", "ignore", "pipe"] });
  let stderr = "";
  apache.stderr.on("data", (chunk) => { stderr += chunk; });
  t.after(() => apache.kill("SIGTERM"));

  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      await request(port, "/", "versatileedgellc.com");
      break;
    } catch (error) {
      if (attempt === 49) throw new Error(`Apache did not start: ${stderr}`, { cause: error });
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }

  const cases = [
    ["/about", "versatileedgellc.com", "http", 301, "https://versatileedgellc.com/about"],
    ["/about", "www.versatileedgellc.com", "https", 301, "https://versatileedgellc.com/about"],
    ["/about.html", "www.versatileedgellc.com", "http", 301, "https://versatileedgellc.com/about"],
    ["/about/", "versatileedgellc.com", "https", 301, "https://versatileedgellc.com/about"],
    ["/about.html", "versatileedgellc.com", "https", 301, "https://versatileedgellc.com/about"],
    ["/index", "versatileedgellc.com", "https", 301, "https://versatileedgellc.com/"],
    ["/about-versatile-edge/", "www.versatileedgellc.com", "http", 301, "https://versatileedgellc.com/about"],
    ["/about/", "staging.versatileedgellc.com", "http", 301, "https://staging.versatileedgellc.com/about"],
  ];
  for (const [requestPath, host, proto, status, location] of cases) {
    const response = await request(port, requestPath, host, proto);
    assert.equal(response.status, status, `${host}${requestPath}`);
    assert.equal(response.location, location, `${host}${requestPath}`);
  }

  const clean = await request(port, "/about", "versatileedgellc.com");
  assert.equal(clean.status, 200);
  assert.match(clean.body, /<link rel="canonical" href="https:\/\/versatileedgellc\.com\/about"/);

  const staging = await request(port, "/about", "staging.versatileedgellc.com");
  assert.equal(staging.status, 200);
  assert.equal(staging.robots, "noindex, nofollow");

  for (const alias of ["/404", "/404/", "/404.html"]) {
    const response = await request(port, alias, "versatileedgellc.com");
    assert.equal(response.status, 404, alias);
    assert.match(response.body, /404: This page could not be found\./, `${alias} should render the custom 404 once without recursion`);
    assert.ok(response.body.length < 100_000, `${alias} should not recurse through ErrorDocument`);
  }

  for (const missing of ["/not-a-route", "/not-a-route/", "/not-a-route.html"]) {
    const response = await request(port, missing, "versatileedgellc.com");
    assert.equal(response.status, 404, missing);
    assert.equal(response.location, undefined, `${missing} should not be normalized by a broad route redirect`);
    assert.match(response.body, /404: This page could not be found\./);
  }

  const errorLog = await readFile(path.join(runtime, "error.log"), "utf8");
  assert.doesNotMatch(errorLog, /request exceeded the limit of internal redirects|AH00124/i);
});
