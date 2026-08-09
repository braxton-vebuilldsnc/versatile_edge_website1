import { access, readdir, rm } from "node:fs/promises";
import path from "node:path";

const output = path.resolve("dist", "client");
const projectImages = path.join(output, "images", "projects");
const requiredFiles = [
  "index.html",
  "404.html",
  ".htaccess",
  "robots.txt",
  "sitemap.xml",
  "api/inquiries.php",
];

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
