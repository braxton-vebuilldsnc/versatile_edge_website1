import { env } from "cloudflare:workers";
import { allowedFileTypes, clean, createAttachmentToken, inquiryEmailHtml, mapsUrl, maxFiles, maxFileSize, normalizedAddress } from "@/lib/inquiry";

export const runtime = "edge";
const recent = new Map<string, number[]>();

function json(message: string, status: number) { return Response.json({ message }, { status }); }

export async function POST(request: Request) {
  const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for") || "local";
  const now = Date.now();
  const attempts = (recent.get(ip) || []).filter((time) => now - time < 15 * 60_000);
  if (attempts.length >= 5) return json("Too many requests. Please call 888-381-1033.", 429);
  attempts.push(now); recent.set(ip, attempts);

  const form = await request.formData();
  if (clean(form.get("companyWebsite"))) return json("Thank you.", 200);
  const names = ["projectType", "timeline", "budget", "description", "referral", "street", "city", "state", "zip", "firstName", "lastName", "email", "phone"];
  const fields = Object.fromEntries(names.map((name) => [name, clean(form.get(name))]));
  if (names.some((name) => !fields[name])) return json("Please complete every required field.", 400);
  if (!/^\S+@\S+\.\S+$/.test(fields.email)) return json("Please enter a valid email address.", 400);
  if (!/^\d{5}(-\d{4})?$/.test(fields.zip)) return json("Please enter a valid ZIP code.", 400);
  if (fields.description.length < 20) return json("Please add a little more detail about your project.", 400);
  if (form.get("consent") !== "on") return json("Please confirm the privacy acknowledgement.", 400);

  const files = form.getAll("files").filter((item): item is File => item instanceof File && item.size > 0);
  if (files.length > maxFiles) return json(`Please upload no more than ${maxFiles} files.`, 400);
  for (const file of files) {
    if (!allowedFileTypes.has(file.type)) return json("One of the selected files is not a supported image or PDF.", 400);
    if (file.size > maxFileSize) return json("Each attachment must be 10 MB or smaller.", 400);
  }

  const runtimeEnv = env as unknown as { PROJECT_UPLOADS?: R2Bucket; RESEND_API_KEY?: string; CONTACT_TO_EMAIL?: string; CONTACT_FROM_EMAIL?: string; ATTACHMENT_SIGNING_SECRET?: string; NEXT_PUBLIC_SITE_URL?: string; TURNSTILE_SECRET_KEY?: string };
  if (runtimeEnv.TURNSTILE_SECRET_KEY) {
    const token = clean(form.get("cf-turnstile-response"));
    if (!token) return json("Please complete the anti-spam check.", 400);
    const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: new URLSearchParams({ secret: runtimeEnv.TURNSTILE_SECRET_KEY, response: token, remoteip: ip }) });
    const result = await verification.json() as { success: boolean };
    if (!result.success) return json("The anti-spam check could not be verified.", 400);
  }
  if (!runtimeEnv.RESEND_API_KEY || !runtimeEnv.CONTACT_TO_EMAIL || !runtimeEnv.CONTACT_FROM_EMAIL) return json("Online inquiries are being configured. Please call 888-381-1033 for now.", 503);

  const address = normalizedAddress(fields);
  const origin = runtimeEnv.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
  const links: string[] = [];
  if (files.length) {
    if (!runtimeEnv.PROJECT_UPLOADS || !runtimeEnv.ATTACHMENT_SIGNING_SECRET) return json("File delivery is being configured. Please remove attachments or call us.", 503);
    for (const file of files) {
      const extension = file.name.split(".").pop()?.replace(/[^a-z0-9]/gi, "").toLowerCase() || "file";
      const key = `inquiries/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${extension}`;
      await runtimeEnv.PROJECT_UPLOADS.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type }, customMetadata: { originalName: file.name.slice(0, 120) } });
      const token = await createAttachmentToken(key, runtimeEnv.ATTACHMENT_SIGNING_SECRET, Date.now() + 7 * 24 * 60 * 60_000);
      links.push(`${origin}/api/attachments/${encodeURIComponent(token)}`);
    }
  }

  const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${runtimeEnv.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: runtimeEnv.CONTACT_FROM_EMAIL, to: [runtimeEnv.CONTACT_TO_EMAIL], reply_to: fields.email, subject: `New ${fields.projectType} inquiry — ${fields.city}, ${fields.state}`, html: inquiryEmailHtml(fields, address, mapsUrl(address), links) }) });
  if (!response.ok) return json("We could not deliver your inquiry. Please call 888-381-1033.", 502);
  return json("Your project details were sent successfully.", 200);
}
