import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/hero";
import { ServiceGateway } from "@/components/home-showcase";
import { HomeBusiness, HomeDriver, HomeRental, HomeRoadmap } from "@/components/home-priority";
import { EVCinematic } from "@/components/ev-cinematic";
import { OwnershipJourney } from "@/components/ownership-journey";
import { FinalCTA } from "@/components/final-cta";
import { SectionHeading } from "@/components/section-heading";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "home", locale === "id" ? "EV rental AutoRev untuk perjalanan, operasional driver, dan kebutuhan bisnis. Program Founding Driver tersedia mulai Rp300.000 per hari." : "AutoRev EV rental for journeys, driver operations, and business needs. The Founding Driver program starts from IDR 300,000 per day.");
}

export default async function HomePage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;

  return <>
    <Hero locale={locale}/>
    <section className="section section--services" id="services">
      <div className="container">
        <SectionHeading eyebrow={locale === "id" ? "MULAI DARI SINI" : "START HERE"} title={locale === "id" ? "EV yang bekerja untuk masa depan Anda." : "An EV that works for your future."} text={locale === "id" ? "Bangun EV milik Anda, sewa untuk perjalanan, atau gerakkan bisnis dengan armada listrik." : "Build toward your own EV, rent for a journey, or move your business with an electric fleet."} align="center"/>
        <ServiceGateway locale={locale}/>
      </div>
    </section>
    <HomeDriver locale={locale}/>
    <OwnershipJourney locale={locale}/>
    <EVCinematic locale={locale} scene="driver"/>
    <HomeRental locale={locale}/>
    <HomeBusiness locale={locale}/>
    <HomeRoadmap locale={locale}/>
    <FinalCTA locale={locale}/>
  </>;
}
