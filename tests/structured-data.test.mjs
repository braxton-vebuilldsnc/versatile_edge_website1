import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const output = path.join(root, "dist", "client");
const productionOrigin = "https://versatileedgellc.com";
const contractorId = `${productionOrigin}/#contractor`;

const routes = [
  "/", "/about", "/services",
  "/services/whole-home-renovations", "/services/interior-remodeling",
  "/services/kitchen-renovations", "/services/bathroom-renovations",
  "/services/porches-and-decks", "/services/home-additions",
  "/services/window-replacement", "/projects",
  "/projects/hutter-whole-house-remodel-addition", "/projects/johnson-bathroom",
  "/projects/brown-bathroom", "/projects/walsh-sunroom-deck",
  "/projects/janet-home-addition", "/service-areas/raleigh-nc",
  "/service-areas/cary-nc", "/service-areas/wake-forest-nc",
  "/service-areas/apex-nc", "/service-areas/morrisville-nc",
  "/service-areas/fuquay-varina-nc", "/service-areas/holly-springs-nc",
  "/service-areas/knightdale-nc", "/service-areas/wendell-nc",
  "/service-areas/rolesville-nc", "/service-areas/garner-nc",
  "/process", "/contact", "/privacy",
];
const serviceRoutes = routes.filter((route) => route.startsWith("/services/"));
const projectRoutes = routes.filter((route) => route.startsWith("/projects/"));
const serviceAreaRoutes = routes.filter((route) => route.startsWith("/service-areas/"));

function htmlPath(route) {
  if (route === "/") return path.join(output, "index.html");
  if (route === "/404") return path.join(output, "404.html");
  return path.join(output, `${route.slice(1)}.html`);
}

function schemas(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]));
}

function nodes(value) {
  if (Array.isArray(value)) return value.flatMap(nodes);
  if (!value || typeof value !== "object") return [];
  return [value, ...Object.values(value).flatMap(nodes)];
}

function nodesOfType(documents, type) {
  return nodes(documents).filter((node) => node["@type"] === type);
}

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function visibleFaqs(html) {
  return [...html.matchAll(/<details><summary>([\s\S]*?)<\/summary><p>([\s\S]*?)<\/p><\/details>/g)]
    .map((match) => ({ question: decodeHtml(match[1]), answer: decodeHtml(match[2]) }));
}

