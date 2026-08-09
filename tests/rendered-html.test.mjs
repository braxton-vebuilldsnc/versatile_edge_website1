import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) }, PROJECT_UPLOADS: { put() {}, get() {} } }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders the finished Versatile Edge homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Remodel with clarity/);
  assert.match(html, /Request a consultation/);
  assert.match(html, /Licensed NC General Contractor/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("renders key marketing routes", async () => {
  for (const path of ["/about", "/services", "/services/kitchen-renovations", "/projects", "/process", "/contact", "/privacy"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get("content-type") || "", /^text\/html/i, path);
  }
});

test("includes the full property address in inquiry utilities", async () => {
  const [form, inquiry] = await Promise.all([
    readFile(new URL("../components/inquiry-form.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/inquiry.ts", import.meta.url), "utf8"),
  ]);
  assert.match(form, /name="street"[^>]*required/);
  assert.match(form, /name="city"[^>]*required/);
  assert.match(form, /name="zip"[^>]*required/);
  assert.match(inquiry, /google\.com\/maps\/search/);
  assert.match(inquiry, /Review property on Google Maps/);
});
