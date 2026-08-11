import type { Metadata } from "next";
import { ArrowRight, BadgeCheck, ClipboardCheck, MapPin, MessageSquareText, ShieldCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { processSteps, projects, serviceAreas, services } from "@/lib/site-data";
import { OwnerIntroduction } from "@/components/owner-introduction";

const homepageDescription = "Versatile Edge provides quality home remodeling in Raleigh, NC, including kitchens, bathrooms, additions, screened porches, decks, windows, and whole-home renovations.";

export const metadata: Metadata = {
  title: { absolute: "Home Remodeling Raleigh NC | Versatile Edge LLC" },
  description: homepageDescription,
  alternates: { canonical: "https://versatileedgellc.com/" },
  openGraph: {
    title: "Home Remodeling Raleigh NC | Versatile Edge LLC",
    description: homepageDescription,
    url: "https://versatileedgellc.com/",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Versatile Edge — Quality Renovations and Builds. Improving the Way You Live." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Remodeling Raleigh NC | Versatile Edge LLC",
    description: homepageDescription,
    images: ["/og.png"],
  },
};

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <img src="/images/projects/hutter-kitchen-04.webp" alt="Completed Versatile Edge Hutter kitchen renovation with white cabinetry and an open dining connection" />
        <div className="home-hero-overlay" />
        <div className="site-container home-hero-content">
          <span className="eyebrow light">Raleigh · Wake County · The Triangle</span>
          <h1>Quality Renovations and Builds.<br /><em>Improving the Way You Live.</em></h1>
          <p>Thoughtful renovation, dependable project management, and craftsmanship built around the way you live.</p>
          <div className="hero-actions"><a href="/contact" className={buttonVariants({ size: "lg" })}>Request a consultation <ArrowRight size={18} /></a><a href="/projects" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "light")}>Explore our work</a></div>
        </div>
        <div className="hero-proof"><div><strong>20+</strong><span>Years of construction experience</span></div><div><strong>#107393</strong><span>NC General Contractor license</span></div><div><strong>Local</strong><span>Wake County permitting expertise</span></div></div>
      </section>

      <section className="intro-band section"><div className="site-container split-intro"><div><span className="eyebrow">A better-built experience</span><h2>Raleigh Home Remodeling, Built Around the Way You Live.</h2></div><div><p className="lead">Versatile Edge is a licensed residential general contractor helping Raleigh and Wake County homeowners transform outdated, undersized, and underperforming spaces through thoughtful renovations and quality construction.</p><p>We bring planning, communication, and construction together—so you understand what is happening, why it matters, and what comes next.</p><a href="/about" className="text-link">Meet Versatile Edge <ArrowRight size={18} /></a></div></div></section>

      <OwnerIntroduction showAboutLink />

      <section className="section services-section"><div className="site-container"><div className="section-heading"><div><span className="eyebrow">What we build</span><h2>One trusted partner.<br />Seven ways to improve home.</h2></div><p>From kitchen and bathroom renovations to home additions, screened porches, decks, window replacement, and whole-home remodeling, every Versatile Edge project starts with the same fundamentals: a clear scope, solid construction, and respect for your home.</p></div><div className="services-grid">{services.map((service, index) => <a href={`/services/${service.slug}`} className="service-tile" key={service.slug}><span className="service-number">0{index + 1}</span><service.icon size={26} /><h3>{service.shortTitle}</h3><p>{service.summary}</p><span className="service-arrow"><ArrowRight /></span></a>)}</div></div></section>

      <section className="feature-project section dark-section"><div className="site-container feature-project-grid"><div className="feature-image"><img src={projects[0].image} alt="Completed Hutter kitchen renovation with white cabinetry and a generous island" /><span>Actual Versatile Edge project</span></div><div className="feature-copy"><span className="eyebrow light">Featured work</span><h2>The Hutter kitchen, designed around gathering.</h2><p>Tailored cabinetry, warm brass lighting, generous work surfaces, and purposeful storage come together in a kitchen that feels connected to the whole home.</p><dl><div><dt>Project</dt><dd>Full kitchen renovation</dd></div><div><dt>Details</dt><dd>Custom cabinetry and pantry</dd></div><div><dt>Focus</dt><dd>Flow, storage, finish detail</dd></div></dl><a href="/projects/hutter-whole-house-remodel-addition" className="text-link light">View the complete project <ArrowRight size={18} /></a></div></div></section>

      <section className="section process-preview"><div className="site-container"><div className="section-heading"><div><span className="eyebrow">A clear path forward</span><h2>Built around fewer surprises.</h2></div><p>Good remodeling starts before demolition. Our process creates alignment early and keeps communication active through the final walkthrough.</p></div><div className="process-grid">{processSteps.map((step) => <article key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div><a href="/process" className="text-link">See how we work <ArrowRight size={18} /></a></div></section>

      <section className="trust-section section"><div className="site-container trust-grid"><div><span className="eyebrow light">Why Versatile Edge</span><h2>Professional oversight. Personal accountability.</h2><p>Your project is managed with the standards we would expect in our own homes.</p></div><div className="trust-points"><article><ShieldCheck /><h3>Licensed & insured</h3><p>Professional oversight and code-conscious execution from day one.</p></article><article><MessageSquareText /><h3>Clear communication</h3><p>Direct updates, understandable decisions, and no disappearing act.</p></article><article><ClipboardCheck /><h3>Detailed planning</h3><p>A defined scope and practical sequence before construction accelerates.</p></article><article><BadgeCheck /><h3>Experienced trades</h3><p>Longstanding trade relationships and a consistent quality expectation.</p></article></div></div></section>

      <section className="section area-section"><div className="site-container area-grid"><div><span className="eyebrow">Close to home</span><h2>Built for Raleigh and Wake County Homes.</h2><p>Local knowledge matters—from permit expectations and inspections to the materials that perform in North Carolina’s climate.</p><div className="area-list">{serviceAreas.map((area) => <span key={area}><MapPin size={15} />{area}</span>)}</div></div><div className="area-image"><img src="/images/projects/walsh-sunroom-03.webp" alt="Completed Versatile Edge Walsh sunroom with abundant windows and comfortable seating" /></div></div></section>
    </>
  );
}
