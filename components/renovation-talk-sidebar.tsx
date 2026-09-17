"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { renovationArticles } from "@/lib/renovation-talk";

export function RenovationTalkSidebar() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const terms = query.trim().toLowerCase();
    if (!terms) return [];
    return renovationArticles.filter((article) => [article.title, article.description, article.excerpt, article.topics.join(" "), article.searchText].join(" ").toLowerCase().includes(terms));
  }, [query]);

  return (
    <aside className="renovation-sidebar" aria-label="Renovation Talk navigation">
      <section className="renovation-search">
        <h2>Search Renovation Talk</h2>
        <label className="sr-only" htmlFor="renovation-talk-search">Search articles</label>
        <div className="renovation-search-field"><Search size={18} aria-hidden="true" /><input id="renovation-talk-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search articles" /></div>
        {query && <div className="renovation-search-results" aria-live="polite">{results.length ? results.map((article) => <a key={article.slug} href={`/renovation-talk/${article.slug}`}>{article.title}</a>) : <p>No articles match that search yet.</p>}</div>}
      </section>
      <section className="recent-topics">
        <h2>Recent Topics</h2>
        <ol>{renovationArticles.slice(0, 6).map((article) => <li key={article.slug}><a href={`/renovation-talk/${article.slug}`}>{article.title}</a></li>)}</ol>
      </section>
    </aside>
  );
}
