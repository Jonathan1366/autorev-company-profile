"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  Clock3,
  FileCheck2,
  MapPinned,
  ShieldCheck,
  UserRoundCheck,
  Wrench,
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
    eyebrow: "AUTOREV · FOUNDING DRIVER",
    title: ["EV Rental."],
    salesLine: "Untuk operasional driver.",
    intro: "Pelajari cakupan operasional dan lanjutkan verifikasi awal bersama tim AutoRev.",
    heroCta: "Lihat Platform",
    eligibility: "Cek Kelayakan Awal",
    platformEyebrow: "PLATFORM OPERASIONAL",
    platformTitle: "Platform operasional yang dapat digunakan.",
    platformText:
      "EV kategori Car Plus dapat digunakan pada layanan Car Plus maupun Car Standard di Grab sesuai aktivasi akun, ketersediaan layanan, wilayah, dan kebijakan platform. Kendaraan juga dapat digunakan pada platform mobilitas atau pengantaran lain yang sesuai.",
    platformNote:
      "Aktivasi akun, kategori layanan, ketersediaan order, dan wilayah mengikuti verifikasi serta kebijakan masing-masing platform. AutoRev tidak menjamin aktivasi akun, jumlah order, atau penghasilan. Penyebutan merek tidak menunjukkan kerja sama atau endorsement kecuali dinyatakan resmi.",
    docsTitle: "Dokumen untuk verifikasi awal.",
    docsText:
      "Setelah dokumen awal diperiksa, proses dilanjutkan dengan penjelasan program, persiapan akun, training bila diperlukan, dan persiapan kendaraan.",
    security: "AutoRev tidak pernah meminta kata sandi atau kode OTP akun platform Anda.",
    statusEyebrow: "STATUS LAYANAN",
    statusTitle: "Cakupan aktif dan pengembangan.",
    statuses: [
      ["TERMASUK DALAM PROGRAM", "Kendaraan, jalur kepemilikan, hari libur bebas setoran, meal benefit, charging, serta servis, maintenance, dan asuransi sesuai ketentuan."],
      ["SESUAI VERIFIKASI / KETENTUAN", "Aktivasi akun, kategori layanan platform, cakupan servis, maintenance, asuransi, serta penggunaan charging."],
      ["DIKEMBANGKAN BERTAHAP", "BPJS, booth atau kantin, paguyuban driver, dan family gathering. Belum dianggap benefit aktif sebelum dikonfirmasi."],
    ],
    operationEyebrow: "KETENTUAN OPERASIONAL",
    operationTitle: "Ketentuan operasional utama.",
    operations: [
      ["Hari libur bebas setoran", "Regular mendapat 1 hari dan Premium 4 hari libur per bulan. Tidak ada setoran pada hari libur sesuai paket."],
      ["Setoran tertunggak", "Apabila setoran tertunggak selama 3 hari, kendaraan dinonaktifkan sementara sampai kewajiban diselesaikan."],
      ["Wilayah operasional", "Kendaraan diprioritaskan beroperasi di Jabodetabek. Perjalanan luar kota memerlukan izin dan konfirmasi."],
      ["Driver terdaftar", "Kendaraan tidak boleh dipindahtangankan atau digunakan orang lain tanpa persetujuan AutoRev."],
      ["Perawatan kendaraan", "Driver wajib menjaga kondisi, kebersihan, dan keamanan kendaraan."],
      ["Insiden atau kecelakaan", "Kerusakan, insiden, atau kecelakaan wajib segera dilaporkan kepada tim AutoRev."],
    ],
    faqEyebrow: "INFORMASI PROGRAM",
    faqTitle: "Hal yang perlu dipahami sebelum mendaftar.",
    faqs: [
      ["Apakah kendaraan benar-benar menjadi milik saya?", "Program dirancang untuk pengalihan kepemilikan setelah tenor 5 tahun, seluruh kewajiban, verifikasi akhir, dan proses administrasi selesai sesuai kontrak."],
      ["Apakah ada deposit atau uang muka?", "Tidak. Regular dan Premium tidak memerlukan deposit atau uang muka."],
      ["Apakah ada pelunasan di akhir tenor?", "Tidak ada pelunasan kepemilikan atau balloon payment di akhir tenor. Kewajiban program yang masih tertunggak tetap harus diselesaikan sebelum pengalihan kepemilikan."],
      ["Apakah hari libur tetap harus membayar setoran?", "Tidak. Regular mendapat 1 hari dan Premium 4 hari libur bebas setoran setiap bulan."],
      ["Saya belum pernah menjadi driver. Apakah bisa mendaftar?", "Bisa. Training sekitar satu minggu tersedia apabila diperlukan, termasuk pengenalan EV dan persiapan akun."],
      ["Apakah akun lama tetap bisa digunakan?", "Bisa, sepanjang akun dan kendaraan memenuhi ketentuan platform terkait."],
      ["Sampai kapan charging gratis?", "Charging gratis tersedia sampai tahun 2029 sesuai ketentuan program. Detail periode dan mekanismenya dijelaskan dalam kontrak."],
      ["Bagaimana benefit makan diberikan?", "Pada tahap awal, benefit diberikan dalam bentuk uang makan: 2x per minggu untuk Regular dan 4x per minggu untuk Premium. Booth atau kantin direncanakan bertahap."],
      ["Apakah BPJS dan paguyuban sudah tersedia?", "BPJS sedang dipersiapkan bertahap. Paguyuban driver dan family gathering juga masih dalam pengembangan dan belum dianggap benefit aktif sampai dikonfirmasi."],
      ["Apa yang terjadi bila setoran tertunggak?", "Jika setoran tertunggak selama 3 hari, kendaraan dinonaktifkan sementara sampai kewajiban diselesaikan."],
      ["Bolehkah kendaraan dibawa keluar kota atau digunakan orang lain?", "Keluar Jabodetabek memerlukan izin dan konfirmasi. Kendaraan tidak boleh dipindahtangankan atau digunakan orang lain tanpa persetujuan AutoRev."],
      ["Bagaimana jika berhenti sebelum lima tahun?", "Hak, kewajiban, dan konsekuensi penghentian sebelum tenor mengikuti kontrak. Tim akan menjelaskannya sebelum program ditandatangani."],
    ],
    terms: [
      ["3 hari", "Tunggakan sebelum nonaktif sementara"],
      ["Jabodetabek", "Wilayah operasi prioritas"],
      ["Izin wajib", "Untuk penggunaan luar kota"],
    ],
    finalEyebrow: "FOUNDING DRIVER AUTOREV",
    finalTitle: "Pelajari programnya. Mulai saat Anda siap.",
    finalText:
      "Bicara dengan tim AutoRev untuk memastikan programnya sesuai dengan kebutuhan operasional Anda.",
    finalCta: "Cek Kelayakan Awal",
    finalSecondary: "Tanya via WhatsApp",
    disclaimer:
      "Program Founding Driver mengikuti kelayakan peserta, ketersediaan unit, wilayah operasional, kontrak, dan ketentuan program. Kepemilikan dialihkan setelah tenor 5 tahun, seluruh kewajiban, verifikasi akhir, dan administrasi pengalihan selesai. Tidak ada deposit atau uang muka dan tidak ada pelunasan kepemilikan di akhir tenor; kewajiban yang masih tertunggak berdasarkan kontrak tetap harus diselesaikan. Charging gratis berlaku sampai tahun 2029 sesuai ketentuan program. AutoRev tidak menjamin aktivasi akun, jumlah order, atau penghasilan.",
  },
  en: {
    eyebrow: "AUTOREV · FOUNDING DRIVER",
    title: ["EV Rental."],
    salesLine: "Built for driver operations.",
    intro: "Explore the operating coverage, then continue with an initial review by the AutoRev team.",
    heroCta: "View Platforms",
    eligibility: "Initial Eligibility Check",
    platformEyebrow: "OPERATING PLATFORMS",
    platformTitle: "Compatible operating platforms.",
    platformText:
      "The Car Plus-category EV may be used for Car Plus or Car Standard services on Grab, subject to account activation, service availability, operating area, and platform policies. It may also be used on other compatible mobility or delivery platforms.",
    platformNote:
      "Account activation, service categories, order availability, and operating areas are determined by each platform. AutoRev does not guarantee account activation, order volume, or earnings. Mentioning a platform does not imply a partnership or endorsement unless officially stated.",
    docsTitle: "Documents for initial verification.",
    docsText:
      "After the initial documents are reviewed, the process continues with a program briefing, account preparation, training if needed, and vehicle preparation.",
    security: "AutoRev will never ask for your platform account password or OTP code.",
    statusEyebrow: "SERVICE STATUS",
    statusTitle: "Active coverage and development.",
    statuses: [
      ["INCLUDED IN THE PROGRAM", "Vehicle, ownership path, payment-free days off, meal benefit, charging, and service, maintenance, and insurance under the terms."],
      ["SUBJECT TO VERIFICATION / TERMS", "Account activation, platform categories, service, maintenance, insurance scope, and charging usage."],
      ["BEING DEVELOPED", "BPJS, food booths or canteens, driver community, and family gatherings. These are not active benefits until confirmed."],
    ],
    operationEyebrow: "OPERATING TERMS",
    operationTitle: "Core operating terms.",
    operations: [
      ["Payment-free days off", "Regular includes 1 and Premium 4 days off per month. No daily payment is due on those designated days."],
      ["Overdue payments", "After three overdue days, the vehicle is temporarily disabled until the obligation is settled."],
      ["Operating area", "Jabodetabek is the priority area. Out-of-town travel requires prior approval and confirmation."],
      ["Registered driver only", "The vehicle may not be transferred or used by anyone else without AutoRev approval."],
      ["Vehicle care", "Drivers must maintain the vehicle’s condition, cleanliness, and security."],
      ["Incidents or accidents", "Damage, incidents, or accidents must be reported to the AutoRev team immediately."],
    ],
    faqEyebrow: "PROGRAM INFORMATION",
    faqTitle: "What to understand before applying.",
    faqs: [
      ["Will the EV actually become mine?", "The program is designed for ownership transfer after the five-year term, all obligations, final verification, and administration are completed under the contract."],
      ["Is there a deposit or down payment?", "No. Neither Regular nor Premium requires a security deposit or down payment."],
      ["Is there a final payoff?", "There is no ownership balloon payment at the end. Any outstanding program obligations must still be settled before ownership transfer."],
      ["Are days off payment-free?", "Yes. Regular includes 1 and Premium 4 payment-free days off each month."],
      ["Can beginners apply?", "Yes. Approximately one week of training is available when needed, including EV familiarization and account preparation."],
      ["Can I use my existing account?", "Yes, as long as the account and vehicle meet the relevant platform requirements."],
      ["How long is free charging available?", "Free charging is available through 2029 under the program terms. Timing and mechanics are explained in the contract."],
      ["How is the meal benefit provided?", "Initially, the benefit is provided as a meal allowance: twice weekly for Regular and four times weekly for Premium. Food booths or canteens are planned in stages."],
      ["Are BPJS and community benefits active?", "BPJS is being prepared in stages. The driver community and family gatherings are also still being developed and are not active benefits until confirmed."],
      ["What happens if a payment is overdue?", "If payments are overdue for three days, the vehicle is temporarily disabled until the obligation is settled."],
      ["Can I drive out of town or let someone else drive?", "Travel outside Jabodetabek needs prior approval. The vehicle may not be transferred or used by anyone else without AutoRev approval."],
      ["What if I leave before five years?", "Rights, obligations, and consequences of early exit follow the contract. The team will explain them before you sign."],
    ],
    terms: [
      ["3 days", "Overdue before temporary disablement"],
      ["Jabodetabek", "Priority operating area"],
      ["Approval", "Required for out-of-town use"],
    ],
    finalEyebrow: "AUTOREV FOUNDING DRIVER",
    finalTitle: "Review the program. Start when you are ready.",
    finalText:
      "Speak with AutoRev to confirm the program fits your operating needs.",
    finalCta: "Check Initial Eligibility",
    finalSecondary: "Ask on WhatsApp",
    disclaimer:
      "The Founding Driver program is subject to participant eligibility, unit availability, operating area, contract, and program terms. Ownership is transferred after the five-year term, all obligations, final verification, and transfer administration are completed. There is no security deposit or down payment and no end-of-term ownership balloon payment; any outstanding contractual obligations must still be settled. Free charging is available through 2029 under the program terms. AutoRev does not guarantee account activation, order volume, or earnings.",
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
        <div className={styles.roadLine}><i /><i /><i /></div>
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
              <li><Check />KTP</li>
              <li><Check />{locale === "id" ? "Kartu Keluarga" : "Family Card"}</li>
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

      <section className={styles.operations}>
        <div className={`container ${styles.sectionHead}`}>
          <RevealBlock>
            <span className={styles.sectionEyebrow}>{t.operationEyebrow}</span>
            <h2>{t.operationTitle}</h2>
          </RevealBlock>
        </div>
        <div className={`container ${styles.operationGrid}`}>
          {t.operations.map(([title, text], index) => {
            const Icon = [CalendarDays, Clock3, MapPinned, UserRoundCheck, Wrench, ShieldCheck][index];
            return (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: .25 }}
                transition={{ delay: (index % 4) * .045, duration: .42 }}
              >
                <span>0{index + 1}</span>
                <Icon />
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className={styles.terms}>
        <div className={`container ${styles.termGrid}`}>
          {t.terms.map(([value, label], index) => {
            const TermIcon = [CalendarDays, MapPinned, BadgeCheck][index];
            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: .97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * .05, duration: .4 }}
              >
                <TermIcon aria-hidden="true" />
                <strong>{value}</strong>
                <span>{label}</span>
              </motion.div>
            );
          })}
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
