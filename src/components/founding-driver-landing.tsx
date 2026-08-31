"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Check,
  FileCheck2,
  ShieldCheck,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import type { Locale } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { PlatformLogoGrid } from "./platform-logo-grid";
import styles from "./founding-driver-landing.module.css";

const copy = {
  id: {
    eyebrow: "FOUNDING DRIVER · AUTOREV",
    title: ["Kerja Keras Anda Harus Ada Wujudnya."],
    salesLine: "Jangan biarkan setoran harian menguap begitu saja tanpa bekas.",
    intro: "Lewat program Founding Driver, setiap kilometer yang Anda tempuh dan setiap setoran yang Anda bayarkan adalah langkah nyata untuk membawa pulang mobil listrik ini atas nama Anda sendiri, tanpa uang muka.",
    heroCta: "Pelajari Skema Setoran",
    eligibility: "Cek Kelayakan Saya",
    platformEyebrow: "DUKUNGAN PLATFORM MOBILITAS",
    platformTitle: "Bebas Beroperasi di Platform Pilihan Anda.",
    platformText:
      "Armada EV Founding Driver kategori Car Plus atau Standar siap digunakan untuk bekerja di berbagai platform mobilitas dan pengantaran terkemuka.",
    platformNote:
      "Aktivasi akun, kategori layanan, dan jumlah order sepenuhnya mengikuti aturan serta verifikasi masing-masing penyedia platform. AutoRev fokus memastikan kesiapan dan kelayakan armada Anda.",
    docsTitle: "Cukup 3 Dokumen Utama untuk Verifikasi Awal.",
    docsText:
      "Siapkan dokumen asli yang masih berlaku. Tim AutoRev akan memeriksa berkas secara aman sebelum proses administrasi dilanjutkan.",
    security: "AutoRev tidak pernah meminta kata sandi, PIN, atau kode OTP akun platform kerja Anda. Proses verifikasi dilakukan secara aman dan profesional.",
    statusEyebrow: "KOMITMEN TRANSPARANSI PROGRAM",
    statusTitle: "Jelas Sejak Hari Pertama. Tanpa Syarat Tersembunyi.",
    statuses: [
      ["TANPA UANG MUKA & TANPA PELUNASAN BESAR", "Anda tidak dibebani DP di awal dan tidak ada tagihan kejutan di akhir masa tenor. Seluruh kewajiban dibagi rata dan dijelaskan sejak hari pertama."],
      ["HAK LIBUR & EFISIENSI ENERGI", "Tersedia alokasi hari libur bebas setoran setiap bulan serta fasilitas pengisian daya sesuai paket dan ketentuan program."],
      ["PERAWATAN & PERLINDUNGAN ARMADA", "Servis berkala, perawatan rutin, dan perlindungan asuransi disiapkan dalam skema program agar Anda dapat fokus bekerja dengan tenang."],
    ],
    faqEyebrow: "INFORMASI PROGRAM",
    faqTitle: "Pertanyaan Lengkap Founding Driver.",
    faqs: [
      ["Apakah mobil benar-benar akan menjadi milik saya secara resmi?", "Ya. Program ini dirancang untuk pengalihan hak milik penuh dan proses pindah nama BPKB kepada Anda setelah masa program 5 tahun serta seluruh kewajiban administrasi selesai sesuai kesepakatan kontrak."],
      ["Apakah saya harus menyiapkan DP atau uang deposit awal?", "Tidak ada uang muka atau biaya deposit yang memberatkan untuk memulai program ini."],
      ["Bagaimana jika saya adalah pengemudi baru dan belum punya akun platform?", "Tidak masalah. Kami menyediakan pembekalan singkat mengenai pengoperasian kendaraan listrik serta panduan pendaftaran akun mitra kerja."],
      ["Bagaimana aturan mengenai hari libur setoran?", "Program Founding Driver menyediakan hari libur bebas setoran sebanyak 1 hingga 4 hari per bulan, tergantung skema paket yang dipilih, agar Anda dapat beristirahat tanpa beban harian."],
      ["Apakah kendaraan boleh dibawa keluar kota atau digunakan orang lain?", "Penggunaan armada di luar area Jabodetabek memerlukan konfirmasi serta izin operasional dari AutoRev. Kendaraan dilarang dipindahtangankan atau disewakan kembali kepada pihak ketiga tanpa persetujuan resmi."],
      ["Bagaimana jika terjadi keterlambatan setoran?", "Jika kendala operasional menyebabkan setoran tertunggak hingga 3 hari, sistem akan menonaktifkan kendaraan sementara demi keamanan bersama hingga penyelesaian dilakukan secara kekeluargaan."],
      ["Dokumen apa saja yang diperlukan untuk verifikasi awal?", "Siapkan KTP aktif, Kartu Keluarga terbaru, dan SIM A aktif. Tim AutoRev akan memeriksa berkas secara aman sebelum proses administrasi dilanjutkan."],
      ["Platform apa saja yang dapat digunakan untuk bekerja?", "Armada dapat digunakan pada platform mobilitas dan pengantaran yang sesuai. Aktivasi akun, kategori layanan, dan jumlah order mengikuti aturan setiap penyedia platform."],
      ["Apa saja dukungan perawatan kendaraan dalam program?", "Servis berkala, perawatan rutin, dan perlindungan asuransi disiapkan sesuai skema program agar kendaraan tetap siap digunakan."],
      ["Bagaimana ketentuan fasilitas pengisian daya?", "Fasilitas charging tersedia hingga tahun 2029 sesuai paket, syarat, dan ketentuan operasional dalam dokumen perjanjian."],
      ["Kapan proses pengalihan kepemilikan dilakukan?", "Pengalihan hak milik dan administrasi kendaraan diproses setelah masa program 5 tahun serta seluruh kewajiban kontrak terpenuhi."],
    ],
    finalEyebrow: "FOUNDING DRIVER AUTOREV",
    finalTitle: "Sudah Saatnya Hasil Kerja Keras Itu Jadi Milik Anda.",
    finalText:
      "Ambil langkah pertama hari ini. Konsultasikan syarat pendaftaran dan lihat simulasi setoran yang paling sesuai dengan target harian Anda bersama tim kami.",
    finalCta: "Cek Kelayakan Saya",
    finalSecondary: "Konsultasi via WhatsApp",
    disclaimer:
      "Keikutsertaan dalam program Founding Driver mengikuti hasil verifikasi kelayakan berkas, ketersediaan alokasi unit EV, serta kesepakatan kontrak tertulis. Pengalihan hak milik dilakukan setelah masa tenor 5 tahun dan seluruh kewajiban kontrak terpenuhi. Fasilitas charging gratis berlaku hingga tahun 2029 sesuai syarat dan ketentuan operasional yang tercantum dalam dokumen perjanjian.",
  },
  en: {
    eyebrow: "FOUNDING DRIVER · AUTOREV",
    title: ["Your Hard Work Should Become Something Real."],
    salesLine: "Do not let your daily payments disappear without building anything.",
    intro: "Through Founding Driver, every kilometer you travel and every payment you make becomes a real step toward bringing this electric car home in your own name, with no down payment.",
    heroCta: "Explore the Payment Scheme",
    eligibility: "Check My Eligibility",
    platformEyebrow: "MOBILITY PLATFORM SUPPORT",
    platformTitle: "Work on the Platform You Choose.",
    platformText:
      "Founding Driver electric vehicles in the Car Plus or Standard category are ready for work across leading mobility and delivery platforms.",
    platformNote:
      "Account activation, service categories, and order volume follow each platform provider’s rules and verification. AutoRev focuses on keeping your vehicle ready and eligible for operation.",
    docsTitle: "Only 3 Main Documents for Initial Verification.",
    docsText:
      "Prepare original documents that remain valid. The AutoRev team will review them securely before continuing the administration process.",
    security: "AutoRev will never ask for your work-platform password, PIN, or OTP code. Verification is handled securely and professionally.",
    statusEyebrow: "PROGRAM TRANSPARENCY COMMITMENT",
    statusTitle: "Clear from Day One. No Hidden Terms.",
    statuses: [
      ["NO DOWN PAYMENT OR LARGE FINAL PAYMENT", "There is no upfront down payment and no surprise charge at the end of the term. Every obligation is divided clearly and explained from day one."],
      ["DAYS OFF AND ENERGY EFFICIENCY", "The program includes payment-free days off each month and access to charging facilities according to the selected package and program terms."],
      ["VEHICLE CARE AND PROTECTION", "Scheduled service, routine maintenance, and insurance protection are built into the program so you can focus on working with peace of mind."],
    ],
    faqEyebrow: "PROGRAM INFORMATION",
    faqTitle: "Complete Founding Driver Questions.",
    faqs: [
      ["Will the car officially become mine?", "Yes. The program is designed for full ownership transfer and BPKB title transfer after the five-year program and all administrative obligations are completed under the contract."],
      ["Do I need a down payment or initial deposit?", "There is no burdensome down payment or deposit required to begin the program."],
      ["What if I am a new driver without a platform account?", "That is not a problem. We provide a short introduction to electric vehicle operation and guidance for registering a work-partner account."],
      ["How do payment-free days off work?", "Founding Driver provides 1 to 4 payment-free days each month, depending on the selected package, so you can rest without a daily payment burden."],
      ["Can the vehicle travel outside the city or be used by someone else?", "Operating outside Greater Jakarta requires confirmation and operational approval from AutoRev. The vehicle may not be transferred or rented to another party without official approval."],
      ["What happens if a payment is late?", "If operating difficulties cause payments to remain overdue for up to three days, the system temporarily disables the vehicle for shared security until a fair resolution is reached."],
      ["Which documents are required for initial verification?", "Prepare a valid identity card, an up-to-date family card, and a valid Class A driving licence. The AutoRev team reviews every document securely before administration continues."],
      ["Which platforms can I use for work?", "The vehicle can be used on compatible mobility and delivery platforms. Account activation, service categories, and order volume follow each platform provider’s rules."],
      ["What vehicle-care support is included?", "Scheduled servicing, routine maintenance, and insurance protection are provided according to the program scheme to keep the vehicle ready for work."],
      ["How does the charging facility work?", "Charging facilities are available through 2029 according to the package and operating terms stated in the agreement."],
      ["When is ownership transferred?", "Ownership and vehicle administration are processed after the five-year program and all contractual obligations have been fulfilled."],
    ],
    finalEyebrow: "AUTOREV FOUNDING DRIVER",
    finalTitle: "It Is Time for Your Hard Work to Become Yours.",
    finalText:
      "Take the first step today. Discuss the registration requirements and review a payment simulation that fits your daily target with our team.",
    finalCta: "Check My Eligibility",
    finalSecondary: "Consult via WhatsApp",
    disclaimer:
      "Participation in Founding Driver is subject to document eligibility verification, electric vehicle allocation, and a written contract. Ownership is transferred after the five-year term and all contractual obligations are fulfilled. Free charging facilities remain available through 2029 according to the operating terms stated in the agreement.",
  },
} as const;

