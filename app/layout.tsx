import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const manrope = Manrope({ variable: "--font-sans", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-display", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://versatileedgellc.com"),
  title: { default: "Versatile Edge | Raleigh Remodeling & Renovations", template: "%s | Versatile Edge" },
  description: "Licensed Raleigh general contractor for kitchens, bathrooms, additions, decks, window replacement, and whole-home renovations across Wake County.",
  icons: { icon: "/images/brand/versatile-edge-logo.png" },
  openGraph: { type: "website", locale: "en_US", siteName: "Versatile Edge LLC", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Versatile Edge — Remodel with clarity. Live with confidence." }] },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = { "@context": "https://schema.org", "@type": "GeneralContractor", name: "Versatile Edge LLC", telephone: "+1-888-381-1033", areaServed: ["Raleigh", "Wake County", "Cary", "Apex", "Wake Forest"], url: "https://versatileedgellc.com" };
  return <html lang="en"><body className={`${manrope.variable} ${playfair.variable}`}><a className="skip-link" href="#main">Skip to content</a><SiteHeader /><main id="main">{children}</main><SiteFooter /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></body></html>;
}
