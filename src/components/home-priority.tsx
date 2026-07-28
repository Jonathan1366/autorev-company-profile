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
    ? ["Lepas kunci untuk bebas menentukan perjalanan.", "Dengan driver untuk perjalanan tanpa repot.", "Harian, mingguan, atau bulanan.", "100% kendaraan listrik."]
    : ["Self drive for complete freedom.", "With a driver for effortless travel.", "Daily, weekly, or monthly.", "100% electric vehicles."];
  return (
    <section className="section priority-feature priority-feature--light" id="rental">
      <div className="container priority-feature__grid">
        <ScrollStoryImage className="priority-feature__visual" src="/images/autorev-rental-roadtrip-v3.png" alt={locale === "id" ? "Rombongan memulai perjalanan dengan kendaraan listrik" : "Friends beginning a journey in an electric vehicle"}/>
        <Reveal className="priority-feature__copy" delay={.08}>
          <span className="eyebrow">AUTOREV EV RENTAL</span>
          <h2>{locale === "id" ? "Pergi bersama. Pulang bawa cerita." : "Go together. Bring back stories."}</h2>
          <p>{locale === "id" ? "Rental EV untuk perjalanan yang ingin dinikmati, bukan dipikirkan." : "EV rental for journeys worth enjoying, not overthinking."}</p>
          <FeaturePoints points={points}/>
          <ButtonLink href={localizePath(locale,"/autorev-rental")} variant="primary">{locale === "id" ? "Pilih Cara Sewa" : "Choose Your Rental"}</ButtonLink>
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
          <h2>{locale === "id" ? "EV siap kerja." : "EVs ready for work."}</h2>
          <p>{locale === "id" ? "Untuk corporate dan owner rental." : "For companies and rental owners."}</p>
          <FeaturePoints points={points}/>
          <ButtonLink href={localizePath(locale,"/autorev-business")} variant="light">{locale === "id" ? "Konsultasi Armada" : "Discuss Your Fleet"}</ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

export function HomeDriver({ locale }: { locale: Locale }) {
  const points = locale === "id"
    ? ["Mulai Rp300.000 per hari, tenor 5 tahun.", "Tanpa deposit / DP dan tanpa pelunasan akhir.", "2–3 hari libur per bulan, bebas setoran.", "Charging sampai 2029 serta servis dan asuransi sesuai program."]
    : ["From IDR 300,000 per day over five years.", "No deposit, down payment, or final balloon payment.", "2–3 payment-free days off each month.", "Charging through 2029, plus service and insurance under the program."];
  return (
    <section className="section priority-feature priority-feature--light" id="founding-driver">
      <div className="container priority-feature__grid priority-feature__grid--reverse">
        <ScrollStoryImage className="priority-feature__visual" src="/images/autorev-driver-passenger-v3.png" alt={locale === "id" ? "Mitra driver kendaraan listrik mengantar penumpang" : "An electric vehicle driver partner taking a passenger"}/>
        <Reveal className="priority-feature__copy" delay={.08}>
          <span className="eyebrow">FOUNDING DRIVER</span>
          <h2>{locale === "id" ? "Sewa. Jalan. Jadi Milik." : "Rent. Drive. Own."}</h2>
          <p>{locale === "id" ? "Cari penghasilan dengan EV kategori Car Plus hari ini. Setelah program lima tahun, seluruh kewajiban, dan verifikasi selesai, kepemilikan diproses sesuai kontrak." : "Pursue earnings with a Car Plus-category EV today. After the five-year program, all obligations, and verification are complete, ownership is processed under the contract."}</p>
          <FeaturePoints points={points}/>
          <ButtonLink href={localizePath(locale,"/founding-driver#paket")} variant="primary">{locale === "id" ? "Bandingkan Regular & Premium" : "Compare Regular & Premium"}</ButtonLink>
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
