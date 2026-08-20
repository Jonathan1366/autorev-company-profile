import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustrialHome } from "@/components/industrial-home";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "home", locale === "id"
    ? "Marketplace rental B2B AutoRev untuk kendaraan, truck, trailer, alat konstruksi, equipment tambang, material handling, dan fleet technology."
    : "AutoRev B2B rental marketplace for vehicles, trucks, trailers, construction equipment, mining equipment, material handling, and fleet technology.");
}

export default async function HomePage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;

  return <IndustrialHome locale={locale}/>;
}
