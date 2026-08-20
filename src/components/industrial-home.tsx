"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, Check, ChevronRight, CircleDot,
  Construction, Gauge, Layers3, MapPin, PackageCheck, Search, ShieldCheck,
  Sparkles, Tractor, Truck, Wrench, X,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n";
import {
  catalogCount, catalogImage, industrialCatalog, type CatalogItem,
} from "@/lib/industrial-catalog";
import styles from "./industrial-home.module.css";

type Line = "all" | CatalogItem["kbli"];
type Sector = "logistics" | "construction" | "mining" | "industrial";

const featuredIds = [
  "lowbed-lowboy-trailer", "wingbox", "excavator-20t",
  "dump-truck-on-road", "diesel-forklift", "mobile-crane-35-50t",
];

const lineLabels: Record<Line, { id: string; en: string }> = {
  all: { id: "Semua Unit", en: "All Equipment" },
  "77100": { id: "Truck & Transport", en: "Truck & Transport" },
  "77393": { id: "Konstruksi & Lifting", en: "Construction & Lifting" },
  "77395": { id: "Mining & Quarry", en: "Mining & Quarry" },
};

const packageCopy: Record<Sector, { title: string; units: string[]; note: string }> = {
  logistics: {
    title: "Distribution Ready",
    units: ["Wingbox / CDD", "Forklift", "Prime mover"],
    note: "Untuk arus barang warehouse, factory-to-DC, dan distribusi regional.",
  },
  construction: {
    title: "Earthwork Start",
    units: ["Excavator 20T", "Dump truck", "Lowbed"],
    note: "Paket awal untuk cut & fill, site preparation, serta mobilisasi unit.",
  },
  mining: {
    title: "Mine Support Core",
    units: ["Motor grader", "Water truck", "LV 4×4"],
    note: "Support fleet untuk haul-road, dust suppression, dan mobilitas site.",
  },
  industrial: {
    title: "Plant Handling",
    units: ["Diesel forklift", "Mobile crane", "Boom lift"],
    note: "Material handling dan lifting untuk plant, warehouse, dan shutdown work.",
  },
};

