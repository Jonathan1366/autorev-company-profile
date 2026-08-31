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
  return isLocale(locale) ? pageMetadata(locale, "business", locale === "id" ? "Solusi armada listrik dan konvensional untuk operasional perusahaan, kendaraan dinas, serta pemilik usaha rental." : "Electric and conventional fleet solutions for company operations, executive vehicles, and rental business owners.") : {};
}

export default async function BusinessPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const offers = locale === "id" ? [
    ["Sewa Operasional Lepas Kunci", "Penyediaan mobil listrik atau konvensional untuk kebutuhan perusahaan jangka pendek hingga panjang dengan kendali penuh di tangan tim Anda."],
    ["Sewa Operasional dengan Pengemudi", "Layanan kendaraan dan pengemudi profesional untuk operasional staf, proyek lapangan, tamu, maupun direksi."],
    ["Kemitraan Pasokan Armada", "Dukungan pasokan unit EV bagi pemilik usaha rental yang ingin memperluas lini armada hemat energi."],
    ["Pemeliharaan dan Pengisian Daya", "Dukungan perawatan rutin, penanganan darurat di jalan, dan manajemen pengisian daya agar operasional bisnis tetap berjalan."],
  ] : [
    ["Self-Drive Operating Vehicles", "Electric or conventional vehicles for short-term and long-term company needs, with full control in your team’s hands."],
    ["Operating Vehicles with Drivers", "Professional vehicles and drivers for staff operations, field projects, guests, and executives."],
    ["Fleet Supply Partnership", "EV supply support for rental business owners looking to expand their energy-efficient fleet."],
    ["Maintenance and Charging Management", "Routine maintenance, roadside support, and charging management to keep your business moving."],
  ];

  return <>
    <PageHero
      locale={locale}
      eyebrow="AUTOREV FOR BUSINESS"
      title={locale === "id" ? "Efisiensi Armada Perusahaan Lewat Mobil Listrik Modern." : "Improve Fleet Efficiency with Modern Electric Vehicles."}
      text={locale === "id" ? "Solusi kendaraan operasional, mobil dinas eksekutif, hingga pasokan armada usaha rental. Dilengkapi skema sewa fleksibel dan sistem pemantauan terintegrasi." : "Vehicle solutions for company operations, executive travel, and rental fleet supply, supported by flexible rental schemes and integrated monitoring."}
      primaryHref="/contact?type=business"
      primaryLabel={locale === "id" ? "Konsultasi Armada Bisnis" : "Discuss Your Business Fleet"}
      secondaryLabel={locale === "id" ? "Pelajari Layanan" : "Explore Services"}
    ><BusinessHeroVisual locale={locale}/></PageHero>

    <EVCinematic locale={locale} scene="city"/>

    <section className="section business-services" id="explore">
      <div className="container">
        <SectionHeading eyebrow={locale === "id" ? "LAYANAN B2B UTAMA" : "CORE B2B SERVICES"} title={locale === "id" ? "Solusi Armada untuk Operasional yang Lebih Efisien." : "Fleet Solutions for More Efficient Operations."}/>
        <div className="business-offers">{offers.map(([title, text], index) => <Reveal className="business-offer" key={title} delay={index * .05}>
          <span>0{index + 1}</span>
          <div><Check size={22}/><h2>{title}</h2><p>{text}</p></div>
          <ArrowUpRight size={24}/>
        </Reveal>)}</div>
        <Reveal className="business-note">
          <p>{locale === "id" ? "Sampaikan jumlah kebutuhan unit dan pola operasional perusahaan Anda untuk mendapatkan penawaran yang disesuaikan." : "Share the required fleet size and your operating pattern to receive a tailored proposal."}</p>
          <ButtonLink href={localizePath(locale, "/contact?type=business")} variant="primary">{locale === "id" ? "Minta Penawaran Bisnis" : "Request a Business Proposal"}</ButtonLink>
        </Reveal>
      </div>
    </section>

    <FinalCTA locale={locale} variant="business"/>
  </>;
}
