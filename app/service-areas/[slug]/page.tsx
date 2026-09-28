import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, ClipboardCheck, MessageSquareText, Phone, ShieldCheck } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { OwnerIntroduction } from "@/components/owner-introduction";
import { ResponsiveImage } from "@/components/responsive-image";
import { buttonVariants } from "@/components/ui/button";
import { namedProjects, phoneDisplay, phoneHref, processSteps, projectImageAltText, serviceAreaPages, serviceAreaProjectPresentation, services } from "@/lib/site-data";
import { serviceAreaPageSchema } from "@/lib/structured-data";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

// These links give homeowners a useful path to closely related service areas,
// while making the site's local coverage easier to navigate and understand.
const nearbyAreaSlugs: Record<string, readonly string[]> = {
  "raleigh-nc": ["cary-nc", "garner-nc", "knightdale-nc", "wake-forest-nc"],
  "cary-nc": ["morrisville-nc", "apex-nc", "holly-springs-nc", "raleigh-nc"],
  "wake-forest-nc": ["rolesville-nc", "raleigh-nc", "knightdale-nc", "wendell-nc"],
  "apex-nc": ["cary-nc", "holly-springs-nc", "fuquay-varina-nc", "raleigh-nc"],
  "morrisville-nc": ["cary-nc", "raleigh-nc", "apex-nc", "holly-springs-nc"],
  "fuquay-varina-nc": ["holly-springs-nc", "apex-nc", "garner-nc", "cary-nc"],
  "holly-springs-nc": ["apex-nc", "fuquay-varina-nc", "cary-nc", "garner-nc"],
  "knightdale-nc": ["wendell-nc", "rolesville-nc", "raleigh-nc", "wake-forest-nc"],
  "wendell-nc": ["knightdale-nc", "rolesville-nc", "raleigh-nc", "garner-nc"],
  "rolesville-nc": ["wake-forest-nc", "knightdale-nc", "wendell-nc", "raleigh-nc"],
  "garner-nc": ["raleigh-nc", "fuquay-varina-nc", "holly-springs-nc", "cary-nc"],
};

export function generateStaticParams() {
  return serviceAreaPages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = serviceAreaPages.find((item) => item.slug === slug);
  if (!page) return {};
  const url = `https://versatileedgellc.com/service-areas/${page.slug}`;
  const searchTitle = `${page.city} Home Remodeling Contractor | Versatile Edge`;
  return {
    title: { absolute: searchTitle },
    description: page.description,
    alternates: { canonical: url },
    openGraph: { title: searchTitle, description: page.description, url, type: "website", images: [{ url: page.heroImage, alt: page.heroAlt }] },
    twitter: { card: "summary_large_image", title: searchTitle, description: page.description, images: [page.heroImage] },
  };
}

