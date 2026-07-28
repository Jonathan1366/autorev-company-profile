import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { ContactHub } from "@/components/contact-hub";
import { Reveal } from "@/components/reveal";
import { isLocale, type Locale } from "@/lib/i18n";
import { leadTypes, type LeadType } from "@/lib/lead-schema";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ locale: string }>; searchParams: Promise<{ type?: string; package?: string; experience?: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { locale } = await params; return isLocale(locale) ? pageMetadata(locale, "contact", locale === "id" ? "Daftar rental EV, Founding Driver, AutoRev Business, atau demo RevAuto." : "Register for EV rental, Founding Driver, AutoRev Business, or a RevAuto demo.") : {}; }

export default async function ContactPage({ params, searchParams }: Props) {
  const [{ locale: raw }, query] = await Promise.all([params, searchParams]); if (!isLocale(raw)) notFound(); const locale = raw as Locale;
  const requestedType = query.type === "early-access" ? "business" : query.type;
  const initialType: LeadType = leadTypes.includes(requestedType as LeadType) ? requestedType as LeadType : "rental";
  return <>
    <section className="contact-hero"><div className="contact-hero__glow"/><div className="container"><Reveal><span className="eyebrow eyebrow--light"><i/>DAFTAR AUTOREV</span><h1>{locale === "id" ? "Pilih jalur Anda." : "Choose your path."}</h1><p>{locale === "id" ? "Rental EV, Founding Driver, Bisnis EV, atau RevAuto." : "EV Rental, Founding Driver, EV Business, or RevAuto."}</p></Reveal><div className="contact-direct"><a href={`mailto:${siteConfig.email}`}><Mail size={18}/><span><small>Email</small>{siteConfig.email}</span></a><a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noreferrer"><MessageCircle size={18}/><span><small>WhatsApp</small>{siteConfig.phoneDisplay}</span></a><a href={`tel:${siteConfig.phoneTel}`}><Phone size={18}/><span><small>{locale === "id" ? "TELEPON" : "CALL"}</small>{siteConfig.phoneDisplay}</span></a></div></div></section>
    <section className="section section--contact-form"><div className="container"><ContactHub locale={locale} initialType={initialType} initialPackage={query.package} initialExperience={query.experience}/></div></section>
  </>;
}
