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
  return <><JsonLd data={schema} /><section className="article-header section"><div className="site-container"><a className="article-back" href="/renovation-talk"><ArrowLeft size={17} /> Renovation Talk</a><p className="article-topics">{article.topics.join(" · ")}</p><h1>{article.title}</h1><time dateTime={article.datePublished}>Published {formatArticleDate(article.datePublished)}</time></div></section><section className="article-content section"><div className="site-container renovation-layout"><article className="article-body"><ResponsiveImage src={article.image} alt={article.imageAlt} className={article.body === "kitchen-cabinet-construction" ? "article-feature-image--full" : undefined} sizes="(max-width: 760px) calc(100vw - 30px), 72vw" priority />
    {article.body === "kitchen-cabinet-construction" ? <KitchenCabinetConstructionArticle /> : <RenovationCostsArticle />}
  </article><RenovationTalkSidebar /></div></section></>;
}

function RenovationCostsArticle() {
  return <>
    <p className="lead">Do not let home-improvement shows set the expectation for a real renovation. They can turn weeks or months of planning, demolition, coordination, and finish work into a few entertaining minutes. Material and labor costs also vary widely by location, and some shows present a project cost without the contractor’s fee.</p>
    <p>In the real world, a renovation begins with an existing house—its structure, systems, finishes, and history. Before new work can begin, the team may need to protect finished areas, remove old materials, solve how new work will connect to the house, and address conditions that cannot be seen until the project is opened up.</p>
    <p>That is why cost per square foot is rarely a useful way to compare renovation with new construction. The better question is what work, coordination, and risk the proposed scope actually includes.</p>
    <h2>Renovation starts with careful removal and protection</h2>
    <p>Before a remodeled room can take shape, part of the existing home often has to be opened, removed, or protected. Floors outside the work area, adjacent rooms, furniture, finished trim, and daily access routes all deserve attention. Demolition itself is work, but so are dust control, cleanup, hauling, and preparing the remaining structure for what comes next.</p>
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
  </>;
}

