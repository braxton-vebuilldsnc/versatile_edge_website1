import { env } from "cloudflare:workers";
import { verifyAttachmentToken } from "@/lib/inquiry";

export const runtime = "edge";
export async function GET(_request: Request, { params }: { params: Promise<{ token: string }> }) {
  const runtimeEnv = env as unknown as { PROJECT_UPLOADS?: R2Bucket; ATTACHMENT_SIGNING_SECRET?: string };
  if (!runtimeEnv.PROJECT_UPLOADS || !runtimeEnv.ATTACHMENT_SIGNING_SECRET) return new Response("Not found", { status: 404 });
  const { token } = await params;
  const payload = await verifyAttachmentToken(decodeURIComponent(token), runtimeEnv.ATTACHMENT_SIGNING_SECRET);
  if (!payload) return new Response("This attachment link is invalid or has expired.", { status: 403 });
  const object = await runtimeEnv.PROJECT_UPLOADS.get(payload.key);
  if (!object) return new Response("Attachment not found.", { status: 404 });
  const headers = new Headers(); object.writeHttpMetadata(headers); headers.set("Cache-Control", "private, no-store"); headers.set("Content-Disposition", `inline; filename="${object.customMetadata?.originalName?.replace(/["\\]/g, "") || "attachment"}"`);
  return new Response(object.body, { headers });
}
