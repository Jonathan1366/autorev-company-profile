import type { Metadata } from "next";
import type { Locale } from "./i18n";
import { siteConfig } from "./site";

const titles = {
  home: { id: "Rental Kendaraan & Heavy Equipment", en: "Vehicle & Heavy Equipment Rental" },
  rental: { id: "Rental Kendaraan Listrik", en: "Electric Vehicle Rental" },
  business: { id: "Rental EV untuk Bisnis", en: "EV Rental for Business" },
  drivers: { id: "Founding Driver · EV Rental Program", en: "Founding Driver · EV Rental Program" },
  partners: { id: "AutoRev Partner", en: "AutoRev Partner" },
  technology: { id: "RevAuto · Sistem Rental EV", en: "RevAuto · EV Rental System" },
  about: { id: "Tentang AutoRev", en: "About AutoRev" },
  contact: { id: "Kontak & Kemitraan", en: "Contact & Partnerships" },
  privacy: { id: "Kebijakan Privasi", en: "Privacy Policy" },
  terms: { id: "Ketentuan Penggunaan", en: "Terms of Use" },
} as const;

export type PageKey = keyof typeof titles;

const pagePaths: Record<PageKey, string> = {
  home: "",
  rental: "/autorev-rental",
  business: "/autorev-business",
  drivers: "/founding-driver",
  partners: "/partners",
  technology: "/revauto",
  about: "/about",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
};

export function pageMetadata(locale: Locale, page: PageKey, description?: string): Metadata {
  const path = pagePaths[page];
  const title = titles[page][locale];
  const canonical = `${siteConfig.url}/${locale}${path}`;
  const resolvedDescription = description || siteConfig.description;

  return {
    title,
    description: resolvedDescription,
    alternates: {
      canonical,
      languages: {
        "id-ID": `${siteConfig.url}/id${path}`,
        "en-US": `${siteConfig.url}/en${path}`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "id" ? "id_ID" : "en_US",
      url: canonical,
      siteName: siteConfig.name,
      title: `${title} | AutoRev`,
      description: resolvedDescription,
      images: [{ url: "/images/catalog-lowbed-excavator.jpg", width: 1536, height: 1147, alt: "AutoRev equipment rental catalog" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | AutoRev`,
      description: resolvedDescription,
      images: ["/images/catalog-lowbed-excavator.jpg"],
    },
  };
}
