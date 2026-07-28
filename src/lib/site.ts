export const siteConfig = {
  name: "AutoRev Mobilitas Indonesia",
  shortName: "AutoRev",
  tagline: "Drive Today. Own Tomorrow.",
  description:
    "Program Founding Driver AutoRev: jalankan EV kategori Car Plus mulai Rp300.000 per hari dan tuntaskan jalur kepemilikan 5 tahun sesuai kontrak. Tersedia juga rental perjalanan dan armada EV untuk bisnis.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://autorev-bisnis.vercel.app",
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
  { href: "/founding-driver", label: { id: "Program Driver", en: "Driver Program" } },
  { href: "/autorev-rental", label: { id: "Rental Perjalanan", en: "Travel Rental" } },
  { href: "/autorev-business", label: { id: "Bisnis EV", en: "EV Business" } },
  { href: "/revauto", label: { id: "RevAuto", en: "RevAuto" } },
  { href: "/about", label: { id: "Tentang", en: "About" } },
] as const;
