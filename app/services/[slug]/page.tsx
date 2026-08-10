import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { services } from "@/lib/site-data";

export const dynamicParams = false;

export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const service = services.find((item) => item.slug === slug); return service ? { title: service.title, description: `${service.summary} Serving Raleigh, Wake County, and the Triangle.` } : {}; }

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const service = services.find((item) => item.slug === slug); if (!service) notFound();
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const detailImage = service.slug === "kitchen-renovations"
    ? "/images/projects/hutter-kitchen-02.webp"
    : service.slug === "bathroom-renovations"
      ? "/images/projects/johnson-bath-02.webp"
      : service.slug === "porches-and-decks"
        ? "/images/projects/walsh-deck-steps.webp"
      : service.slug === "home-additions"
        ? "/images/projects/walsh-sunroom-02.webp"
      : service.image;
  return <><PageHero eyebrow={service.eyebrow} title={service.title} text={service.summary} image={service.image} /><section className="section"><div className="site-container service-detail"><div><span className="eyebrow">Designed around your home</span><h2>A coordinated approach from first questions to final details.</h2><p className="lead">{service.intro}</p><p>Every project begins with the existing conditions. We look at how the space is built, how you want it to perform, and which decisions need to be resolved before construction begins.</p></div><aside><h3>What the work may include</h3>{service.highlights.map((item) => <span key={item}><Check size={18} />{item}</span>)}<a href="/contact">Request a consultation <ArrowRight size={16} /></a></aside></div></section><section className="section soft-section"><div className="site-container image-text reverse"><img src={detailImage} alt={`Versatile Edge ${service.title.toLowerCase()} craftsmanship`} /><div><span className="eyebrow">Built with intention</span><h2>Details that support the whole result.</h2><p>We coordinate the visible finish work with the framing, moisture management, utilities, clearances, and code requirements behind it.</p></div></div></section><section className="section"><div className="site-container faq-section"><div><span className="eyebrow">Common questions</span><h2>Before you begin.</h2></div><div>{service.faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section><section className="section dark-section"><div className="site-container"><div className="section-heading light-heading"><div><span className="eyebrow light">Related services</span><h2>Think beyond one room.</h2></div></div><div className="related-grid">{related.map((item) => <a href={`/services/${item.slug}`} key={item.slug}><item.icon /><h3>{item.shortTitle}</h3><ArrowRight /></a>)}</div></div></section></>;
}
