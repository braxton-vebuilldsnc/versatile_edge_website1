import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ResponsiveImage } from "@/components/responsive-image";
import { processSteps } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Our Process",
  description: "Learn how Versatile Edge plans and manages residential remodeling projects from consultation through final walkthrough.",
  alternates: { canonical: "https://versatileedgellc.com/process" },
};
export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="The Versatile Edge process"
        title="A clear plan makes the best work possible."
        text="Four connected stages keep the project grounded, the decisions visible, and the work moving forward."
        image="/images/projects/addition-in-progress.webp"
      />
      <section className="section">
        <div className="site-container process-timeline">
          {processSteps.map((step, index) => (
            <article key={step.number}>
              <div className="timeline-number">{step.number}</div>
              <div>
                <span className="eyebrow">Stage {index + 1}</span>
                <h2>{step.title}</h2>
                <p>{step.text}</p>
                {index === 0 && (
                  <p>Bring inspiration, questions, and an honest investment range. We will bring construction experience and a practical point of view.</p>
                )}
                {index === 1 && (
                  <p>The goal is alignment: what is included, which choices remain, and what the work requires.</p>
                )}
                {index === 2 && (
                  <>
                    <p>You receive ongoing communication while we coordinate trades, site conditions, inspections, and quality control.</p>
                    <figure className="process-field-photo">
                      <ResponsiveImage
                        src="/images/process/don-rice-framing-partner-jobsite.webp"
                        alt="Versatile Edge owner Don Rice reviewing project plans with a framing partner during residential construction."
                        sizes="(max-width: 760px) calc(100vw - 30px), 700px"
                      />
                      <figcaption>
                        Planning in the field: Versatile Edge owner Don Rice reviews project details with our framing partner during construction.
                      </figcaption>
                    </figure>
                  </>
                )}
                {index === 3 && (
                  <p>We walk the completed work, address remaining items, and make sure you understand the finished space.</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