function httpUrls(value) {
  if (Array.isArray(value)) return value.flatMap(httpUrls);
  if (!value || typeof value !== "object") return [];
  return Object.values(value).flatMap((entry) => {
    if (typeof entry === "string" && /^https?:\/\//.test(entry)) return [entry];
    return httpUrls(entry);
  });
}

test("uses one consistent production GeneralContractor entity on every exported document", async () => {
  for (const route of [...routes, "/404"]) {
    const documents = schemas(await readFile(htmlPath(route), "utf8"));
    const contractors = nodesOfType(documents, "GeneralContractor");
    assert.equal(contractors.length, 1, `${route} should contain one contractor entity`);
    const contractor = contractors[0];
    assert.equal(contractor["@id"], contractorId, route);
    assert.equal(contractor.name, "Versatile Edge LLC", route);
    assert.equal(contractor.url, `${productionOrigin}/`, route);
    assert.equal(contractor.telephone, "+1-888-381-1033", route);
    assert.equal(contractor.identifier, "NC General Contractor License #107393", route);
    assert.equal("hasOfferCatalog" in contractor, false, `${route} should not inherit a catalog`);
    assert.equal(nodesOfType(documents, "Organization").length, 0, `${route} should not conflict with another business entity`);
  }
});

test("places complete seven-service catalogs only where all services are visible", async () => {
  for (const route of routes) {
    const html = await readFile(htmlPath(route), "utf8");
    const documents = schemas(html);
    const catalogs = nodesOfType(documents, "OfferCatalog");
    const expected = route === "/" || route === "/services" ? 1 : 0;
    assert.equal(catalogs.length, expected, `${route} catalog count`);
    if (!expected) continue;

    const offers = catalogs[0].itemListElement;
    assert.equal(offers.length, 7, `${route} should list seven services`);
    assert.equal(new Set(offers.map((offer) => offer.itemOffered["@id"])).size, 7);
    for (const offer of offers) {
      const service = offer.itemOffered;
      assert.equal(service["@type"], "Service");
      assert.equal(service.provider["@id"], contractorId);
      assert.ok(service.url.startsWith(`${productionOrigin}/services/`));
      assert.match(html, new RegExp(`href="${new URL(service.url).pathname.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
      assert.ok(html.includes(service.description), `${route} should visibly contain ${service.name}'s description`);
    }
    assert.ok(offers.some((offer) => offer.itemOffered.name === "Interior Remodeling"));
  }
});

test("service detail schema matches its visible service, FAQ, and hierarchy", async () => {
  for (const route of serviceRoutes) {
    const html = await readFile(htmlPath(route), "utf8");
    const documents = schemas(html);
    const services = nodesOfType(documents, "Service");
    const faqs = nodesOfType(documents, "FAQPage");
    const breadcrumbs = nodesOfType(documents, "BreadcrumbList");
    assert.equal(services.length, 1, `${route} Service count`);
    assert.equal(faqs.length, 1, `${route} FAQ count`);
    assert.equal(breadcrumbs.length, 1, `${route} breadcrumb count`);

    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    assert.equal(new URL(services[0].url).href, new URL(canonical).href);
    assert.equal(services[0].provider["@id"], contractorId);
    assert.ok(html.includes(services[0].name));
    assert.ok(html.includes(services[0].description));

    const visible = visibleFaqs(html);
    const structured = faqs[0].mainEntity.map((question) => ({
      question: question.name,
      answer: question.acceptedAnswer.text,
    }));
    assert.deepEqual(structured, visible, `${route} FAQ schema must exactly match visible FAQs`);
    assert.equal(structured.length, 2, `${route} should have two FAQs`);

    assert.deepEqual(
      breadcrumbs[0].itemListElement.map(({ position, name, item }) => ({ position, name, item })),
      [
        { position: 1, name: "Home", item: `${productionOrigin}/` },
        { position: 2, name: "Services", item: `${productionOrigin}/services` },
        { position: 3, name: services[0].name, item: services[0].url },
      ],
      `${route} breadcrumb hierarchy`,
    );
  }
});

test("project detail schema contains only its matching breadcrumb hierarchy", async () => {
  for (const route of projectRoutes) {
    const html = await readFile(htmlPath(route), "utf8");
    const documents = schemas(html);
    assert.equal(nodesOfType(documents, "Service").length, 0, route);
    assert.equal(nodesOfType(documents, "FAQPage").length, 0, route);
    const breadcrumbs = nodesOfType(documents, "BreadcrumbList");
    assert.equal(breadcrumbs.length, 1, route);
    const items = breadcrumbs[0].itemListElement;
    assert.deepEqual(items.slice(0, 2).map(({ position, name, item }) => ({ position, name, item })), [
      { position: 1, name: "Home", item: `${productionOrigin}/` },
      { position: 2, name: "Projects", item: `${productionOrigin}/projects` },
    ]);
    assert.equal(items[2].position, 3);
    assert.equal(items[2].item, `${productionOrigin}${route}`);
    assert.ok(html.includes(items[2].name));
  }
});

test("service-area schema matches each visible service, exact FAQs, and real hierarchy", async () => {
  assert.equal(serviceAreaRoutes.length, 11);
  for (const route of serviceAreaRoutes) {
    const html = await readFile(htmlPath(route), "utf8");
    const documents = schemas(html);
    const service = nodesOfType(documents, "Service");
    const faqs = nodesOfType(documents, "FAQPage");
    const breadcrumbs = nodesOfType(documents, "BreadcrumbList");
    const city = service[0]?.areaServed?.name;

    assert.equal(service.length, 1, route);
    assert.equal(service[0]["@id"], `${productionOrigin}${route}#service`);
    assert.equal(service[0].name, `Home Remodeling in ${city}, NC`);
    assert.equal(service[0].url, `${productionOrigin}${route}`);
    assert.equal(service[0].provider["@id"], contractorId);
    assert.deepEqual(service[0].areaServed, {
      "@type": "City", name: city,
      containedInPlace: { "@type": "State", name: "North Carolina" },
    });
    assert.ok(html.includes(service[0].description));

    assert.equal(faqs.length, 1, route);
    const visible = visibleFaqs(html);
    const structured = faqs[0].mainEntity.map((question) => ({ question: question.name, answer: question.acceptedAnswer.text }));
    assert.deepEqual(structured, visible, `${route} FAQ parity`);
    assert.equal(structured.length, city === "Raleigh" ? 7 : 6, `${route} FAQ count`);

    assert.equal(breadcrumbs.length, 1, route);
    assert.deepEqual(breadcrumbs[0].itemListElement, [
      { "@type": "ListItem", position: 1, name: "Home", item: `${productionOrigin}/` },
      { "@type": "ListItem", position: 2, name: `${city} Home Remodeling`, item: `${productionOrigin}${route}` },
    ]);
    assert.equal(nodesOfType(documents, "OfferCatalog").length, 0, route);
    assert.equal(nodesOfType(documents, "Organization").length, 0, route);
  }
});

test("all structured-data URLs use schema.org or the production domain without development-host leakage", async () => {
  for (const route of [...routes, "/404"]) {
    const documents = schemas(await readFile(htmlPath(route), "utf8"));
    for (const url of httpUrls(documents)) {
      assert.equal(url.includes("staging.versatileedgellc.com"), false, `${route}: ${url}`);
      assert.equal(url.includes("targeting.versatileedgellc.com"), false, `${route}: ${url}`);
      assert.ok(
        url === "https://schema.org" || new URL(url).origin === productionOrigin,
        `${route} contains unsupported structured-data URL ${url}`,
      );
    }
  }
});
