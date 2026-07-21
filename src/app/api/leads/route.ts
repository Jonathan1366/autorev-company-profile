import { NextRequest, NextResponse } from "next/server";
import { leadSchema, type LeadType } from "@/lib/lead-schema";

const RATE_LIMIT_WINDOW = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map<string, number[]>();

const businessLines: Record<LeadType, string> = {
  rental: "Rental Customer",
  driver: "Founding Driver",
  business: "AutoRev Business",
  system: "RevAuto",
  partner: "Partner",
  strategic: "Strategic",
};

const leadPrefixes: Record<LeadType, string> = {
  rental: "RC",
  driver: "FD",
  business: "AB",
  system: "RA",
  partner: "PT",
  strategic: "ST",
};

function createLeadId(type: LeadType) {
  const date = new Date().toISOString().slice(2, 10).replaceAll("-", "");
  const suffix = crypto.randomUUID().replaceAll("-", "").slice(0, 6).toUpperCase();
  return `AR-${leadPrefixes[type]}-${date}-${suffix}`;
}

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

    const submittedAt = new Date();
    const followUpDue = new Date(submittedAt);
    followUpDue.setDate(followUpDue.getDate() + 7);
    const leadId = createLeadId(parsed.data.type);
    const payload = {
      ...parsed.data,
      website: undefined,
      leadId,
      businessLine: businessLines[parsed.data.type],
      submittedAt: submittedAt.toISOString(),
      followUpDue: followUpDue.toISOString(),
      source: "autorev-website",
    };

    const webhook = process.env.LEAD_WEBHOOK_URL;
    if (!webhook) {
      if (process.env.NODE_ENV === "production") return NextResponse.json({ error: "Lead delivery is not configured" }, { status: 503 });
      return NextResponse.json({ ok: true, leadId, delivery: "development-preview", whatsapp: { status: "preview" } }, { status: 202 });
    }

    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(process.env.LEAD_WEBHOOK_SECRET ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_SECRET}` } : {}) },
      body: JSON.stringify({ ...payload, webhookSecret: process.env.LEAD_WEBHOOK_SECRET || "" }),
      signal: AbortSignal.timeout(12_000),
    });
    if (!response.ok) return NextResponse.json({ error: "Lead delivery failed" }, { status: 502 });
    const delivery = await response.json().catch(() => null) as { ok?: boolean; whatsapp?: { status?: string; messageId?: string } } | null;
    if (delivery?.ok === false) return NextResponse.json({ error: "Lead delivery failed" }, { status: 502 });
    return NextResponse.json({ ok: true, leadId, whatsapp: delivery?.whatsapp || { status: "Menunggu Konfigurasi" } }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
