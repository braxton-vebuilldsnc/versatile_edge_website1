import type { Metadata } from "next";
import { BadgeCheck, MessagesSquare, Ruler, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { OwnerIntroduction } from "@/components/owner-introduction";

export const metadata: Metadata = {
  title: "About",
  description: "Meet Versatile Edge, a licensed Raleigh general contractor bringing more than 20 years of experience to Wake County renovations.",
  alternates: { canonical: "https://versatileedgellc.com/about" },
};

export default function AboutPage() {
  return <><PageHero eyebrow="About Versatile Edge" title="Experience you can feel in the process." text="A Raleigh-based general contractor focused on thoughtful renovation, dependable management, and work built to hold up." image="/images/projects/addition-in-progress.webp" /><section className="section"><div className="site-container editorial-grid"><div><span className="eyebrow">Our point of view</span><h2>Craftsmanship matters. So does everything around it.</h2></div><div><p className="lead">A well-built project should not require a homeowner to manage the contractor.</p><p>Versatile Edge combines more than 20 years of construction experience with modern project coordination. We listen closely, define the work, communicate the decisions, and hold the finished details to a consistent standard.</p><p>Because we work throughout Wake County and the Triangle, we understand the local permitting, inspection, and construction requirements that shape residential projects here.</p></div></div></section><OwnerIntroduction /><section className="section soft-section"><div className="site-container values-grid"><article><ShieldCheck /><h3>Professional responsibility</h3><p>Licensed and insured oversight for work that affects your home, investment, and daily life.</p></article><article><MessagesSquare /><h3>Useful communication</h3><p>Clear information when you need it—not vague promises or avoidable surprises.</p></article><article><Ruler /><h3>Careful planning</h3><p>We look at the whole condition before recommending what should happen next.</p></article><article><BadgeCheck /><h3>Quality that is repeatable</h3><p>Experienced trade partners who understand the Versatile Edge expectation.</p></article></div></section><section className="section"><div className="site-container image-text"><img src="/images/projects/kitchen-wooley-detail.webp" alt="Versatile Edge kitchen craftsmanship with brick, brass, and custom shelving" /><div><span className="eyebrow">Built for real life</span><h2>A home can be beautiful and practical at the same time.</h2><p>Our role is to connect your priorities with the realities of the house—then build a result that feels natural, useful, and durable.</p></div></div></section></>;
}
