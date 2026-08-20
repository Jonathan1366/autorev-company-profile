import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n";
import { ButtonLink } from "./button-link";
import { Reveal } from "./reveal";
import { ScrollStoryImage } from "./scroll-story-image";

function FeaturePoints({ points }: { points: string[] }) {
  return <ul className="priority-points">{points.map((point) => <li key={point}><Check size={18}/><span>{point}</span></li>)}</ul>;
}

export function HomeRental({ locale }: { locale: Locale }) {
  const points = locale === "id"
    ? ["Lepas kunci untuk mengatur rute sendiri.", "Dengan driver untuk perjalanan yang lebih santai.", "Tersedia untuk kebutuhan harian hingga bulanan.", "Beroperasi di wilayah Jabodetabek."]
    : ["Self drive and set your own route.", "Travel with a driver for a more relaxed journey.", "Available for daily through monthly needs.", "Operating across Greater Jakarta."];
  return (
    <section className="section priority-feature priority-feature--light" id="rental">
      <div className="container priority-feature__grid">
        <ScrollStoryImage className="priority-feature__visual" src="/images/autorev-rental-roadtrip-v3.png" alt={locale === "id" ? "Rombongan memulai perjalanan dengan kendaraan listrik" : "Friends beginning a journey in an electric vehicle"}/>
        <Reveal className="priority-feature__copy" delay={.08}>
          <span className="eyebrow">AUTOREV EV RENTAL</span>
          <h2>{locale === "id" ? "Sewa EV sesuai perjalanan Anda." : "Rent an EV for your journey."}</h2>
          <p>{locale === "id" ? "Beritahu tanggal, lokasi, dan durasi. Tim kami akan membantu mencocokkan kebutuhan Anda dengan unit yang tersedia." : "Share the date, location, and duration. Our team will help match your needs with an available vehicle."}</p>
          <FeaturePoints points={points}/>
          <ButtonLink href={localizePath(locale,"/autorev-rental")} variant="primary">{locale === "id" ? "Cek Pilihan Rental" : "Explore Rental Options"}</ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

export function HomeBusiness({ locale }: { locale: Locale }) {
  const points = locale === "id"
    ? ["Corporate lepas kunci.", "Corporate dengan driver.", "Pasokan unit untuk owner rental.", "Charging dan perawatan EV."]
    : ["Corporate self drive.", "Corporate with a driver.", "Vehicle supply for rental owners.", "EV charging and maintenance."];
  return (
    <section className="section priority-feature priority-feature--dark" id="business">
      <div className="container priority-feature__grid">
        <Reveal className="priority-feature__visual"><Image src="/images/autorev-corporate-ev-v2.png" alt={locale === "id" ? "Armada kendaraan listrik untuk operasional perusahaan" : "Electric vehicles ready for company operations"} fill sizes="(max-width: 900px) 100vw, 55vw" quality={92}/></Reveal>
        <Reveal className="priority-feature__copy" delay={.08}>
          <span className="eyebrow eyebrow--light">{locale === "id" ? "UNTUK PERUSAHAAN" : "FOR COMPANIES"}</span>
          <h2>{locale === "id" ? "Armada EV yang siap bekerja." : "An EV fleet ready to work."}</h2>
          <p>{locale === "id" ? "Ceritakan jumlah unit, durasi, dan kebutuhan penggunaan. Kami membantu menyiapkan pembahasan armada yang relevan." : "Share the fleet size, duration, and usage needs. We’ll help prepare a relevant fleet discussion."}</p>
          <FeaturePoints points={points}/>
          <ButtonLink href={localizePath(locale,"/autorev-business")} variant="light">{locale === "id" ? "Konsultasi Armada" : "Discuss Your Fleet"}</ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

export function HomeDriver({ locale }: { locale: Locale }) {
  const points = locale === "id"
    ? ["Mulai Rp300.000 per hari, masa program 5 tahun.", "Tanpa deposit / DP dan tanpa pelunasan akhir.", "Pilihan 1 atau 4 hari libur per bulan, bebas setoran.", "Benefit makan 2x atau 4x per minggu sesuai paket."]
    : ["From IDR 300,000 per day over a five-year program term.", "No deposit, down payment, or final balloon payment.", "Choose 1 or 4 payment-free days off each month.", "Two or four weekly meal benefits, depending on the plan."];
  return (
    <section className="section priority-feature priority-feature--light" id="founding-driver">
      <div className="container priority-feature__grid priority-feature__grid--reverse">
        <ScrollStoryImage className="priority-feature__visual" src="/images/autorev-driver-passenger-v3.png" alt={locale === "id" ? "Mitra driver kendaraan listrik mengantar penumpang" : "An electric vehicle driver partner taking a passenger"}/>
        <Reveal className="priority-feature__copy" delay={.08}>
          <span className="eyebrow">FOUNDING DRIVER</span>
          <h2>{locale === "id" ? "EV Rental untuk kerja. Dibuat untuk driver." : "EV rental for work. Built around drivers."}</h2>
          <p>{locale === "id" ? "Operasikan EV kategori Car Plus melalui program 5 tahun. Setelah kewajiban program dan verifikasi selesai, alih kepemilikan diproses sesuai kontrak." : "Operate a Car Plus-category EV through a five-year program. Once program obligations and verification are complete, ownership transfer is processed under the contract."}</p>
          <FeaturePoints points={points}/>
          <ButtonLink href={localizePath(locale,"/founding-driver#paket")} variant="primary">{locale === "id" ? "Lihat Paket Founding" : "Explore Founding Plans"}</ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

export function HomeRoadmap({ locale }: { locale: Locale }) {
  const stages = locale === "id" ? ["Unit EV", "Operasional Rental", "Laporan Bisnis"] : ["EV Fleet", "Rental Operations", "Business Reports"];
  return (
    <section className="section system-roadmap" id="ecosystem">
      <div className="container">
        <Reveal className="system-roadmap__head">
          <span className="eyebrow eyebrow--light">REVAUTO · {locale === "id" ? "SEDANG KAMI BANGUN" : "IN DEVELOPMENT"}</span>
          <span className="status-pill status-pill--dark">{locale === "id" ? "Dalam pengembangan" : "In development"}</span>
          <h2>{locale === "id" ? <>Satu sistem.<br/>Semua rental EV.</> : <>One system.<br/>Every EV rental.</>}</h2>
          <p>{locale === "id" ? "Kelola unit, booking, driver, charging, maintenance, invoice, dan laporan." : "Manage vehicles, bookings, drivers, charging, maintenance, invoices, and reporting."}</p>
        </Reveal>
        <Reveal className="system-roadmap__visual" delay={.08}>
          <Image src="/images/autorev-hyundai-ioniq5-real.jpg" alt={locale === "id" ? "Kendaraan listrik bergerak di jalan kota" : "An electric vehicle moving through the city"} fill sizes="100vw" quality={90}/>
          <div className="system-roadmap__shade"/>
          <div className="system-roadmap__stages">{stages.map((stage,index)=><div key={stage}><small>0{index+1}</small><strong>{stage}</strong>{index<stages.length-1&&<ArrowRight size={22}/>}</div>)}</div>
        </Reveal>
        <ButtonLink href={localizePath(locale,"/revauto")} variant="ghost">{locale === "id" ? "Lihat RevAuto" : "Explore RevAuto"}</ButtonLink>
      </div>
    </section>
  );
}