function KitchenCabinetConstructionArticle() {
  return <>
    <p className="lead">Cabinet shopping can quickly become a list of terms: plywood, MDF, face frame, frameless, full overlay, reveal. Those terms matter, but they are most useful when they help a homeowner understand how a cabinet will look, function, and hold up in the kitchen—not when they become a scoreboard.</p>
    <p>For a Versatile Edge kitchen renovation, we begin with the desired layout, storage, finishes, and budget. Then we look closely at the cabinet construction and installation details that support the finished room. <a href="https://www.jkcabinetrync.com/" target="_blank" rel="noreferrer">J&amp;K Cabinetry of North Carolina</a> is one of our preferred cabinet resources because it delivers quality construction and a strong value: homeowners can get plywood cabinet-box construction at pricing that is often associated with MDF-box cabinet lines.</p>
    <h2>Start with the cabinet box</h2>
    <p>The cabinet box is the structure behind the doors and drawer fronts. It carries shelves, supports countertop loads, receives fasteners during installation, and needs to stay square while the kitchen is being used every day. Materials and thicknesses affect how that box performs, especially at sink bases, tall cabinets, and heavily loaded drawers.</p>
    <p>In cabinet boxes, plywood is valued for dependable screw-holding ability and stiffness without excessive weight. The cabinet line we commonly specify uses cabinet-grade plywood boxes from 1/2 to 5/8 inch thick, with finished interior and exterior sides. That is the kind of construction we prefer to discuss with homeowners rather than relying on a broad label such as “all wood.”</p>
    <h2>Plywood and MDF each have a place</h2>
    <p>MDF, or medium-density fiberboard, is an engineered wood panel made from refined wood fibers and resin. It is very smooth and uniform, which can make it useful in certain painted components and decorative applications. It does not have the same edge screw-holding behavior as plywood, and it responds differently to water if it is left exposed. Neither material tells the entire story by itself; thickness, finish, edge treatment, joinery, and where the material is used all matter.</p>
    <p>For cabinet boxes, we generally favor plywood construction. In a working kitchen, that preference is about the structure that receives mounting screws, supports shelves, and must remain dependable around appliances, countertops, and daily use. MDF is not automatically a problem, but a homeowner should ask exactly where it is being used rather than assume every cabinet component is made from the same material.</p>
    <h2>Face-frame cabinets suit the way many homes are built</h2>
    <p>A face-frame cabinet has a solid wood frame at the front of the cabinet box. That frame adds rigidity and creates a familiar, finished furniture-like look at the openings. It also gives an installer a clear, durable structure for aligning cabinets and managing the small adjustments that real walls and floors often require.</p>
    <p>Frameless cabinets are a different construction system: the box sides meet at the front opening without a face frame. They can support a clean, contemporary appearance and different interior-access calculations, but they are not the right answer for every project or every cabinet line. Versatile Edge does not treat frameless construction as an automatic upgrade. We prefer to select the construction that fits the room, the cabinet line, and the desired finished character.</p>
    <p>Solid wood doors and frames paired with cabinet-grade plywood boxes are a strong fit for the durable, well-detailed kitchens we want to deliver. As with any cabinet selection, we confirm the actual door style, finish, dimensions, and available options before ordering.</p>
    <h2>Full overlay is not the same as “no reveal”</h2>
    <p>Door overlay describes how much of the face frame a closed door covers. A traditional or standard reveal—often called partial overlay—leaves more of the face frame visible around doors and drawers. It can create a more segmented, classic appearance. Full-overlay doors cover most of the face frame, producing a cleaner, more continuous look while still leaving the small, intentional spaces needed for doors and drawers to operate.</p>
    <p>That distinction is important. A full-overlay kitchen still has purposeful reveals between doors and drawer fronts. Those consistent gaps allow for hinge adjustment, seasonal movement, and normal operation. Good installation is what makes those reveals look even and intentional across a long run of cabinets, at corners, and beside appliances.</p>
    <p>Three-quarter-inch solid wood full-overlay doors, concealed soft-close hinges, solid wood dovetail drawers, and soft-close undermount glides are practical details homeowners will notice every time they open a drawer or close a door—not just on the day the kitchen is photographed.</p>
    <h2>Construction matters, but so does planning</h2>
    <p>The cabinet line is only one part of a successful kitchen. Cabinet dimensions must work with appliance specifications, countertop overhangs, plumbing, electrical, lighting, ventilation, flooring, walls that may not be perfectly straight, and the way the household actually cooks and stores things. Fillers, panels, crown, end treatments, and hardware all need to be planned as part of the full composition.</p>
    <p>Before making a final selection, we encourage homeowners to see door samples in person, look at the finish in their home’s light, and review the actual cabinet plan. Printed or online color samples cannot reproduce every variation, so an actual sample is always the better guide.</p>
    <h2>Choose the cabinet system that supports the finished kitchen</h2>
    <p>The right comparison is not simply plywood versus MDF or full overlay versus a standard reveal. It is whether the cabinet construction, door style, storage plan, finish, and installation details all support the kitchen you want to live with. A well-planned face-frame, full-overlay kitchen with plywood cabinet boxes can deliver a durable, polished result without chasing terminology that does not fit the project.</p>
    <section className="article-cta"><span className="eyebrow light">Planning a Raleigh or Wake County kitchen?</span><h2>Choose cabinetry around how you will actually use the room.</h2><p>Versatile Edge helps homeowners coordinate cabinet construction, layout, finishes, and installation details into a practical kitchen plan.</p><a href="/services/kitchen-renovations">Explore kitchen renovations <ArrowRight size={18} /></a>{" "}<a href="/contact">Request a consultation <ArrowRight size={18} /></a></section>
  </>;
}
