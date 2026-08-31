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
          ? "Founding Driver AutoRev menghadirkan skema setoran harian menuju kepemilikan mobil listrik tanpa uang muka, sesuai verifikasi dan kontrak program."
          : "AutoRev Founding Driver provides a daily-payment path toward electric car ownership with no down payment, subject to verification and the program contract.",
      )
    : {};
}

export default async function DriversPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  return <FoundingDriverLanding locale={raw as Locale} />;
}
