import type { Metadata } from "next";
import type { Locale } from "./i18n";
import { siteConfig } from "./site";

const titles = {
  home: { id: "Rental Mobil & Founding Driver", en: "Car Rental & Founding Driver" },
  rental: { id: "Sewa Mobil Fleksibel", en: "Flexible Car Rental" },
  business: { id: "Solusi Armada Perusahaan", en: "Business Fleet Solutions" },
  drivers: { id: "Founding Driver · EV Rental Program", en: "Founding Driver · EV Rental Program" },
  partners: { id: "AutoRev Partner", en: "AutoRev Partner" },
  technology: { id: "RevAuto · Sistem Rental EV", en: "RevAuto · EV Rental System" },
  equipment: { id: "Armada Proyek & Peralatan", en: "Project Fleet & Equipment" },
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
  equipment: "/equipment",
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
  const socialImage = page === "equipment"
    ? { url: "/images/catalog-lowbed-excavator.jpg", width: 1448, height: 1086, alt: "AutoRev project fleet and equipment" }
    : { url: "/images/autorev-rental-roadtrip-v3.png", width: 1672, height: 941, alt: "AutoRev car rental" };

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
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | AutoRev`,
      description: resolvedDescription,
      images: [socialImage.url],
    },
  };
}
