"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { CheckCircle2, LoaderCircle, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/site-data";

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: { sitekey: string }) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId?: string) => void;
    };
  }
}

const budgets = ["Under $25,000", "$25,000 – $50,000", "$50,000 – $75,000", "$75,000 – $100,000", "$100,000 – $150,000", "$150,000 – $200,000", "$200,000 – $300,000", "Over $300,000", "Not sure yet"];
const referrals = ["Neighbor or friend", "Yard sign", "Web search", "Social media", "Print advertisement", "Repeat client", "Other"];

export function InquiryForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const turnstileContainer = useRef<HTMLDivElement>(null);
  const turnstileWidget = useRef<string | null>(null);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!turnstileSiteKey || !turnstileContainer.current) return;

    const renderWidget = () => {
      if (!window.turnstile || !turnstileContainer.current || turnstileWidget.current) return;
      turnstileWidget.current = window.turnstile.render(turnstileContainer.current, { sitekey: turnstileSiteKey });
    };

    const existingScript = document.querySelector<HTMLScriptElement>('script[data-versatile-edge-turnstile]');
    if (existingScript) {
      if (window.turnstile) renderWidget();
      else existingScript.addEventListener("load", renderWidget, { once: true });
    } else {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.dataset.versatileEdgeTurnstile = "true";
      script.addEventListener("load", renderWidget, { once: true });
      document.head.appendChild(script);
    }

    return () => {
      existingScript?.removeEventListener("load", renderWidget);
      if (window.turnstile && turnstileWidget.current) window.turnstile.remove(turnstileWidget.current);
      turnstileWidget.current = null;
    };
  }, [turnstileSiteKey]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending"); setMessage("");
    const form = event.currentTarget;
    try {
      const response = await fetch("/api/inquiries.php", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      const data = await response.json() as { message?: string };
      if (!response.ok) throw new Error(data.message || "We could not send your inquiry.");
      setStatus("sent"); setMessage("Thank you. Your project details have been sent to Versatile Edge."); form.reset();
    } catch (error) {
      window.turnstile?.reset(turnstileWidget.current ?? undefined);
      setStatus("error"); setMessage(error instanceof Error ? error.message : "Please call us to discuss your project.");
    }
  }
  return (
    <form className="inquiry-form" onSubmit={submit} encType="multipart/form-data">
      <div className="form-section"><span className="form-step">01</span><div><h2>About your project</h2><p>Give us enough context to prepare for a useful first conversation.</p></div></div>
      <div className="form-grid">
        <label>Project type *<select name="projectType" required defaultValue=""><option value="" disabled>Select a service</option>{services.map((s) => <option key={s.slug}>{s.title}</option>)}</select></label>
        <label>Desired timeline *<select name="timeline" required defaultValue=""><option value="" disabled>Select timing</option><option>As soon as practical</option><option>Within 3 months</option><option>3–6 months</option><option>6–12 months</option><option>Planning ahead</option></select></label>
        <label className="full">Tell us about your project *<textarea name="description" rows={6} required minLength={20} placeholder="What would you like to change, and what is not working today?" /></label>
        <label>Estimated project budget *<select name="budget" required defaultValue=""><option value="" disabled>Select a range</option>{budgets.map((b) => <option key={b}>{b}</option>)}</select></label>
        <label>How did you hear about us? *<select name="referral" required defaultValue=""><option value="" disabled>Select one</option>{referrals.map((r) => <option key={r}>{r}</option>)}</select></label>
      </div>
      <div className="form-section"><span className="form-step">02</span><div><h2>Property address</h2><p>We use the address to review the home and area before contacting you.</p></div></div>
      <div className="form-grid">
        <label className="full">Street address *<input name="street" autoComplete="street-address" required /></label>
        <label>City *<input name="city" autoComplete="address-level2" required /></label>
        <label>State *<input name="state" autoComplete="address-level1" defaultValue="NC" required maxLength={2} /></label>
        <label>ZIP code *<input name="zip" autoComplete="postal-code" required inputMode="numeric" pattern="[0-9]{5}(-[0-9]{4})?" /></label>
      </div>
      <div className="form-section"><span className="form-step">03</span><div><h2>Your contact details</h2><p>We’ll use these details only to respond to this inquiry.</p></div></div>
      <div className="form-grid">
        <label>First name *<input name="firstName" autoComplete="given-name" required /></label>
        <label>Last name *<input name="lastName" autoComplete="family-name" required /></label>
        <label>Email *<input name="email" type="email" autoComplete="email" required /></label>
        <label>Phone number *<input name="phone" type="tel" autoComplete="tel" required /></label>
        <label className="full upload-label"><span><Paperclip size={18} /> Project photos or plans</span><input name="files" type="file" multiple accept="image/jpeg,image/png,image/webp,image/heic,application/pdf" /><small>Up to 5 images or PDFs, 10 MB each.</small></label>
      </div>
      <input name="companyWebsite" className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {turnstileSiteKey && <div className="cf-turnstile" ref={turnstileContainer} />}
      <label className="consent"><input name="consent" type="checkbox" required /> <span>I agree that Versatile Edge may use this information to evaluate my property and respond to my inquiry. *</span></label>
      <Button type="submit" size="lg" disabled={status === "sending"}>{status === "sending" ? <><LoaderCircle className="spin" /> Sending</> : "Send project details"}</Button>
      {message && <p className={`form-message ${status}`} role={status === "error" ? "alert" : "status"}>{status === "sent" && <CheckCircle2 size={20} />}{message}</p>}
    </form>
  );
}
