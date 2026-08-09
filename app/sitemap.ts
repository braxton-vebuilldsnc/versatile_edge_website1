import type { MetadataRoute } from "next";
import { services } from "@/lib/site-data";
export default function sitemap(): MetadataRoute.Sitemap { const base = process.env.NEXT_PUBLIC_SITE_URL || "https://versatileedgellc.com"; const routes = ["", "/about", "/services", "/projects", "/process", "/contact", "/privacy"]; return [...routes.map((route) => ({ url: `${base}${route}`, lastModified: new Date() })), ...services.map((service) => ({ url: `${base}/services/${service.slug}`, lastModified: new Date() }))]; }
