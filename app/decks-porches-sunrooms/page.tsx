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
  description: "Plan a Raleigh deck, screened porch, or sunroom with Versatile Edge. Explore practical investment ranges and request a consultation for your Wake County home.",
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
    name: "10 × 15 composite deck",
    range: "$18,000–$35,000",
    note: "A practical starting point for a well-built deck with quality composite materials, stairs, railings, and a thoughtful connection to the home. Cost can vary with deck height, decking material, railing material, and site conditions.",
    image: "/images/landing-pages/raleigh-open-deck-family-fall-v2.webp",
    alt: "Family enjoying dinner on an open composite deck at a Raleigh home in fall",
  },
  {
    name: "10 × 15 screened porch with shed roof",
    range: "$40,000–$70,000",
    note: "Ideal for shade, breezes, and bug-free evenings. Cost can vary with height, decking and railing materials, roof integration, interior finishing, and site conditions. Engineering may be required for covered porches.",
    image: "/images/landing-pages/raleigh-screened-porch-spring.webp",
    alt: "Finished Raleigh screened porch with a shed roof during spring",
  },
  {
    name: "10 × 15 A-frame sunroom addition",
    range: "$80,000–$135,000",
    note: "A conditioned, window-filled room that can add entertaining space year-round. Cost can vary with height, decking and railing materials, interior finishing, structure, glazing, HVAC, foundations, and roof connection. Engineering may be required for sunroom additions.",
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
          <span className="outdoor-hero-promo">Fall deck, porch &amp; sunroom specials <b>· Up to $1,500 off*</b></span>
          <div className="outdoor-ad-masthead"><span>Raleigh, North Carolina</span><span>Decks · porches · sunrooms</span></div>
          <span className="outdoor-kicker">More reasons to be outside</span>
          <OutdoorHeroHeadline />
          <p>Turn your Raleigh backyard into the place your family and friends naturally want to be—in fall, spring, and every good-weather day in between.</p>
          <div className="outdoor-hero-actions">
            <a href="#consultation" className={cn(buttonVariants({ size: "lg" }))}>Start your outside space <ArrowRight size={18} /></a>
            <a href="/about" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "light")}>Meet Versatile Edge</a>
          </div>
          <a href={phoneHref} className="outdoor-hero-call"><Phone size={17} /> Prefer to call? {phoneDisplay}</a>
          <a className="outdoor-hero-review" href="https://www.google.com/maps/place/Versatile+Edge+LLC/data=!4m2!3m1!1s0x0:0x44ab82a7e5cfd9cc" target="_blank" rel="noreferrer"><span><Star fill="currentColor" /> 5.0 Google rating · 5 reviews</span><q>“I have used Don and his company over 15 years, 2 houses, and for multiple projects…”</q><small>Read the reviews <ArrowRight size={14} /></small></a>
          <a href="#why-build-now" className="outdoor-why-now-link"><span>Building now</span><strong>could save you</strong><em>up to<br />$1,500 off<sup>*</sup></em><small>See details ↓</small></a>
        </div>
      </section>

      <ScrollReveal><section className="outdoor-ad-intro">
        <div className="site-container">
          <div className="outdoor-ad-volume"><span>Make room for</span><strong>more<br /><i>good days.</i></strong><em>Decks · porches · sunrooms</em></div>
          <div className="outdoor-ad-copy"><span className="eyebrow">The good stuff happens out here</span><h2>Your favorite<br /><i>part of home.</i></h2><p>One good outside space changes the whole feel of a weekend: dinner lingers, the game gets louder, friends stay later, and a quiet evening feels like an actual escape.</p><p>Designed and built for Raleigh and Wake County homes by Versatile Edge.</p></div>
          <figure className="outdoor-intro-image"><ResponsiveImage src="/images/landing-pages/raleigh-open-deck-family-fall-v2.webp" alt="Family gathered around an outside dinner table at a Raleigh home" sizes="(max-width: 760px) calc(100vw - 30px), 29vw" /><figcaption>Make the most of Raleigh’s best weather.</figcaption></figure>
        </div>
      </section></ScrollReveal>

      <ScrollReveal><section className="outdoor-why-now" id="why-build-now">
        <div className="site-container outdoor-why-now-grid">
          <div className="outdoor-why-now-sticker"><span>Build now.</span><strong>Enjoy<br />more.</strong><small>Raleigh outside living</small></div>
          <div className="outdoor-why-now-copy"><span className="eyebrow">A better season starts with a plan</span><h2>Why build <i>now?</i></h2><p>Starting your deck, porch, or sunroom project now puts your new space in reach for Raleigh’s most comfortable outside seasons. You can plan ahead without putting life—or holiday entertaining—on hold.</p><div className="outdoor-why-now-reasons"><span>Enjoy it in the weather made for being outside</span><span>Minimal disruption to everyday living</span><span>Keep holiday entertaining comfortably intact</span></div></div>
          <div className="outdoor-offer"><span>Limited Raleigh offer</span><strong>Up to<br /><em>$1,500</em><br />off<sup>*</sup></strong><p>Start your project conversation now and make more room for the seasons ahead.</p><a href="#consultation" className={buttonVariants({ size: "lg" })}>Claim your consultation <ArrowRight size={18} /></a></div>
        </div>
        <div className="site-container outdoor-offer-terms"><span>* Offer terms</span><p>Available for qualifying deck, porch, and sunroom projects with a signed contract of $20,000 or more. Limited to the first five qualifying projects placed under contract. Offer amount is determined by final project scope, cannot be combined with other offers, has no cash value, and may be modified or withdrawn at any time. Contact Versatile Edge for complete details.</p></div>
      </section></ScrollReveal>

      <ScrollReveal><section className="outdoor-craftsmanship">
        <div className="site-container outdoor-craftsmanship-grid">
          <div className="outdoor-craftsmanship-mark"><span>Built for</span><strong>the<br />details.</strong><em>Raleigh · Wake County</em></div>
          <div className="outdoor-craftsmanship-copy"><span className="eyebrow">Materials and workmanship matter</span><h2>The part you see.<br /><i>And the part you don’t.</i></h2><p>A great outside space is more than a pretty picture. We pay attention to the structure below the surface, the materials that hold up to daily use, and the finish details that make the new space feel right at home.</p><div className="outdoor-craftsmanship-list"><span>Thoughtful material selections</span><span>Careful transitions at the home</span><span>Clean, intentional finishing details</span></div></div>
          <a className="outdoor-google-ratings" href="https://www.google.com/maps/place/Versatile+Edge+LLC/data=!4m2!3m1!1s0x0:0x44ab82a7e5cfd9cc" target="_blank" rel="noreferrer"><span className="outdoor-google-stars" aria-hidden="true"><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /></span><span className="outdoor-google-score">5.0 · 5 Google reviews</span><q>“Attention to detail, listens to his customers, amazing quality of work, done right the first time.”</q><small>Read all Google reviews <ArrowRight size={15} /></small></a>
        </div>
      </section></ScrollReveal>

      <ScrollReveal><section className="outdoor-ad-options" id="options">
        <div className="site-container outdoor-ad-options-heading"><span>Choose your<br />outside way!</span><p>Start with the space that fits how you want to live. These Raleigh planning ranges help begin the conversation; your final proposal follows a review of your home and property.</p></div>
        <div className="site-container outdoor-ad-option-grid">
          {options.map((option, index) => <article className="outdoor-option" key={option.name}>
            <button className="outdoor-option-image" type="button" aria-label={`Magnify ${option.name} image`}>
              <ResponsiveImage src={option.image} alt={option.alt} sizes="(max-width: 760px) calc(100vw - 30px), 33vw" />
              <span>Tap to zoom</span>
            </button>
            <div><span className="outdoor-option-number">0{index + 1} / Raleigh living</span><h3>{option.name}</h3><div className="outdoor-price"><small>Planning range</small><strong>{option.range}</strong></div><p>{option.note}</p><a href="#consultation" className="text-link">Plan this space <ArrowRight size={17} /></a></div>
          </article>)}
        </div>
      </section></ScrollReveal>

      <ScrollReveal><section className="outdoor-ad-season">
        <div className="site-container outdoor-ad-season-grid">
          <div className="outdoor-season-stamp">Raleigh homes<br /><strong>outside</strong></div>
          <div><span className="eyebrow light">Your next favorite room is waiting</span><h2>Enjoy this fall.<br /><i>And every season after.</i></h2></div>
          <div><p>Good outside additions take planning. Start now, and we can understand the property, build the right scope, and create the place you want to come home to.</p><a href="#consultation" className={buttonVariants({ size: "lg" })}>Let’s create your space <ArrowRight size={18} /></a></div>
        </div>
      </section></ScrollReveal>

      <section className="outdoor-ad-note">
        <div className="site-container"><span>Versatile Edge LLC</span><p>Licensed NC General Contractor #107393</p><a href="/about">Our approach <ArrowRight size={16} /></a></div>
      </section>

      <ScrollReveal><section className="outdoor-consultation" id="consultation">
        <div className="site-container outdoor-consultation-grid">
          <div><span className="eyebrow light">Request your outside-living consultation</span><h2>Tell us what you want to enjoy at home.</h2><p>Share your Raleigh-area property, your outside-living goals, and a realistic investment range. We’ll review the details before following up.</p><a href={phoneHref} className="outdoor-form-phone"><Phone size={18} /> Call {phoneDisplay}</a></div>
          <div className="form-panel"><InquiryForm compact /></div>
        </div>
      </section></ScrollReveal>
    </>
  );
}
