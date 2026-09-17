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
  },
];

export const featuredRenovationArticle = renovationArticles.find((article) => article.featured) ?? renovationArticles[0];

export function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}
