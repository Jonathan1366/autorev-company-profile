import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { BusinessHeroVisual } from "@/components/page-visuals";
import { SectionHeading } from "@/components/section-heading";
import { FinalCTA } from "@/components/final-cta";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/button-link";
import { EVCinematic } from "@/components/ev-cinematic";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? pageMetadata(locale, "business", locale === "id" ? "Rental armada kendaraan listrik untuk corporate dan owner rental, lepas kunci atau dengan driver." : "Electric fleet rental for companies and rental owners, self drive or with drivers.") : {};
}

export default async function BusinessPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const offers = locale === "id" ? [
    ["Corporate Lepas Kunci", "EV untuk operasional bulanan dan tahunan."],
    ["Corporate dengan Driver", "Untuk direksi, tamu, proyek, dan aktivitas perusahaan."],
    ["Armada untuk Owner Rental", "Pasokan unit EV untuk memperluas bisnis rental."],
    ["Charging dan Perawatan", "Dukungan operasional agar armada tetap bergerak."],
  ] : [
    ["Corporate Self Drive", "EVs for monthly and annual operations."],
    ["Corporate with Driver", "For executives, guests, projects, and business travel."],
    ["Fleet for Rental Owners", "EV supply to expand your rental business."],
    ["Charging and Care", "Operational support that keeps the fleet moving."],
  ];

  return <>
    <PageHero
      locale={locale}
      eyebrow="AUTOREV BUSINESS"
      title={locale === "id" ? "EV untuk bisnis Anda." : "EVs for your business."}
      text={locale === "id" ? "Untuk corporate dan owner rental. Lepas kunci atau dengan driver." : "For companies and rental owners. Self drive or with drivers."}
      primaryHref="/contact?type=business"
      primaryLabel={locale === "id" ? "Konsultasi Armada" : "Discuss Your Fleet"}
      secondaryLabel={locale === "id" ? "Lihat Layanan" : "View Services"}
    ><BusinessHeroVisual locale={locale}/></PageHero>

    <EVCinematic locale={locale} scene="city"/>

    <section className="section business-services" id="explore">
      <div className="container">
        <SectionHeading eyebrow={locale === "id" ? "B2B EV RENTAL" : "B2B EV RENTAL"} title={locale === "id" ? "Satu kebutuhan. Armada yang sesuai." : "One need. The right fleet."}/>
        <div className="business-offers">{offers.map(([title, text], index) => <Reveal className="business-offer" key={title} delay={index * .05}>
          <span>0{index + 1}</span>
          <div><Check size={22}/><h2>{title}</h2><p>{text}</p></div>
          <ArrowUpRight size={24}/>
        </Reveal>)}</div>
        <Reveal className="business-note">
          <p>{locale === "id" ? "Penawaran disesuaikan dengan jumlah unit, durasi, wilayah, dan cakupan layanan." : "Every proposal reflects fleet size, duration, location, and service scope."}</p>
          <ButtonLink href={localizePath(locale, "/contact?type=business")} variant="primary">{locale === "id" ? "Konsultasi Armada" : "Discuss Your Fleet"}</ButtonLink>
        </Reveal>
      </div>
    </section>

    <FinalCTA locale={locale}/>
  </>;
}
