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
  return isLocale(locale) ? pageMetadata(locale, "rental", locale === "id" ? "Rental kendaraan listrik lepas kunci atau dengan driver di Jabodetabek." : "Electric vehicle rental, self drive or with a driver, across Greater Jakarta.") : {};
}

export default async function RentalPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return <>
    <PageHero
      locale={locale}
      eyebrow="AUTOREV EV RENTAL"
      status="Jabodetabek"
      title={locale === "id" ? "Sewa EV sesuai perjalanan Anda." : "Rent an EV for your journey."}
      text={locale === "id" ? "Lepas kunci untuk lebih bebas. Dengan driver untuk lebih santai. Tersedia harian, mingguan, dan bulanan di Jabodetabek." : "Self drive for more freedom. With a driver for a more relaxed journey. Available daily, weekly, and monthly across Greater Jakarta."}
      primaryHref="/contact?type=rental"
      primaryLabel={locale === "id" ? "Cek Ketersediaan EV" : "Check EV Availability"}
      secondaryLabel={locale === "id" ? "Pilih Cara Sewa" : "Choose How to Rent"}
    ><RentalHeroVisual locale={locale}/></PageHero>

    <section className="section rental-section" id="explore">
      <div className="container">
        <SectionHeading
          eyebrow={locale === "id" ? "CARA RENTAL" : "RENTAL OPTIONS"}
          title={locale === "id" ? "Pilih cara yang paling nyaman." : "Choose the most comfortable option."}
          text={locale === "id" ? "Beritahu tanggal, lokasi, dan durasi. Tim AutoRev akan membantu mencocokkan kebutuhan Anda dengan unit yang tersedia." : "Share the date, location, and duration. The AutoRev team will help match your needs with an available vehicle."}
        />
        <div className="rental-modes">
          <article><KeyRound size={34}/><small>01</small><h2>{locale === "id" ? "Lepas Kunci" : "Self Drive"}</h2><p>{locale === "id" ? "Jadwal dan rute sepenuhnya Anda atur." : "Set your own schedule and route."}</p></article>
          <article><UserRound size={34}/><small>02</small><h2>{locale === "id" ? "Dengan Driver" : "With Driver"}</h2><p>{locale === "id" ? "Untuk perjalanan kerja, keluarga, atau tamu tanpa perlu mengemudi." : "For work, family, or guest travel without having to drive."}</p></article>
          <article><CalendarDays size={34}/><small>03</small><h2>{locale === "id" ? "Rental Bulanan" : "Monthly Rental"}</h2><p>{locale === "id" ? "Masa sewa lebih panjang untuk kebutuhan rutin." : "A longer rental period for recurring needs."}</p></article>
        </div>
        <ButtonLink href={locale === "id" ? "/id/contact?type=rental" : "/en/contact?type=rental"} variant="primary">{locale === "id" ? "Cek Ketersediaan EV" : "Check EV Availability"}</ButtonLink>
      </div>
    </section>

    <FinalCTA locale={locale} variant="rental"/>
  </>;
}
