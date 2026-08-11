import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { BackToTop } from "@/components/back-to-top";
import "./globals.css";

const manrope = Manrope({ variable: "--font-sans", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-display", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://versatileedgellc.com"),
  title: { default: "Versatile Edge | Raleigh Remodeling & Renovations", template: "%s | Versatile Edge" },
  description: "Licensed Raleigh general contractor for kitchens, bathrooms, additions, decks, window replacement, and whole-home renovations across Wake County.",
  icons: { icon: "/images/brand/versatile-edge-official-logo-v2.png" },
  openGraph: { type: "website", locale: "en_US", siteName: "Versatile Edge LLC", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Versatile Edge — Quality Renovations and Builds. Improving the Way You Live." }] },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": "https://versatileedgellc.com/#contractor",
    name: "Versatile Edge LLC",
    description: "Licensed residential general contractor providing home remodeling and renovations in Raleigh, Wake County, and surrounding Triangle communities.",
    url: "https://versatileedgellc.com/",
    telephone: "+1-888-381-1033",
    identifier: "NC General Contractor License #107393",
    logo: "https://versatileedgellc.com/images/brand/versatile-edge-official-logo-v2.png",
    image: "https://versatileedgellc.com/og.png",
    areaServed: [
      { "@type": "AdministrativeArea", name: "Wake County" },
      ...["Raleigh", "Cary", "Wake Forest", "Apex", "Morrisville", "Fuquay-Varina", "Holly Springs"].map((name) => ({ "@type": "City", name })),
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Residential remodeling services",
      itemListElement: [
        "Kitchen renovations",
        "Bathroom renovations",
        "Home additions",
        "Screened porches and decks",
        "Window replacement",
        "Whole-home remodeling",
      ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
    },
  };
  return <html lang="en"><body className={`${manrope.variable} ${playfair.variable}`}><a className="skip-link" href="#main">Skip to content</a><SiteHeader /><main id="main">{children}</main><SiteFooter /><BackToTop /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></body></html>;
}
