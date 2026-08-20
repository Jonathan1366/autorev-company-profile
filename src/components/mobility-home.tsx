"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarRange,
  CarFront,
  Check,
  ChevronDown,
  Gauge,
  Headphones,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  Zap,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n";
import {
  vehicleCatalog,
  vehicleCategoryLabels,
  type VehicleCategory,
} from "@/lib/vehicle-catalog";
import styles from "./mobility-home.module.css";

type Filter = "all" | VehicleCategory;
type NetworkInformation = EventTarget & { effectiveType?: string; saveData?: boolean };
type NetworkAwareNavigator = Navigator & { connection?: NetworkInformation };

function rentalRequestHref(locale: Locale, vehicle?: string) {
  const params = new URLSearchParams({ type: "rental" });
  if (vehicle) params.set("vehicle", vehicle);
  return `${localizePath(locale, "/contact")}?${params.toString()}`;
}

function SplitLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return <Link className={`${styles.splitButton} ${light ? styles.splitButtonLight : ""}`} href={href}>
    <span>{children}</span><i><ArrowRight aria-hidden="true"/></i>
  </Link>;
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return <motion.div
    className={className}
    initial={reduce ? false : { opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: .18 }}
    transition={{ duration: reduce ? .01 : .62, delay, ease: [0.22, 1, 0.36, 1] }}
  >{children}</motion.div>;
}

