"use client";

import { useState } from "react";
import { ResponsiveImage } from "@/components/responsive-image";
import { projectPageForTitle, projects } from "@/lib/site-data";

const filters = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

export function ProjectGallery() {
  const [active, setActive] = useState("All");
  const visible = active === "All" ? projects : projects.filter((p) => p.category === active);
  return (
    <>
      <div className="project-filters" aria-label="Filter projects">
        {filters.map((filter) => <button key={filter} className={active === filter ? "active" : ""} onClick={() => setActive(filter)}>{filter}</button>)}
      </div>
      <div className="project-grid">
        {visible.map((project, index) => (
          <article className={index % 3 === 0 ? "project-card project-card-wide" : "project-card"} key={project.title}>
            <ResponsiveImage src={project.image} alt={`${project.title}, a Versatile Edge ${project.category.toLowerCase()} project`} sizes="(max-width: 760px) calc(100vw - 30px), (max-width: 1240px) 50vw, 610px" />
            <div className="project-card-overlay"><span>{project.category} · {project.location}</span><h2>{project.title}</h2><p>{project.summary}</p>{projectPageForTitle(project.title) && <a className="project-card-link" href={projectPageForTitle(project.title)!}>View project</a>}</div>
          </article>
        ))}
      </div>
    </>
  );
}
