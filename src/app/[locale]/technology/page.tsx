import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { AIHeroVisual } from "@/components/page-visuals";
import { SectionHeading } from "@/components/section-heading";
import { FinalCTA } from "@/components/final-cta";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/button-link";
import { RevAutoSupportDemo } from "@/components/revauto-support-demo";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? pageMetadata(locale, "technology", locale === "id" ? "RevAuto, sistem operasional rental EV untuk mengelola unit, booking, driver, charging, maintenance, dan laporan." : "RevAuto, an EV rental operating system for fleets, bookings, drivers, charging, maintenance, and reporting.") : {};
}

export default async function TechnologyPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const areas = locale === "id" ? [
    ["Armada EV", "Unit, dokumen, status, dan ketersediaan.", "Pilot"],
    ["Booking", "Customer, jadwal, serah terima, dan perpanjangan.", "Dalam pengembangan"],
    ["Driver", "Assignment, checklist, dan aktivitas operasional.", "Dalam pengembangan"],
    ["Charging", "Jadwal pengisian, biaya, dan histori charging.", "Roadmap"],
    ["Maintenance", "Servis, insiden, vendor, dan downtime.", "Roadmap"],
    ["Finance", "Invoice, piutang, biaya unit, dan laporan.", "Roadmap"],
  ] : [
    ["EV Fleet", "Vehicles, documents, status, and availability.", "Pilot"],
    ["Bookings", "Customers, schedules, handovers, and extensions.", "In development"],
    ["Drivers", "Assignments, checklists, and operating activity.", "In development"],
    ["Charging", "Charging plans, cost, and charging history.", "Roadmap"],
    ["Maintenance", "Service, incidents, vendors, and downtime.", "Roadmap"],
    ["Finance", "Invoices, receivables, unit costs, and reporting.", "Roadmap"],
  ];
  const stages = locale === "id" ? ["Unit EV", "Operasional Harian", "Laporan Bisnis"] : ["EV Fleet", "Daily Operations", "Business Reports"];

  return <>
    <PageHero
      locale={locale}
      eyebrow="REVAUTO"
      status={locale === "id" ? "Dalam pengembangan" : "In development"}
      title={locale === "id" ? "Sistem operasi rental EV." : "The EV rental operating system."}
      text={locale === "id" ? "RevAuto membantu owner rental mengelola unit, booking, driver, charging, maintenance, invoice, dan laporan dalam satu alur." : "RevAuto brings vehicles, bookings, drivers, charging, maintenance, invoices, and reporting into one operating flow."}
      primaryHref="/contact?type=system"
      primaryLabel={locale === "id" ? "Daftar Demo" : "Request a Demo"}
      secondaryLabel={locale === "id" ? "Lihat Modul" : "View Modules"}
    ><AIHeroVisual locale={locale}/></PageHero>

    <RevAutoSupportDemo locale={locale}/>

    <section className="section ecosystem-roadmap" id="explore">
      <div className="container">
        <SectionHeading eyebrow={locale === "id" ? "UNTUK OWNER RENTAL" : "FOR RENTAL OWNERS"} title={locale === "id" ? "Operasional terlihat. Keputusan lebih cepat." : "Visible operations. Faster decisions."} text={locale === "id" ? "RevAuto masih dikembangkan bertahap. Setiap modul menampilkan statusnya dengan jelas." : "RevAuto is being developed in stages. Every module shows its current status."}/>
        <div className="roadmap-areas">{areas.map(([title, text, status], index) => <Reveal className="roadmap-area" key={title} delay={index * .05}><span>0{index + 1}</span><small>{status}</small><h2>{title}</h2><p>{text}</p></Reveal>)}</div>
        <Reveal className="roadmap-flow">{stages.map((stage, index) => <div key={stage}><span>0{index + 1}</span><strong>{stage}</strong>{index < stages.length - 1 && <ArrowRight size={26}/>}</div>)}</Reveal>
        <ButtonLink href={localizePath(locale, "/contact?type=system")} variant="primary">{locale === "id" ? "Daftar Demo" : "Request a Demo"}</ButtonLink>
      </div>
    </section>

    <FinalCTA locale={locale} variant="system"/>
  </>;
}
