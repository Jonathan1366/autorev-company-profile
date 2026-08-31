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
      eyebrow: "AUTOREV EV RENTAL",
      title: "Sudah tahu kapan dan ke mana?",
      text: "Beritahu tanggal, lokasi, dan durasi perjalanan. Tim AutoRev akan membantu mengecek pilihan EV yang tersedia.",
      primary: "Cek Ketersediaan EV",
      primaryHref: "/contact?type=rental",
      secondary: "Lihat Cara Rental",
      secondaryHref: "/autorev-rental#explore",
    },
    business: {
      eyebrow: "AUTOREV BUSINESS",
      title: "Mulai dari kebutuhan operasional Anda.",
      text: "Bagikan jumlah unit, durasi, dan pola penggunaan agar kami dapat menyiapkan pembahasan armada yang relevan.",
      primary: "Konsultasikan Armada",
      primaryHref: "/contact?type=business",
      secondary: "Lihat Solusi Bisnis",
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
      text: "Pilih jalur percakapan yang paling relevan—rental, program driver, armada bisnis, RevAuto, atau kemitraan.",
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
      eyebrow: "AUTOREV EV RENTAL",
      title: "Know when and where you need to go?",
      text: "Share the date, location, and duration. The AutoRev team will help check available EV options.",
      primary: "Check EV Availability",
      primaryHref: "/contact?type=rental",
      secondary: "Explore Rental Options",
      secondaryHref: "/autorev-rental#explore",
    },
    business: {
      eyebrow: "AUTOREV BUSINESS",
      title: "Start with your operating requirements.",
      text: "Share the fleet size, duration, and usage pattern so we can prepare a relevant fleet discussion.",
      primary: "Discuss Your Fleet",
      primaryHref: "/contact?type=business",
      secondary: "Explore Business Solutions",
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
      text: "Choose the most relevant conversation—rental, the driver program, business fleets, RevAuto, or partnerships.",
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
