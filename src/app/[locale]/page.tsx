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
    ? "Solusi mobilitas AutoRev untuk pengemudi, perjalanan personal, dan kebutuhan perusahaan, dengan pilihan kendaraan listrik maupun konvensional."
    : "AutoRev mobility solutions for drivers, personal journeys, and company needs, with electric and conventional vehicle choices.");
}

export default async function HomePage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;

  return <MobilityHome locale={locale}/>;
}
