import { ArrowUpRight, Phone } from "lucide-react";
import { phoneDisplay, phoneHref, serviceAreaPages, services } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div className="footer-lead">
          <a href="/" aria-label="Versatile Edge home"><img className="footer-logo" src="/images/brand/versatile-edge-official-logo-v2.png" alt="Versatile Edge LLC" width="1040" height="719" loading="lazy" decoding="async" /></a>
          <span className="eyebrow light">Plan your next project</span>
          <h2>Ready to make your home work better?</h2>
          <p>Tell us what you want to change. We’ll start with the house, the goals, and a straightforward conversation.</p>
          <a className="text-link light" href="/contact">Request a consultation <ArrowUpRight size={18} /></a>
        </div>
        <div><h3>Explore</h3><a href="/about">About</a><a href="/projects">Projects</a><a href="/process">Our Process</a><a href="/contact">Contact</a></div>
        <div><h3>Services</h3>{services.map((s) => <a key={s.slug} href={`/services/${s.slug}`}>{s.slug === "window-replacement" ? "Window Replacement" : s.shortTitle}</a>)}</div>
        <div><h3>Service areas</h3>{serviceAreaPages.map((area) => <a key={area.slug} href={`/service-areas/${area.slug}`}>{area.city}</a>)}</div>
        <div><h3>Call us</h3><a href={phoneHref} className="footer-phone"><Phone size={18} />{phoneDisplay}</a><p>Raleigh, Wake County, and surrounding Triangle communities.</p></div>
      </div>
      <div className="site-container footer-bottom"><span>© {new Date().getFullYear()} Versatile Edge LLC</span><a href="/privacy">Privacy</a></div>
    </footer>
  );
}
