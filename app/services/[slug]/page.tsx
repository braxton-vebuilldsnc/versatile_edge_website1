import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { JsonLd } from "@/components/json-ld";
import { ResponsiveImage } from "@/components/responsive-image";
import { namedProjects, servicePageContent, services } from "@/lib/site-data";
import { servicePageSchema } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  return service ? {
    title: service.title,
    description: `${service.summary} Serving Raleigh, Wake County, and the Triangle.`,
    alternates: { canonical: `https://versatileedgellc.com/services/${service.slug}` },
  } : {};
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const service = services.find((item) => item.slug === slug); if (!service) notFound();
  const content = servicePageContent[service.slug];
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const projectSpotlight = "projectSpotlight" in service
    ? namedProjects.find((project) => project.slug === service.projectSpotlight.slug)
    : undefined;
  const detailImage = service.slug === "kitchen-renovations"
    ? "/images/projects/hutter-kitchen-02.webp"
    : service.slug === "bathroom-renovations"
      ? "/images/projects/johnson-bath-02.webp"
      : service.slug === "porches-and-decks"
        ? "/images/projects/walsh-deck-steps.webp"
      : service.slug === "home-additions"
        ? "/images/projects/walsh-sunroom-02.webp"
      : service.image;
  return <>
    <JsonLd data={servicePageSchema(service)} />
    <PageHero eyebrow={service.eyebrow} title={service.title} text={service.summary} image={service.image} />
    <section className="section"><div className="site-container service-detail"><div><span className="eyebrow">Designed around your home</span><h2>A coordinated approach from first questions to final details.</h2><p className="lead">{service.intro}</p><p>Every project begins with the existing conditions. We look at how the space is built, how you want it to perform, and which decisions need to be resolved before construction begins.</p>{projectSpotlight && "projectSpotlight" in service && <a href={`/projects/${projectSpotlight.slug}`} className="text-link">{service.projectSpotlight.label} <ArrowRight size={18} /></a>}</div><div className="service-detail-panel"><h3>What the work may include</h3>{service.highlights.map((item) => <span key={item}><Check size={18} />{item}</span>)}<a href="/contact">Request a consultation <ArrowRight size={16} /></a></div></div></section>
    <section className="section soft-section"><div className="site-container service-planning"><div><span className="eyebrow">Before construction begins</span><h2>{content.planningTitle}</h2><p className="lead">{content.planningIntro}</p></div><div className="service-planning-list">{content.planningItems.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>
    {service.slug === "kitchen-renovations" && <section className="section"><div className="site-container"><div className="section-heading"><div><span className="eyebrow">Kitchen design details</span><h2>Thoughtful choices make the kitchen work better.</h2></div><p>From a custom focal point to purposeful appliance placement, the best kitchens make everyday function feel considered.</p></div><div className="kitchen-design-gallery"><figure><ResponsiveImage src="/images/projects/annie-kitchen-custom-range-hood.jpg" alt="High-end custom range hood above a professional-style kitchen range" sizes="(max-width: 760px) calc(100vw - 30px), (max-width: 1240px) 50vw, 610px" /><figcaption>A high-end custom range hood creates a refined focal point while integrating ventilation into the kitchen’s overall design.</figcaption></figure><figure><ResponsiveImage src="/images/projects/annie-kitchen-island-microwave.jpg" alt="Built-in microwave at the end of a white kitchen island with seating" sizes="(max-width: 760px) calc(100vw - 30px), (max-width: 1240px) 50vw, 610px" /><figcaption>Creative kitchen design options—such as a built-in island microwave—make the layout work harder without sacrificing a clean, polished look.</figcaption></figure><figure><ResponsiveImage src="/images/projects/kitchen-modern-gas-range.webp" alt="Clean-line kitchen with crisp cabinetry, layered lighting, and durable surfaces" sizes="(max-width: 760px) calc(100vw - 30px), (max-width: 1240px) 50vw, 610px" /><figcaption>Cabinet construction, finish details, and lighting work together to give a kitchen a polished appearance built for daily use.</figcaption></figure></div></div></section>}
    <section className="section"><div className={`site-container image-text reverse${service.slug === "kitchen-renovations" ? " kitchen-construction-section" : ""}`}>{service.slug === "kitchen-renovations" ? <div className="kitchen-construction-images"><ResponsiveImage src={detailImage} alt="Versatile Edge kitchen renovation craftsmanship" sizes="(max-width: 760px) calc(100vw - 30px), 55vw" /><ResponsiveImage src="/images/projects/generated-kitchen-jk-pebble-naval-panel-drawers.png" alt="Kitchen with Pebble framed-panel perimeter cabinets, a Naval blue island, and full-overlay cabinet fronts" sizes="(max-width: 760px) calc(100vw - 30px), 55vw" /><ResponsiveImage src="/images/projects/generated-kitchen-jk-e1-dove-e2-charcoal.png" alt="Kitchen with JK E1 Dove perimeter cabinets and E2 Charcoal peninsula and pantry cabinetry" sizes="(max-width: 760px) calc(100vw - 30px), 55vw" /></div> : <ResponsiveImage src={detailImage} alt={`Versatile Edge ${service.title.toLowerCase()} craftsmanship`} sizes="(max-width: 760px) calc(100vw - 30px), 55vw" />}<div className={service.slug === "kitchen-renovations" ? "kitchen-coordination-copy" : undefined}><span className="eyebrow">Why it matters</span><h2>{content.valueTitle}</h2>{content.valueParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{service.slug === "kitchen-renovations" && <a href="/renovation-talk/how-to-compare-kitchen-cabinet-construction" className="text-link">Read our guide to comparing kitchen cabinet construction <ArrowRight size={18} /></a>}</div></div></section>
    <section className="section"><div className="site-container faq-section"><div><span className="eyebrow">Common questions</span><h2>Before you begin.</h2></div><div>{service.faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>
    <section className="section dark-section"><div className="site-container"><div className="section-heading light-heading"><div><span className="eyebrow light">Related services</span><h2>Think beyond one room.</h2></div></div><div className="related-grid">{related.map((item) => <a href={`/services/${item.slug}`} key={item.slug}><item.icon /><h3>{item.shortTitle}</h3><ArrowRight /></a>)}</div></div></section>
  </>;
}
