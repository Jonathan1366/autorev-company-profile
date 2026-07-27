export const siteConfig = {
  name: "AutoRev Mobilitas Indonesia",
  shortName: "AutoRev",
  tagline: "Drive Today. Own Tomorrow.",
  description:
    "Sewa Jadi Milik untuk Founding Driver: gunakan EV untuk bekerja, tuntaskan program, dan jadikan unit itu milik Anda. AutoRev juga melayani rental EV dan armada listrik untuk bisnis.",
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
  { href: "/autorev-rental", label: { id: "EV Rental", en: "EV Rental" } },
  { href: "/founding-driver", label: { id: "Sewa Jadi Milik", en: "Rent to Own" } },
  { href: "/autorev-business", label: { id: "Bisnis EV", en: "EV Business" } },
  { href: "/revauto", label: { id: "RevAuto", en: "RevAuto" } },
  { href: "/about", label: { id: "Tentang", en: "About" } },
] as const;
