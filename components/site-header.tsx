"use client";

import Link from "next/link";
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
          <Link href="/" className="brand" aria-label="Versatile Edge home" onClick={close}>
            <img className="brand-logo" src="/images/brand/versatile-edge-2026-logo.png" alt="Versatile Edge LLC" />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link href="/about">About</Link>
            <div className="nav-dropdown">
              <Link href="/services">Services <ChevronDown size={14} /></Link>
              <div className="dropdown-panel">
                {services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`}>{service.shortTitle}</Link>)}
              </div>
            </div>
            <div className="nav-dropdown">
              <Link href="/projects">Projects <ChevronDown size={14} /></Link>
              <div className="dropdown-panel project-dropdown-panel">
                <Link href="/projects">All projects</Link>
                {namedProjects.map((project) => <Link key={project.slug} href={`/projects/${project.slug}`}>{project.shortTitle}</Link>)}
              </div>
            </div>
            <Link href="/process">Our Process</Link>
          </nav>
          <Link href="/contact" className={cn(buttonVariants({ size: "sm" }), "header-cta")}>Request consultation</Link>
          <button className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <Link href="/about" onClick={close}>About</Link>
            <Link href="/services" onClick={close}>All services</Link>
            {services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`} onClick={close}>{service.shortTitle}</Link>)}
            <Link href="/projects" onClick={close}>Projects</Link>
            {namedProjects.map((project) => <Link className="mobile-project-link" key={project.slug} href={`/projects/${project.slug}`} onClick={close}>{project.shortTitle}</Link>)}
            <Link href="/process" onClick={close}>Our Process</Link>
            <Link href="/contact" onClick={close}>Request consultation</Link>
          </nav>
        )}
      </header>
      <Link href="/contact" className="mobile-sticky-cta">Request a consultation</Link>
    </>
  );
}
