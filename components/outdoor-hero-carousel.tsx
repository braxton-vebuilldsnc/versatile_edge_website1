"use client";

import { useEffect, useState } from "react";
import { ResponsiveImage } from "@/components/responsive-image";

const slides = [
  {
    src: "/images/landing-pages/raleigh-open-deck-family-fall-v2.webp",
    alt: "Family enjoying dinner on an open deck at their Raleigh home in fall",
    label: "Open deck living",
  },
  {
    src: "/images/landing-pages/raleigh-screened-porch-spring.webp",
    alt: "Couple enjoying a screened porch at a Raleigh home in spring",
    label: "Screened porch living",
  },
  {
    src: "/images/landing-pages/raleigh-a-frame-sunroom-fall.webp",
    alt: "A-frame sunroom addition at a Raleigh home in fall",
    label: "Sunroom living",
  },
];

const headlines = ["Dinners outside.", "Game days outside.", "Entertaining outside.", "Peaceful outside time."];

export function OutdoorHeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => setActiveSlide((current) => (current + 1) % slides.length), 6500);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="outdoor-hero-media" aria-label="Raleigh outside living inspiration">
      {slides.map((slide, index) => (
        <ResponsiveImage
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          sizes="100vw"
          priority={index === 0}
          className={index === activeSlide ? "is-active" : ""}
        />
      ))}
      <div className="outdoor-carousel-controls" aria-label="Choose an outside-living scene">
        {slides.map((slide, index) => (
          <button
            key={slide.label}
            type="button"
            className={index === activeSlide ? "is-active" : ""}
            onClick={() => setActiveSlide(index)}
            aria-label={`Show ${slide.label}`}
            aria-pressed={index === activeSlide}
          >
            <span>{`0${index + 1}`}</span>{slide.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function OutdoorHeroHeadline() {
  const [visibleHeadlines, setVisibleHeadlines] = useState(1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (visibleHeadlines >= headlines.length) return;
    const timeout = window.setTimeout(() => setVisibleHeadlines((current) => current + 1), 1100);
    return () => window.clearTimeout(timeout);
  }, [visibleHeadlines]);

  return (
    <h1 className="outdoor-hero-headline" aria-live="polite">
      {headlines.map((headline, index) => (
        <span key={headline} className={index < visibleHeadlines ? "is-visible" : ""}>{headline}</span>
      ))}
    </h1>
  );
}
