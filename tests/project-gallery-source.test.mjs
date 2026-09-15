import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const siteDataPath = path.join(root, "lib", "site-data.ts");
const projectPagePath = path.join(root, "app", "projects", "[slug]", "page.tsx");

const additions = {
  "janet-home-addition": [
    "janet-roof-framing-interior.webp",
    "janet-interior-wall-framing-progress.webp",
    "janet-exterior-door-window-installation.webp",
    "janet-door-window-weather-barrier.webp",
    "janet-exterior-window-installation.webp",
  ],
  "brown-bathroom": [
    "brown-finished-open-room.webp",
    "brown-finished-room-three-windows.webp",
    "brown-finished-room-french-doors.webp",
    "brown-finished-room-high-windows.webp",
    "brown-finished-hall-window.webp",
    "brown-finished-room-entry-view.webp",
  ],
};

test("keeps project source photographs excluded from Git", async () => {
  const gitignore = await readFile(path.join(root, ".gitignore"), "utf8");
  assert.match(gitignore, /^\/project-source-images\/$/m);
});

test("assigns each new optimized photograph once to its existing project gallery", async () => {
  const siteData = await readFile(siteDataPath, "utf8");
  for (const [slug, images] of Object.entries(additions)) {
    assert.match(siteData, new RegExp(`slug: "${slug}"`));
    for (const image of images) {
      assert.equal((siteData.match(new RegExp(image.replaceAll(".", "\\."), "g")) ?? []).length, 2, `${image} should have one gallery reference and one alt-text entry`);
    }
  }
});

test("stores every new gallery asset as a reasonably sized, orientation-correct WebP", async () => {
  for (const image of Object.values(additions).flat()) {
    const imagePath = path.join(root, "public", "images", "projects", image);
    await access(imagePath);
    const metadata = await sharp(imagePath).metadata();
    assert.equal(metadata.format, "webp", image);
    assert.ok(metadata.width <= 1800 && metadata.height <= 1800, `${image} dimensions`);
    assert.ok((await stat(imagePath)).size < 800_000, `${image} file size`);
  }
});

test("existing project route and breadcrumb schema architecture remains in use", async () => {
  const projectPage = await readFile(projectPagePath, "utf8");
  assert.match(projectPage, /generateStaticParams\(\)/);
  assert.match(projectPage, /namedProjects\.map\(\(project\) => \(\{ slug: project\.slug \}\)\)/);
  assert.match(projectPage, /projectBreadcrumbSchema\(project\)/);
  assert.match(projectPage, /project\.rooms\.map/);
});
