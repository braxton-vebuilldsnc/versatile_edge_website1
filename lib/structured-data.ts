import { serviceAreas, services } from "@/lib/site-data";

export const productionOrigin = "https://versatileedgellc.com";
export const contractorId = `${productionOrigin}/#contractor`;

type ServiceSchemaInput = {
  slug: string;
  title: string;
  summary: string;
  faq: readonly (readonly [string, string])[];
};

type ProjectSchemaInput = {
  slug: string;
  title: string;
};

function productionUrl(pathname: string) {
  return new URL(pathname, productionOrigin).href.replace(/\/$/, pathname === "/" ? "/" : "");
}

function areasServed() {
  return [
    { "@type": "AdministrativeArea", name: "Wake County" },
    ...serviceAreas.map((name) => ({ "@type": "City", name })),
  ];
}

function serviceEntity(service: ServiceSchemaInput) {
  const url = productionUrl(`/services/${service.slug}`);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.title,
    description: service.summary,
    url,
    provider: { "@id": contractorId },
    areaServed: areasServed(),
  };
}

export function serviceCatalogSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${productionOrigin}/#service-catalog`,
    name: "Residential remodeling services",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      url: productionUrl(`/services/${service.slug}`),
      itemOffered: serviceEntity(service),
    })),
  };
}

export function servicePageSchema(service: ServiceSchemaInput) {
  const url = productionUrl(`/services/${service.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      serviceEntity(service),
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${productionOrigin}/` },
          { "@type": "ListItem", position: 2, name: "Services", item: `${productionOrigin}/services` },
          { "@type": "ListItem", position: 3, name: service.title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: service.faq.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };
}

export function projectBreadcrumbSchema(project: ProjectSchemaInput) {
  const url = productionUrl(`/projects/${project.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${productionOrigin}/` },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${productionOrigin}/projects` },
      { "@type": "ListItem", position: 3, name: project.title, item: url },
    ],
  };
}