export default async function ServiceAreaPage({ params }: Props) {
  const { slug } = await params;
  const page = serviceAreaPages.find((item) => item.slug === slug);
  if (!page) notFound();

  const projectPresentation = serviceAreaProjectPresentation[page.slug];
  const featuredProjects = (projectPresentation?.projectSlugs ?? page.projectSlugs).flatMap((projectSlug) => {
    const project = namedProjects.find((item) => item.slug === projectSlug);
    return project ? [project] : [];
  });
  const supportingServices = (page.supportingServiceSlugs ?? []).flatMap((serviceSlug) => {
    const service = services.find((item) => item.slug === serviceSlug);
    return service ? [service] : [];
  });
  const nearbyAreas = (nearbyAreaSlugs[page.slug] ?? []).flatMap((areaSlug) => {
    const area = serviceAreaPages.find((item) => item.slug === areaSlug);
    return area ? [area] : [];
  });

  return (
    <>
      <JsonLd data={serviceAreaPageSchema(page)} />
      <section className={cn("page-hero service-area-hero", page.heroCredit && "service-area-hero-credited")}>
        <ResponsiveImage src={page.heroImage} alt={page.heroAlt} sizes="100vw" priority />
        <div className="page-hero-overlay" />
        <div className="site-container page-hero-content">
          <span className="eyebrow light">{page.eyebrow}</span>
          <h1>{page.h1}</h1>
          <p>{page.heroLead ?? "Thoughtful renovation planning, dependable project management, and coordinated construction for Raleigh homes."}</p>
          <div className="page-hero-actions page-hero-actions-conversion">
            <a href="/contact" className="hero-link">Discuss your {page.city} project <ArrowRight size={18} /></a>
            <a href={phoneHref} className="hero-call-link"><Phone size={17} /> Call {phoneDisplay}</a>
          </div>
        </div>
        {page.heroCredit && (
          <p className="service-area-image-credit">
            <a href={page.heroCredit.sourceUrl}>{page.heroCredit.label}</a>{" · "}
            {page.heroCredit.licenseUrl ? <a href={page.heroCredit.licenseUrl}>{page.heroCredit.license}</a> : page.heroCredit.license}
          </p>
        )}
      </section>

      <section className="section service-area-intro">
        <div className="site-container split-intro">
          <div><span className="eyebrow">Built around the property</span><h2>{page.localContext.heading}</h2></div>
          <div>
            <p className="lead">{page.introduction}</p>
            {page.localContext.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <a href="/process" className="text-link">See how we plan the work <ArrowRight size={18} /></a>
          </div>
        </div>
      </section>

      <OwnerIntroduction showAboutLink />

      {page.priorityServices ? (
        <>
          <section className="section services-section service-area-priority-intro">
            <div className="site-container section-heading">
              <div><span className="eyebrow">{page.city} remodeling priorities</span><h2>Plan the spaces that shape everyday life.</h2></div>
              <p>{page.serviceIntroduction}</p>
            </div>
          </section>
          <div className="service-area-priority-services">
            {page.priorityServices.map((section, index) => {
              const service = services.find((item) => item.slug === section.slug);
              const project = namedProjects.find((item) => item.slug === section.projectSlug);
              if (!service) return null;
              return (
                <section className={cn("section service-area-priority", index % 2 === 1 && "soft-section")} key={section.slug}>
                  <div className="site-container service-area-priority-grid">
                    <div className="service-area-priority-copy">
                      <span className="eyebrow">{section.eyebrow}</span><h2>{section.heading}</h2>
                      {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                      <div className="service-area-priority-links">
                        <a href={`/services/${service.slug}`} className="text-link">Explore {service.title.toLowerCase()} <ArrowRight size={18} /></a>
                        {project && <a href={`/projects/${project.slug}`} className="text-link">{section.projectLabel} <ArrowRight size={18} /></a>}
                      </div>
                    </div>
                    {project && <ResponsiveImage src={projectPresentation?.priorityImages[section.slug] ?? project.heroImage} alt={`${project.title}, a Versatile Edge ${project.type.toLowerCase()} project`} sizes="(max-width: 760px) calc(100vw - 30px), 50vw" />}
                  </div>
                </section>
              );
            })}
          </div>
          <section className="section services-section service-area-supporting">
            <div className="site-container">
              <div className="section-heading">
                <div><span className="eyebrow">Supporting services</span><h2>Extend the plan where the home needs it.</h2></div>
                <p>These services can stand alone or connect to a larger {page.city} remodeling scope.</p>
              </div>
              <div className="services-grid service-area-supporting-grid">
                {supportingServices.map((service, index) => (
                  <a href={`/services/${service.slug}`} className="service-tile" key={service.slug}>
                    <span className="service-number">0{index + 1}</span><service.icon size={26} /><h3>{service.title}</h3>
                    <p>{page.serviceDescriptions[service.slug]}</p><span className="service-arrow"><ArrowRight /></span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="section services-section">
          <div className="site-container">
            <div className="section-heading">
              <div><span className="eyebrow">{page.city} remodeling services</span><h2>One coordinated standard across the home.</h2></div>
              <p>{page.serviceIntroduction}</p>
            </div>
            <div className="services-grid">
              {services.map((service, index) => (
                <a href={`/services/${service.slug}`} className="service-tile" key={service.slug}>
                  <span className="service-number">0{index + 1}</span><service.icon size={26} /><h3>{service.title}</h3>
                  <p>{page.serviceDescriptions[service.slug]}</p><span className="service-arrow"><ArrowRight /></span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section service-area-planning dark-section">
        <div className="site-container">
          <div className="section-heading light-heading">
            <div><span className="eyebrow light">{page.city} planning context</span><h2>{page.planningHeading ?? "Confirm the path before construction begins."}</h2></div>
            <p>{page.planningIntroduction ?? "Permit, zoning, and historic-review requirements are tied to the property and scope. These City resources are a useful starting point, not a substitute for project-specific review."}</p>
          </div>
          <div className="service-area-planning-grid">
            {page.planning.map((item, index) => (
              <article key={item.title}>
                <span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p>
                {item.href && <a href={item.href}>{item.linkLabel} <ArrowRight size={16} /></a>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section service-area-projects">
        <div className="site-container">
          <div className="section-heading">
            <div><span className="eyebrow">{page.city} project perspective</span><h2>{page.projectHeading ?? `Real work in ${page.city} homes.`}</h2></div>
            <p>{page.projectIntroduction ?? "These project records use only locations supported by Versatile Edge’s existing project data. Active construction is identified separately from completed work."}</p>
          </div>
          <div className="project-grid service-area-project-grid">
            {featuredProjects.map((project, index) => {
              const local = (page.locallyVerifiedProjectSlugs ?? page.projectSlugs).includes(project.slug);
              return (
                <article className={index === 0 ? "project-card project-card-wide" : "project-card"} key={project.slug}>
                  <ResponsiveImage src={projectPresentation?.cardImages[project.slug] ?? project.heroImage} alt={projectImageAltText[(projectPresentation?.cardImages[project.slug] ?? project.heroImage).split("/").at(-1) ?? ""] ?? `${project.title}, ${local ? `a verified ${page.city} project` : "a Versatile Edge project example"}`} sizes="(max-width: 760px) calc(100vw - 30px), (max-width: 1240px) 50vw, 610px" />
                  <div className="project-card-overlay">
                    <span>{local ? `${page.city} · ` : "Service-area example · "}{project.status} · {project.type}</span>
                    <h2>{project.title}</h2><p>{project.overview}</p>
                    <a className="project-card-link" href={`/projects/${project.slug}`}>View project</a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section service-area-process soft-section">
        <div className="site-container">
          <div className="section-heading">
            <div><span className="eyebrow">From first questions to final details</span><h2>Planning, communication, and accountable oversight.</h2></div>
            <p>A defined scope and active coordination help homeowners understand what is happening, which decisions are next, and how the work fits together.</p>
          </div>
          <div className="process-grid">{processSteps.map((step) => <article key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
          <div className="service-area-trust-links">
            <span><ShieldCheck /> NC General Contractor License #107393</span>
            <span><ClipboardCheck /> Scope, scheduling, trades, and inspections coordinated</span>
            <span><MessageSquareText /> Direct homeowner communication throughout the work</span>
          </div>
          <div className="button-row service-area-button-row">
            <a href="/process" className={cn(buttonVariants({ variant: "outline" }))}>Explore our process</a>
            <a href="/about" className={cn(buttonVariants({ variant: "outline" }))}>About Versatile Edge</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container faq-section">
          <div><span className="eyebrow">{page.city} homeowner questions</span><h2>Useful answers before you begin.</h2></div>
          <div>{page.faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
        </div>
      </section>

      {nearbyAreas.length > 0 && (
        <section className="section service-area-nearby soft-section">
          <div className="site-container section-heading">
            <div><span className="eyebrow">Across Wake County</span><h2>Explore nearby remodeling service areas.</h2></div>
            <p>Versatile Edge serves homeowners across Raleigh, Wake County, and surrounding Triangle communities. Browse a nearby area to see local planning context and relevant remodeling services.</p>
          </div>
          <div className="site-container service-area-nearby-links">
            {nearbyAreas.map((area) => (
              <a href={`/service-areas/${area.slug}`} key={area.slug}>
                <span>{area.city} home remodeling</span><ArrowRight size={18} />
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="section project-story-cta">
        <div className="site-container project-story-cta-inner">
          <div><span className="eyebrow light">Considering a {page.city} remodel?</span><h2>Start with the house, the goals, and a straightforward conversation.</h2></div>
          <a href="/contact" className={cn(buttonVariants({ size: "lg" }))}>Request consultation <ArrowRight size={18} /></a>
        </div>
      </section>
    </>
  );
}
