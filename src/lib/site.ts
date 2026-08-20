export const siteConfig = {
  name: "AutoRev Mobilitas Indonesia",
  shortName: "AutoRev",
  tagline: "Mobility, Equipment & Technology.",
  description:
    "AutoRev menyediakan solusi rental dan project-based sourcing untuk kendaraan, truck, trailer, construction equipment, mining equipment, material handling, serta fleet technology.",
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
  { href: "/#catalog", label: { id: "E-Catalog", en: "E-Catalog" } },
  { href: "/#project-solutions", label: { id: "Solusi Proyek", en: "Project Solutions" } },
  { href: "/#technology", label: { id: "Fleet Technology", en: "Fleet Technology" } },
  { href: "/contact?type=business", label: { id: "Minta Penawaran", en: "Request a Quote" } },
  { href: "/about", label: { id: "Tentang", en: "About" } },
] as const;
