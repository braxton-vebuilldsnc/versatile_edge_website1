import { access, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const output = path.resolve("dist", "client");
const projectImages = path.join(output, "images", "projects");
const productionOrigin = "https://versatileedgellc.com";
const requiredFiles = [
  "index.html",
  "404.html",
  ".htaccess",
  "robots.txt",
  "sitemap.xml",
  "api/inquiries.php",
];

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory()
      ? htmlFiles(file)
      : entry.isFile() && path.extname(entry.name) === ".html"
        ? [file]
        : [];
  }));
  return nested.flat();
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function escapeRewritePattern(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function generatedNormalizationRules(urls) {
  const routes = urls
    .map((url) => new URL(url).pathname.replace(/^\/+|\/+$/g, ""))
    .filter(Boolean)
    .sort((left, right) => right.length - left.length)
    .map(escapeRewritePattern);

  if (routes.length === 0) throw new Error("Cannot generate URL normalization without exported routes");
  const routePattern = `(?:${routes.join("|")})`;
  return [
    "# BEGIN GENERATED ROUTE NORMALIZATION",
    "# Generated from exported indexable canonicals by prepare-static-output.mjs.",
    "# These exact-route rules avoid redirecting nonexistent paths.",
    "RewriteCond %{HTTP_HOST} ^(?:www\\.)?versatileedgellc\\.com(?::[0-9]+)?$ [NC]",
    "RewriteCond %{THE_REQUEST} \\s/+index(?:\\.html)?/?(?:[?\\s]) [NC]",
    "RewriteRule ^index(?:\\.html)?/?$ https://versatileedgellc.com/ [R=301,L,NE]",
    "",
    "RewriteCond %{HTTP_HOST} ^staging\\.versatileedgellc\\.com(?::[0-9]+)?$ [NC]",
    "RewriteCond %{THE_REQUEST} \\s/+index(?:\\.html)?/?(?:[?\\s]) [NC]",
    "RewriteRule ^index(?:\\.html)?/?$ https://staging.versatileedgellc.com/ [R=301,L,NE]",
    "",
    "RewriteCond %{HTTP_HOST} ^(?:www\\.)?versatileedgellc\\.com(?::[0-9]+)?$ [NC]",
    `RewriteCond %{THE_REQUEST} \\s/+${routePattern}(?:\\.html|/)(?:[?\\s]) [NC]`,
    `RewriteRule ^(${routePattern})(?:\\.html|/)$ https://versatileedgellc.com/$1 [R=301,L,NE]`,
    "",
    "RewriteCond %{HTTP_HOST} ^staging\\.versatileedgellc\\.com(?::[0-9]+)?$ [NC]",
    `RewriteCond %{THE_REQUEST} \\s/+${routePattern}(?:\\.html|/)(?:[?\\s]) [NC]`,
    `RewriteRule ^(${routePattern})(?:\\.html|/)$ https://staging.versatileedgellc.com/$1 [R=301,L,NE]`,
    "# END GENERATED ROUTE NORMALIZATION",
  ].join("\n");
}

const sitemapUrls = [];
for (const file of await htmlFiles(output)) {
  if (path.basename(file) === "404.html") continue;

  const html = await readFile(file, "utf8");
  const robots = html.match(/<meta name="robots" content="([^"]+)"/)?.[1] ?? "";
  if (robots.split(/[,\s]+/).includes("noindex")) continue;

  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!canonical) throw new Error(`Indexable export is missing a canonical: ${file}`);

  const url = new URL(canonical);
  if (url.origin !== productionOrigin || url.protocol !== "https:" || url.search || url.hash) {
    throw new Error(`Invalid production canonical in ${file}: ${canonical}`);
  }
  sitemapUrls.push(url.href);
}

const uniqueSitemapUrls = [...new Set(sitemapUrls)];
if (uniqueSitemapUrls.length !== sitemapUrls.length) {
  throw new Error("Duplicate production canonicals would create duplicate sitemap entries");
}
uniqueSitemapUrls.sort((left, right) => {
  if (left === `${productionOrigin}/`) return -1;
  if (right === `${productionOrigin}/`) return 1;
  return left.localeCompare(right);
});

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...uniqueSitemapUrls.map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`),
  "</urlset>",
  "",
].join("\n");
await writeFile(path.join(output, "sitemap.xml"), sitemap, "utf8");

const htaccessPath = path.join(output, ".htaccess");
const htaccess = await readFile(htaccessPath, "utf8");
const normalizationBlock = /# BEGIN GENERATED ROUTE NORMALIZATION[\s\S]*?# END GENERATED ROUTE NORMALIZATION/;
if (!normalizationBlock.test(htaccess)) {
  throw new Error("Missing generated route-normalization markers in exported .htaccess");
}
await writeFile(
  htaccessPath,
  htaccess.replace(normalizationBlock, generatedNormalizationRules(uniqueSitemapUrls)),
  "utf8",
);

for (const file of requiredFiles) {
  await access(path.join(output, file));
}

// Source photographs are preserved in public/ for local archival work but are
// not deployment assets. All site references use the optimized WebP versions.
for (const entry of await readdir(projectImages, { withFileTypes: true })) {
  if (entry.isFile() && path.extname(entry.name).toLowerCase() !== ".webp") {
    await rm(path.join(projectImages, entry.name));
  }
}

console.log("IONOS static output prepared in dist/client/");
