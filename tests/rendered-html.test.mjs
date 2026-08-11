import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const output = path.join(root, "dist", "client");

const publicRoutes = [
  "/",
  "/about",
  "/services",
  "/services/whole-home-renovations",
  "/services/interior-remodeling",
  "/services/kitchen-renovations",
  "/services/bathroom-renovations",
  "/services/porches-and-decks",
  "/services/home-additions",
  "/services/window-replacement",
  "/projects",
  "/projects/hutter-whole-house-remodel-addition",
  "/projects/johnson-bathroom",
  "/projects/brown-bathroom",
  "/projects/walsh-sunroom-deck",
  "/projects/janet-home-addition",
  "/process",
  "/contact",
  "/privacy",
];

function htmlPath(route) {
  return route === "/"
    ? path.join(output, "index.html")
    : path.join(output, `${route.slice(1)}.html`);
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

test("exports every public route as static HTML", async () => {
  for (const route of publicRoutes) {
    const file = htmlPath(route);
    assert.equal(await exists(file), true, `${route} should export to ${file}`);
    const html = await readFile(file, "utf8");
    assert.match(html, /<!DOCTYPE html>/i, route);
    assert.match(html, /Versatile Edge/i, route);
  }
  assert.equal(await exists(path.join(output, "404.html")), true);
});

test("exports every local asset referenced by public HTML", async () => {
  for (const route of publicRoutes) {
    const html = await readFile(htmlPath(route), "utf8");
    const references = [...html.matchAll(/(?:src|poster)="(\/[^"]+)"/g)]
      .map((match) => match[1].split("?")[0])
      .filter((url) => !url.startsWith("/api/"));

    for (const reference of references) {
      assert.equal(
        await exists(path.join(output, reference)),
        true,
        `${route} references missing asset ${reference}`,
      );
    }
  }
});

test("resolves every internal page link to an exported file", async () => {
  for (const route of publicRoutes) {
    const html = await readFile(htmlPath(route), "utf8");
    const links = [...html.matchAll(/href="(\/[^"]*)"/g)]
      .map((match) => match[1].split(/[?#]/)[0])
      .filter(Boolean);

    for (const link of links) {
      const exportedFile = path.extname(link)
        ? path.join(output, link)
        : htmlPath(link);
      assert.equal(
        await exists(exportedFile),
        true,
        `${route} links to missing static target ${link}`,
      );
    }
  }
});

test("exports static search-engine and IONOS hosting files", async () => {
  const [robots, sitemap, htaccess] = await Promise.all([
    readFile(path.join(output, "robots.txt"), "utf8"),
    readFile(path.join(output, "sitemap.xml"), "utf8"),
    readFile(path.join(output, ".htaccess"), "utf8"),
  ]);

  assert.match(robots, /Sitemap: https:\/\/versatileedgellc\.com\/sitemap\.xml/);
  for (const route of publicRoutes) {
    const canonical = `https://versatileedgellc.com${route}`;
    assert.match(sitemap, new RegExp(`<loc>${canonical.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}<\\/loc>`), route);
  }
  assert.match(htaccess, /RewriteBase \/\n/);
  assert.match(htaccess, /DirectorySlash Off/);
  assert.match(htaccess, /RewriteCond %\{REQUEST_URI\} !\\\.\[\^\/\]\+\$/);
  assert.match(htaccess, /RewriteRule \^\(\.\+\?\)\/\?\$ \$1\.html \[L\]/);
  assert.ok(
    htaccess.indexOf("%{REQUEST_URI} !\\.[^/]+$") < htaccess.indexOf("%{REQUEST_FILENAME} -d"),
    "clean-page rewrite must run before the real-directory bypass",
  );
  assert.match(htaccess, /ErrorDocument 404 \/404\.html/);
  assert.match(htaccess, /immutable/);
});

test("uses native document navigation on the static website", async () => {
  const linkSources = [
    "app/page.tsx",
    "app/projects/[slug]/page.tsx",
    "app/services/page.tsx",
    "app/services/[slug]/page.tsx",
    "components/owner-introduction.tsx",
    "components/page-hero.tsx",
    "components/project-gallery.tsx",
    "components/site-footer.tsx",
    "components/site-header.tsx",
  ];

  for (const source of linkSources) {
    const contents = await readFile(path.join(root, source), "utf8");
    assert.doesNotMatch(contents, /from ["']next\/link["']/, source);
    assert.doesNotMatch(contents, /<\/?Link\b/, source);
  }
});

test("exports the PHP inquiry endpoint and preserves the complete form", async () => {
  const [form, endpoint] = await Promise.all([
    readFile(path.join(root, "components", "inquiry-form.tsx"), "utf8"),
    readFile(path.join(output, "api", "inquiries.php"), "utf8"),
  ]);
  assert.match(form, /name="street"[^>]*required/);
  assert.match(form, /name="city"[^>]*required/);
  assert.match(form, /name="zip"[^>]*required/);
  assert.match(form, /fetch\("\/api\/inquiries\.php"/);
  assert.doesNotMatch(form, /fetch\("\/api\/inquiries"/);
  assert.match(form, /turnstile\.render/);
  assert.match(form, /api\.js\?render=explicit/);
  assert.doesNotMatch(form, /<script[^>]+challenges\.cloudflare\.com/);
  assert.match(endpoint, /challenges\.cloudflare\.com\/turnstile\/v0\/siteverify/);
  assert.match(endpoint, /AUTH LOGIN/);
  assert.match(endpoint, /\$subject = 'WEBSITE LEAD';/);
  assert.match(endpoint, /\$replyTo = header_text\(\$fields\['email'\]\);[\s\S]*?filter_var\(\$replyTo, FILTER_VALIDATE_EMAIL\)[\s\S]*?'Reply-To: ' \. encoded_header\(\$replyToName\) \. ' <' \. \$replyTo \. '>'/);
  assert.match(endpoint, /\$subject = 'Thank You for Contacting Versatile Edge';/);
  assert.match(endpoint, /images\/brand\/versatile-edge-official-logo-v2\.png/);
  assert.doesNotMatch(endpoint, /images\/brand\/versatile-edge-2026-logo\.png/);
  assert.match(endpoint, /Someone from our team will email or call you within 24 hours/);
  assert.match(endpoint, /We look forward to learning more about your project\./);
  assert.match(endpoint, /build_confirmation_email\(array \$config, array \$fields\)/);
  assert.match(endpoint, /send_smtp\(\$config, \$confirmation, \$fields\['email'\]\)/);
  assert.match(endpoint, /Content-Type: multipart\/alternative/);
  assert.doesNotMatch(endpoint.match(/function build_confirmation_email[\s\S]*?function send_smtp/)?.[0] ?? "", /Content-Disposition: attachment/);
  assert.match(endpoint, /google\.com\/maps\/search/);
  assert.match(endpoint, /is_uploaded_file/);
  assert.equal(await exists(path.join(output, "ionos-private-config.example.php")), false);
});
