import type { Locale } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n";
import { ButtonLink } from "./button-link";

type FinalCTAVariant = "driver" | "rental" | "business" | "system" | "partner" | "about";

const content = {
  id: {
    driver: {
      eyebrow: "FOUNDING DRIVER AUTOREV",
      title: "Lihat apakah program ini sesuai untuk Anda.",
      text: "Pelajari cakupan program, lalu cek kelayakan tanpa biaya atau komitmen di awal.",
      primary: "Pelajari Program",
      primaryHref: "/founding-driver",
      secondary: "Cek Kelayakan",
      secondaryHref: "/contact?type=driver",
    },
    rental: {
      eyebrow: "AUTOREV SEWA MOBIL",
      title: "Sudah Menentukan Jadwal Perjalanan Anda?",
      text: "Beri tahu kami tanggal, durasi, dan lokasi penjemputan. Tim AutoRev akan menyiapkan unit terbaik untuk Anda.",
      primary: "Cek Ketersediaan Unit",
      primaryHref: "/contact?type=rental",
      secondary: "Lihat Pilihan Sewa",
      secondaryHref: "/autorev-rental#explore",
    },
    business: {
      eyebrow: "AUTOREV FOR BUSINESS",
      title: "Rencanakan Anggaran Armada Perusahaan Anda Bersama Kami.",
      text: "Sampaikan jumlah kebutuhan unit dan pola operasional perusahaan Anda untuk mendapatkan penawaran harga yang disesuaikan.",
      primary: "Minta Penawaran Bisnis",
      primaryHref: "/contact?type=business",
      secondary: "Pelajari Layanan",
      secondaryHref: "/autorev-business#explore",
    },
    system: {
      eyebrow: "REVAUTO",
      title: "Lihat apakah RevAuto cocok untuk operasi Anda.",
      text: "Ceritakan alur kerja rental saat ini. Demo akan difokuskan pada kebutuhan unit, booking, driver, charging, dan perawatan Anda.",
      primary: "Jadwalkan Demo",
      primaryHref: "/contact?type=system",
      secondary: "Pelajari RevAuto",
      secondaryHref: "/revauto",
    },
    partner: {
      eyebrow: "PARTNER AUTOREV",
      title: "Punya layanan yang dapat menjaga EV tetap bergerak?",
      text: "Bagikan spesialisasi, lokasi, dan kapasitas Anda untuk peninjauan awal jaringan partner AutoRev.",
      primary: "Ajukan Kemitraan",
      primaryHref: "/contact?type=partner",
      secondary: "Lihat Jaringan Partner",
      secondaryHref: "/partners",
    },
    about: {
      eyebrow: "BICARA DENGAN AUTOREV",
      title: "Ada hal yang ingin Anda bangun bersama kami?",
      text: "Pilih jalur percakapan yang paling relevan untuk sewa mobil, program pengemudi, armada bisnis, RevAuto, atau kemitraan.",
      primary: "Hubungi AutoRev",
      primaryHref: "/contact",
      secondary: "Lihat Program Driver",
      secondaryHref: "/founding-driver",
    },
  },
  en: {
    driver: {
      eyebrow: "AUTOREV FOUNDING DRIVER",
      title: "See whether the program is right for you.",
      text: "Review the program coverage, then check eligibility with no fee or upfront commitment.",
      primary: "Explore the Program",
      primaryHref: "/founding-driver",
      secondary: "Check Eligibility",
      secondaryHref: "/contact?type=driver",
    },
    rental: {
      eyebrow: "AUTOREV CAR RENTAL",
      title: "Have You Set Your Travel Schedule?",
      text: "Share your date, duration, and pickup location. The AutoRev team will prepare the best available vehicle for you.",
      primary: "Check Vehicle Availability",
      primaryHref: "/contact?type=rental",
      secondary: "View Rental Options",
      secondaryHref: "/autorev-rental#explore",
    },
    business: {
      eyebrow: "AUTOREV FOR BUSINESS",
      title: "Plan Your Company Fleet Budget with Us.",
      text: "Share the required fleet size and your company’s operating pattern to receive a tailored proposal.",
      primary: "Request a Business Proposal",
      primaryHref: "/contact?type=business",
      secondary: "Explore Services",
      secondaryHref: "/autorev-business#explore",
    },
    system: {
      eyebrow: "REVAUTO",
      title: "See whether RevAuto fits your operation.",
      text: "Tell us how your rental workflow operates today. The demo will focus on your vehicle, booking, driver, charging, and maintenance needs.",
      primary: "Schedule a Demo",
      primaryHref: "/contact?type=system",
      secondary: "Explore RevAuto",
      secondaryHref: "/revauto",
    },
    partner: {
      eyebrow: "AUTOREV PARTNER",
      title: "Can your service help keep EVs moving?",
      text: "Share your specialization, location, and capacity for an initial AutoRev partner-network review.",
      primary: "Submit Partnership Interest",
      primaryHref: "/contact?type=partner",
      secondary: "Explore the Partner Network",
      secondaryHref: "/partners",
    },
    about: {
      eyebrow: "TALK TO AUTOREV",
      title: "Is there something you want to build with us?",
      text: "Choose the most relevant conversation for car rental, the driver program, business fleets, RevAuto, or partnerships.",
      primary: "Contact AutoRev",
      primaryHref: "/contact",
      secondary: "Explore the Driver Program",
      secondaryHref: "/founding-driver",
    },
  },
} as const;

export function FinalCTA({ locale, variant = "driver" }: { locale: Locale; variant?: FinalCTAVariant }) {
  const item = content[locale][variant];
  return (
    <section className="final-cta">
      <div className="container final-cta__content">
        <span className="eyebrow eyebrow--light"><i />{item.eyebrow}</span>
        <h2>{item.title}</h2>
        <p>{item.text}</p>
        <div><ButtonLink href={localizePath(locale, item.primaryHref)} variant="light">{item.primary}</ButtonLink><ButtonLink href={localizePath(locale, item.secondaryHref)} variant="ghost">{item.secondary}</ButtonLink></div>
      </div>
    </section>
  );
}
