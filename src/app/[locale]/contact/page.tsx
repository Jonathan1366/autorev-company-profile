import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { ContactHub } from "@/components/contact-hub";
import { Reveal } from "@/components/reveal";
import { isLocale, type Locale } from "@/lib/i18n";
import { leadTypes, type LeadType } from "@/lib/lead-schema";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ locale: string }>; searchParams: Promise<{ type?: string; package?: string; experience?: string; vehicle?: string; need?: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { locale } = await params; return isLocale(locale) ? pageMetadata(locale, "contact", locale === "id" ? "Daftar rental EV, Founding Driver, AutoRev Business, atau demo RevAuto." : "Register for EV rental, Founding Driver, AutoRev Business, or a RevAuto demo.") : {}; }

export default async function ContactPage({ params, searchParams }: Props) {
  const [{ locale: raw }, query] = await Promise.all([params, searchParams]); if (!isLocale(raw)) notFound(); const locale = raw as Locale;
  const requestedType = query.type === "early-access" ? "business" : query.type;
  const initialType: LeadType = leadTypes.includes(requestedType as LeadType) ? requestedType as LeadType : "rental";
  const initialVehicle = typeof query.vehicle === "string" ? query.vehicle : typeof query.need === "string" ? query.need : "";
  const heroCopy: Record<LeadType, { eyebrow: string; title: string; text: string }> = locale === "id" ? {
    rental: { eyebrow: "SEWA EV AUTOREV", title: "Ceritakan perjalanannya. Kami siapkan EV-nya.", text: "Isi tanggal, lokasi, dan kebutuhan Anda. Tim AutoRev akan membantu mengecek pilihan unit yang tersedia." },
    driver: { eyebrow: "FOUNDING DRIVER AUTOREV", title: "Cek kelayakan. Tanpa komitmen di awal.", text: "Isi data awal sekitar tiga menit. Tidak perlu mengunggah KTP, KK, atau SIM pada tahap ini." },
    business: { eyebrow: "AUTOREV BUSINESS", title: "Kebutuhan armada Anda dimulai di sini.", text: "Bagikan jumlah unit, durasi, dan cakupan operasional agar pembicaraan pertama langsung relevan." },
    system: { eyebrow: "DEMO REVAUTO", title: "Lihat RevAuto pada operasi Anda.", text: "Ceritakan proses yang berjalan hari ini. Kami akan menyiapkan demo berdasarkan kebutuhan nyata tim Anda." },
    partner: { eyebrow: "PARTNER AUTOREV", title: "Mari lihat cara kita dapat bekerja sama.", text: "Bagikan layanan, lokasi, dan kapasitas Anda untuk peninjauan awal kemitraan." },
    strategic: { eyebrow: "BICARA DENGAN AUTOREV", title: "Mulai percakapan yang tepat.", text: "Ceritakan konteks dan tujuan Anda agar kami dapat mengarahkan pembahasan kepada tim yang relevan." },
  } : {
    rental: { eyebrow: "AUTOREV EV RENTAL", title: "Tell us about the journey. We’ll prepare the EV.", text: "Share your date, location, and needs. The AutoRev team will help check available vehicle options." },
    driver: { eyebrow: "AUTOREV FOUNDING DRIVER", title: "Check your eligibility. No upfront commitment.", text: "Complete the initial details in about three minutes. You do not need to upload identity documents at this stage." },
    business: { eyebrow: "AUTOREV BUSINESS", title: "Your fleet requirement starts here.", text: "Share the fleet size, duration, and operating scope so the first conversation is immediately relevant." },
    system: { eyebrow: "REVAUTO DEMO", title: "See RevAuto in your operation.", text: "Tell us how things work today. We’ll prepare a demo around your team’s real needs." },
    partner: { eyebrow: "AUTOREV PARTNER", title: "Let’s see how we can work together.", text: "Share your services, location, and capacity for an initial partnership review." },
    strategic: { eyebrow: "TALK TO AUTOREV", title: "Start the right conversation.", text: "Share your context and objective so we can route the discussion to the relevant team." },
  };
  const hero = heroCopy[initialType];
  return <>
    <section className="contact-hero"><div className="contact-hero__glow"/><div className="container"><Reveal><span className="eyebrow eyebrow--light"><i/>{hero.eyebrow}</span><h1>{hero.title}</h1><p>{hero.text}</p></Reveal><div className="contact-direct"><a href={`mailto:${siteConfig.email}`}><Mail size={22}/><span><small>{locale === "id" ? "EMAIL RESMI" : "OFFICIAL EMAIL"}</small><strong>{siteConfig.email}</strong></span></a><a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noreferrer"><MessageCircle size={22}/><span><small>WHATSAPP</small><strong>{siteConfig.phoneDisplay}</strong></span></a><a href={`tel:${siteConfig.phoneTel}`}><Phone size={22}/><span><small>{locale === "id" ? "NOMOR TELEPON" : "PHONE NUMBER"}</small><strong>{siteConfig.phoneDisplay}</strong></span></a></div></div></section>
    <section className="section section--contact-form"><div className="container"><ContactHub locale={locale} initialType={initialType} initialPackage={query.package} initialExperience={query.experience} initialVehicle={initialVehicle}/></div></section>
  </>;
}
