export const siteConfig = {
  name: "AutoRev Mobilitas Indonesia",
  shortName: "AutoRev",
  tagline: "Keep Every Vehicle Moving.",
  description:
    "Rental kendaraan listrik untuk customer, mitra driver, dan perusahaan. RevAuto sedang dibangun sebagai sistem operasional rental EV.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://autorev.id",
  email: "jonathanfarelemanuel@gmail.com",
  phoneDisplay: "0813 6740 8145",
  phoneTel: "+6281367408145",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281367408145",
  socials: {
    linkedin: "",
    instagram: "",
  },
};

export const navigation = [
  { href: "/rental", label: { id: "EV Rental", en: "EV Rental" } },
  { href: "/drivers", label: { id: "Founding Driver", en: "Founding Driver" } },
  { href: "/business", label: { id: "Bisnis EV", en: "EV Business" } },
  { href: "/technology", label: { id: "RevAuto", en: "RevAuto" } },
  { href: "/about", label: { id: "Tentang", en: "About" } },
] as const;
