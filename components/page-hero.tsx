import { ArrowRight, Phone } from "lucide-react";
import { ResponsiveImage } from "@/components/responsive-image";

export function PageHero({ eyebrow, title, text, image, primaryCta = "Discuss your project", secondaryCta }: { eyebrow: string; title: string; text: string; image?: string; primaryCta?: string; secondaryCta?: { href: string; label: string } }) {
  return (
    <section className="page-hero">
      {image && <ResponsiveImage src={image} alt="" decorative sizes="100vw" priority />}
      <div className="page-hero-overlay" />
      <div className="site-container page-hero-content">
        <span className="eyebrow light">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
        <div className={`page-hero-actions${secondaryCta ? " page-hero-actions-conversion" : ""}`}><a href="/contact" className="hero-link">{primaryCta} <ArrowRight size={18} /></a>{secondaryCta && <a href={secondaryCta.href} className="hero-call-link"><Phone size={16} /> {secondaryCta.label}</a>}</div>
      </div>
    </section>
  );
}