export function MobilityHome({ locale }: { locale: Locale }) {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const catalogSearchRef = useRef<HTMLInputElement>(null);
  const reduce = useReducedMotion();
  const [allowVideo, setAllowVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(6);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const mediaScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.025, 1.07]);
  const copyY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -42]);
  const copyOpacity = useTransform(scrollYProgress, [0, .85], reduce ? [1, 1] : [1, .3]);

  useEffect(() => {
    const connection = (navigator as NetworkAwareNavigator).connection;
    const update = () => {
      const constrained = connection?.saveData || ["slow-2g", "2g", "3g"].includes(connection?.effectiveType || "");
      setAllowVideo(reduce === false && !constrained);
    };
    update();
    connection?.addEventListener("change", update);
    return () => connection?.removeEventListener("change", update);
  }, [reduce]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => {
      setHeroVisible(entry.isIntersecting);
    }, { threshold: .08 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const syncPlayback = () => {
      const video = videoRef.current;
      if (!video) return;
      if (!allowVideo || !videoReady || !heroVisible || document.hidden) {
        video.pause();
        return;
      }
      void video.play().catch(() => {
        // The optimized poster remains visible if autoplay is unavailable.
      });
    };

    syncPlayback();
    document.addEventListener("visibilitychange", syncPlayback);
    return () => document.removeEventListener("visibilitychange", syncPlayback);
  }, [allowVideo, heroVisible, videoReady]);

  const filteredVehicles = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return vehicleCatalog.filter((vehicle) => {
      const inCategory = filter === "all" || vehicle.categories.includes(filter);
      if (!inCategory) return false;
      if (!needle) return true;
      return [
        vehicle.brand,
        vehicle.model,
        vehicle.powertrain[locale],
        vehicle.description[locale],
        vehicle.useCase[locale],
      ].join(" ").toLowerCase().includes(needle);
    });
  }, [filter, locale, query]);

  const updateFilter = (next: Filter) => {
    setFilter(next);
    setVisible(6);
  };

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFilter("all");
    setVisible(6);
    document.getElementById("vehicle-catalog")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    window.requestAnimationFrame(() => catalogSearchRef.current?.focus({ preventScroll: true }));
  };

  const t = locale === "id" ? {
    heroEyebrow: "FOUNDING DRIVER · RENTAL MOBIL",
    heroA: "Mobil untuk kerja.",
    heroB: "Langkah menuju milik.",
    heroText: "Mulai perjalanan bersama EV Car Plus melalui program Founding Driver AutoRev—dengan alur yang jelas, dukungan operasional, dan tujuan kepemilikan sesuai kontrak.",
    heroPrimary: "Lihat Founding Driver",
    heroSecondary: "Rental untuk Perusahaan",
    search: "Cari Limo Green, MPV, mobil listrik...",
    searchButton: "Cari mobil",
    pathsEyebrow: "MULAI DARI TUJUAN ANDA",
    pathsTitle: "Satu perjalanan bisnis yang runtut.",
    pathsText: "Pilih kebutuhan Anda terlebih dahulu. Kami arahkan ke program, kendaraan, dan pembahasan yang relevan.",
    catalogTitle: "Mobil untuk setiap cara bergerak.",
    catalogText: "Limo Green menjadi sorotan awal AutoRev, dilengkapi pilihan EV dan kendaraan konvensional yang dipasarkan resmi di Indonesia.",
    catalogSearch: "Cari merek, model, atau kebutuhan...",
    empty: "Belum ada model yang cocok dengan pencarian ini.",
    reset: "Tampilkan semua",
    more: "Tampilkan pilihan lainnya",
    request: "Tanyakan mobil ini",
    coming: "Segera hadir di AutoRev",
    onRequest: "Sesuai permintaan",
    seats: "kursi",
    disclaimer: "Merek dan model merupakan referensi pilihan armada. Ketersediaan, varian, warna, dan spesifikasi dikonfirmasi sesuai kebutuhan dan proses pengadaan.",
    processTitle: "Dari kebutuhan sampai mobil berjalan.",
    processText: "Tidak perlu memulai dari daftar yang rumit. Ceritakan perjalanan Anda, lalu tim AutoRev membantu menyusun pilihan yang paling masuk akal.",
    corporateTitle: "Rental corporate, tanpa rute yang berputar-putar.",
    corporateText: "Dari satu kendaraan untuk perjalanan dinas hingga armada untuk operasional harian—pilih lepas kunci atau dengan driver, EV maupun konvensional.",
    corporateCta: "Bicarakan Kebutuhan Armada",
    revTitle: "Saat armada tumbuh, operasinya tetap rapi.",
    revText: "RevAuto dirancang sebagai sistem fleet management untuk membantu melihat unit, booking, driver, charging, maintenance, biaya, dan laporan dalam satu alur.",
    revCta: "Pelajari RevAuto",
    faqTitle: "Pertanyaan sebelum mulai.",
  } : {
    heroEyebrow: "FOUNDING DRIVER · CAR RENTAL",
    heroA: "A car for work.",
    heroB: "A path to ownership.",
    heroText: "Start moving with a Car Plus EV through the AutoRev Founding Driver program—with a clear journey, operational support, and an ownership path under the contract.",
    heroPrimary: "Explore Founding Driver",
    heroSecondary: "Corporate Car Rental",
    search: "Search Limo Green, MPVs, electric cars...",
    searchButton: "Find a car",
    pathsEyebrow: "START WITH YOUR GOAL",
    pathsTitle: "One clear mobility journey.",
    pathsText: "Choose what you need first. We’ll guide you to the relevant program, vehicle, and discussion.",
    catalogTitle: "A car for every way you move.",
    catalogText: "Limo Green leads AutoRev’s initial selection, joined by EVs and conventional vehicles officially marketed in Indonesia.",
    catalogSearch: "Search brand, model, or use case...",
    empty: "No model matches this search yet.",
    reset: "Show all",
    more: "Show more vehicles",
    request: "Ask about this car",
    coming: "Coming soon to AutoRev",
    onRequest: "Available on request",
    seats: "seats",
    disclaimer: "Brands and models represent reference fleet choices. Availability, variant, color, and specifications are confirmed according to your needs and sourcing process.",
    processTitle: "From need to a car on the road.",
    processText: "You do not need to start with a complicated list. Tell us about the journey, and AutoRev will help shape the most practical options.",
    corporateTitle: "Corporate rental, without a circular process.",
    corporateText: "From a single business-trip vehicle to an everyday operating fleet—choose self drive or with a driver, electric or conventional.",
    corporateCta: "Discuss Your Fleet",
    revTitle: "As the fleet grows, operations stay organized.",
    revText: "RevAuto is being designed as a fleet-management system that connects vehicles, bookings, drivers, charging, maintenance, cost, and reporting in one workflow.",
    revCta: "Explore RevAuto",
    faqTitle: "Questions before you begin.",
  };

  const pathways = locale === "id" ? [
    { number: "01", eyebrow: "PROGRAM UTAMA", title: "Founding Driver", text: "Gunakan EV untuk bekerja hari ini dan jalani program menuju milik sesuai kontrak.", cta: "Lihat program", href: "/founding-driver", image: "/images/autorev-driver-passenger-v3.png", icon: Route },
    { number: "02", eyebrow: "PERSONAL", title: "Rental Mobil", text: "Harian, mingguan, atau bulanan untuk perjalanan personal dan keluarga.", cta: "Lihat rental", href: "/autorev-rental", image: "/images/autorev-rental-roadtrip-v3.png", icon: CarFront },
    { number: "03", eyebrow: "PERUSAHAAN", title: "Corporate Rental", text: "Armada untuk perjalanan dinas, shuttle, dan operasional perusahaan.", cta: "Konsultasi armada", href: "/autorev-business", image: "/images/autorev-corporate-ev-v2.png", icon: Building2 },
  ] : [
    { number: "01", eyebrow: "MAIN PROGRAM", title: "Founding Driver", text: "Use an EV for work today and follow a contract-based path to ownership.", cta: "Explore the program", href: "/founding-driver", image: "/images/autorev-driver-passenger-v3.png", icon: Route },
    { number: "02", eyebrow: "PERSONAL", title: "Car Rental", text: "Daily, weekly, or monthly mobility for personal and family journeys.", cta: "Explore rental", href: "/autorev-rental", image: "/images/autorev-rental-roadtrip-v3.png", icon: CarFront },
    { number: "03", eyebrow: "COMPANIES", title: "Corporate Rental", text: "Fleet options for business travel, shuttles, and daily operations.", cta: "Discuss your fleet", href: "/autorev-business", image: "/images/autorev-corporate-ev-v2.png", icon: Building2 },
  ];

  const process = locale === "id" ? [
    ["01", "Ceritakan perjalanan", "Tanggal, durasi, lokasi, jumlah penumpang, dan cara penggunaan."],
    ["02", "Kami cocokkan pilihan", "EV atau konvensional, personal atau corporate, dengan kebutuhan yang jelas."],
    ["03", "Konfirmasi detail", "Unit, varian, periode, layanan driver, serta dukungan operasional dikonfirmasi."],
    ["04", "Mulai bergerak", "Tim membantu serah-terima dan tetap dapat dihubungi saat dibutuhkan."],
  ] : [
    ["01", "Tell us about the journey", "Dates, duration, location, passenger count, and how the car will be used."],
    ["02", "We match the options", "Electric or conventional, personal or corporate, aligned to a clear need."],
    ["03", "Confirm the details", "Vehicle, variant, period, driver service, and operational support are confirmed."],
    ["04", "Start moving", "Our team supports the handover and remains reachable when needed."],
  ];

  const faq = locale === "id" ? [
    ["Apakah semua mobil di katalog langsung tersedia?", "Belum tentu. Katalog menunjukkan pilihan kendaraan yang dapat dibahas. Ketersediaan, varian, warna, dan lokasi dikonfirmasi saat proses permintaan."],
    ["Apakah tersedia EV dan mobil konvensional?", "Ya. AutoRev memprioritaskan mobilitas listrik, sekaligus menyiapkan pilihan kendaraan konvensional untuk kebutuhan personal dan corporate."],
    ["Bisa rental dengan driver?", "Bisa. Sampaikan apakah Anda membutuhkan lepas kunci, dengan driver, shuttle, atau pola operasional khusus."],
    ["Bagaimana cara mengikuti Founding Driver?", "Buka halaman Founding Driver untuk memahami struktur program, persyaratan, paket, dan proses pendaftaran lengkap."],
  ] : [
    ["Are all catalog cars immediately available?", "Not necessarily. The catalog shows vehicle choices available for discussion. Availability, variant, color, and location are confirmed during the request process."],
    ["Do you offer both EVs and conventional cars?", "Yes. AutoRev prioritizes electric mobility while preparing conventional options for personal and corporate requirements."],
    ["Can I rent with a driver?", "Yes. Tell us whether you need self drive, a driver, a shuttle, or a specific operating arrangement."],
    ["How do I join Founding Driver?", "Open the Founding Driver page for the full program structure, requirements, plans, and registration process."],
  ];

  return <div className={styles.page}>
    <section className={styles.hero} ref={heroRef} id="top" aria-labelledby="mobility-hero-title">
      <motion.div className={styles.heroMedia} style={{ scale: mediaScale }} aria-hidden="true">
        <Image src="/images/vehicle-catalog/vinfast-limo-green.jpg" alt="" fill priority sizes="100vw" quality={90}/>
        {allowVideo && <video
          className={`${styles.heroVideo} ${videoReady ? styles.heroVideoReady : ""}`}
          autoPlay loop muted playsInline preload="none" ref={videoRef}
          onCanPlay={() => setVideoReady(true)}
        ><source src="/videos/autorev-highway-city.mp4" type="video/mp4"/></video>}
      </motion.div>
      <div className={styles.heroShade} aria-hidden="true"/>
      <motion.div className={`container ${styles.heroInner}`} style={{ y: copyY, opacity: copyOpacity }}>
        <div className={styles.heroCopy}>
          <span className={styles.kicker}><i/>{t.heroEyebrow}</span>
          <h1 id="mobility-hero-title"><span>{t.heroA}</span><strong>{t.heroB}</strong></h1>
          <p>{t.heroText}</p>
          <div className={styles.heroActions}>
            <SplitLink href={localizePath(locale, "/founding-driver")}>{t.heroPrimary}</SplitLink>
            <Link className={styles.textLinkLight} href={localizePath(locale, "/autorev-business")}>{t.heroSecondary}<ArrowUpRight aria-hidden="true"/></Link>
          </div>
        </div>
        <div className={styles.heroFacts} role="list" aria-label={locale === "id" ? "Ringkasan Founding Driver" : "Founding Driver summary"}>
          <div role="listitem"><small>01</small><strong>{locale === "id" ? "Mulai Rp300 ribu/hari" : "From IDR 300K/day"}</strong><span>{locale === "id" ? "sesuai paket program" : "under the program plan"}</span></div>
          <div role="listitem"><small>02</small><strong>{locale === "id" ? "Program 5 tahun" : "Five-year program"}</strong><span>{locale === "id" ? "alur menuju milik" : "path toward ownership"}</span></div>
          <div role="listitem"><small>03</small><strong>EV Car Plus</strong><span>{locale === "id" ? "untuk operasional driver" : "for driver operations"}</span></div>
        </div>
      </motion.div>
      <form className={styles.heroSearch} onSubmit={submitSearch} role="search" aria-label={locale === "id" ? "Cari mobil rental" : "Search rental cars"}>
        <Search aria-hidden="true"/><input type="search" name="vehicle-search" enterKeyHint="search" autoComplete="off" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search} aria-label={t.search}/>
        <button type="submit"><span>{t.searchButton}</span><ArrowRight aria-hidden="true"/></button>
      </form>
      <div className={styles.heroIndex} aria-hidden="true">
        <span>FOUNDING DRIVER</span><i/>
        <span>{locale === "id" ? "EV UNTUK KERJA" : "AN EV FOR WORK"}</span><i/>
        <span>{locale === "id" ? "MENUJU MILIK" : "A PATH TO OWNERSHIP"}</span>
      </div>
    </section>

    <section className={styles.pathways} id="rental-options" aria-labelledby="rental-options-title">
      <div className="container">
        <Reveal className={styles.sectionIntro}>
          <div><span>{t.pathsEyebrow}</span><h2 id="rental-options-title">{t.pathsTitle}</h2></div>
          <p>{t.pathsText}</p>
        </Reveal>
        <div className={styles.pathGrid}>
          {pathways.map((path, index) => {
            const Icon = path.icon;
            return <motion.article key={path.number} className={`${styles.pathCard} ${index === 0 ? styles.pathCardPrimary : ""}`} initial={reduce ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: index * .09, duration: .6 }}>
              <Image src={path.image} alt="" fill loading="lazy" sizes="(max-width: 900px) 100vw, 40vw" quality={75}/><div className={styles.pathShade} aria-hidden="true"/>
              <div className={styles.pathTop}><span>{path.number}</span><Icon aria-hidden="true"/></div>
              <div className={styles.pathBody}><small>{path.eyebrow}</small><h3>{path.title}</h3><p>{path.text}</p><Link href={localizePath(locale, path.href)}>{path.cta}<ArrowRight aria-hidden="true"/></Link></div>
            </motion.article>;
          })}
        </div>
      </div>
    </section>

    <section className={styles.catalog} id="vehicle-catalog" aria-labelledby="vehicle-catalog-title">
      <div className="container">
        <Reveal className={styles.catalogIntro}>
          <div><span>02 · {locale === "id" ? "E-CATALOG MOBIL" : "VEHICLE E-CATALOG"}</span><h2 id="vehicle-catalog-title">{t.catalogTitle}</h2></div>
          <div><p>{t.catalogText}</p><SplitLink href={rentalRequestHref(locale)}>{locale === "id" ? "Minta Rekomendasi" : "Get a Recommendation"}</SplitLink></div>
        </Reveal>
        <div className={styles.catalogToolbar}>
          <label><Search aria-hidden="true"/><input ref={catalogSearchRef} type="text" inputMode="search" enterKeyHint="search" autoComplete="off" value={query} onChange={(event) => { setQuery(event.target.value); setVisible(6); }} placeholder={t.catalogSearch} aria-label={t.catalogSearch}/>{query && <button type="button" onClick={() => setQuery("")} aria-label={locale === "id" ? "Hapus pencarian" : "Clear search"}><X aria-hidden="true"/></button>}</label>
          <div className={styles.filters} role="group" aria-label={locale === "id" ? "Filter jenis mobil" : "Filter vehicle type"}>{(Object.keys(vehicleCategoryLabels) as Filter[]).map((key) => <button type="button" key={key} className={filter === key ? styles.filterActive : ""} onClick={() => updateFilter(key)} aria-pressed={filter === key} aria-controls="vehicle-results">{vehicleCategoryLabels[key][locale]}</button>)}</div>
        </div>
        {filteredVehicles.length ? <motion.div layout className={styles.vehicleGrid} id="vehicle-results" role="list" aria-label={locale === "id" ? `${filteredVehicles.length} pilihan mobil` : `${filteredVehicles.length} vehicle options`}>
          <AnimatePresence initial={false} mode="popLayout">
            {filteredVehicles.slice(0, visible).map((vehicle, index) => <motion.article layout role="listitem" className={`${styles.vehicleCard} ${index === 0 && filter === "all" && !query ? styles.vehicleCardFeatured : ""}`} key={vehicle.id} initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? { opacity: 0 } : { opacity: 0, scale: .98 }} transition={{ duration: .35 }}>
              <Link className={styles.vehicleMedia} href={rentalRequestHref(locale, `${vehicle.brand} ${vehicle.model}`)} aria-label={`${t.request}: ${vehicle.brand} ${vehicle.model}`}>
                <Image src={vehicle.image} alt={`${vehicle.brand} ${vehicle.model}`} fill loading="lazy" sizes={index === 0 && filter === "all" && !query ? "(max-width: 700px) 100vw, (max-width: 1100px) 66vw, 66vw" : "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"} quality={75}/>
                <span className={`${styles.status} ${vehicle.status === "coming" ? styles.statusComing : ""}`}>{vehicle.status === "coming" ? t.coming : t.onRequest}</span>
                <i><ArrowUpRight aria-hidden="true"/></i>
              </Link>
              <div className={styles.vehicleBody}>
                <small>{vehicle.brand}</small><h3>{vehicle.model}</h3><p>{vehicle.description[locale]}</p>
                <div className={styles.vehicleMeta}><span><Zap aria-hidden="true"/>{vehicle.powertrain[locale]}</span><span><Users aria-hidden="true"/>{vehicle.seats === "Group" ? (locale === "id" ? "Transport grup" : "Group transport") : `${vehicle.seats} ${t.seats}`}</span></div>
                <div className={styles.vehicleFooter}><span>{vehicle.useCase[locale]}</span><Link href={rentalRequestHref(locale, `${vehicle.brand} ${vehicle.model}`)}>{t.request}<ArrowRight aria-hidden="true"/></Link></div>
              </div>
            </motion.article>)}
          </AnimatePresence>
        </motion.div> : <div className={styles.catalogEmpty} id="vehicle-results" role="status"><Search aria-hidden="true"/><h3>{t.empty}</h3><button type="button" onClick={() => { setQuery(""); updateFilter("all"); }}>{t.reset}</button></div>}
        {visible < filteredVehicles.length && <button type="button" className={styles.loadMore} onClick={() => setVisible((count) => count + 6)} aria-controls="vehicle-results">{t.more}<span>{visible} / {filteredVehicles.length}</span></button>}
        <p className={styles.disclaimer}>{t.disclaimer}</p>
      </div>
    </section>

    <section className={styles.process} id="how-it-works" aria-labelledby="rental-process-title">
      <div className={`container ${styles.processGrid}`}>
        <Reveal className={styles.processCopy}>
          <span>03 · {locale === "id" ? "CARA MULAI" : "HOW TO START"}</span><h2 id="rental-process-title">{t.processTitle}</h2><p>{t.processText}</p>
          <SplitLink href={rentalRequestHref(locale)}>{locale === "id" ? "Mulai Konsultasi" : "Start a Conversation"}</SplitLink>
        </Reveal>
        <div className={styles.processSteps}>{process.map(([number, title, text], index) => <Reveal className={styles.processStep} delay={index * .05} key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><Check aria-hidden="true"/></Reveal>)}</div>
      </div>
    </section>

    <section className={styles.corporate} id="corporate-rental" aria-labelledby="corporate-rental-title">
      <div className={styles.corporateMedia}><Image src="/images/vehicle-catalog/toyota-innova-zenix.jpg" alt={locale === "id" ? "Toyota Kijang Innova Zenix untuk kebutuhan perusahaan" : "Toyota Kijang Innova Zenix for corporate travel"} fill loading="lazy" sizes="100vw" quality={75}/></div>
      <div className={styles.corporateShade} aria-hidden="true"/>
      <div className={`container ${styles.corporateInner}`}>
        <Reveal className={styles.corporateCopy}>
          <span>04 · CORPORATE RENTAL</span><h2 id="corporate-rental-title">{t.corporateTitle}</h2><p>{t.corporateText}</p>
          <div className={styles.corporateBenefits}>
            <span><CarFront aria-hidden="true"/>{locale === "id" ? "Lepas kunci atau dengan driver" : "Self drive or with a driver"}</span>
            <span><CalendarRange aria-hidden="true"/>{locale === "id" ? "Periode fleksibel" : "Flexible periods"}</span>
            <span><Zap aria-hidden="true"/>{locale === "id" ? "EV dan konvensional" : "EV and conventional"}</span>
            <span><Headphones aria-hidden="true"/>{locale === "id" ? "Dukungan manusia" : "Human support"}</span>
          </div>
          <SplitLink light href={localizePath(locale, "/autorev-business")}>{t.corporateCta}</SplitLink>
        </Reveal>
      </div>
    </section>

    <section className={styles.trust} aria-labelledby="autorev-experience-title">
      <div className="container">
        <Reveal className={styles.trustHead}><span>05 · AUTOREV EXPERIENCE</span><h2 id="autorev-experience-title">{locale === "id" ? "Lebih jelas di setiap langkah." : "Clearer at every step."}</h2></Reveal>
        <div className={styles.trustGrid}>
          {[
            { icon: ShieldCheck, title: locale === "id" ? "Pilihan yang transparan" : "Transparent choices", text: locale === "id" ? "Status kendaraan dan detail layanan dikonfirmasi sebelum proses berjalan." : "Vehicle status and service details are confirmed before the process moves forward." },
            { icon: Route, title: locale === "id" ? "Alur yang runtut" : "A clear journey", text: locale === "id" ? "Mulai dari kebutuhan, bukan dari istilah atau daftar yang membingungkan." : "Start with the need, not confusing terminology or lists." },
            { icon: Headphones, title: locale === "id" ? "Tim saat dibutuhkan" : "People when needed", text: locale === "id" ? "Teknologi membantu proses; tim AutoRev tetap mendampingi percakapan penting." : "Technology supports the process; AutoRev people stay present for important conversations." },
          ].map((item, index) => { const Icon = item.icon; return <Reveal className={styles.trustCard} delay={index * .08} key={item.title}><span><Icon aria-hidden="true"/></span><h3>{item.title}</h3><p>{item.text}</p></Reveal>; })}
        </div>
      </div>
    </section>

    <section className={styles.faq} aria-labelledby="rental-faq-title">
      <div className={`container ${styles.faqGrid}`}>
        <Reveal className={styles.faqIntro}><span>06 · FAQ</span><h2 id="rental-faq-title">{t.faqTitle}</h2><p>{locale === "id" ? "Jika kebutuhan Anda lebih spesifik, ceritakan langsung kepada tim AutoRev." : "If your need is more specific, tell the AutoRev team directly."}</p><Link href={localizePath(locale, "/contact")}>{locale === "id" ? "Hubungi AutoRev" : "Contact AutoRev"}<ArrowUpRight aria-hidden="true"/></Link></Reveal>
        <div className={styles.faqList}>{faq.map(([question, answer]) => <details key={question}><summary><span>{question}</span><ChevronDown aria-hidden="true"/></summary><p>{answer}</p></details>)}</div>
      </div>
    </section>

    <section className={styles.revauto} id="revauto" aria-labelledby="revauto-title">
      <div className={`container ${styles.revGrid}`}>
        <Reveal className={styles.revCopy}><span><Sparkles aria-hidden="true"/> REVAUTO · FLEET MANAGEMENT</span><h2 id="revauto-title">{t.revTitle}</h2><p>{t.revText}</p><SplitLink light href={localizePath(locale, "/revauto")}>{t.revCta}</SplitLink></Reveal>
        <Reveal className={styles.revPanel} delay={.1}>
          <div className={styles.revPanelTop}><span><i/>LIVE OPERATIONS</span><small>{locale === "id" ? "PREVIEW SISTEM" : "SYSTEM PREVIEW"}</small></div>
          <div className={styles.revMetric}><span><CarFront aria-hidden="true"/></span><div><small>{locale === "id" ? "ARMADA" : "FLEET"}</small><strong>{locale === "id" ? "Unit & status" : "Vehicles & status"}</strong></div><ArrowUpRight aria-hidden="true"/></div>
          <div className={styles.revMetric}><span><Gauge aria-hidden="true"/></span><div><small>{locale === "id" ? "OPERASI" : "OPERATIONS"}</small><strong>{locale === "id" ? "Booking & utilisasi" : "Booking & utilization"}</strong></div><ArrowUpRight aria-hidden="true"/></div>
          <div className={styles.revMetric}><span><ShieldCheck aria-hidden="true"/></span><div><small>{locale === "id" ? "PERAWATAN" : "CARE"}</small><strong>{locale === "id" ? "Perawatan & dukungan" : "Maintenance & support"}</strong></div><ArrowUpRight aria-hidden="true"/></div>
          <div className={styles.revRoute}><i/><i/><i/><span>{locale === "id" ? "Alur operasi AutoRev" : "AutoRev operating flow"}</span></div>
        </Reveal>
      </div>
    </section>
  </div>;
}
