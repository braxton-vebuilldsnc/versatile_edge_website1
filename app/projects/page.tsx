import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ProjectGallery } from "@/components/project-gallery";

export const metadata: Metadata = {
  title: "Projects",
  description: "See actual kitchen, bathroom, deck, and addition work completed by Versatile Edge in Wake County and the Triangle.",
  alternates: { canonical: "https://versatileedgellc.com/projects" },
};
export default function ProjectsPage() { return <><PageHero eyebrow="Actual Versatile Edge work" title="Built here. Built to be lived in." text="A growing collection of completed spaces and behind-the-build details from homes across the Triangle." image="/images/projects/kitchen-wooley-detail.webp" /><section className="section"><div className="site-container"><ProjectGallery /></div></section></>; }
