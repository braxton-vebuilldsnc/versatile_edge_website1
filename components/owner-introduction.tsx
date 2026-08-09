import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";

type OwnerIntroductionProps = {
  showAboutLink?: boolean;
};

export function OwnerIntroduction({ showAboutLink = false }: OwnerIntroductionProps) {
  return (
    <section className="section owner-introduction">
      <div className="site-container owner-introduction-grid">
        <div className="owner-video-wrap">
          <video
            controls
            playsInline
            preload="metadata"
            poster="/videos/don-owner-introduction-poster.webp"
            aria-label="Video introduction from Don, owner of Versatile Edge"
          >
            <source src="/videos/don-owner-introduction.m4v" type="video/mp4" />
            Your browser does not support embedded video.
          </video>
          <span className="owner-video-label"><PlayCircle size={17} /> Owner introduction</span>
        </div>
        <div className="owner-introduction-copy">
          <span className="eyebrow">Meet the owner</span>
          <h2>A personal commitment behind every project.</h2>
          <p className="lead">Don brings more than 20 years of construction experience—and direct accountability—to every Versatile Edge project.</p>
          <p>Hear how he approaches residential remodeling, homeowner communication, and the responsibility of working inside someone’s home.</p>
          <dl className="owner-details">
            <div><dt>Don</dt><dd>Owner, Versatile Edge LLC</dd></div>
            <div><dt>NC License</dt><dd>General Contractor #107393</dd></div>
          </dl>
          {showAboutLink && <Link href="/about" className="text-link">More about Versatile Edge <ArrowRight size={18} /></Link>}
        </div>
      </div>
    </section>
  );
}
