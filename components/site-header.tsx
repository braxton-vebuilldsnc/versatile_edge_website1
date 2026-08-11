"use client";

import { useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { namedProjects, phoneDisplay, phoneHref, services } from "@/lib/site-data";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <>
      <header className="site-header">
        <div className="utility-bar">
          <div className="site-container utility-inner">
            <span>NC General Contractor License #107393 · Serving Raleigh & Wake County</span>
            <a href={phoneHref}><Phone size={14} /> {phoneDisplay}</a>
          </div>
        </div>
        <div className="site-container nav-row">
          <a href="/" className="brand" aria-label="Versatile Edge home" onClick={close}>
            <img className="brand-logo" src="/images/brand/versatile-edge-official-logo-v2.png" alt="Versatile Edge LLC" />
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="/about">About</a>
            <div className="nav-dropdown">
              <a href="/services">Services <ChevronDown size={14} /></a>
              <div className="dropdown-panel">
                {services.map((service) => <a key={service.slug} href={`/services/${service.slug}`}>{service.shortTitle}</a>)}
              </div>
            </div>
            <div className="nav-dropdown">
              <a href="/projects">Projects <ChevronDown size={14} /></a>
              <div className="dropdown-panel project-dropdown-panel">
                <a href="/projects">All projects</a>
                {namedProjects.map((project) => <a key={project.slug} href={`/projects/${project.slug}`}>{project.shortTitle}</a>)}
              </div>
            </div>
            <a href="/process">Our Process</a>
          </nav>
          <a href="/contact" className={cn(buttonVariants({ size: "sm" }), "header-cta")}>Request consultation</a>
          <button className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <a href="/about" onClick={close}>About</a>
            <a href="/services" onClick={close}>All services</a>
            {services.map((service) => <a key={service.slug} href={`/services/${service.slug}`} onClick={close}>{service.shortTitle}</a>)}
            <a href="/projects" onClick={close}>Projects</a>
            {namedProjects.map((project) => <a className="mobile-project-link" key={project.slug} href={`/projects/${project.slug}`} onClick={close}>{project.shortTitle}</a>)}
            <a href="/process" onClick={close}>Our Process</a>
            <a href="/contact" onClick={close}>Request consultation</a>
          </nav>
        )}
      </header>
      <a href="/contact" className="mobile-sticky-cta">Request a consultation</a>
    </>
  );
}
