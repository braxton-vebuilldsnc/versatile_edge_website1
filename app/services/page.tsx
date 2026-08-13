import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { JsonLd } from "@/components/json-ld";
import { ResponsiveImage } from "@/components/responsive-image";
import { services } from "@/lib/site-data";
import { serviceCatalogSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Remodeling Services",
  description: "Explore Versatile Edge renovation, remodeling, kitchen, bathroom, deck, addition, and window services in Raleigh and Wake County.",
  alternates: { canonical: "https://versatileedgellc.com/services" },
};

export default function ServicesPage() { return <><JsonLd data={serviceCatalogSchema()} /><PageHero eyebrow="Residential remodeling services" title="One standard across every room." text="Every project follows the same standard: thoughtful planning, clear communication, disciplined budget control, quality craftsmanship, and a commitment to customer satisfaction. From the first conversation through the final walkthrough, we focus on doing the work right and keeping you informed along the way." image="/images/projects/kitchen-modern.webp" /><section className="section"><div className="site-container service-list">{services.map((service, index) => <article key={service.slug}><div className="service-list-index">0{index + 1}</div><div><span className="eyebrow">{service.eyebrow}</span><h2>{service.title}</h2><p>{service.summary}</p><a href={`/services/${service.slug}`} className="text-link">Explore service <ArrowRight size={18} /></a></div><ResponsiveImage src={service.image} alt={`${service.title} by Versatile Edge`} sizes="(max-width: 760px) calc(100vw - 30px), 42vw" /></article>)}</div></section></>; }
