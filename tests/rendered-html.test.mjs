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
    const directReferences = [...html.matchAll(/(?:src|poster)="(\/[^"]+)"/g)]
      .map((match) => match[1].split("?")[0])
      .filter((url) => !url.startsWith("/api/"));
    const responsiveReferences = [...html.matchAll(/srcset="([^"]+)"/g)]
      .flatMap((match) => match[1].split(","))
      .map((candidate) => candidate.trim().split(/\s+/)[0]);
    const references = [...directReferences, ...responsiveReferences];

    for (const reference of references) {
      assert.equal(
        await exists(path.join(output, reference)),
        true,
        `${route} references missing asset ${reference}`,
      );
    }
  }
});

test("generates responsive images without upscaling and prioritizes only page heroes", async () => {
  for (const route of publicRoutes) {
    const html = await readFile(htmlPath(route), "utf8");
    assert.doesNotMatch(html, /data-responsive-widths=/, `${route} should not expose build markers`);
    for (const match of html.matchAll(/<img\b[^>]*srcset="([^"]+)"[^>]*>/g)) {
      const tag = match[0];
      const sourceWidth = Number(tag.match(/\swidth="(\d+)"/)?.[1]);
      const sourceHeight = Number(tag.match(/\sheight="(\d+)"/)?.[1]);
      assert.ok(sourceWidth > 0 && sourceHeight > 0, `${route} responsive images need intrinsic dimensions`);
      assert.match(tag, /\ssizes="[^"]+"/, `${route} responsive images need sizes`);
      assert.match(tag, /\sdecoding="async"/, `${route} responsive images should decode asynchronously`);
      for (const candidate of match[1].split(",")) {
        const [, url, width] = candidate.trim().match(/^(\/\S+)\s+(\d+)w$/) ?? [];
        assert.ok(url && width, `${route} has malformed srcset candidate ${candidate}`);
        assert.ok(Number(width) <= sourceWidth, `${route} must not upscale ${url}`);
        assert.equal(await exists(path.join(output, url)), true, `${route} references missing responsive asset ${url}`);
      }
    }
  }

  for (const route of ["/", "/services/kitchen-renovations", "/projects/hutter-whole-house-remodel-addition"]) {
    const html = await readFile(htmlPath(route), "utf8");
    const hero = html.match(/<img\b[^>]*loading="eager"[^>]*>/)?.[0] ?? "";
    assert.match(hero, /fetchPriority="high"/i, `${route} hero should receive high fetch priority`);
    assert.match(hero, /srcset=/, `${route} hero should be responsive`);
  }
  const home = await readFile(htmlPath("/"), "utf8");
  assert.match(home, /hutter-kitchen-05\.webp"[^>]*loading="lazy"/);
  const service = await readFile(htmlPath("/services/kitchen-renovations"), "utf8");
  assert.match(service, /hutter-kitchen-02\.webp"[^>]*loading="lazy"/);
  const project = await readFile(htmlPath("/projects/hutter-whole-house-remodel-addition"), "utf8");
  assert.match(project, /hutter-kitchen-05\.webp"[^>]*loading="lazy"/);
});

test("exports approved focus, landmark, contrast, and form-error accessibility corrections", async () => {
  const [styles, header, form, service, contact] = await Promise.all([
    readFile(path.join(root, "app", "globals.css"), "utf8"),
    readFile(path.join(root, "components", "site-header.tsx"), "utf8"),
    readFile(path.join(root, "components", "inquiry-form.tsx"), "utf8"),
    readFile(htmlPath("/services/kitchen-renovations"), "utf8"),
    readFile(htmlPath("/contact"), "utf8"),
  ]);
  assert.match(styles, /--muted: #5f6a76/);
  assert.match(styles, /--accent-foreground: #8a5a00/);
  assert.doesNotMatch(styles, /a \{ color: inherit;/);
  assert.match(styles, /:focus-visible \{ outline: 3px solid currentColor;/);
  assert.match(styles, /\.menu-toggle \{[^}]*width: 44px;[^}]*height: 44px;/);
  assert.match(header, /<header[\s\S]*mobile-sticky-cta[\s\S]*<\/header>/);
  assert.match(form, /role=\{status === "error" \? "alert" : "status"\}/);
  assert.doesNotMatch(service, /<aside\b/);
  assert.doesNotMatch(contact, /<aside\b/);
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

  assert.match(robots, /^User-agent: \*$/m);
  assert.match(robots, /^Allow: \/$/m);
  assert.match(robots, /^Disallow: \/api\/$/m);
  assert.equal([...robots.matchAll(/^Disallow:/gm)].length, 1, "robots should exclude only the form API");
  assert.match(robots, /^Sitemap: https:\/\/versatileedgellc\.com\/sitemap\.xml$/m);
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const productionUrls = publicRoutes.map((route) => `https://versatileedgellc.com${route}`);
  assert.deepEqual(
    [...sitemapUrls].sort(),
    [...productionUrls].sort(),
    "sitemap should exactly match the public production routes",
  );
  assert.equal(new Set(sitemapUrls).size, sitemapUrls.length, "sitemap URLs should be unique");
  assert.ok(
    sitemapUrls.every((url) => new URL(url).origin === "https://versatileedgellc.com"),
    "sitemap URLs should use only the production origin",
  );

  for (const [index, route] of publicRoutes.entries()) {
    const html = await readFile(htmlPath(route), "utf8");
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    assert.ok(canonical, `${route} should declare a canonical`);
    assert.equal(
      new URL(canonical).href,
      new URL(productionUrls[index]).href,
      `${route} should declare its production canonical`,
    );
    assert.doesNotMatch(html, /<meta name="robots" content="[^"]*noindex/i, `${route} should be indexable`);
  }
  const notFound = await readFile(path.join(output, "404.html"), "utf8");
  assert.match(notFound, /<meta name="robots" content="noindex"/);
  assert.equal(sitemapUrls.includes("https://versatileedgellc.com/404"), false);
  assert.match(htaccess, /RewriteBase \/\n/);
  assert.match(htaccess, /RewriteRule \^about-versatile-edge\/\?\$ https:\/\/versatileedgellc\.com\/about \[R=301,L,NE\]/);
  assert.match(htaccess, /RewriteRule \^services1\/\?\$ https:\/\/versatileedgellc\.com\/services \[R=301,L,NE\]/);
  assert.match(htaccess, /RewriteRule \^contact-versatile-edge-llc\/\?\$ https:\/\/versatileedgellc\.com\/contact \[R=301,L,NE\]/);
  assert.doesNotMatch(htaccess, /versatile-edge-general-contractor-in-wake-forest/);
  assert.doesNotMatch(htaccess, /general-contractor-services-in-raleigh/);
  assert.doesNotMatch(htaccess, /general-contractor-in-apex/);
  assert.match(htaccess, /SetEnvIfNoCase Host "\^staging\\\.versatileedgellc\\\.com/);
  assert.match(htaccess, /Header always set X-Robots-Tag "noindex, nofollow" env=versatile_edge_staging/);
  assert.match(htaccess, /# Generated from exported indexable canonicals/);
  assert.match(htaccess, /RewriteRule \^index\(\?:\\\.html\)\?\/\?\$/);
  assert.match(htaccess, /RewriteRule \^\(\(\?:[\s\S]+\)\)\(\?:\\\.html\|\/\)\$/);
  for (const route of publicRoutes.filter((route) => route !== "/")) {
    assert.match(htaccess, new RegExp(route.slice(1).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `${route} should be generated into normalization rules`);
  }
  assert.doesNotMatch(htaccess, /RewriteRule \^\(\.\+\)\\\.html/);
  assert.doesNotMatch(htaccess, /RewriteRule \^\(\.\+\)\/\$/);
  assert.match(htaccess, /RewriteRule \^404\(\?:\\\.html\)\?\/\?\$ - \[R=404,L\]/);
  assert.match(htaccess, /RewriteRule \^ https:\/\/versatileedgellc\.com%\{REQUEST_URI\}/);
  assert.match(htaccess, /RewriteRule \^ https:\/\/staging\.versatileedgellc\.com%\{REQUEST_URI\}/);
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

test("tracks city-targeted legacy URLs without prematurely redirecting them", async () => {
  const inventory = await readFile(path.join(root, "deployment", "LEGACY-URL-INVENTORY.md"), "utf8");
  assert.match(inventory, /versatile-edge-general-contractor-in-wake-forest-nc-kitchens-baths-additions-decks-more/);
  assert.match(inventory, /general-contractor-services-in-raleigh-nc/);
  assert.match(inventory, /general-contractor-in-apex-nc-kitchens-bath-additions-decks-more/);
  assert.match(inventory, /Hold for future Wake Forest city page/);
  assert.match(inventory, /Hold for future Raleigh city page/);
  assert.match(inventory, /Hold for future Apex city page/);
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

test("exports the approved content and global back-to-top control", async () => {
  const [home, services, process, projects, hutter, brown, johnson, walsh, janet] = await Promise.all([
    readFile(htmlPath("/"), "utf8"),
    readFile(htmlPath("/services"), "utf8"),
    readFile(htmlPath("/process"), "utf8"),
    readFile(htmlPath("/projects"), "utf8"),
    readFile(htmlPath("/projects/hutter-whole-house-remodel-addition"), "utf8"),
    readFile(htmlPath("/projects/brown-bathroom"), "utf8"),
    readFile(htmlPath("/projects/johnson-bathroom"), "utf8"),
    readFile(htmlPath("/projects/walsh-sunroom-deck"), "utf8"),
    readFile(htmlPath("/projects/janet-home-addition"), "utf8"),
  ]);

  assert.match(home, /Quality Renovations and Builds\./);
  assert.match(home, /Improving the Way You Live\./);
  assert.match(services, /Every project follows the same standard: thoughtful planning/);
  assert.match(process, /A clear plan makes the best work possible\./);
  assert.match(projects, /Brown - New Wet Bar Installation/);
  assert.match(projects, /Multiple Rooms/);
  assert.match(hutter, /Historic Raleigh, NC/);
  assert.match(hutter, /New Family Room Addition/);
  assert.match(johnson, /Wake Forest, NC/);
  assert.match(brown, /Raleigh, NC/);
  assert.match(walsh, /Apex, NC/);
  assert.match(janet, /Five Points, Raleigh, NC/);
  for (const route of publicRoutes) {
    assert.match(await readFile(htmlPath(route), "utf8"), /aria-label="Back to top"/, route);
  }
});

test("exports the approved homepage SEO metadata and contractor schema", async () => {
  const home = await readFile(htmlPath("/"), "utf8");
  assert.match(home, /<title>Home Remodeling Raleigh NC \| Versatile Edge LLC<\/title>/);
  assert.match(home, /<meta name="description" content="Versatile Edge provides quality home remodeling in Raleigh, NC, including kitchens, bathrooms, additions, screened porches, decks, windows, and whole-home renovations\."/);
  // Vinext normalizes the root URL by omitting its trailing slash in rendered HTML.
  assert.match(home, /<link rel="canonical" href="https:\/\/versatileedgellc\.com\/?"/);
  assert.match(home, /<meta property="og:title" content="Home Remodeling Raleigh NC \| Versatile Edge LLC"/);
  assert.match(home, /Raleigh Home Remodeling, Built Around the Way You Live\./);
  assert.match(home, /licensed residential general contractor helping Raleigh and Wake County homeowners/);
  assert.match(home, /href="\/projects\/hutter-whole-house-remodel-addition"/);
  assert.match(home, /Built for Raleigh and Wake County Homes\./);
  assert.match(home, /"@type":"GeneralContractor"/);
  assert.match(home, /"@id":"https:\/\/versatileedgellc\.com\/#contractor"/);
  assert.match(home, /"@type":"OfferCatalog"/);
  assert.match(home, /"name":"Interior Remodeling"/);
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
