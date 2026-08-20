import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustrialHome } from "@/components/industrial-home";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale)
    ? pageMetadata(
        locale,
        "equipment",
        locale === "id"
          ? "Armada proyek, transportasi logistik, dan peralatan operasional yang disusun sesuai kebutuhan pekerjaan."
          : "Project fleets, logistics transport, and operating equipment configured around the work required.",
      )
    : {};
}

export default async function EquipmentPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  return <IndustrialHome locale={rawLocale as Locale} />;
}
