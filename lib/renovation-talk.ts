export type RenovationArticle = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  datePublished: string;
  topics: readonly string[];
  image: string;
  imageAlt: string;
  featured?: boolean;
  searchText: string;
  body: "renovation-costs" | "kitchen-cabinet-construction";
};

export const renovationArticles: readonly RenovationArticle[] = [
  {
    slug: "why-renovations-cost-more-per-square-foot-than-new-construction",
    title: "Why Can Renovations Cost More Per Square Foot Than New Construction?",
    description: "Why renovation costs are not directly comparable to new-construction cost per square foot—and what Raleigh homeowners should compare instead.",
    excerpt: "A renovation has to carefully remove, protect, connect, and rebuild within a house that is already standing. That is why a generic cost-per-square-foot comparison can hide the work that makes a project successful.",
    datePublished: "2026-09-17",
    topics: ["Costs & Planning", "Renovation Basics"],
    image: "/images/projects/brown-working-vanity-install.webp",
    imageAlt: "Versatile Edge team preparing cabinetry during an interior renovation",
    featured: true,
    searchText: "renovation costs cost per square foot new construction demolition protection existing structure mechanical systems concealed conditions contingency variance occupied home work hours engineering permits inspections kitchen bathroom planning Raleigh Wake County",
    body: "renovation-costs",
  },
  {
    slug: "how-to-compare-kitchen-cabinet-construction",
    title: "How to Compare Kitchen Cabinet Construction",
    description: "A practical guide to cabinet boxes, plywood and MDF, face-frame construction, full-overlay doors, and the details that matter in a Raleigh kitchen renovation.",
    excerpt: "Cabinet terms can sound interchangeable until you see how box material, face frames, door overlay, drawers, and installation details come together in a finished kitchen.",
    datePublished: "2026-09-17",
    topics: ["Kitchens", "Materials & Products"],
    image: "/images/projects/kitchen-modern-gas-range.webp",
    imageAlt: "Clean-line kitchen with crisp cabinetry, layered lighting, and durable surfaces",
    searchText: "kitchen cabinets cabinet construction plywood MDF medium density fiberboard face frame frameless full overlay standard reveal partial overlay doors drawers dovetail soft close J&K Cabinetry Raleigh Wake County",
    body: "kitchen-cabinet-construction",
  },
];

export const featuredRenovationArticle = renovationArticles.find((article) => article.featured) ?? renovationArticles[0];

export function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}
