import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FoundingDriverLanding } from "@/components/founding-driver-landing";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale)
    ? pageMetadata(
        locale,
        "drivers",
        locale === "id"
          ? "Founding Driver AutoRev: jalankan EV kategori Car Plus mulai Rp300.000 per hari, tuntaskan program 5 tahun, lalu proses menjadi milik sesuai kontrak."
          : "AutoRev Founding Driver: drive a Car Plus-category EV from IDR 300,000 per day and complete the five-year path to ownership under the contract.",
      )
    : {};
}

export default async function DriversPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  return <FoundingDriverLanding locale={raw as Locale} />;
}
