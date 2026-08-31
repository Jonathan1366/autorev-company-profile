import type { Locale } from "./i18n";

export const copy = {
  id: {
    common: {
      earlyAccess: "Sewa EV",
      becomePartner: "Jadi Partner",
      explore: "Sewa EV",
      talk: "Hubungi AutoRev",
      learnMore: "Pelajari lebih lanjut",
      preview: "Preview produk · Data ilustratif",
      inDevelopment: "Dalam pengembangan",
      foundingProgram: "Program founding partner",
    },
    home: {
      eyebrow: "Founding Driver AutoRev · Jabodetabek",
      title: "EV untuk kerja. Menuju milik.",
      subtitle: "Operasikan EV Car Plus melalui program lima tahun dengan dukungan tim AutoRev.",
      ecosystemTitle: "Satu ekosistem. Setiap perjalanan kendaraan.",
      ecosystemText:
        "Dari kendaraan dipesan hingga kembali produktif, AutoRev menyatukan customer, fleet owner, teknisi, bengkel, towing, dan supplier dalam alur yang lebih transparan.",
      peopleTitle: "AutoRev untuk Anda",
      peopleText: "Sewa kendaraan, minta bantuan, jadwalkan perawatan, dan pantau prosesnya dari satu pengalaman sederhana.",
      businessTitle: "AutoRev Business",
      businessText: "Kendalikan ketersediaan, booking, maintenance, biaya, lokasi, dan downtime armada dari satu control tower.",
      rentalTitle: "Rental yang terasa lebih ringan.",
      rentalText: "Pilih kebutuhan, tentukan waktu dan lokasi, lalu kelola serah-terima, perpanjangan, dan dukungan secara digital.",
      dashboardTitle: "Lihat yang terjadi. Tahu apa yang harus dilakukan.",
      dashboardText: "Satu tampilan operasional untuk kendaraan, booking, perawatan, biaya, dan rekomendasi tindakan.",
      aiTitle: "Kenalkan RevAuto, sistem operasional rental EV.",
      aiText: "RevAuto merapikan informasi operasional. Keputusan tetap di tangan tim Anda.",
      uptimeTitle: "Dari laporan masalah hingga kembali beroperasi.",
      partnerTitle: "Tumbuhkan bisnis layanan Anda bersama AutoRev.",
      storyTitle: "Dibangun dari dalam bisnis mobilitas.",
      storyText:
        "AutoRev dibangun dari operasi rental nyata untuk merapikan unit, vendor, driver, maintenance, dan biaya.",
      whyTitle: "Dirancang untuk hal yang paling penting.",
      programTitle: "Bangun versi awalnya bersama kami.",
      roadmapTitle: "Bergerak bertahap. Dibangun untuk jangka panjang.",
      finalTitle: "Mari bangun masa depan mobilitas bersama.",
    },
  },
  en: {
    common: {
      earlyAccess: "Rent an EV",
      becomePartner: "Become a Partner",
      explore: "Rent an EV",
      talk: "Talk to AutoRev",
      learnMore: "Learn more",
      preview: "Product preview · Illustrative data",
      inDevelopment: "In development",
      foundingProgram: "Founding partner program",
    },
    home: {
      eyebrow: "AutoRev Founding Driver · Greater Jakarta",
      title: "An EV for work. A path to ownership.",
      subtitle: "Operate a Car Plus EV through a five-year program with support from the AutoRev team.",
      ecosystemTitle: "One ecosystem. Every vehicle journey.",
      ecosystemText:
        "From booking to productive return, AutoRev connects customers, fleet owners, technicians, workshops, towing, and suppliers through a more transparent workflow.",
      peopleTitle: "AutoRev for People",
      peopleText: "Rent a vehicle, request assistance, schedule maintenance, and track progress through one simple experience.",
      businessTitle: "AutoRev Business",
      businessText: "Control availability, bookings, maintenance, cost, location, and fleet downtime from one operating view.",
      rentalTitle: "Rental, made lighter.",
      rentalText: "Choose what you need, set the time and place, then manage handover, extensions, and assistance digitally.",
      dashboardTitle: "See what is happening. Know what to do next.",
      dashboardText: "One operating view for vehicles, bookings, maintenance, cost, and recommended actions.",
      aiTitle: "Meet RevAuto, the EV rental operating system.",
      aiText: "RevAuto organizes operating information. Your team stays in control.",
      uptimeTitle: "From issue report to return-to-service.",
      partnerTitle: "Grow your service business with AutoRev.",
      storyTitle: "Built from inside the mobility business.",
      storyText:
        "AutoRev is being built alongside a real rental operation to address vehicle availability, vendor coordination, driver reporting, maintenance, downtime, and cost visibility first-hand.",
      whyTitle: "Designed around what matters most.",
      programTitle: "Help us shape the first version.",
      roadmapTitle: "Moving in stages. Built for the long term.",
      finalTitle: "Let’s build the future of mobility together.",
    },
  },
} as const;

export function getCopy(locale: Locale) {
  return copy[locale];
}

export const modules = [
  { name: "Rental", icon: "car", desc: { id: "Booking & serah-terima", en: "Booking & handover" } },
  { name: "Fleet", icon: "gauge", desc: { id: "Operasi & utilisasi", en: "Operations & utilization" } },
  { name: "Care", icon: "wrench", desc: { id: "Maintenance & repair", en: "Maintenance & repair" } },
  { name: "Assist", icon: "route", desc: { id: "Towing & roadside", en: "Towing & roadside" } },
  { name: "Partner", icon: "store", desc: { id: "Jaringan layanan", en: "Service network" } },
  { name: "Parts", icon: "package", desc: { id: "Parts & supplier", en: "Parts & suppliers" } },
  { name: "Protect", icon: "shield", desc: { id: "Dokumen & tracking", en: "Documents & tracking" } },
  { name: "Finance", icon: "chart", desc: { id: "Biaya & profitabilitas", en: "Cost & profitability" } },
] as const;
