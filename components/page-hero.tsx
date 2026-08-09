import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PageHero({ eyebrow, title, text, image }: { eyebrow: string; title: string; text: string; image?: string }) {
  return (
    <section className="page-hero">
      {image && <img src={image} alt="" aria-hidden="true" />}
      <div className="page-hero-overlay" />
      <div className="site-container page-hero-content">
        <span className="eyebrow light">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
        <Link href="/contact" className="hero-link">Discuss your project <ArrowRight size={18} /></Link>
      </div>
    </section>
  );
}
