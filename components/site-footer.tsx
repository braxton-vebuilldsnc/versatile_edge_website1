import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { phoneDisplay, phoneHref, services } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div className="footer-lead">
          <Link href="/" aria-label="Versatile Edge home"><img className="footer-logo" src="/images/brand/versatile-edge-2026-logo.png" alt="Versatile Edge LLC" /></Link>
          <span className="eyebrow light">Plan your next project</span>
          <h2>Ready to make your home work better?</h2>
          <p>Tell us what you want to change. We’ll start with the house, the goals, and a straightforward conversation.</p>
          <Link className="text-link light" href="/contact">Request a consultation <ArrowUpRight size={18} /></Link>
        </div>
        <div><h3>Explore</h3><Link href="/about">About</Link><Link href="/projects">Projects</Link><Link href="/process">Our Process</Link><Link href="/contact">Contact</Link></div>
        <div><h3>Services</h3>{services.slice(0, 5).map((s) => <Link key={s.slug} href={`/services/${s.slug}`}>{s.shortTitle}</Link>)}</div>
        <div><h3>Call us</h3><a href={phoneHref} className="footer-phone"><Phone size={18} />{phoneDisplay}</a><p>Raleigh, Wake County, and surrounding Triangle communities.</p></div>
      </div>
      <div className="site-container footer-bottom"><span>© {new Date().getFullYear()} Versatile Edge LLC</span><Link href="/privacy">Privacy</Link></div>
    </footer>
  );
}
