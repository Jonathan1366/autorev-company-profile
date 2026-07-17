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
      title={locale === "id" ? "Rental EV, sesuai cara Anda." : "EV rental, your way."}
      text={locale === "id" ? "Lepas kunci atau dengan driver. Harian, mingguan, atau bulanan." : "Self drive or with a driver. Daily, weekly, or monthly."}
      primaryHref="/contact?type=rental"
      primaryLabel={locale === "id" ? "Sewa EV" : "Rent an EV"}
      secondaryLabel={locale === "id" ? "Pilih Cara Sewa" : "Choose How to Rent"}
    ><RentalHeroVisual locale={locale}/></PageHero>

    <section className="section rental-section" id="explore">
      <div className="container">
        <SectionHeading
          eyebrow={locale === "id" ? "CARA RENTAL" : "RENTAL OPTIONS"}
          title={locale === "id" ? "Satu EV. Tiga cara." : "One EV. Three ways."}
          text={locale === "id" ? "Pilih pengalaman yang paling sesuai." : "Choose the experience that fits."}
        />
        <div className="rental-modes">
          <article><KeyRound size={34}/><small>01</small><h2>{locale === "id" ? "Lepas Kunci" : "Self Drive"}</h2><p>{locale === "id" ? "EV untuk perjalanan personal Anda." : "An EV for your personal journey."}</p></article>
          <article><UserRound size={34}/><small>02</small><h2>{locale === "id" ? "Dengan Driver" : "With Driver"}</h2><p>{locale === "id" ? "Duduk nyaman. Kami yang mengemudi." : "Sit back. We take the wheel."}</p></article>
          <article><CalendarDays size={34}/><small>03</small><h2>{locale === "id" ? "Rental Bulanan" : "Monthly Rental"}</h2><p>{locale === "id" ? "Untuk kebutuhan rutin yang lebih panjang." : "For longer, recurring needs."}</p></article>
        </div>
        <ButtonLink href={locale === "id" ? "/id/contact?type=rental" : "/en/contact?type=rental"} variant="primary">{locale === "id" ? "Mulai Sewa" : "Start Your Rental"}</ButtonLink>
      </div>
    </section>

    <FinalCTA locale={locale}/>
  </>;
}
