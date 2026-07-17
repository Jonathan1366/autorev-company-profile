import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/hero";
import { ServiceGateway } from "@/components/home-showcase";
import { HomeBusiness, HomeDriver, HomeRental, HomeRoadmap } from "@/components/home-priority";
import { EVCinematic } from "@/components/ev-cinematic";
import { FinalCTA } from "@/components/final-cta";
import { SectionHeading } from "@/components/section-heading";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "home", locale === "id" ? "Rental kendaraan listrik untuk customer, driver, dan perusahaan di Jabodetabek." : "Electric vehicle rental for customers, drivers, and companies across Greater Jakarta.");
}

export default async function HomePage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;

  return <>
    <Hero locale={locale}/>
    <section className="section section--services" id="services">
      <div className="container">
        <SectionHeading eyebrow={locale === "id" ? "TIGA BISNIS UTAMA" : "THREE CORE SERVICES"} title={locale === "id" ? "Pilih cara Anda bergerak." : "Choose how you move."} text={locale === "id" ? "Customer, mitra driver, atau bisnis." : "Customer, driver partner, or business."} align="center"/>
        <ServiceGateway locale={locale}/>
      </div>
    </section>
    <HomeRental locale={locale}/>
    <EVCinematic locale={locale}/>
    <HomeDriver locale={locale}/>
    <HomeBusiness locale={locale}/>
    <HomeRoadmap locale={locale}/>
    <FinalCTA locale={locale}/>
  </>;
}
