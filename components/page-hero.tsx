import { ArrowRight } from "lucide-react";
import { ResponsiveImage } from "@/components/responsive-image";

export function PageHero({ eyebrow, title, text, image }: { eyebrow: string; title: string; text: string; image?: string }) {
  return (
    <section className="page-hero">
      {image && <ResponsiveImage src={image} alt="" decorative sizes="100vw" priority />}
      <div className="page-hero-overlay" />
      <div className="site-container page-hero-content">
        <span className="eyebrow light">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
        <a href="/contact" className="hero-link">Discuss your project <ArrowRight size={18} /></a>
      </div>
    </section>
  );
}
