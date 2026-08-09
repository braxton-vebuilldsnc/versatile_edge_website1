import type { Metadata } from "next";
import { MapPin, Phone } from "lucide-react";
import { InquiryForm } from "@/components/inquiry-form";
import { phoneDisplay, phoneHref } from "@/lib/site-data";

export const metadata: Metadata = { title: "Request a Consultation", description: "Tell Versatile Edge about your Raleigh-area renovation or remodeling project." };
export default function ContactPage() { return <section className="contact-page"><div className="site-container contact-grid"><aside><span className="eyebrow light">Start a conversation</span><h1>Tell us about the home—and what you want it to become.</h1><p>Share the project, property address, timing, and investment range. We’ll review the details before following up.</p><div className="contact-method"><Phone /><div><span>Prefer to call?</span><a href={phoneHref}>{phoneDisplay}</a></div></div><div className="contact-method"><MapPin /><div><span>Service area</span><p>Raleigh, Wake County, and surrounding Triangle communities</p></div></div></aside><div className="form-panel"><InquiryForm /></div></div></section>; }
