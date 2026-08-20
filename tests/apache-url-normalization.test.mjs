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
    ["/about", "targeting.versatileedgellc.com", "http", 301, "https://targeting.versatileedgellc.com/about"],
    ["/about/", "targeting.versatileedgellc.com", "https", 301, "https://targeting.versatileedgellc.com/about"],
    ["/about.html", "targeting.versatileedgellc.com", "https", 301, "https://targeting.versatileedgellc.com/about"],
    ["/index", "targeting.versatileedgellc.com", "https", 301, "https://targeting.versatileedgellc.com/"],
    ["/service-areas/raleigh-nc/", "versatileedgellc.com", "https", 301, "https://versatileedgellc.com/service-areas/raleigh-nc"],
    ["/service-areas/raleigh-nc.html", "versatileedgellc.com", "https", 301, "https://versatileedgellc.com/service-areas/raleigh-nc"],
    ["/general-contractor-services-in-raleigh-nc/", "versatileedgellc.com", "https", 301, "https://versatileedgellc.com/service-areas/raleigh-nc"],
    ["/service-areas/cary-nc/", "versatileedgellc.com", "https", 301, "https://versatileedgellc.com/service-areas/cary-nc"],
    ["/service-areas/holly-springs-nc.html", "versatileedgellc.com", "https", 301, "https://versatileedgellc.com/service-areas/holly-springs-nc"],
    ["/service-areas/knightdale-nc/", "versatileedgellc.com", "https", 301, "https://versatileedgellc.com/service-areas/knightdale-nc"],
    ["/service-areas/wendell-nc.html", "www.versatileedgellc.com", "http", 301, "https://versatileedgellc.com/service-areas/wendell-nc"],
    ["/service-areas/rolesville-nc/", "staging.versatileedgellc.com", "http", 301, "https://staging.versatileedgellc.com/service-areas/rolesville-nc"],
    ["/service-areas/rolesville-nc.html", "targeting.versatileedgellc.com", "https", 301, "https://targeting.versatileedgellc.com/service-areas/rolesville-nc"],
    ["/service-areas/garner-nc.html", "versatileedgellc.com", "https", 301, "https://versatileedgellc.com/service-areas/garner-nc"],
    ["/versatile-edge-general-contractor-in-wake-forest-nc-kitchens-baths-additions-decks-more/", "www.versatileedgellc.com", "http", 301, "https://versatileedgellc.com/service-areas/wake-forest-nc"],
    ["/general-contractor-in-apex-nc-kitchens-bath-additions-decks-more/", "versatileedgellc.com", "https", 301, "https://versatileedgellc.com/service-areas/apex-nc"],
  ];
  for (const [requestPath, host, proto, status, location] of cases) {
    const response = await request(port, requestPath, host, proto);
    assert.equal(response.status, status, `${host}${requestPath}`);
    assert.equal(response.location, location, `${host}${requestPath}`);
  }

  const clean = await request(port, "/about", "versatileedgellc.com");
  assert.equal(clean.status, 200);
  assert.equal(clean.robots, undefined, "production must not receive a development noindex header");
  assert.match(clean.body, /<link rel="canonical" href="https:\/\/versatileedgellc\.com\/about"/);

  const raleigh = await request(port, "/service-areas/raleigh-nc", "versatileedgellc.com");
  assert.equal(raleigh.status, 200);
  assert.equal(raleigh.robots, undefined, "production city routes must remain indexable");
  assert.match(raleigh.body, /<link rel="canonical" href="https:\/\/versatileedgellc\.com\/service-areas\/raleigh-nc"/);

  const stagingRaleigh = await request(port, "/service-areas/raleigh-nc", "staging.versatileedgellc.com");
  assert.equal(stagingRaleigh.status, 200);
  assert.equal(stagingRaleigh.robots, "noindex, nofollow");

  const targetingRaleigh = await request(port, "/service-areas/raleigh-nc", "targeting.versatileedgellc.com");
  assert.equal(targetingRaleigh.status, 200);
  assert.equal(targetingRaleigh.robots, "noindex, nofollow");
  assert.match(targetingRaleigh.body, /<link rel="canonical" href="https:\/\/versatileedgellc\.com\/service-areas\/raleigh-nc"/);
  assert.doesNotMatch(targetingRaleigh.body, /(?:canonical|application\/ld\+json)[\s\S]*targeting\.versatileedgellc\.com/);

  for (const slug of ["knightdale-nc", "wendell-nc", "rolesville-nc", "garner-nc"]) {
    const production = await request(port, `/service-areas/${slug}`, "versatileedgellc.com");
    assert.equal(production.status, 200, slug);
    assert.equal(production.robots, undefined, slug);
    assert.match(production.body, new RegExp(`<link rel="canonical" href="https://versatileedgellc\\.com/service-areas/${slug}"`));
    for (const developmentHost of ["staging.versatileedgellc.com", "targeting.versatileedgellc.com"]) {
      const developmentCity = await request(port, `/service-areas/${slug}`, developmentHost);
      assert.equal(developmentCity.status, 200, `${developmentHost}/${slug}`);
      assert.equal(developmentCity.robots, "noindex, nofollow", `${developmentHost}/${slug}`);
      assert.match(developmentCity.body, new RegExp(`<link rel="canonical" href="https://versatileedgellc\\.com/service-areas/${slug}"`));
    }
  }

  for (const developmentHost of ["staging.versatileedgellc.com", "targeting.versatileedgellc.com"]) {
    for (const productionOnlyLegacy of [
      "/general-contractor-services-in-raleigh-nc/",
      "/versatile-edge-general-contractor-in-wake-forest-nc-kitchens-baths-additions-decks-more/",
      "/general-contractor-in-apex-nc-kitchens-bath-additions-decks-more/",
    ]) {
      const response = await request(port, productionOnlyLegacy, developmentHost);
      assert.equal(response.status, 404, `${developmentHost}${productionOnlyLegacy}`);
      assert.equal(response.location, undefined, `${productionOnlyLegacy} must remain production-only`);
      assert.equal(response.robots, "noindex, nofollow", `${developmentHost} 404s must remain noindex`);
    }
  }

  for (const reservedLegacy of [
    "/general-contractor-services-in-wake-forest-nc/",
    "/general-contractor-services-in-apex-nc/",
  ]) {
    const response = await request(port, reservedLegacy, "versatileedgellc.com");
    assert.equal(response.status, 404, reservedLegacy);
    assert.equal(response.location, undefined, `${reservedLegacy} should remain reserved without a redirect`);
  }

  const staging = await request(port, "/about", "staging.versatileedgellc.com");
  assert.equal(staging.status, 200);
  assert.equal(staging.robots, "noindex, nofollow");

  const targeting = await request(port, "/about", "targeting.versatileedgellc.com");
  assert.equal(targeting.status, 200);
  assert.equal(targeting.robots, "noindex, nofollow");
  assert.match(targeting.body, /<link rel="canonical" href="https:\/\/versatileedgellc\.com\/about"/);

  for (const host of ["versatileedgellc.com", "staging.versatileedgellc.com", "targeting.versatileedgellc.com"]) {
    for (const alias of ["/404", "/404/", "/404.html"]) {
      const response = await request(port, alias, host);
      assert.equal(response.status, 404, `${host}${alias}`);
      assert.match(response.body, /404: This page could not be found\./, `${alias} should render the custom 404 once without recursion`);
      assert.ok(response.body.length < 100_000, `${alias} should not recurse through ErrorDocument`);
      assert.equal(response.robots, host === "versatileedgellc.com" ? undefined : "noindex, nofollow");
    }
  }

  for (const host of ["versatileedgellc.com", "staging.versatileedgellc.com", "targeting.versatileedgellc.com"]) {
    for (const missing of ["/not-a-route", "/not-a-route/", "/not-a-route.html"]) {
      const response = await request(port, missing, host);
      assert.equal(response.status, 404, `${host}${missing}`);
      assert.equal(response.location, undefined, `${missing} should not be normalized by a broad route redirect`);
      assert.match(response.body, /404: This page could not be found\./);
      assert.equal(response.robots, host === "versatileedgellc.com" ? undefined : "noindex, nofollow");
    }
  }

  const errorLog = await readFile(path.join(runtime, "error.log"), "utf8");
  assert.doesNotMatch(errorLog, /request exceeded the limit of internal redirects|AH00124/i);
});