function scrollToCatalog() {
  document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function priorityLabel(priority: CatalogItem["priority"], locale: Locale) {
  const labels = {
    top: locale === "id" ? "Prioritas" : "Priority",
    easy: locale === "id" ? "Fast sourcing" : "Fast sourcing",
    standard: locale === "id" ? "Sesuai kebutuhan" : "On request",
    specialist: locale === "id" ? "Spesialis" : "Specialist",
  };
  return labels[priority];
}

export function IndustrialHome({ locale }: { locale: Locale }) {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [line, setLine] = useState<Line>("all");
  const [visible, setVisible] = useState(12);
  const [selected, setSelected] = useState<CatalogItem | null>(null);
  const [sector, setSector] = useState<Sector>("construction");
  const [duration, setDuration] = useState("1–3 bulan");

  const featured = featuredIds
    .map((id) => industrialCatalog.find((item) => item.id === id))
    .filter(Boolean) as CatalogItem[];

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return industrialCatalog.filter((item) => {
      const inLine = line === "all" || item.kbli === line;
      if (!needle) return inLine;
      const haystack = [item.name.id, item.name.en, item.category, item.summary.id, ...item.tags, ...item.useCases].join(" ").toLowerCase();
      return inLine && haystack.includes(needle);
    });
  }, [line, query]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const updateQuery = (value: string) => { setQuery(value); setVisible(12); };
  const updateLine = (value: Line) => { setLine(value); setVisible(12); };

  const copy = locale === "id" ? {
    eyebrow: "B2B RENTAL · SOURCING · FLEET TECHNOLOGY",
    titleA: "Armada dan alat",
    titleB: "untuk pekerjaan nyata.",
    heroText: "Dari kendaraan operasional dan truck, sampai heavy equipment, mining support, dan teknologi fleet—disusun sesuai lokasi, kapasitas, durasi, dan target operasi Anda.",
    browse: "Jelajahi 104 unit",
    project: "Susun kebutuhan proyek",
    searchPlaceholder: "Cari wingbox, excavator, crane, forklift...",
    find: "Cari unit",
  } : {
    eyebrow: "B2B RENTAL · SOURCING · FLEET TECHNOLOGY",
    titleA: "Fleet and equipment",
    titleB: "built for real work.",
    heroText: "From operational vehicles and trucks to heavy equipment, mining support, and fleet technology—configured around your location, capacity, duration, and operating target.",
    browse: "Explore 104 units",
    project: "Build a project request",
    searchPlaceholder: "Search wingbox, excavator, crane, forklift...",
    find: "Find equipment",
  };

  return <div className={styles.page}>
    <section className={styles.hero} id="top">
      <motion.div className={styles.heroMedia} initial={reduce ? false : { scale: 1.05 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}>
        <Image src="/images/catalog-lowbed-excavator.jpg" alt="Prime mover membawa excavator dengan lowbed" fill priority sizes="100vw" quality={90}/>
      </motion.div>
      <div className={styles.heroShade}/>
      <div className={`container ${styles.heroInner}`}>
        <motion.div className={styles.heroCopy} initial={reduce ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, delay: .12 }}>
          <span className={styles.kicker}><i/>{copy.eyebrow}</span>
          <h1><span>{copy.titleA}</span><strong>{copy.titleB}</strong></h1>
          <p>{copy.heroText}</p>
          <div className={styles.heroActions}>
            <button onClick={scrollToCatalog}>{copy.browse}<ArrowRight size={18}/></button>
            <Link href={localizePath(locale, "/contact?type=business")}>{copy.project}<ArrowUpRight size={17}/></Link>
          </div>
        </motion.div>

        <motion.div className={styles.heroStats} initial={reduce ? false : { opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7, delay: .4 }}>
          <div><span>01</span><strong>{catalogCount}+</strong><small>{locale === "id" ? "jenis unit & alat" : "equipment types"}</small></div>
          <div><span>02</span><strong>4 KBLI</strong><small>{locale === "id" ? "satu ekosistem B2B" : "one B2B ecosystem"}</small></div>
          <div><span>03</span><strong>R2R</strong><small>{locale === "id" ? "rental & sourcing fleksibel" : "flexible rental & sourcing"}</small></div>
        </motion.div>

        <motion.form className={styles.heroSearch} onSubmit={(event) => { event.preventDefault(); scrollToCatalog(); }} initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .55 }}>
          <Search size={21}/>
          <input value={query} onChange={(event) => updateQuery(event.target.value)} placeholder={copy.searchPlaceholder} aria-label={copy.searchPlaceholder}/>
          <button type="submit">{copy.find}<ArrowRight size={17}/></button>
        </motion.form>
      </div>
      <div className={styles.heroTicker}><span>AUTOREV EQUIPMENT MARKETPLACE</span><i/><span>VEHICLE → TRUCK → TRAILER → EQUIPMENT → TECHNOLOGY</span><i/><span>PROJECT-BASED SOLUTIONS</span></div>
    </section>

    <section className={styles.gateway} id="solutions">
      <div className="container">
        <div className={styles.sectionHead}>
          <div><span>01 · SOLUTION GATEWAY</span><h2>{locale === "id" ? "Mulai dari kebutuhan Anda." : "Start with your operation."}</h2></div>
          <p>{locale === "id" ? "Pilih lini bisnis, telusuri unit, lalu kirim scope proyek. Tema dan konten tiap lini dapat berkembang tanpa mengubah sistem utama." : "Choose a business line, explore equipment, then send the project scope. Every line can evolve without rebuilding the core system."}</p>
        </div>
        <div className={styles.gatewayGrid}>
          {[
            { code: "KBLI 77100", icon: Truck, title: locale === "id" ? "Vehicle & Transportation" : "Vehicle & Transportation", text: locale === "id" ? "Corporate vehicle, box truck, wingbox, prime mover, trailer, lowbed." : "Corporate vehicles, box trucks, wingbox, prime movers, trailers, and lowbeds.", line: "77100" as Line, tone: "blue" },
            { code: "KBLI 77393", icon: Construction, title: locale === "id" ? "Construction Equipment" : "Construction Equipment", text: locale === "id" ? "Excavator, dozer, loader, grader, crane, access equipment." : "Excavators, dozers, loaders, graders, cranes, and access equipment.", line: "77393" as Line, tone: "yellow" },
            { code: "KBLI 77395", icon: Tractor, title: locale === "id" ? "Mining & Quarry" : "Mining & Quarry", text: locale === "id" ? "Production, hauling, road support, processing, dan site utility." : "Production, hauling, road support, processing, and site utility.", line: "77395" as Line, tone: "black" },
            { code: "KBLI 58290", icon: Gauge, title: "Fleet Technology", text: locale === "id" ? "Monitoring, maintenance, utilization, work order, GPS, IoT, dan analytics." : "Monitoring, maintenance, utilization, work orders, GPS, IoT, and analytics.", line: "all" as Line, tone: "tech" },
          ].map((item, index) => {
            const Icon = item.icon;
            return <motion.button key={item.code} className={`${styles.gatewayCard} ${styles[`tone_${item.tone}`]}`} onClick={() => { if (item.code === "KBLI 58290") document.getElementById("technology")?.scrollIntoView({ behavior: "smooth" }); else { updateLine(item.line); scrollToCatalog(); } }} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ delay: index * .07 }}>
              <div><span>{item.code}</span><Icon size={28}/></div>
              <h3>{item.title}</h3><p>{item.text}</p>
              <span className={styles.gatewayLink}>{locale === "id" ? "Buka lini" : "Open line"}<ArrowUpRight size={17}/></span>
            </motion.button>;
          })}
        </div>
      </div>
    </section>

    <section className={styles.featured} id="featured">
      <div className="container">
        <div className={styles.featuredHead}>
          <div><span>02 · PRIORITY FLEET</span><h2>{locale === "id" ? "Unit yang paling sering memulai proyek." : "Equipment that gets projects moving."}</h2></div>
          <button onClick={scrollToCatalog}>{locale === "id" ? "Lihat katalog lengkap" : "View full catalog"}<ArrowRight size={18}/></button>
        </div>
        <div className={styles.featuredGrid}>
          {featured.map((item, index) => <motion.article className={styles.featuredCard} key={item.id} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: (index % 3) * .06 }}>
            <button className={styles.imageButton} onClick={() => setSelected(item)} aria-label={`${locale === "id" ? "Buka detail" : "Open details"} ${item.name[locale]}`}>
              <Image src={catalogImage(item)} alt={item.name[locale]} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" quality={90}/>
              <span>{priorityLabel(item.priority, locale)}</span><i><ArrowUpRight size={18}/></i>
            </button>
            <div className={styles.featuredBody}>
              <span>#{String(item.number).padStart(3, "0")} · KBLI {item.kbli}</span>
              <h3>{item.name[locale]}</h3>
              <p>{item.summary[locale]}</p>
              <div><small>{locale === "id" ? "Basis rental" : "Rental basis"}</small><strong>{item.rental}</strong></div>
            </div>
          </motion.article>)}
        </div>
      </div>
    </section>

    <section className={styles.catalog} id="catalog">
      <div className="container">
        <div className={styles.catalogTop}>
          <div><span>03 · E-CATALOG</span><h2>{locale === "id" ? "Temukan unit yang tepat." : "Find the right equipment."}</h2></div>
          <p>{locale === "id" ? "Katalog adalah cakupan solusi, bukan janji stok real-time. Spesifikasi, lokasi, jumlah, dan periode akan dikonfirmasi saat sourcing." : "This catalog represents solution coverage, not real-time inventory. Specifications, location, quantity, and period are confirmed during sourcing."}</p>
        </div>
        <div className={styles.catalogTools}>
          <label><Search size={19}/><input value={query} onChange={(event) => updateQuery(event.target.value)} placeholder={copy.searchPlaceholder}/>{query && <button onClick={() => updateQuery("")} aria-label={locale === "id" ? "Hapus pencarian" : "Clear search"}><X size={16}/></button>}</label>
          <div>{(Object.keys(lineLabels) as Line[]).map((key) => <button key={key} className={line === key ? styles.activeFilter : ""} onClick={() => updateLine(key)}>{lineLabels[key][locale]}</button>)}</div>
        </div>
        <div className={styles.resultMeta}><span><strong>{results.length}</strong> {locale === "id" ? "unit ditemukan" : "units found"}</span><span>{locale === "id" ? "Klik kartu untuk spesifikasi & RFQ" : "Open a card for specifications & RFQ"}</span></div>
        {results.length ? <div className={styles.catalogGrid}>
          {results.slice(0, visible).map((item) => <article className={styles.catalogCard} key={`${item.kbli}-${item.id}`}>
            <button className={styles.catalogImage} onClick={() => setSelected(item)}>
              <Image src={catalogImage(item)} alt={item.name[locale]} fill sizes="(max-width: 620px) 100vw, (max-width: 1000px) 50vw, 25vw" quality={75}/>
              <span>#{String(item.number).padStart(3, "0")}</span>
            </button>
            <div className={styles.catalogBody}>
              <span>KBLI {item.kbli} · {priorityLabel(item.priority, locale)}</span>
              <h3>{item.name[locale]}</h3><p>{item.summary[locale]}</p>
              <div className={styles.tags}>{item.useCases.slice(0, 2).map((useCase) => <small key={useCase}>{useCase}</small>)}</div>
              <button onClick={() => setSelected(item)}>{locale === "id" ? "Lihat detail" : "View details"}<ChevronRight size={16}/></button>
            </div>
          </article>)}
        </div> : <div className={styles.empty}><Search size={32}/><h3>{locale === "id" ? "Unit belum ditemukan." : "No equipment found."}</h3><p>{locale === "id" ? "Coba nama lain atau buka semua kategori." : "Try another term or open all categories."}</p><button onClick={() => { updateQuery(""); updateLine("all"); }}>{locale === "id" ? "Reset katalog" : "Reset catalog"}</button></div>}
        {visible < results.length && <button className={styles.loadMore} onClick={() => setVisible((count) => count + 12)}>{locale === "id" ? "Tampilkan lebih banyak" : "Show more"}<span>{visible} / {results.length}</span></button>}
      </div>
    </section>

    <section className={styles.builder} id="project-solutions">
      <div className={`container ${styles.builderGrid}`}>
        <div className={styles.builderCopy}>
          <span>04 · PROJECT PACKAGE</span>
          <h2>{locale === "id" ? "Bukan cuma sewa satu unit." : "More than a single-unit rental."}</h2>
          <p>{locale === "id" ? "Gabungkan unit utama, support equipment, dan mobilisasi menjadi satu scope awal. Hasil ini adalah starting point untuk diskusi teknis." : "Combine primary equipment, support units, and mobilization into one starting scope for technical discussion."}</p>
          <div className={styles.builderChecks}><span><Check size={16}/> Multi-unit fleet</span><span><Check size={16}/> Operator & support</span><span><Check size={16}/> Mobilisasi</span><span><Check size={16}/> Technology layer</span></div>
        </div>
        <div className={styles.builderPanel}>
          <div className={styles.builderSteps}><span className={styles.stepActive}>01</span><i/><span>02</span><i/><span>03</span></div>
          <label><span>{locale === "id" ? "Sektor operasi" : "Operating sector"}</span><select value={sector} onChange={(event) => setSector(event.target.value as Sector)}><option value="logistics">Logistics & Distribution</option><option value="construction">Construction & Earthwork</option><option value="mining">Mining & Quarry</option><option value="industrial">Industrial & Warehouse</option></select></label>
          <label><span>{locale === "id" ? "Periode indikatif" : "Indicative period"}</span><select value={duration} onChange={(event) => setDuration(event.target.value)}><option>Per job / trip</option><option>1–3 bulan</option><option>3–12 bulan</option><option>12+ bulan</option></select></label>
          <motion.div className={styles.packageResult} key={sector} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div><small>{locale === "id" ? "PAKET AWAL" : "STARTER PACKAGE"}</small><strong>{packageCopy[sector].title}</strong><span>{duration}</span></div>
            <p>{packageCopy[sector].note}</p>
            <ul>{packageCopy[sector].units.map((unit) => <li key={unit}><PackageCheck size={16}/>{unit}</li>)}</ul>
            <Link href={`${localizePath(locale, "/contact?type=business")}&need=${encodeURIComponent(packageCopy[sector].title)}`}>{locale === "id" ? "Kirim scope awal" : "Send starting scope"}<ArrowUpRight size={17}/></Link>
          </motion.div>
        </div>
      </div>
    </section>

    <section className={styles.technology} id="technology">
      <div className={`container ${styles.technologyGrid}`}>
        <div className={styles.techCopy}>
          <span>KBLI 58290 · SOFTWARE & FLEET TECHNOLOGY</span>
          <h2>{locale === "id" ? "Setiap aset. Satu pandangan operasional." : "Every asset. One operational view."}</h2>
          <p>{locale === "id" ? "RevAuto dirancang untuk berkembang dari fleet management menjadi equipment intelligence—menghubungkan kendaraan, heavy equipment, maintenance, utilization, dan kontrak." : "RevAuto is designed to grow from fleet management into equipment intelligence—connecting vehicles, heavy equipment, maintenance, utilization, and contracts."}</p>
          <div>{["GPS & IoT monitoring", "Preventive maintenance", "Hour-meter & utilization", "Work order & breakdown", "Driver & operator", "Fleet analytics"].map((point) => <span key={point}><CircleDot size={14}/>{point}</span>)}</div>
          <Link href={localizePath(locale, "/revauto")}>{locale === "id" ? "Lihat Fleet Technology" : "Explore Fleet Technology"}<ArrowRight size={18}/></Link>
        </div>
        <div className={styles.dashboard}>
          <div className={styles.dashboardBar}><span><Image src="/images/autorev-icon-300.png" alt="" width={24} height={24}/>RevAuto Control</span><small>LIVE PREVIEW</small></div>
          <div className={styles.dashboardStats}><div><small>ACTIVE ASSETS</small><strong>128</strong><span><i/> 92% online</span></div><div><small>UTILIZATION</small><strong>78%</strong><span>+6.4% this month</span></div><div><small>MAINTENANCE</small><strong>07</strong><span>work orders due</span></div></div>
          <div className={styles.dashboardMain}>
            <div className={styles.map}><span className={styles.mapRoad}/>{[1,2,3,4,5].map((pin) => <i key={pin} className={styles[`pin${pin}`]}><Truck size={12}/></i>)}<b><MapPin size={15}/> Kalimantan · Site 02</b></div>
            <div className={styles.assetList}><small>ASSET STATUS</small>{[["EXC-020", "Working", "842 HM"], ["DT-6X4-08", "Hauling", "74% fuel"], ["WT-12K-03", "Standby", "Site A"]].map((row) => <div key={row[0]}><span><i/>{row[0]}</span><strong>{row[1]}</strong><small>{row[2]}</small></div>)}</div>
          </div>
        </div>
      </div>
    </section>

    <section className={styles.process} id="process">
      <div className="container">
        <div className={styles.processHead}><span>05 · HOW IT WORKS</span><h2>{locale === "id" ? "Dari scope ke unit siap kerja." : "From scope to work-ready units."}</h2></div>
        <div className={styles.processGrid}>{[
          ["01", Search, locale === "id" ? "Kirim kebutuhan" : "Send the requirement", locale === "id" ? "Jenis pekerjaan, lokasi, jumlah, kapasitas, dan durasi." : "Work type, location, quantity, capacity, and duration."],
          ["02", Layers3, locale === "id" ? "Matching & sourcing" : "Matching & sourcing", locale === "id" ? "Kami mencocokkan konfigurasi unit dan jaringan asset owner." : "We match the equipment configuration and asset-owner network."],
          ["03", ShieldCheck, locale === "id" ? "Verifikasi scope" : "Verify the scope", locale === "id" ? "Spesifikasi, rate basis, mobilisasi, operator, dan term dikonfirmasi." : "Specifications, rate basis, mobilization, operators, and terms are confirmed."],
          ["04", Wrench, locale === "id" ? "Deploy & monitor" : "Deploy & monitor", locale === "id" ? "Unit dimobilisasi dan dukungan operasional disiapkan sesuai kontrak." : "Units are mobilized and operational support follows the contract."],
        ].map(([number, Icon, title, text]) => <article key={number as string}><span>{number as string}</span><Icon size={27}/><h3>{title as string}</h3><p>{text as string}</p></article>)}</div>
      </div>
    </section>

    <section className={styles.faq} id="faq">
      <div className={`container ${styles.faqGrid}`}>
        <div><span>06 · FAQ</span><h2>{locale === "id" ? "Yang perlu jelas sebelum unit bergerak." : "What should be clear before units move."}</h2><p>{locale === "id" ? "Jawaban singkat untuk menyusun RFQ yang lebih tepat." : "Straight answers to help build a better RFQ."}</p></div>
        <div>{[
          [locale === "id" ? "Apakah semua unit selalu tersedia?" : "Is every catalog item always available?", locale === "id" ? "Tidak. Katalog menunjukkan cakupan solusi. Ketersediaan aktual ditentukan oleh lokasi, spesifikasi, jumlah unit, periode, dan hasil sourcing." : "No. The catalog shows solution coverage. Actual availability depends on location, specification, quantity, period, and sourcing."],
          [locale === "id" ? "Apa saja yang memengaruhi harga rental?" : "What affects the rental rate?", locale === "id" ? "Kelas dan kondisi unit, basis jam/shift/trip, lokasi, mobilisasi, operator, fuel, overtime, standby, dan durasi kontrak." : "Equipment class and condition, hour/shift/trip basis, location, mobilization, operator, fuel, overtime, standby, and contract duration."],
          [locale === "id" ? "Bisa meminta beberapa jenis equipment sekaligus?" : "Can we request multiple equipment types?", locale === "id" ? "Bisa. AutoRev dapat menyusun multi-unit fleet atau project package yang menggabungkan unit utama, support equipment, dan mobilisasi." : "Yes. AutoRev can shape a multi-unit fleet or project package combining primary units, support equipment, and mobilization."],
          [locale === "id" ? "Apakah operator dan mobilisasi dapat disertakan?" : "Can operators and mobilization be included?", locale === "id" ? "Dapat dibahas sesuai jenis alat, lokasi kerja, sertifikasi yang diperlukan, roster, lowbed/trailer, dan scope kontrak." : "They can be scoped according to equipment type, work location, required certification, roster, lowbed/trailer, and contract terms."],
          [locale === "id" ? "Informasi apa yang dibutuhkan untuk penawaran?" : "What information is needed for a quote?", locale === "id" ? "Jenis pekerjaan, lokasi, target mulai, durasi, jumlah, kapasitas/tonase, basis kerja, kebutuhan operator, dan kondisi akses site." : "Work type, location, start target, duration, quantity, capacity/tonnage, work basis, operator requirement, and site access."],
          [locale === "id" ? "Bagaimana fleet technology masuk ke proyek?" : "How does fleet technology fit a project?", locale === "id" ? "Lapisan teknologi dapat disiapkan untuk tracking, preventive maintenance, hour-meter, utilization, work order, dan pelaporan aset." : "A technology layer can support tracking, preventive maintenance, hour-meter, utilization, work orders, and asset reporting."],
        ].map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>{question}</span><i>+</i></summary><p>{answer}</p></details>)}</div>
      </div>
    </section>

    <section className={styles.finalCta}>
      <div className={styles.ctaGrid}/><div className="container"><span>AUTOREV MOBILITAS INDONESIA</span><h2>{locale === "id" ? "Ceritakan pekerjaannya. Kami bantu susun asetnya." : "Tell us the job. We’ll help shape the fleet."}</h2><p>{locale === "id" ? "Satu unit, multi-unit fleet, atau paket equipment untuk proyek—mulai dari scope yang Anda punya hari ini." : "One unit, a multi-unit fleet, or a project package—start with the scope you have today."}</p><div><Link href={localizePath(locale, "/contact?type=business")}>{locale === "id" ? "Minta penawaran" : "Request a quote"}<ArrowUpRight size={18}/></Link><a href="#catalog">{locale === "id" ? "Kembali ke katalog" : "Back to catalog"}<ArrowRight size={18}/></a></div></div>
    </section>

    <AnimatePresence>
      {selected && <motion.div className={styles.modalBackdrop} role="presentation" onMouseDown={(event) => event.currentTarget === event.target && setSelected(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className={styles.modal} role="dialog" aria-modal="true" aria-label={selected.name[locale]} initial={reduce ? false : { opacity: 0, y: 30, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: .985 }}>
          <button className={styles.modalClose} onClick={() => setSelected(null)} aria-label={locale === "id" ? "Tutup detail" : "Close details"}><X size={20}/></button>
          <div className={styles.modalImage}><Image src={catalogImage(selected)} alt={selected.name[locale]} fill sizes="(max-width: 800px) 100vw, 48vw" quality={90}/><span>#{String(selected.number).padStart(3, "0")}</span></div>
          <div className={styles.modalBody}><span>KBLI {selected.kbli} · {selected.category}</span><h2>{selected.name[locale]}</h2><p>{selected.summary[locale]}</p><div className={styles.modalSpecs}><div><small>{locale === "id" ? "Basis rental" : "Rental basis"}</small><strong>{selected.rental}</strong></div><div><small>{locale === "id" ? "Model penyediaan" : "Supply model"}</small><strong>{priorityLabel(selected.priority, locale)}</strong></div></div><small>{locale === "id" ? "Biasanya digunakan untuk" : "Common applications"}</small><ul>{selected.useCases.map((useCase) => <li key={useCase}><Check size={15}/>{useCase}</li>)}</ul><div className={styles.modalNote}><Sparkles size={17}/><p>{locale === "id" ? "Kapasitas, brand, model, tahun, attachment, operator, mobilisasi, dan lokasi akan disesuaikan dalam RFQ." : "Capacity, brand, model, year, attachments, operator, mobilization, and location are configured during RFQ."}</p></div><Link href={`${localizePath(locale, "/contact?type=business")}&need=${encodeURIComponent(selected.name.id)}`}>{locale === "id" ? "Minta penawaran unit ini" : "Request this equipment"}<ArrowUpRight size={18}/></Link></div>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  </div>;
}
