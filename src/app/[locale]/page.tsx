import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MobilityHome } from "@/components/mobility-home";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "home", locale === "id"
    ? "Rental mobil AutoRev untuk Founding Driver, perjalanan personal, dan kebutuhan perusahaan, dengan pilihan kendaraan listrik maupun konvensional."
    : "AutoRev car rental for Founding Drivers, personal journeys, and company mobility, with electric and conventional vehicle choices.");
}

export default async function HomePage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;

  return <MobilityHome locale={locale}/>;
}
