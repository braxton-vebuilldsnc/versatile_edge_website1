import { access, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

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

function imageAttribute(tag, name) {
  return tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
}

function responsiveImageUrl(src, width) {
  const extension = path.posix.extname(src);
  return `${src.slice(0, -extension.length)}-${width}w.webp`;
}

const generatedResponsiveImages = new Set();
async function prepareResponsiveImages(file) {
  let html = await readFile(file, "utf8");
  const tags = [...html.matchAll(/<img\b[^>]*\sdata-responsive-widths="[^"]+"[^>]*>/g)].map((match) => match[0]);

  for (const tag of tags) {
    const src = imageAttribute(tag, "src");
    const requestedWidths = imageAttribute(tag, "data-responsive-widths")
      ?.split(",")
      .map(Number)
      .filter(Number.isFinite) ?? [];
    if (!src?.startsWith("/")) throw new Error(`Responsive image must use a root-relative source in ${file}`);

    const sourceFile = path.join(output, src.replace(/^\/+/, ""));
    const metadata = await sharp(sourceFile).metadata();
    if (!metadata.width || !metadata.height) throw new Error(`Unable to read responsive image dimensions: ${sourceFile}`);

    const widths = [...new Set(requestedWidths)]
      .filter((width) => width > 0 && width <= metadata.width)
      .sort((left, right) => left - right);
    const candidates = [];
    for (const width of widths) {
      const url = responsiveImageUrl(src, width);
      const destination = path.join(output, url.replace(/^\/+/, ""));
      if (!generatedResponsiveImages.has(destination)) {
        await sharp(sourceFile).resize({ width, withoutEnlargement: true }).webp({ quality: 78 }).toFile(destination);
        generatedResponsiveImages.add(destination);
      }
      candidates.push(`${url} ${width}w`);
    }

    let replacement = tag
      .replace(/\sdata-responsive-widths="[^"]+"/, "")
      .replace(/\swidth="[^"]*"/, "")
      .replace(/\sheight="[^"]*"/, "")
      .replace(/\ssrcset="[^"]*"/, "");
    replacement = replacement.replace(/\s*\/>$/, ` width="${metadata.width}" height="${metadata.height}" />`);
    if (candidates.length > 0) replacement = replacement.replace(/\ssizes="/, ` srcset="${candidates.join(", ")}" sizes="`);
    html = html.replace(tag, replacement);
  }

  await writeFile(file, html, "utf8");
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
    "RewriteCond %{HTTP_HOST} ^targeting\\.versatileedgellc\\.com(?::[0-9]+)?$ [NC]",
    "RewriteCond %{THE_REQUEST} \\s/+index(?:\\.html)?/?(?:[?\\s]) [NC]",
    "RewriteRule ^index(?:\\.html)?/?$ https://targeting.versatileedgellc.com/ [R=301,L,NE]",
    "",
    "RewriteCond %{HTTP_HOST} ^(?:www\\.)?versatileedgellc\\.com(?::[0-9]+)?$ [NC]",
    `RewriteCond %{THE_REQUEST} \\s/+${routePattern}(?:\\.html|/)(?:[?\\s]) [NC]`,
    `RewriteRule ^(${routePattern})(?:\\.html|/)$ https://versatileedgellc.com/$1 [R=301,L,NE]`,
    "",
    "RewriteCond %{HTTP_HOST} ^staging\\.versatileedgellc\\.com(?::[0-9]+)?$ [NC]",
    `RewriteCond %{THE_REQUEST} \\s/+${routePattern}(?:\\.html|/)(?:[?\\s]) [NC]`,
    `RewriteRule ^(${routePattern})(?:\\.html|/)$ https://staging.versatileedgellc.com/$1 [R=301,L,NE]`,
    "",
    "RewriteCond %{HTTP_HOST} ^targeting\\.versatileedgellc\\.com(?::[0-9]+)?$ [NC]",
    `RewriteCond %{THE_REQUEST} \\s/+${routePattern}(?:\\.html|/)(?:[?\\s]) [NC]`,
    `RewriteRule ^(${routePattern})(?:\\.html|/)$ https://targeting.versatileedgellc.com/$1 [R=301,L,NE]`,
    "# END GENERATED ROUTE NORMALIZATION",
  ].join("\n");
}

const exportedHtmlFiles = await htmlFiles(output);
for (const file of exportedHtmlFiles) await prepareResponsiveImages(file);

const sitemapUrls = [];
for (const file of exportedHtmlFiles) {
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
