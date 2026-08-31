import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, KeyRound, UserRound } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { RentalHeroVisual } from "@/components/page-visuals";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/button-link";
import { FinalCTA } from "@/components/final-cta";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? pageMetadata(locale, "rental", locale === "id" ? "Sewa mobil listrik dan konvensional, lepas kunci atau dengan pengemudi profesional di Jabodetabek." : "Flexible electric and conventional car rental, self drive or with a professional driver, across Greater Jakarta.") : {};
}

export default async function RentalPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return <>
    <PageHero
      locale={locale}
      eyebrow={locale === "id" ? "AUTOREV SEWA MOBIL" : "AUTOREV CAR RENTAL"}
      status={locale === "id" ? "JABODETABEK" : "GREATER JAKARTA"}
      title={locale === "id" ? "Sewa Mobil Lebih Fleksibel, Tanpa Kerumitan Administrasi." : "Flexible Car Rental without Administrative Hassle."}
      text={locale === "id" ? "Kami menyediakan armada mobil listrik yang hemat energi hingga kendaraan konvensional yang nyaman. Pilih lepas kunci untuk kebebasan perjalanan atau pengemudi profesional untuk kenyamanan penuh." : "Choose an energy-efficient electric car or a comfortable conventional vehicle. Go self drive for freedom or travel with a professional driver for complete comfort."}
      primaryHref="/contact?type=rental"
      primaryLabel={locale === "id" ? "Cek Ketersediaan Mobil" : "Check Vehicle Availability"}
      secondaryLabel={locale === "id" ? "Lihat Pilihan Sewa" : "View Rental Options"}
    ><RentalHeroVisual locale={locale}/></PageHero>

    <section className="section rental-section" id="explore">
      <div className="container">
        <SectionHeading
          eyebrow={locale === "id" ? "PILIHAN LAYANAN SEWA" : "RENTAL SERVICE OPTIONS"}
          title={locale === "id" ? "Pilih Layanan Sesuai Kebutuhan Anda." : "Choose the Service That Fits Your Needs."}
          text={locale === "id" ? "Tentukan cara sewa yang paling nyaman untuk perjalanan pribadi maupun kebutuhan dinas." : "Choose the most comfortable rental option for personal travel or business mobility."}
        />
        <div className="rental-modes">
          <article><KeyRound size={34}/><small>01</small><h2>{locale === "id" ? "Lepas Kunci" : "Self Drive"}</h2><p>{locale === "id" ? "Bebas mengatur rute dan jadwal perjalanan sendiri dengan unit siap jalan." : "Set your own route and schedule with a road-ready vehicle."}</p></article>
          <article><UserRound size={34}/><small>02</small><h2>{locale === "id" ? "Dengan Pengemudi" : "With a Driver"}</h2><p>{locale === "id" ? "Nikmati perjalanan tanpa lelah bersama pengemudi profesional AutoRev." : "Travel comfortably with a professional AutoRev driver."}</p></article>
          <article><CalendarDays size={34}/><small>03</small><h2>{locale === "id" ? "Sewa Bulanan" : "Monthly Rental"}</h2><p>{locale === "id" ? "Solusi hemat untuk kebutuhan mobilitas rutin pribadi maupun dinas." : "A cost-efficient solution for recurring personal or business mobility."}</p></article>
        </div>
        <ButtonLink href={locale === "id" ? "/id/contact?type=rental" : "/en/contact?type=rental"} variant="primary">{locale === "id" ? "Cek Ketersediaan Unit" : "Check Vehicle Availability"}</ButtonLink>
      </div>
    </section>

    <FinalCTA locale={locale} variant="rental"/>
  </>;
}
