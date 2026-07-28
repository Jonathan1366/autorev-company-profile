"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  BatteryCharging,
  CalendarDays,
  CarFront,
  Check,
  ChevronRight,
  Clock3,
  FileCheck2,
  GraduationCap,
  HandCoins,
  MapPinned,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  Utensils,
  WalletCards,
  Wrench,
  X,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { Locale } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { EVCinematic } from "./ev-cinematic";
import styles from "./founding-driver-landing.module.css";

type Plan = {
  name: string;
  badge: string;
  price: string;
  description: string;
  accent: "cyan" | "violet";
  highlights: [string, string, string];
  benefits: string[];
  cta: string;
};

const copy = {
  id: {
    eyebrow: "PROGRAM FOUNDING DRIVER · ANGKATAN PERTAMA",
    title: ["Sewa.", "Jalan.", "Jadi Milik."],
    salesLine: "Cari penghasilan hari ini. Miliki EV Anda setelah program selesai.",
    intro:
      "Jalankan EV kategori Car Plus mulai Rp300.000 per hari. Tanpa deposit atau uang muka, tanpa pelunasan akhir. Kepemilikan diproses setelah tenor 5 tahun, seluruh kewajiban, dan verifikasi selesai sesuai kontrak.",
    heroCta: "Bandingkan Paket",
    eligibility: "Cek Kelayakan Saya",
    heroFacts: ["Mulai Rp300.000/hari", "Tenor 5 tahun", "Libur bebas setoran"],
    journey: ["Daftar", "Beroperasi", "Tuntaskan", "Jadi milik"],
    priceEyebrow: "PAKET FOUNDING DRIVER",
    priceTitle: "Pilih ritme kerja yang paling cocok.",
    priceText:
      "Dua paket, satu tujuan: menuntaskan program menuju EV milik Anda.",
    plans: [
      {
        name: "Founding Regular",
        badge: "SETORAN LEBIH RINGAN",
        price: "Rp300.000",
        description: "Untuk memulai dengan setoran harian yang lebih ringan.",
        accent: "cyan",
        highlights: ["2 hari", "1x / minggu", "5 tahun"],
        benefits: [
          "Program kepemilikan setelah tenor 5 tahun",
          "EV kategori Car Plus",
          "2 hari libur per bulan — bebas setoran",
          "Benefit makan 1x per minggu",
          "Gratis charging sampai 2029",
          "Training dan persiapan akun bila diperlukan",
          "Servis, maintenance, dan asuransi sesuai program",
          "Tanpa deposit atau uang muka",
          "Tanpa pelunasan akhir",
        ],
        cta: "Pilih Founding Regular",
      },
      {
        name: "Founding Premium",
        badge: "BENEFIT LEBIH LENGKAP",
        price: "Rp350.000",
        description: "Benefit mingguan lebih lengkap dan satu hari libur tambahan.",
        accent: "violet",
        highlights: ["3 hari", "4x / minggu", "5 tahun"],
        benefits: [
          "Program kepemilikan setelah tenor 5 tahun",
          "EV kategori Car Plus",
          "3 hari libur per bulan — bebas setoran",
          "Benefit makan 4x per minggu",
          "Gratis charging sampai 2029",
          "Training dan persiapan akun bila diperlukan",
          "Servis, maintenance, dan asuransi sesuai program",
          "Tanpa deposit atau uang muka",
          "Tanpa pelunasan akhir",
        ],
        cta: "Pilih Founding Premium",
      },
    ] satisfies Plan[],
    priceNote:
      "Setoran dibayar paling lambat pukul 22.00 WIB pada hari operasional. Hari libur sesuai paket bebas setoran. Detail jadwal libur, charging, servis, maintenance, dan asuransi mengikuti kontrak serta ketentuan program.",
    compareEyebrow: "BANDINGKAN DENGAN JELAS",
    compareTitle: "Tidak ada biaya besar yang disembunyikan di ujung.",
    compareText:
      "Perbedaan utama berada pada setoran harian, jumlah hari libur, dan benefit makan. Jalur kepemilikan serta benefit kendaraan utama berlaku pada kedua paket.",
    compareHead: ["Detail", "Founding Regular", "Founding Premium"],
    compareRows: [
      ["Setoran harian", "Rp300.000", "Rp350.000"],
      ["Tenor program", "5 tahun", "5 tahun"],
      ["Hari libur bebas setoran", "2 hari / bulan", "3 hari / bulan"],
      ["Benefit makan", "1x / minggu", "4x / minggu"],
      ["Deposit / uang muka", "Tidak ada", "Tidak ada"],
      ["Pelunasan akhir", "Tidak ada", "Tidak ada"],
      ["Charging", "Sampai 2029", "Sampai 2029"],
      ["Kendaraan", "EV Car Plus", "EV Car Plus"],
      ["Training", "Bila diperlukan", "Bila diperlukan"],
      ["Servis & asuransi", "Sesuai program", "Sesuai program"],
    ],
    sharedEyebrow: "BERLAKU UNTUK KEDUA PAKET",
    sharedTitle: "Yang Anda dapatkan, sejak perjalanan dimulai.",
    shared: [
      ["Jalur menuju kepemilikan", "Tuntaskan tenor 5 tahun dan seluruh kewajiban untuk proses pengalihan kepemilikan sesuai kontrak."],
      ["Tanpa biaya awal besar", "Tidak ada deposit atau uang muka, serta tidak ada pelunasan kepemilikan di akhir tenor."],
      ["Charging sampai 2029", "Charging gratis tersedia sampai tahun 2029 sesuai ketentuan program."],
      ["Perlindungan kendaraan", "Servis, maintenance, dan asuransi diberikan sesuai cakupan program."],
      ["Pendampingan untuk memulai", "Persiapan akun dan training tersedia bagi driver yang memerlukannya."],
      ["Hari libur benar-benar libur", "Dua atau tiga hari per bulan sesuai paket, tanpa kewajiban setoran pada hari tersebut."],
    ],
    stepsEyebrow: "DARI DAFTAR MENUJU MILIK",
    stepsTitle: "Satu perjalanan. Tujuh langkah yang transparan.",
    steps: [
      ["Pilih paket dan cek kelayakan", "Pilih Regular, Premium, atau konsultasikan kebutuhan Anda terlebih dahulu."],
      ["Siapkan dokumen", "KTP, Kartu Keluarga, dan SIM A aktif sebagai dokumen awal AutoRev."],
      ["Pelajari program dan kontrak", "Tim menjelaskan setoran, benefit, ketentuan operasional, serta proses kepemilikan."],
      ["Persiapan akun dan training", "Driver pemula mendapat pendampingan bila diperlukan; akun lama diperiksa kesesuaiannya."],
      ["Persiapan kendaraan", "EV kategori Car Plus disiapkan sebelum onboarding dan serah terima."],
      ["Beroperasi dan tuntaskan program", "Gunakan kendaraan sesuai ketentuan dan selesaikan kewajiban selama tenor lima tahun."],
      ["Verifikasi dan alih kepemilikan", "Setelah tenor dan kewajiban selesai, administrasi kepemilikan diproses sesuai kontrak."],
    ],
    profileEyebrow: "DUA TITIK MULAI",
    profileTitle: "Baru mulai atau sudah berpengalaman? Keduanya punya jalur.",
    beginner: {
      label: "DRIVER PEMULA",
      title: "Mulai dengan bekal yang benar.",
      text: "Bila diperlukan, AutoRev menyediakan training sekitar satu minggu, termasuk pengenalan EV, aturan operasional, dan persiapan akun.",
      cta: "Saya Driver Pemula",
    },
    experienced: {
      label: "DRIVER BERPENGALAMAN",
      title: "Akun lama tetap bisa berjalan.",
      text: "Gunakan akun yang sudah ada sepanjang akun dan kendaraan memenuhi ketentuan platform. Proses difokuskan pada verifikasi, onboarding, dan persiapan EV.",
      cta: "Saya Sudah Berpengalaman",
    },
    pathEyebrow: "PILIH JALUR AUTOREV",
    pathTitle: "Founding Driver berbeda dari rental perjalanan biasa.",
    paths: [
      ["PROGRAM DRIVER", "Sewa Jadi Milik", "Untuk driver yang ingin beroperasi dengan EV dan menuntaskan jalur kepemilikan 5 tahun.", "/founding-driver#paket", "Lihat paket driver"],
      ["UNTUK PERJALANAN", "EV Rental", "Untuk kebutuhan harian, mingguan, atau bulanan—lepas kunci maupun dengan driver.", "/autorev-rental", "Lihat rental perjalanan"],
      ["UNTUK PERUSAHAAN", "AutoRev Business", "Untuk kebutuhan armada dan operasional bisnis, corporate, atau owner rental.", "/autorev-business", "Lihat solusi bisnis"],
    ],
    platformEyebrow: "FLEKSIBEL UNTUK BEROPERASI",
    platformTitle: "Satu EV. Lebih banyak pilihan untuk mencari order.",
    platformText:
      "EV kategori Car Plus dapat digunakan pada layanan Car Plus maupun Car Standard di Grab sesuai aktivasi akun, ketersediaan layanan, wilayah, dan kebijakan platform. Kendaraan juga dapat digunakan pada platform mobilitas atau pengantaran lain yang sesuai.",
    platformNote:
      "Aktivasi akun, kategori layanan, ketersediaan order, dan wilayah mengikuti verifikasi serta kebijakan masing-masing platform. AutoRev tidak menjamin aktivasi akun, jumlah order, atau penghasilan. Penyebutan merek tidak menunjukkan kerja sama atau endorsement kecuali dinyatakan resmi.",
    docsTitle: "Tiga dokumen untuk memulai.",
    docsText:
      "Setelah dokumen awal diperiksa, proses dilanjutkan dengan penjelasan program, persiapan akun, training bila diperlukan, dan persiapan kendaraan.",
    security: "AutoRev tidak pernah meminta kata sandi atau kode OTP akun platform Anda.",
    statusEyebrow: "BENEFIT & PENGEMBANGAN",
    statusTitle: "Jelas mana yang termasuk, mana yang sedang dibangun.",
    statuses: [
      ["TERMASUK DALAM PROGRAM", "Kendaraan, jalur kepemilikan, hari libur bebas setoran, meal benefit, charging, serta servis, maintenance, dan asuransi sesuai ketentuan."],
      ["SESUAI VERIFIKASI / KETENTUAN", "Aktivasi akun, kategori layanan platform, cakupan servis, maintenance, asuransi, serta penggunaan charging."],
      ["DIKEMBANGKAN BERTAHAP", "BPJS, booth atau kantin, paguyuban driver, dan family gathering. Belum dianggap benefit aktif sebelum dikonfirmasi."],
    ],
    operationEyebrow: "KETENTUAN OPERASIONAL",
    operationTitle: "Aturannya jelas sebelum Anda mulai jalan.",
    operations: [
      ["Setoran harian", "Dibayarkan setiap hari operasional paling lambat pukul 22.00 WIB."],
      ["Hari libur bebas setoran", "Regular mendapat 2 hari dan Premium 3 hari libur per bulan. Tidak ada setoran pada hari libur sesuai paket."],
      ["Setoran tertunggak", "Apabila setoran tertunggak selama 3 hari, kendaraan dinonaktifkan sementara sampai kewajiban diselesaikan."],
      ["Wilayah operasional", "Kendaraan diprioritaskan beroperasi di Jabodetabek. Perjalanan luar kota memerlukan izin dan konfirmasi."],
      ["Driver terdaftar", "Kendaraan tidak boleh dipindahtangankan atau digunakan orang lain tanpa persetujuan AutoRev."],
      ["Perawatan kendaraan", "Driver wajib menjaga kondisi, kebersihan, dan keamanan kendaraan."],
      ["Insiden atau kecelakaan", "Kerusakan, insiden, atau kecelakaan wajib segera dilaporkan kepada tim AutoRev."],
    ],
    faqEyebrow: "JAWABAN TANPA PUTAR-PUTAR",
    faqTitle: "Sebelum mendaftar, pastikan semuanya jelas.",
    faqs: [
      ["Apakah kendaraan benar-benar menjadi milik saya?", "Program dirancang untuk pengalihan kepemilikan setelah tenor 5 tahun, seluruh kewajiban, verifikasi akhir, dan proses administrasi selesai sesuai kontrak."],
      ["Apakah ada deposit atau uang muka?", "Tidak. Regular dan Premium tidak memerlukan deposit atau uang muka."],
      ["Apakah ada pelunasan di akhir tenor?", "Tidak ada pelunasan kepemilikan atau balloon payment di akhir tenor. Kewajiban program yang masih tertunggak tetap harus diselesaikan sebelum pengalihan kepemilikan."],
      ["Apakah hari libur tetap harus membayar setoran?", "Tidak. Regular mendapat 2 hari dan Premium 3 hari libur bebas setoran setiap bulan."],
      ["Saya belum pernah menjadi driver. Apakah bisa mendaftar?", "Bisa. Training sekitar satu minggu tersedia apabila diperlukan, termasuk pengenalan EV dan persiapan akun."],
      ["Apakah akun lama tetap bisa digunakan?", "Bisa, sepanjang akun dan kendaraan memenuhi ketentuan platform terkait."],
      ["Apakah saya pasti mendapat order atau penghasilan?", "Tidak. Aktivasi, order, wilayah, jam operasi, dan penghasilan mengikuti aktivitas driver, kondisi pasar, serta kebijakan masing-masing platform."],
      ["Sampai kapan charging gratis?", "Charging gratis tersedia sampai tahun 2029 sesuai ketentuan program. Detail periode dan mekanismenya dijelaskan dalam kontrak."],
      ["Bagaimana benefit makan diberikan?", "Pada tahap awal, benefit diberikan dalam bentuk uang makan: 1x per minggu untuk Regular dan 4x per minggu untuk Premium. Booth atau kantin direncanakan bertahap."],
      ["Apakah BPJS dan paguyuban sudah tersedia?", "BPJS sedang dipersiapkan bertahap. Paguyuban driver dan family gathering juga masih dalam pengembangan dan belum dianggap benefit aktif sampai dikonfirmasi."],
      ["Apa yang terjadi bila setoran tertunggak?", "Jika setoran tertunggak selama 3 hari, kendaraan dinonaktifkan sementara sampai kewajiban diselesaikan."],
      ["Bolehkah kendaraan dibawa keluar kota atau digunakan orang lain?", "Keluar Jabodetabek memerlukan izin dan konfirmasi. Kendaraan tidak boleh dipindahtangankan atau digunakan orang lain tanpa persetujuan AutoRev."],
      ["Bagaimana jika berhenti sebelum lima tahun?", "Hak, kewajiban, dan konsekuensi penghentian sebelum tenor mengikuti kontrak. Tim akan menjelaskannya sebelum program ditandatangani."],
    ],
    terms: [
      ["22.00 WIB", "Batas setoran harian"],
      ["3 hari", "Tunggakan sebelum nonaktif sementara"],
      ["Jabodetabek", "Wilayah operasi prioritas"],
      ["Izin wajib", "Untuk penggunaan luar kota"],
    ],
    finalEyebrow: "FOUNDING DRIVER AUTOREV",
    finalTitle: "Dari perjalanan pertama menuju EV milik sendiri.",
    finalText:
      "Pilih paket sekarang atau bicara dengan tim terlebih dahulu. Tidak perlu langsung memutuskan sebelum semua ketentuan Anda pahami.",
    finalCta: "Cek Kelayakan Awal",
    finalSecondary: "Tanya via WhatsApp",
    disclaimer:
      "Program Founding Driver mengikuti kelayakan peserta, ketersediaan unit, wilayah operasional, kontrak, dan ketentuan program. Kepemilikan dialihkan setelah tenor 5 tahun, seluruh kewajiban, verifikasi akhir, dan administrasi pengalihan selesai. Tidak ada deposit atau uang muka dan tidak ada pelunasan kepemilikan di akhir tenor; kewajiban yang masih tertunggak berdasarkan kontrak tetap harus diselesaikan. Charging gratis berlaku sampai tahun 2029 sesuai ketentuan program. AutoRev tidak menjamin aktivasi akun, jumlah order, atau penghasilan.",
  },
  en: {
    eyebrow: "AUTOREV FOUNDING DRIVER · FIRST COHORT",
    title: ["Rent.", "Drive.", "Own."],
    salesLine: "Pursue earnings today. Own your EV when the program is complete.",
    intro:
      "Drive a Car Plus-category EV from IDR 300,000 per day. No security deposit or down payment, and no end-of-term balloon payment. Ownership is transferred after the five-year term, all obligations, and verification are completed under the contract.",
    heroCta: "Compare Plans",
    eligibility: "Check My Eligibility",
    heroFacts: ["From IDR 300,000/day", "5-year program", "Payment-free days off"],
    journey: ["Apply", "Operate", "Complete", "Own"],
    priceEyebrow: "FOUNDING DRIVER PLANS",
    priceTitle: "Choose the rhythm that fits you.",
    priceText: "Two plans, one goal: complete the path toward owning your EV.",
    plans: [
      {
        name: "Founding Regular",
        badge: "LOWER DAILY PAYMENT",
        price: "IDR 300,000",
        description: "A lighter daily payment to begin your ownership journey.",
        accent: "cyan",
        highlights: ["2 days", "1x / week", "5 years"],
        benefits: [
          "Ownership path after the five-year term",
          "Car Plus-category EV",
          "2 days off per month — no payment due",
          "1 meal benefit per week",
          "Free charging through 2029",
          "Training and account preparation when needed",
          "Service, maintenance, and insurance under the program",
          "No security deposit or down payment",
          "No end-of-term balloon payment",
        ],
        cta: "Choose Founding Regular",
      },
      {
        name: "Founding Premium",
        badge: "MORE COMPLETE BENEFITS",
        price: "IDR 350,000",
        description: "More weekly benefits and one additional day off.",
        accent: "violet",
        highlights: ["3 days", "4x / week", "5 years"],
        benefits: [
          "Ownership path after the five-year term",
          "Car Plus-category EV",
          "3 days off per month — no payment due",
          "4 meal benefits per week",
          "Free charging through 2029",
          "Training and account preparation when needed",
          "Service, maintenance, and insurance under the program",
          "No security deposit or down payment",
          "No end-of-term balloon payment",
        ],
        cta: "Choose Founding Premium",
      },
    ] satisfies Plan[],
    priceNote:
      "Daily program payments are due by 10:00 PM WIB on operating days. No daily payment is due on the plan’s designated days off. Scheduling, charging, service, maintenance, and insurance details are governed by the contract and program terms.",
    compareEyebrow: "COMPARE WITH CLARITY",
    compareTitle: "No large cost hidden at the finish line.",
    compareText:
      "The main differences are the daily payment, number of days off, and meal benefits. The ownership path and core vehicle benefits apply to both plans.",
    compareHead: ["Detail", "Founding Regular", "Founding Premium"],
    compareRows: [
      ["Daily payment", "IDR 300,000", "IDR 350,000"],
      ["Program term", "5 years", "5 years"],
      ["Payment-free days off", "2 days / month", "3 days / month"],
      ["Meal benefit", "1x / week", "4x / week"],
      ["Deposit / down payment", "None", "None"],
      ["Final balloon payment", "None", "None"],
      ["Charging", "Through 2029", "Through 2029"],
      ["Vehicle", "Car Plus EV", "Car Plus EV"],
      ["Training", "When needed", "When needed"],
      ["Service & insurance", "Under program terms", "Under program terms"],
    ],
    sharedEyebrow: "INCLUDED IN BOTH PLANS",
    sharedTitle: "What comes with the journey.",
    shared: [
      ["A clear path to ownership", "Complete the five-year term and all obligations for ownership transfer under the contract."],
      ["No large upfront payment", "No deposit or down payment and no ownership balloon payment at the end."],
      ["Charging through 2029", "Free charging is available through 2029 under the program terms."],
      ["Vehicle protection", "Service, maintenance, and insurance are provided within the program scope."],
      ["Help getting started", "Account preparation and training are available for drivers who need them."],
      ["Days off are truly off", "Two or three days each month, based on plan, with no daily payment due."],
    ],
    stepsEyebrow: "FROM APPLYING TO OWNING",
    stepsTitle: "One journey. Seven transparent steps.",
    steps: [
      ["Choose a plan and check eligibility", "Choose Regular, Premium, or discuss your needs first."],
      ["Prepare your documents", "Indonesian ID card, Family Card, and a valid Class A licence as initial AutoRev documents."],
      ["Review the program and contract", "The team explains payments, benefits, operating rules, and ownership transfer."],
      ["Account preparation and training", "New drivers get help when needed; existing accounts are checked for eligibility."],
      ["Vehicle preparation", "A Car Plus-category EV is prepared before onboarding and handover."],
      ["Operate and complete the program", "Use the vehicle under the rules and complete all obligations over five years."],
      ["Final verification and ownership transfer", "Once complete, the ownership administration proceeds under the contract."],
    ],
    profileEyebrow: "TWO STARTING POINTS",
    profileTitle: "New to driving or already experienced? There is a path for both.",
    beginner: {
      label: "NEW DRIVER",
      title: "Start with the right foundation.",
      text: "When needed, AutoRev provides approximately one week of training covering EV familiarization, operating rules, and account preparation.",
      cta: "I Am a New Driver",
    },
    experienced: {
      label: "EXPERIENCED DRIVER",
      title: "Keep using an eligible account.",
      text: "Use your existing account as long as the account and vehicle meet the platform rules. We focus on verification, onboarding, and preparing the EV.",
      cta: "I Am Experienced",
    },
    pathEyebrow: "CHOOSE YOUR AUTOREV PATH",
    pathTitle: "Founding Driver is different from a travel rental.",
    paths: [
      ["DRIVER PROGRAM", "Rent to Own", "For drivers who want to operate an EV and complete a five-year ownership path.", "/founding-driver#paket", "View driver plans"],
      ["FOR TRAVEL", "EV Rental", "For daily, weekly, or monthly travel—self drive or with a driver.", "/autorev-rental", "View travel rental"],
      ["FOR COMPANIES", "AutoRev Business", "For corporate fleets, business operations, and rental owners.", "/autorev-business", "View business solutions"],
    ],
    platformEyebrow: "FLEXIBLE WAYS TO OPERATE",
    platformTitle: "One EV. More ways to pursue orders.",
    platformText:
      "The Car Plus-category EV may be used for Car Plus or Car Standard services on Grab, subject to account activation, service availability, operating area, and platform policies. It may also be used on other compatible mobility or delivery platforms.",
    platformNote:
      "Account activation, service categories, order availability, and operating areas are determined by each platform. AutoRev does not guarantee account activation, order volume, or earnings. Mentioning a platform does not imply a partnership or endorsement unless officially stated.",
    docsTitle: "Three documents to get started.",
    docsText:
      "After the initial documents are reviewed, the process continues with a program briefing, account preparation, training if needed, and vehicle preparation.",
    security: "AutoRev will never ask for your platform account password or OTP code.",
    statusEyebrow: "BENEFITS & DEVELOPMENT",
    statusTitle: "See what is included and what is still being built.",
    statuses: [
      ["INCLUDED IN THE PROGRAM", "Vehicle, ownership path, payment-free days off, meal benefit, charging, and service, maintenance, and insurance under the terms."],
      ["SUBJECT TO VERIFICATION / TERMS", "Account activation, platform categories, service, maintenance, insurance scope, and charging usage."],
      ["BEING DEVELOPED", "BPJS, food booths or canteens, driver community, and family gatherings. These are not active benefits until confirmed."],
    ],
    operationEyebrow: "OPERATING TERMS",
    operationTitle: "Know the rules before you start driving.",
    operations: [
      ["Daily program payment", "Due on every operating day by 10:00 PM WIB."],
      ["Payment-free days off", "Regular includes 2 and Premium 3 days off per month. No daily payment is due on those designated days."],
      ["Overdue payments", "After three overdue days, the vehicle is temporarily disabled until the obligation is settled."],
      ["Operating area", "Jabodetabek is the priority area. Out-of-town travel requires prior approval and confirmation."],
      ["Registered driver only", "The vehicle may not be transferred or used by anyone else without AutoRev approval."],
      ["Vehicle care", "Drivers must maintain the vehicle’s condition, cleanliness, and security."],
      ["Incidents or accidents", "Damage, incidents, or accidents must be reported to the AutoRev team immediately."],
    ],
    faqEyebrow: "STRAIGHT ANSWERS",
    faqTitle: "Make sure everything is clear before you apply.",
    faqs: [
      ["Will the EV actually become mine?", "The program is designed for ownership transfer after the five-year term, all obligations, final verification, and administration are completed under the contract."],
      ["Is there a deposit or down payment?", "No. Neither Regular nor Premium requires a security deposit or down payment."],
      ["Is there a final payoff?", "There is no ownership balloon payment at the end. Any outstanding program obligations must still be settled before ownership transfer."],
      ["Are days off payment-free?", "Yes. Regular includes 2 and Premium 3 payment-free days off each month."],
      ["Can beginners apply?", "Yes. Approximately one week of training is available when needed, including EV familiarization and account preparation."],
      ["Can I use my existing account?", "Yes, as long as the account and vehicle meet the relevant platform requirements."],
      ["Are orders or earnings guaranteed?", "No. Activation, orders, area, hours, and earnings depend on driver activity, market conditions, and each platform’s policies."],
      ["How long is free charging available?", "Free charging is available through 2029 under the program terms. Timing and mechanics are explained in the contract."],
      ["How is the meal benefit provided?", "Initially, the benefit is provided as a meal allowance: once weekly for Regular and four times weekly for Premium. Food booths or canteens are planned in stages."],
      ["Are BPJS and community benefits active?", "BPJS is being prepared in stages. The driver community and family gatherings are also still being developed and are not active benefits until confirmed."],
      ["What happens if a payment is overdue?", "If payments are overdue for three days, the vehicle is temporarily disabled until the obligation is settled."],
      ["Can I drive out of town or let someone else drive?", "Travel outside Jabodetabek needs prior approval. The vehicle may not be transferred or used by anyone else without AutoRev approval."],
      ["What if I leave before five years?", "Rights, obligations, and consequences of early exit follow the contract. The team will explain them before you sign."],
    ],
    terms: [
      ["10 PM WIB", "Daily payment deadline"],
      ["3 days", "Overdue before temporary disablement"],
      ["Jabodetabek", "Priority operating area"],
      ["Approval", "Required for out-of-town use"],
    ],
    finalEyebrow: "AUTOREV FOUNDING DRIVER",
    finalTitle: "From the first drive toward owning your EV.",
    finalText:
      "Choose a plan now or speak with the team first. You do not have to decide until you understand every term.",
    finalCta: "Check Initial Eligibility",
    finalSecondary: "Ask on WhatsApp",
    disclaimer:
      "The Founding Driver program is subject to participant eligibility, unit availability, operating area, contract, and program terms. Ownership is transferred after the five-year term, all obligations, final verification, and transfer administration are completed. There is no security deposit or down payment and no end-of-term ownership balloon payment; any outstanding contractual obligations must still be settled. Free charging is available through 2029 under the program terms. AutoRev does not guarantee account activation, order volume, or earnings.",
  },
} as const;

