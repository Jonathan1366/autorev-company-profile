import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/lead-schema";

const RATE_LIMIT_WINDOW = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (requestLog.get(ip) || []).filter((time) => now - time < RATE_LIMIT_WINDOW);
  recent.push(now);
  requestLog.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Unsupported content type" }, { status: 415 });
  }
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 16_000) return NextResponse.json({ error: "Payload too large" }, { status: 413 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) return NextResponse.json({ error: "Too many requests" }, { status: 429, headers: { "Retry-After": "600" } });

  try {
    const json: unknown = await request.json();
    const parsed = leadSchema.safeParse(json);
    if (!parsed.success) return NextResponse.json({ error: "Invalid submission", issues: parsed.error.flatten().fieldErrors }, { status: 400 });
    if (parsed.data.website) return NextResponse.json({ ok: true });

    const webhook = process.env.LEAD_WEBHOOK_URL;
    if (!webhook) {
      if (process.env.NODE_ENV === "production") return NextResponse.json({ error: "Lead delivery is not configured" }, { status: 503 });
      return NextResponse.json({ ok: true, delivery: "development-preview" }, { status: 202 });
    }

    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(process.env.LEAD_WEBHOOK_SECRET ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_SECRET}` } : {}) },
      body: JSON.stringify({ ...parsed.data, website: undefined, submittedAt: new Date().toISOString(), source: "autorev-website" }),
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) return NextResponse.json({ error: "Lead delivery failed" }, { status: 502 });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
