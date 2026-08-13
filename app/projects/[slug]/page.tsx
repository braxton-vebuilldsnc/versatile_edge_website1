import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ResponsiveImage } from "@/components/responsive-image";
import { JsonLd } from "@/components/json-ld";
import { buttonVariants } from "@/components/ui/button";
import { namedProjects } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { projectBreadcrumbSchema } from "@/lib/structured-data";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return namedProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = namedProjects.find((item) => item.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.overview,
    alternates: { canonical: `https://versatileedgellc.com/projects/${project.slug}` },
    openGraph: { images: [project.heroImage] },
  };
}

export default async function NamedProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = namedProjects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <>
      <JsonLd data={projectBreadcrumbSchema(project)} />
      <PageHero eyebrow={project.type} title={project.title} text={project.overview} image={project.heroImage} />

      <section className="section project-story-intro">
        <div className="site-container project-story-summary">
          <div>
            <span className="eyebrow">Project story</span>
            <h2>One project, organized by space.</h2>
          </div>
          <div>
            <p>{project.overview}</p>
            <span className="project-status">{project.status}</span>
          </div>
        </div>
      </section>

      {"video" in project && project.video && (
        <section className="section project-jobsite-video">
          <div className="site-container project-jobsite-video-grid">
            <div className="project-jobsite-video-wrap">
              <video controls playsInline preload="metadata" poster={project.video.poster} aria-label={`Jobsite introduction for ${project.title}`}>
                <source src={project.video.src} type="video/mp4" />
                Your browser does not support embedded video.
              </video>
              <span>From the jobsite · Project start</span>
            </div>
            <div>
              <span className="eyebrow">From the jobsite</span>
              <h2>{project.video.title}</h2>
              <p className="lead">Don introduces the project from the property and shares an early look at the work before the addition takes shape.</p>
              <p>This video and the photographs below document active construction. We’ll continue expanding this page as the Janet addition progresses.</p>
            </div>
          </div>
        </section>
      )}

      {project.rooms.map((room, roomIndex) => (
        <section className={roomIndex % 2 ? "section project-room project-room-tint" : "section project-room"} key={room.name}>
          <div className="site-container">
            <div className="project-room-heading">
              <span className="project-room-number">{String(roomIndex + 1).padStart(2, "0")}</span>
              <div><h2>{room.name}</h2><p>{room.description}</p></div>
            </div>
            {room.images.length > 0 && (
              <div className="project-story-gallery">
                {room.images.map((image, index) => (
                  <figure className={room.images.length === 1 ? "project-story-image project-story-image-natural" : index === 0 && room.images.length > 2 ? `project-story-image project-story-image-wide${roomIndex === 0 ? " project-story-image-wide-lead" : ""}` : "project-story-image"} key={image}>
                    <ResponsiveImage src={`/images/projects/${image}`} alt={`${project.title}: ${room.name}, view ${index + 1}`} sizes="(max-width: 760px) calc(100vw - 30px), (max-width: 1240px) 50vw, 610px" />
                  </figure>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      <section className="section project-story-cta">
        <div className="site-container project-story-cta-inner">
          <div><span className="eyebrow">Considering a similar project?</span><h2>Let’s talk about your home.</h2></div>
          <div className="button-row">
            <a href="/projects" className={cn(buttonVariants({ variant: "outline" }))}><ArrowLeft size={17} /> All projects</a>
            <a href="/contact" className={cn(buttonVariants())}>Request consultation <ArrowRight size={17} /></a>
          </div>
        </div>
      </section>
    </>
  );
}