const sharedIcons = [CarFront, WalletCards, BatteryCharging, ShieldCheck, GraduationCap, CalendarDays];
const platforms = ["Grab", "GoCar", "Maxim", "inDrive", "Lalamove", "Shopee"];

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
            className={styles.heroJourney}
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: .68, duration: .65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>01</span>
            {t.journey.map((step, index) => (
              <div key={step}>
                <i />
                <small>{step}</small>
                {index < t.journey.length - 1 && <ChevronRight aria-hidden="true" />}
              </div>
            ))}
          </motion.div>

          <motion.div
            className={styles.heroCopy}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .82, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.eyebrow}><i />{t.eyebrow}</span>
            <h1 aria-label={t.title.join(" ")}>
              {t.title.map((line, index) => (
                <span key={line} className={index === t.title.length - 1 ? styles.heroSerif : undefined}>
                  {line}
                </span>
              ))}
            </h1>
            <strong className={styles.salesLine}>{t.salesLine}</strong>
            <p>{t.intro}</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#paket">{t.heroCta}<ArrowDown /></a>
              <Link className={styles.ghostButton} href={localizePath(locale, "/contact?type=driver")}>{t.eligibility}<ArrowRight /></Link>
            </div>
            <div className={styles.heroFacts}>
              {t.heroFacts.map((fact) => <span key={fact}><Check />{fact}</span>)}
            </div>
          </motion.div>
        </div>
        <div className={styles.roadLine}><i /><i /><i /></div>
      </section>

      <section className={styles.pricing} id="paket">
        <div className={`container ${styles.sectionHead}`}>
          <RevealBlock>
            <span className={styles.sectionEyebrow}>{t.priceEyebrow}</span>
            <h2>{t.priceTitle}</h2>
            <p>{t.priceText}</p>
          </RevealBlock>
        </div>
        <div className={`container ${styles.pricingRail}`} aria-label={t.priceTitle}>
          {t.plans.map((plan, index) => (
            <PlanCard key={plan.name} plan={plan} locale={locale} index={index} />
          ))}
        </div>
        <p className={`container ${styles.pricingNote}`}>* {t.priceNote}</p>
      </section>

      <section className={styles.shared}>
        <div className={`container ${styles.sharedLayout}`}>
          <RevealBlock className={styles.stickyHead}>
            <span className={styles.sectionEyebrow}>{t.sharedEyebrow}</span>
            <h2>{t.sharedTitle}</h2>
            <div className={styles.noFees}>
              <span><X />0 deposit / DP</span>
              <span><X />0 pelunasan akhir</span>
            </div>
          </RevealBlock>
          <div className={styles.sharedGrid}>
            {t.shared.map(([title, text], index) => {
              const Icon = sharedIcons[index];
              return (
                <motion.article
                  key={title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: .3 }}
                  transition={{ delay: (index % 2) * .06, duration: .48 }}
                >
                  <span>0{index + 1}</span>
                  <Icon />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <EVCinematic locale={locale} scene="driver" />

      <section className={styles.compare}>
        <div className={`container ${styles.compareLayout}`}>
          <RevealBlock className={styles.compareIntro}>
            <span className={styles.sectionEyebrow}>{t.compareEyebrow}</span>
            <h2>{t.compareTitle}</h2>
            <p>{t.compareText}</p>
          </RevealBlock>
          <RevealBlock className={styles.tableShell}>
            <div className={styles.comparisonTable} role="table" aria-label={t.compareEyebrow}>
              <div className={`${styles.tableRow} ${styles.tableHead}`} role="row">
                {t.compareHead.map((cell) => <strong key={cell} role="columnheader">{cell}</strong>)}
              </div>
              {t.compareRows.map((row) => (
                <div className={styles.tableRow} role="row" key={row[0]}>
                  <strong role="rowheader">{row[0]}</strong>
                  <span role="cell">{row[1]}</span>
                  <span role="cell">{row[2]}</span>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      <section className={styles.steps}>
        <div className={`container ${styles.sectionHead}`}>
          <RevealBlock>
            <span className={styles.sectionEyebrow}>{t.stepsEyebrow}</span>
            <h2>{t.stepsTitle}</h2>
          </RevealBlock>
        </div>
        <div className={`container ${styles.stepsGrid}`}>
          {t.steps.map(([title, text], index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: .25 }}
              transition={{ delay: (index % 3) * .055, duration: .5 }}
            >
              <span>0{index + 1}</span>
              <div className={styles.stepLine}><i /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className={styles.profiles}>
        <div className={`container ${styles.sectionHead}`}>
          <RevealBlock>
            <span className={styles.sectionEyebrow}>{t.profileEyebrow}</span>
            <h2>{t.profileTitle}</h2>
          </RevealBlock>
        </div>
        <div className={`container ${styles.profileGrid}`}>
          <ProfileCard icon={GraduationCap} profile={t.beginner} locale={locale} value="driver-baru" />
          <ProfileCard icon={UserRoundCheck} profile={t.experienced} locale={locale} value="driver-berpengalaman" />
        </div>
      </section>

      <section className={styles.pathChoice}>
        <div className={`container ${styles.pathChoiceHead}`}>
          <RevealBlock>
            <span className={styles.sectionEyebrow}>{t.pathEyebrow}</span>
            <h2>{t.pathTitle}</h2>
          </RevealBlock>
        </div>
        <div className={`container ${styles.pathChoiceGrid}`}>
          {t.paths.map(([label, title, text, href, cta], index) => (
            <motion.article
              key={title}
              className={index === 0 ? styles.pathFeatured : undefined}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: .25 }}
              transition={{ delay: index * .055, duration: .46 }}
            >
              <span>0{index + 1} · {label}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <Link href={localizePath(locale, href)}>{cta}<ArrowRight /></Link>
            </motion.article>
          ))}
        </div>
      </section>

      <section className={styles.platforms}>
        <div className={`container ${styles.platformLayout}`}>
          <RevealBlock className={styles.platformCopy}>
            <span className={styles.sectionEyebrow}>{t.platformEyebrow}</span>
            <h2>{t.platformTitle}</h2>
            <p>{t.platformText}</p>
            <div className={styles.platformPills}>
              {platforms.map((platform) => <span key={platform}>{platform}</span>)}
            </div>
            <small>{t.platformNote}</small>
          </RevealBlock>
          <RevealBlock className={styles.documentCard}>
            <FileCheck2 />
            <span>{locale === "id" ? "DOKUMEN AWAL AUTOREV" : "INITIAL AUTOREV DOCUMENTS"}</span>
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
            const Icon = [HandCoins, CalendarDays, Clock3, MapPinned, UserRoundCheck, Wrench, ShieldCheck][index];
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
            const TermIcon = [Clock3, CalendarDays, MapPinned, BadgeCheck][index];
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
                  <span>0{index + 1}</span>
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

function PlanCard({ plan, locale, index }: { plan: Plan; locale: Locale; index: number }) {
  const reduceMotion = useReducedMotion();
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const normalizedX = useMotionValue(0);
  const normalizedY = useMotionValue(0);
  const rotateX = useSpring(useTransform(normalizedY, [-.5, .5], [2.1, -2.1]), { stiffness: 250, damping: 26 });
  const rotateY = useSpring(useTransform(normalizedX, [-.5, .5], [-2.1, 2.1]), { stiffness: 250, damping: 26 });

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (reduceMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    glowX.set(x);
    glowY.set(y);
    normalizedX.set(x / bounds.width - .5);
    normalizedY.set(y / bounds.height - .5);
  }

  function handlePointerLeave() {
    normalizedX.set(0);
    normalizedY.set(0);
  }

  const query = new URLSearchParams({ type: "driver", package: plan.name }).toString();

  return (
    <motion.article
      className={`${styles.planCard} ${plan.accent === "violet" ? styles.planCardPremium : ""}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}
      initial={{ opacity: 0, x: index === 0 ? -22 : 22 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: .2 }}
      transition={{ duration: .58, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.i className={styles.spotlight} aria-hidden="true" style={{ x: glowX, y: glowY }} />
      <div className={styles.planTop}>
        <span>{plan.badge}</span>
        <Sparkles />
      </div>
      <h3>{plan.name}</h3>
      <p>{plan.description}</p>
      <div className={styles.price}>
        <strong>{plan.price}</strong>
        <span>/ {locale === "id" ? "hari" : "day"}*</span>
      </div>
      <div className={styles.planHighlights}>
        <div><CalendarDays /><strong>{plan.highlights[0]}</strong><span>{locale === "id" ? "bebas setoran / bulan" : "payment-free / month"}</span></div>
        <div><Utensils /><strong>{plan.highlights[1]}</strong><span>{locale === "id" ? "benefit makan" : "meal benefit"}</span></div>
        <div><CarFront /><strong>{plan.highlights[2]}</strong><span>{locale === "id" ? "menuju kepemilikan" : "path to ownership"}</span></div>
      </div>
      <ul>
        {plan.benefits.map((benefit) => <li key={benefit}><Check />{benefit}</li>)}
      </ul>
      <Link href={`${localizePath(locale, "/contact")}?${query}`} className={styles.planCta}>{plan.cta}<ArrowRight /></Link>
    </motion.article>
  );
}

function ProfileCard({
  icon: Icon,
  profile,
  locale,
  value,
}: {
  icon: typeof GraduationCap;
  profile: { label: string; title: string; text: string; cta: string };
  locale: Locale;
  value: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: .25 }}
      transition={{ duration: .5 }}
    >
      <div><Icon /><span>{profile.label}</span></div>
      <h3>{profile.title}</h3>
      <p>{profile.text}</p>
      <Link href={`${localizePath(locale, "/contact")}?type=driver&experience=${value}`}>{profile.cta}<ArrowRight /></Link>
    </motion.article>
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
