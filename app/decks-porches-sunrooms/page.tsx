import type { Metadata } from "next";
import { ArrowRight, Phone, Star } from "lucide-react";
import { InquiryForm } from "@/components/inquiry-form";
import { OutdoorHeroCarousel, OutdoorHeroHeadline } from "@/components/outdoor-hero-carousel";
import { ResponsiveImage } from "@/components/responsive-image";
import { ScrollReveal } from "@/components/scroll-reveal";
import { buttonVariants } from "@/components/ui/button";
import { phoneDisplay, phoneHref } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: { absolute: "Decks, Screened Porches & Sunrooms in Raleigh | Versatile Edge" },
  description: "Plan a Raleigh deck, screened porch, or sunroom with Versatile Edge. Compare typical starting prices and request a consultation for your Wake County home.",
  alternates: { canonical: "https://versatileedgellc.com/decks-porches-sunrooms" },
  openGraph: {
    title: "Decks, Screened Porches & Sunrooms in Raleigh | Versatile Edge",
    description: "Make more of Raleigh's best outside seasons with a deck, screened porch, or sunroom planned around your home.",
    url: "https://versatileedgellc.com/decks-porches-sunrooms",
    type: "website",
    images: [{ url: "/images/landing-pages/raleigh-deck-fall-family.webp", alt: "Family enjoying a covered deck at a Raleigh home in fall" }],
  },
};

const options = [
  {
    name: "10 × 10 composite deck",
    startingPrice: "$15,000",
    note: "A practical starting point for a well-built deck with quality composite materials, stairs, railings, and a thoughtful connection to the home. Cost can vary with deck height, materials, and site conditions.",
    image: "/images/landing-pages/raleigh-open-deck-family-fall-v2.webp",
    alt: "Family enjoying dinner on an open composite deck at a Raleigh home in fall",
  },
  {
    name: "10 × 10 screened porch",
    startingPrice: "$35,000",
    note: "Ideal for shade, breezes, and bug-free evenings. Cost can vary with height, roof integration, interior finishing, and site conditions. Engineering may be required.",
    image: "/images/landing-pages/raleigh-screened-porch-spring.webp",
    alt: "Finished Raleigh screened porch during spring",
  },
  {
    name: "10 × 10 A-frame sunroom addition",
    startingPrice: "$70,000",
    note: "A conditioned, window-filled room that can add entertaining space year-round. Cost can vary with structure, glazing, HVAC, foundations, and roof connection. Engineering may be required.",
    image: "/images/landing-pages/raleigh-a-frame-sunroom-fall.webp",
    alt: "A-frame sunroom addition connected to a Raleigh home in fall",
  },
];

