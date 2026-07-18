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
  { href: "/autorev-rental", label: { id: "EV Rental", en: "EV Rental" } },
  { href: "/founding-driver", label: { id: "Founding Driver", en: "Founding Driver" } },
  { href: "/autorev-business", label: { id: "Bisnis EV", en: "EV Business" } },
  { href: "/revauto", label: { id: "RevAuto", en: "RevAuto" } },
  { href: "/about", label: { id: "Tentang", en: "About" } },
] as const;
