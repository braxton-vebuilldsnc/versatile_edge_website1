import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { services } from "@/lib/site-data";

export const metadata: Metadata = { title: "Remodeling Services", description: "Explore Versatile Edge renovation, remodeling, kitchen, bathroom, deck, addition, and window services in Raleigh and Wake County." };

export default function ServicesPage() { return <><PageHero eyebrow="Residential remodeling services" title="One standard across every room." text="Thoughtful planning, dependable coordination, and craftsmanship built for Raleigh-area homes." image="/images/projects/kitchen-modern.webp" /><section className="section"><div className="site-container service-list">{services.map((service, index) => <article key={service.slug}><div className="service-list-index">0{index + 1}</div><div><span className="eyebrow">{service.eyebrow}</span><h2>{service.title}</h2><p>{service.summary}</p><Link href={`/services/${service.slug}`} className="text-link">Explore service <ArrowRight size={18} /></Link></div><img src={service.image} alt={`${service.title} by Versatile Edge`} /></article>)}</div></section></>; }