export function FoundingDriverLanding({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <Image
          className={styles.heroImage}
          src="/images/autorev-founding-driver-v2.png"
          alt={locale === "id" ? "Driver AutoRev mengisi daya kendaraan listrik" : "An AutoRev driver charging an electric vehicle"}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={92}
        />
        <div className={styles.heroShade} />
        <div className={styles.heroGrid} />
        <div className={`container ${styles.heroInner}`}>
          <motion.div
            className={styles.heroCopy}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .82, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.eyebrow}><i />{t.eyebrow}</span>
            <h1 aria-label={t.title.join(" ")}>
              {t.title.map((line) => <span key={line}>{line}</span>)}
            </h1>
            <strong className={styles.salesLine}>{t.salesLine}</strong>
            <p>{t.intro}</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#platforms">{t.heroCta}<ArrowDown /></a>
              <Link className={styles.ghostButton} href={localizePath(locale, "/contact?type=driver")}>{t.eligibility}<ArrowRight /></Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={styles.platforms} id="platforms">
        <div className={`container ${styles.platformLayout}`}>
          <RevealBlock className={styles.platformCopy}>
            <span className={styles.sectionEyebrow}>{t.platformEyebrow}</span>
            <h2>{t.platformTitle}</h2>
            <p>{t.platformText}</p>
            <PlatformLogoGrid locale={locale} />
            <small>{t.platformNote}</small>
          </RevealBlock>
          <RevealBlock className={styles.documentCard}>
            <FileCheck2 />
            <span>{locale === "id" ? "VERIFIKASI AWAL" : "INITIAL VERIFICATION"}</span>
            <h3>{t.docsTitle}</h3>
            <ul>
              <li><Check />{locale === "id" ? "KTP aktif" : "Identity Card"}</li>
              <li><Check />{locale === "id" ? "Kartu Keluarga terbaru" : "Family Card"}</li>
              <li><Check />{locale === "id" ? "SIM A aktif" : "Valid Class A licence"}</li>
            </ul>
            <p>{t.docsText}</p>
            <div><ShieldCheck />{t.security}</div>
          </RevealBlock>
        </div>
      </section>

      <section className={styles.statusSection}>
        <div className={`container ${styles.statusLayout}`}>
          <RevealBlock className={styles.statusIntro}>
            <span className={styles.sectionEyebrow}>{t.statusEyebrow}</span>
            <h2>{t.statusTitle}</h2>
          </RevealBlock>
          <div className={styles.statusCards}>
            {t.statuses.map(([label, text], index) => (
              <motion.article
                key={label}
                className={index === 2 ? styles.roadmapCard : undefined}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: .3 }}
                transition={{ delay: index * .06, duration: .46 }}
              >
                <span><i />{label}</span>
                <p>{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.faq}>
        <div className={`container ${styles.faqLayout}`}>
          <RevealBlock className={styles.faqIntro}>
            <span className={styles.sectionEyebrow}>{t.faqEyebrow}</span>
            <h2>{t.faqTitle}</h2>
            <Link href={localizePath(locale, "/contact?type=driver")} className={styles.textLink}>
              {t.eligibility}<ArrowRight />
            </Link>
          </RevealBlock>
          <div className={styles.faqList}>
            {t.faqs.map(([question, answer], index) => (
              <motion.details
                key={question}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: .2 }}
                transition={{ delay: (index % 4) * .035, duration: .35 }}
              >
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{question}</strong>
                  <i aria-hidden="true"><span /><span /></i>
                </summary>
                <p>{answer}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.finalGlow} />
        <div className={`container ${styles.finalInner}`}>
          <RevealBlock>
            <span className={styles.sectionEyebrow}>{t.finalEyebrow}</span>
            <h2>{t.finalTitle}</h2>
            <p>{t.finalText}</p>
            <div className={styles.finalActions}>
              <Link className={styles.primaryButton} href={localizePath(locale, "/contact?type=driver")}>{t.finalCta}<ArrowRight /></Link>
              <a className={styles.ghostButton} href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noreferrer">{t.finalSecondary}<ArrowRight /></a>
            </div>
          </RevealBlock>
          <p className={styles.disclaimer}>{t.disclaimer}</p>
        </div>
      </section>
    </div>
  );
}

function RevealBlock({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: .2 }}
      transition={{ duration: .58, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
