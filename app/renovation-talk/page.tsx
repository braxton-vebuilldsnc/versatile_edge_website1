import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { RenovationTalkSidebar } from "@/components/renovation-talk-sidebar";
import { featuredRenovationArticle, formatArticleDate, renovationArticles } from "@/lib/renovation-talk";

const description = "Practical homeowner information about remodeling, construction, materials, costs, planning, and project decisions from Versatile Edge.";

export const metadata: Metadata = {
  title: "Renovation Talk",
  description,
  alternates: { canonical: "https://versatileedgellc.com/renovation-talk" },
  openGraph: { title: "Renovation Talk | Versatile Edge", description, url: "https://versatileedgellc.com/renovation-talk", type: "website", images: [{ url: "/images/projects/brown-working-vanity-install.webp", alt: "Versatile Edge interior renovation in progress" }] },
};

export default function RenovationTalkPage() {
  return <>
    <section className="renovation-intro section"><div className="site-container"><span className="eyebrow">From Versatile Edge</span><h1>Renovation Talk</h1><p className="lead">Practical homeowner information about remodeling, construction, materials, products, costs, planning, and the project decisions that shape a better home.</p></div></section>
    <section className="renovation-content section"><div className="site-container renovation-layout"><div className="renovation-main">
      <section className="featured-reading"><span className="eyebrow">Featured reading</span><div><p className="article-topics">{featuredRenovationArticle.topics.join(" · ")}</p><h2>{featuredRenovationArticle.title}</h2><p>Do not let home-improvement shows set the expectation for a real renovation. They can turn weeks or months of planning, demolition, coordination, and finish work into a few entertaining minutes. Material and labor costs also vary widely by location, and some shows present a project cost without the contractor’s fee.</p><p>In the real world, a renovation begins with an existing house—its structure, systems, finishes, and history. Before new work can begin, the team may need to protect finished areas, remove old materials, solve how new work will connect to the house, and address conditions that cannot be seen until the project is opened up.</p><p>That is why cost per square foot is rarely a useful way to compare renovation with new construction. The better question is what work, coordination, and risk the proposed scope actually includes.</p><a className="text-link" href={`/renovation-talk/${featuredRenovationArticle.slug}`}>Read the full article <ArrowRight size={18} /></a></div></section>
      <section className="latest-reading"><div className="section-heading"><div><span className="eyebrow">Keep reading</span><h2>Latest from Renovation Talk</h2></div></div><div className="renovation-card-grid">{renovationArticles.map((article) => <article className="renovation-card" key={article.slug}><p className="article-topics">{article.topics.join(" · ")}</p><h3><a href={`/renovation-talk/${article.slug}`}>{article.title}</a></h3><p>{article.excerpt}</p><div className="renovation-card-footer"><time dateTime={article.datePublished}>{formatArticleDate(article.datePublished)}</time><a className="text-link" href={`/renovation-talk/${article.slug}`}>Read more <ArrowRight size={18} /></a></div></article>)}</div></section>
    </div><RenovationTalkSidebar /></div></section>
  </>;
}
