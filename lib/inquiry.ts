export const allowedFileTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/heic", "application/pdf"]);
export const maxFileSize = 10 * 1024 * 1024;
export const maxFiles = 5;

export function clean(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim().replace(/[<>]/g, "") : "";
}

export function normalizedAddress(fields: Record<string, string>) {
  return `${fields.street}, ${fields.city}, ${fields.state.toUpperCase()} ${fields.zip}`;
}

export function mapsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function createAttachmentToken(key: string, secret: string, expiresAt: number) {
  const payload = bytesToBase64Url(new TextEncoder().encode(JSON.stringify({ key, exp: expiresAt })));
  const cryptoKey = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, new TextEncoder().encode(payload));
  return `${payload}.${bytesToBase64Url(new Uint8Array(signature))}`;
}

export async function verifyAttachmentToken(token: string, secret: string): Promise<{ key: string; exp: number } | null> {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const cryptoKey = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
  const padded = signature.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - signature.length % 4) % 4);
  const sigBytes = Uint8Array.from(atob(padded), (char) => char.charCodeAt(0));
  const valid = await crypto.subtle.verify("HMAC", cryptoKey, sigBytes, new TextEncoder().encode(payload));
  if (!valid) return null;
  const payloadPadded = payload.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - payload.length % 4) % 4);
  const parsed = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(payloadPadded), (char) => char.charCodeAt(0)))) as { key: string; exp: number };
  return parsed.exp > Date.now() ? parsed : null;
}

export function inquiryEmailHtml(fields: Record<string, string>, address: string, mapLink: string, fileLinks: string[]) {
  const rows = [
    ["Project", fields.projectType], ["Timeline", fields.timeline], ["Budget", fields.budget], ["Name", `${fields.firstName} ${fields.lastName}`],
    ["Email", fields.email], ["Phone", fields.phone], ["Property", address], ["Referral", fields.referral], ["Description", fields.description],
  ];
  return `<div style="font-family:Arial,sans-serif;color:#15202e;max-width:680px"><div style="background:#0b213d;color:white;padding:26px"><h1 style="margin:0;font-size:24px">New Versatile Edge project inquiry</h1></div><div style="padding:24px;border:1px solid #d5dadd">${rows.map(([label, value]) => `<p><strong>${label}:</strong><br>${value.replace(/\n/g, "<br>")}</p>`).join("")}<p><a style="display:inline-block;background:#f1b544;color:#0b213d;padding:12px 16px;font-weight:bold;text-decoration:none" href="${mapLink}">Review property on Google Maps</a></p>${fileLinks.length ? `<h2 style="font-size:18px">Attachments</h2><ul>${fileLinks.map((link, index) => `<li><a href="${link}">Open attachment ${index + 1}</a> (expires in 7 days)</li>`).join("")}</ul>` : ""}</div></div>`;
}
