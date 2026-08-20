export const siteConfig = {
  name: "AutoRev Mobilitas Indonesia",
  shortName: "AutoRev",
  tagline: "Rental Mobil & Fleet Technology.",
  description:
    "AutoRev menyediakan rental mobil untuk perjalanan pribadi, program Founding Driver, kebutuhan corporate, serta teknologi fleet management.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://autorev-mobilitas-indonesia.vercel.app",
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
  { href: "/founding-driver", label: { id: "Founding Driver", en: "Founding Driver" } },
  { href: "/#vehicle-catalog", label: { id: "Katalog Mobil", en: "Vehicle Catalog" } },
  { href: "/autorev-rental", label: { id: "Rental Mobil", en: "Car Rental" } },
  { href: "/autorev-business", label: { id: "Corporate Rental", en: "Corporate Rental" } },
  { href: "/contact?type=business", label: { id: "Minta Penawaran", en: "Request a Quote" } },
  { href: "/about", label: { id: "Tentang", en: "About" } },
] as const;
