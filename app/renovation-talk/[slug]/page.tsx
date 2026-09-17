import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { RenovationTalkSidebar } from "@/components/renovation-talk-sidebar";
import { ResponsiveImage } from "@/components/responsive-image";
import { formatArticleDate, renovationArticles } from "@/lib/renovation-talk";
import { contractorId, productionOrigin } from "@/lib/structured-data";

export const dynamicParams = false;
export function generateStaticParams() { return renovationArticles.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = renovationArticles.find((item) => item.slug === slug);
  if (!article) return {};
  const url = `${productionOrigin}/renovation-talk/${article.slug}`;
  return { title: article.title, description: article.description, alternates: { canonical: url }, openGraph: { type: "article", title: article.title, description: article.description, url, publishedTime: article.datePublished, images: [{ url: article.image, alt: article.imageAlt }] } };
}

export default async function RenovationArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = renovationArticles.find((item) => item.slug === slug);
  if (!article) notFound();
  const url = `${productionOrigin}/renovation-talk/${article.slug}`;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "BlogPosting", "@id": `${url}#article`, headline: article.title, description: article.description, datePublished: article.datePublished, dateModified: article.datePublished, mainEntityOfPage: { "@type": "WebPage", "@id": url }, image: `${productionOrigin}${article.image}`, author: { "@id": contractorId }, publisher: { "@id": contractorId }, articleSection: article.topics },
    { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${productionOrigin}/` }, { "@type": "ListItem", position: 2, name: "Renovation Talk", item: `${productionOrigin}/renovation-talk` }, { "@type": "ListItem", position: 3, name: article.title, item: url }] },
  ] };
  return <><JsonLd data={schema} /><section className="article-header section"><div className="site-container"><a className="article-back" href="/renovation-talk"><ArrowLeft size={17} /> Renovation Talk</a><p className="article-topics">{article.topics.join(" · ")}</p><h1>{article.title}</h1><time dateTime={article.datePublished}>Published {formatArticleDate(article.datePublished)}</time></div></section><section className="article-content section"><div className="site-container renovation-layout"><article className="article-body"><ResponsiveImage src={article.image} alt={article.imageAlt} sizes="(max-width: 760px) calc(100vw - 30px), 72vw" priority />
    <p className="lead">Do not let home-improvement shows set the expectation for a real renovation. They can turn weeks or months of planning, demolition, coordination, and finish work into a few entertaining minutes. Material and labor costs also vary widely by location, and some shows present a project cost without the contractor’s fee.</p>
    <p>In the real world, a renovation begins with an existing house—its structure, systems, finishes, and history. Before new work can begin, the team may need to protect finished areas, remove old materials, solve how new work will connect to the house, and address conditions that cannot be seen until the project is opened up.</p>
    <p>That is why cost per square foot is rarely a useful way to compare renovation with new construction. The better question is what work, coordination, and risk the proposed scope actually includes.</p>
    <h2>Renovation starts with careful removal and protection</h2>
    <p>Before a remodeled room can take shape, part of the existing home often has to be opened, removed, or protected. Floors outside the work area, adjacent rooms, furniture, finished trim, and daily access routes all deserve attention. Demolition itself is work, but so are dust control, cleanup, hauling, and preparing the remaining structure for what comes next.</p>
    <p>In older homes, that preparation can also include procedures that do not exist on a blank site. For example, the EPA explains that paid renovation work disturbing painted surfaces in many pre-1978 homes is subject to <a href="https://www.epa.gov/lead/lead-renovation-repair-and-painting-program" target="_blank" rel="noreferrer">lead-safe renovation requirements</a>. Whether or not that applies to a particular project, an existing house calls for a more deliberate approach to protection and demolition than an open lot does.</p>
    <h2>The new work must meet what is already there</h2>
    <p>A new-build team lays out a coordinated system from the ground up. In a renovation, new framing, plumbing, electrical, HVAC, insulation, drainage, and finishes must connect to systems that may have been installed decades apart. A wall may not be where plans suggest. A drain may need a different route. A structural opening may require engineering, stamped plans, or a more involved connection than expected.</p>
    <p>Those are not necessarily signs that something went wrong. They are part of making a finished result look intentional and perform as it should. Engineering, permits, inspections, design coordination, and trade coordination are all legitimate project costs when the scope calls for them. The work must respect what the house needs today while fitting the design and scope the homeowner wants.</p>
    <h2>Concealed conditions are part of the unknown</h2>
    <p>Until finishes come off, no one can see every condition inside a wall, below a floor, or behind a cabinet. Previous repairs, outdated wiring, moisture damage, framing changes, and undersized or poorly routed mechanical work may be discovered only after the project is underway. Good planning reduces surprises, but it cannot make concealed conditions visible before access exists.</p>
    <p>That is why a thoughtful renovation scope should explain what is known, what allowances or contingencies may be appropriate, and how decisions will be handled if the house reveals something unexpected. Versatile Edge includes a contingency/variance amount in every quote to address unforeseen discoveries as they arise. It is more useful than pretending a simple square-foot number can account for every condition.</p>
    <h2>An occupied home is not an open jobsite</h2>
    <p>Many remodeling projects happen while people are living in the house. Crews may need to maintain safe access, contain dust, protect finished areas, coordinate utility interruptions, and work around the routines of a household. Workdays may also be limited by household schedules, school drop-off and pickup, neighborhood rules, or the reasonable hours when disruptive work can happen. Materials and tools move through existing rooms rather than across an open site. That is an important part of caring for the home, but it is not as efficient as building inside a structure that has not yet been finished or occupied.</p>
    <h2>Small rooms can carry concentrated costs</h2>
    <p>Kitchens and bathrooms make cost-per-square-foot comparisons especially misleading. They are compact rooms, yet they concentrate expensive and specialized work: cabinetry, countertops, tile, plumbing fixtures, electrical circuits, lighting, ventilation, waterproofing, appliances, and careful finish installation. Some project costs, including planning, permits, engineering when required, protection, mobilization, and trade coordination, also do not shrink very much just because the room is small.</p>
    <p>Two projects can therefore have similar square footage and very different investments. A small bathroom with a custom shower, relocated plumbing, tile, ventilation, and a new vanity is not comparable to a similarly sized open room with simple finishes. The square footage is the same; the scope is not.</p>
    <h2>Compare scope, not a generic price metric</h2>
    <p>When evaluating a renovation, compare the work that is actually proposed: what is being removed, protected, repaired, relocated, built, supplied, and finished. Ask how existing systems will be evaluated, what is included for permits and coordination, and how discoveries in the house will be communicated.</p>
    <p>That conversation produces a clearer decision than a broad cost-per-square-foot comparison. It also helps set the right expectation: a renovation is not simply new construction placed inside an old house. It is a coordinated process of making the old and new work together.</p>
    <section className="article-cta"><span className="eyebrow light">Planning in Raleigh or Wake County?</span><h2>Start with the scope your home actually needs.</h2><p>Versatile Edge helps homeowners turn renovation goals into practical, well-coordinated project plans.</p><a href="/contact">Request a consultation <ArrowRight size={18} /></a></section>
  </article><RenovationTalkSidebar /></div></section></>;
}