export default function DecksPorchesSunroomsPage() {
  return (
    <>
      <section className="outdoor-hero">
        <OutdoorHeroCarousel />
        <div className="outdoor-hero-overlay" />
        <div className="site-container outdoor-hero-content">
          <span className="outdoor-hero-promo">Deck, porch &amp; sunroom special <b>· Up to $1,500 off*</b></span>
          <div className="outdoor-ad-masthead"><span>Raleigh, North Carolina</span><span>Decks · porches · sunrooms</span></div>
          <span className="outdoor-kicker">More reasons to be outside</span>
          <OutdoorHeroHeadline />
          <p>Decks, screened porches, and sunrooms built for Raleigh homes. Projects typically start at $15,000.</p>
          <div className="outdoor-hero-actions">
            <a href="#consultation" className={cn(buttonVariants({ size: "lg" }))}>Request a consultation <ArrowRight size={18} /></a>
            <a href="#options" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "light")}>View starting prices</a>
          </div>
          <a href={phoneHref} className="outdoor-hero-call"><Phone size={17} /> Prefer to call? {phoneDisplay}</a>
          <a className="outdoor-hero-review" href="https://www.google.com/maps/place/Versatile+Edge+LLC/data=!4m2!3m1!1s0x0:0x44ab82a7e5cfd9cc" target="_blank" rel="noreferrer"><span><Star fill="currentColor" /> 5.0 Google rating · 5 reviews</span><q>“I have used Don and his company over 15 years, 2 houses, and for multiple projects…”</q><small>Read the reviews <ArrowRight size={14} /></small></a>
        </div>
      </section>

      <ScrollReveal><section className="outdoor-ad-options" id="options">
        <div className="site-container outdoor-ad-options-heading"><span>Choose your<br />outside way!</span><p>Start with the space that fits how you want to live. These Raleigh starting prices help begin the conversation; your final proposal follows a review of your home and property.</p></div>
        <div className="site-container outdoor-options-offer">
          <div><span>Limited Raleigh offer</span><strong>Save up to <em>$1,500</em> on your project<sup>*</sup></strong><p>Discount is determined by the total cost of the project and is limited to the first 10 projects that go under contract before December 1.</p></div>
          <a href="#consultation" className={buttonVariants({ size: "lg" })}>Request a consultation <ArrowRight size={18} /></a>
        </div>
        <div className="site-container outdoor-ad-option-grid">
          {options.map((option, index) => <article className="outdoor-option" key={option.name}>
            <div className="outdoor-option-media">
              <button className="outdoor-option-image" type="button" aria-label={`Magnify ${option.name} image`}>
                <ResponsiveImage src={option.image} alt={option.alt} sizes="(max-width: 760px) calc(100vw - 30px), 33vw" />
                <span>Tap to zoom</span>
              </button>
              {index === 1 ? <a className="outdoor-project-spotlight" href="/projects/mazingo-covered-porch-addition"><span>Visit one of our<br />current projects</span><ArrowRight size={18} aria-hidden="true" /></a> : null}
            </div>
            <div className="outdoor-option-content"><span className="outdoor-option-number">0{index + 1} / Raleigh living</span><h3>{option.name}</h3><div className="outdoor-price"><small>Typically starting at</small><strong>{option.startingPrice}</strong></div><p>{option.note}</p><a href="#consultation" className="text-link">Plan this space <ArrowRight size={17} /></a></div>
          </article>)}
        </div>
      </section></ScrollReveal>

      <ScrollReveal><section className="outdoor-craftsmanship">
        <div className="site-container outdoor-craftsmanship-grid">
          <div className="outdoor-craftsmanship-mark"><span>Built for</span><strong>the<br />details.</strong><em>Raleigh · Wake County</em></div>
          <div className="outdoor-craftsmanship-copy"><span className="eyebrow">Local experience. Careful work.</span><h2>The part you see.<br /><i>And the part you don’t.</i></h2><p>A great outside space is more than a pretty picture. We pay attention to the structure below the surface, the materials that hold up to daily use, and the finish details that make the new space feel right at home.</p><div className="outdoor-craftsmanship-list"><span>Licensed NC General Contractor #107393</span><span>Thoughtful material selections</span><span>Clean, intentional finishing details</span></div></div>
        </div>
      </section></ScrollReveal>

      <ScrollReveal><section className="outdoor-consultation" id="consultation">
        <div className="site-container outdoor-consultation-grid">
          <div><span className="eyebrow light">Request your outside-living consultation</span><h2>Tell us what you want to enjoy at home.</h2><p>Share your Raleigh-area property and outside-living goals. We’ll review the details before following up.</p><a href={phoneHref} className="outdoor-form-phone"><Phone size={18} /> Call {phoneDisplay}</a><a className="outdoor-consultation-review" href="https://www.google.com/maps/place/Versatile+Edge+LLC/data=!4m2!3m1!1s0x0:0x44ab82a7e5cfd9cc" target="_blank" rel="noreferrer"><span className="outdoor-google-stars" aria-hidden="true"><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /></span><span className="outdoor-google-score">5.0 · 5 Google reviews</span><q>“Attention to detail, listens to his customers, amazing quality of work, done right the first time.”</q><small>Read all Google reviews <ArrowRight size={15} /></small></a></div>
          <div className="form-panel"><InquiryForm compact /></div>
        </div>
      </section></ScrollReveal>

      <ScrollReveal><section className="outdoor-why-now" id="offer">
        <div className="site-container outdoor-why-now-grid">
          <div className="outdoor-why-now-sticker"><span>Build now.</span><strong>Enjoy<br />more.</strong><small>Raleigh outside living</small></div>
          <div className="outdoor-why-now-copy"><span className="eyebrow">A better season starts with a plan</span><h2>Why build <i>now?</i></h2><p>Start your project conversation now and make more room for the seasons ahead. You can plan your new space without putting life—or holiday entertaining—on hold.</p><div className="outdoor-why-now-reasons"><span>Enjoy it in the weather made for being outside</span><span>Minimal disruption to everyday living</span><span>Keep holiday entertaining comfortably intact</span></div></div>
        </div>
      </section></ScrollReveal>

    </>
  );
}
