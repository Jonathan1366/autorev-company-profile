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
    heroEyebrow: "AUTOREV MOBILITAS INDONESIA",
    heroA: "Mobilitas Terarah.",
    heroB: "Bagi Pengemudi, Personal, dan Perusahaan.",
    heroText: "Dari sewa harian yang praktis, pengelolaan armada operasional bisnis, hingga jalan nyata kepemilikan mobil listrik tanpa modal awal. AutoRev hadir dengan alur yang jelas dan tim yang siap mendampingi.",
    heroPrimary: "Lihat Founding Driver",
    heroSecondary: "Sewa untuk Perusahaan",
    search: "Cari Limo Green, MPV, mobil listrik, atau kendaraan dinas...",
    searchButton: "Cari Mobil",
    pathsEyebrow: "01 · PILIH TUJUAN ANDA",
    pathsTitle: "Solusi Kendaraan yang Tepat untuk Setiap Kebutuhan.",
    pathsText: "Pilih jalur yang sesuai dengan rencana Anda hari ini. Kami akan mengarahkan Anda ke skema, unit, dan perhitungan yang paling masuk akal.",
    catalogTitle: "Armada Lengkap untuk Setiap Rute Perjalanan.",
    catalogText: "Menampilkan lini kendaraan listrik unggulan AutoRev seperti VinFast Limo Green dan BYD M6, dilengkapi pilihan armada konvensional tepercaya untuk berbagai skala operasional.",
    catalogSearch: "Cari merek, model, atau kebutuhan...",
    empty: "Belum ada model yang cocok dengan pencarian ini.",
    reset: "Tampilkan semua",
    more: "Tampilkan pilihan lainnya",
    request: "Tanyakan mobil ini",
    coming: "Alokasi Gelombang Berikutnya",
    onRequest: "Tersedia via Pemesanan Khusus",
    seats: "kursi",
    disclaimer: "Spesifikasi dan varian kendaraan disesuaikan dengan ketersediaan unit di wilayah Anda. Tim kami akan mengonfirmasi detail unit saat alokasi jadwal disetujui.",
    processTitle: "Langkah Jelas dari Niat Sampai Mobil Berjalan.",
    processText: "Kami memangkas birokrasi yang tak perlu. Cukup sampaikan kebutuhan Anda, dan tim AutoRev akan memandu prosesnya hingga kunci ada di tangan Anda.",
    corporateTitle: "Sewa Operasional Bisnis Tanpa Hambatan Birokrasi.",
    corporateText: "Mulai dari satu unit kendaraan dinas direksi hingga puluhan armada operasional harian. Kami menyediakan opsi fleksibel lepas kunci maupun dengan pengemudi profesional.",
    corporateCta: "Diskusi Kebutuhan Bisnis",
    revTitle: "Saat Armada Membesar, Kontrol Operasional Tetap di Tangan Anda.",
    revText: "RevAuto adalah platform manajemen armada terintegrasi yang memudahkan pengawasan unit, jadwal perawatan, transaksi pengisian daya, hingga analisis biaya operasional dalam satu layar.",
    revCta: "Pelajari Sistem RevAuto",
    faqTitle: "Pertanyaan Sebelum Anda Memulai.",
  } : {
    heroEyebrow: "AUTOREV MOBILITAS INDONESIA",
    heroA: "Mobility with Direction.",
    heroB: "For Drivers, Individuals, and Companies.",
    heroText: "From practical daily rentals and business fleet operations to a real path toward electric-car ownership without upfront capital. AutoRev brings a clear process and a team ready to support you.",
    heroPrimary: "Explore Founding Driver",
    heroSecondary: "Rent for Your Company",
    search: "Search Limo Green, MPVs, electric cars, or company vehicles...",
    searchButton: "Find a Car",
    pathsEyebrow: "01 · CHOOSE YOUR GOAL",
    pathsTitle: "The Right Vehicle Solution for Every Need.",
    pathsText: "Choose the path that fits your plans today. We will guide you toward the most sensible scheme, vehicle, and calculation.",
    catalogTitle: "A Complete Fleet for Every Route.",
    catalogText: "Explore AutoRev’s leading electric vehicles, including the VinFast Limo Green and BYD M6, alongside trusted conventional fleets for different operating scales.",
    catalogSearch: "Search brand, model, or use case...",
    empty: "No model matches this search yet.",
    reset: "Show all",
    more: "Show more vehicles",
    request: "Ask about this car",
    coming: "Next Allocation Wave",
    onRequest: "Available by Special Order",
    seats: "seats",
    disclaimer: "Vehicle specifications and variants depend on unit availability in your area. Our team will confirm the unit details once the allocation schedule is approved.",
    processTitle: "Clear Steps from Intent to a Car on the Road.",
    processText: "We remove unnecessary bureaucracy. Tell us what you need, and the AutoRev team will guide the process until the keys are in your hands.",
    corporateTitle: "Business Mobility without Bureaucratic Barriers.",
    corporateText: "From one executive vehicle to dozens of daily operating units. We provide flexible self-drive options or professional drivers.",
    corporateCta: "Discuss Your Business Needs",
    revTitle: "As Your Fleet Grows, Operational Control Stays in Your Hands.",
    revText: "RevAuto is an integrated fleet-management platform for monitoring vehicles, maintenance schedules, charging transactions, and operating-cost analysis from one screen.",
    revCta: "Explore the RevAuto System",
    faqTitle: "Questions Before You Begin.",
  };

  const pathways = locale === "id" ? [
    { number: "01", eyebrow: "PROGRAM UTAMA", title: "Founding Driver", text: "Kumpulkan setoran harian menjadi hak milik penuh atas mobil listrik Anda. Tanpa uang muka.", cta: "Pelajari Program", href: "/founding-driver", image: "/images/autorev-driver-passenger-v3.png", icon: Route },
    { number: "02", eyebrow: "PERSONAL", title: "Sewa Mobil", text: "Pilihan kendaraan harian, mingguan, atau bulanan untuk mobilitas pribadi dan keluarga.", cta: "Lihat Pilihan Sewa", href: "/autorev-rental", image: "/images/autorev-rental-roadtrip-v3.png", icon: CarFront },
    { number: "03", eyebrow: "PERUSAHAAN", title: "Solusi Bisnis", text: "Armada mobil listrik dan konvensional untuk perjalanan dinas, operasional, hingga shuttle.", cta: "Konsultasi Armada", href: "/autorev-business", image: "/images/autorev-corporate-ev-v2.png", icon: Building2 },
  ] : [
    { number: "01", eyebrow: "MAIN PROGRAM", title: "Founding Driver", text: "Turn daily payments into full ownership of your electric car. No down payment.", cta: "Explore the Program", href: "/founding-driver", image: "/images/autorev-driver-passenger-v3.png", icon: Route },
    { number: "02", eyebrow: "PERSONAL", title: "Car Rental", text: "Daily, weekly, or monthly vehicles for personal and family mobility.", cta: "View Rental Options", href: "/autorev-rental", image: "/images/autorev-rental-roadtrip-v3.png", icon: CarFront },
    { number: "03", eyebrow: "COMPANIES", title: "Business Solutions", text: "Electric and conventional fleets for business travel, operations, and shuttles.", cta: "Discuss Your Fleet", href: "/autorev-business", image: "/images/autorev-corporate-ev-v2.png", icon: Building2 },
  ];

  const process = locale === "id" ? [
    ["01", "Sampaikan Kebutuhan", "Tanggal, durasi, lokasi, serta rute operasional."],
    ["02", "Penyelarasan Unit", "EV atau konvensional, lepas kunci atau dengan pengemudi."],
    ["03", "Konfirmasi Detail", "Unit, jaminan servis, dan aturan main dijelaskan secara transparan."],
    ["04", "Serah Terima Unit", "Mobil siap jalan dengan dukungan teknis yang utuh."],
  ] : [
    ["01", "Share Your Needs", "Dates, duration, location, and operating routes."],
    ["02", "Vehicle Alignment", "Electric or conventional, self drive or with a driver."],
    ["03", "Confirm the Details", "Vehicle, service assurance, and operating terms are explained transparently."],
    ["04", "Vehicle Handover", "A road-ready car with complete technical support."],
  ];

  const faq = locale === "id" ? [
    ["Apakah semua mobil di katalog langsung tersedia?", "Katalog menampilkan jajaran kendaraan yang kami operasikan. Ketersediaan warna, varian, dan lokasi alokasi akan langsung dikonfirmasi oleh tim saat Anda melakukan pengajuan."],
    ["Apakah AutoRev menyediakan mobil listrik dan konvensional?", "Ya. Kami memprioritaskan armada mobil listrik untuk efisiensi masa depan, sekaligus menyediakan pilihan kendaraan konvensional seperti bensin, diesel, dan hybrid untuk kebutuhan medan tertentu."],
    ["Apakah bisa menyewa mobil lengkap dengan pengemudi?", "Sangat bisa. Kami menyediakan layanan lepas kunci maupun pengemudi berpengalaman untuk kebutuhan pribadi, tamu VIP, maupun operasional kantor."],
    ["Bagaimana cara bergabung dalam program Founding Driver?", "Anda dapat langsung membuka halaman khusus Founding Driver untuk mempelajari skema setoran harian menuju kepemilikan penuh tanpa uang muka."],
  ] : [
    ["Are all catalog cars immediately available?", "The catalog presents the vehicles we operate. Our team will confirm color, variant, and allocation location when you submit a request."],
    ["Does AutoRev provide electric and conventional cars?", "Yes. We prioritize electric fleets for future efficiency while providing petrol, diesel, and hybrid options for specific terrain and operating needs."],
    ["Can I rent a car with a driver?", "Absolutely. We provide self-drive rentals and experienced drivers for personal travel, VIP guests, and office operations."],
    ["How do I join the Founding Driver program?", "Open the Founding Driver page to review the daily-payment path toward full ownership with no down payment."],
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
      </motion.div>
      <form className={styles.heroSearch} onSubmit={submitSearch} role="search" aria-label={locale === "id" ? "Cari mobil rental" : "Search rental cars"}>
        <Search aria-hidden="true"/><input type="search" name="vehicle-search" enterKeyHint="search" autoComplete="off" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search} aria-label={t.search}/>
        <button type="submit"><span>{t.searchButton}</span><ArrowRight aria-hidden="true"/></button>
      </form>
      <div className={styles.heroIndex} aria-hidden="true">
        <span>FOUNDING DRIVER</span><i/>
        <span>{locale === "id" ? "MOBIL LISTRIK SIAP KERJA" : "ELECTRIC CARS READY FOR WORK"}</span><i/>
        <span>{locale === "id" ? "PENDAMPINGAN TIAP HARI" : "DAILY SUPPORT"}</span>
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
          <div><span>02 · {locale === "id" ? "E-KATALOG MOBIL" : "VEHICLE E-CATALOG"}</span><h2 id="vehicle-catalog-title">{t.catalogTitle}</h2></div>
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
          <span>04 · {locale === "id" ? "ARMADA PERUSAHAAN" : "BUSINESS FLEET"}</span><h2 id="corporate-rental-title">{t.corporateTitle}</h2><p>{t.corporateText}</p>
          <div className={styles.corporateBenefits}>
            <span><CarFront aria-hidden="true"/>{locale === "id" ? "Lepas kunci atau pengemudi profesional" : "Self drive or professional drivers"}</span>
            <span><CalendarRange aria-hidden="true"/>{locale === "id" ? "Kontrak fleksibel" : "Flexible contracts"}</span>
            <span><Zap aria-hidden="true"/>{locale === "id" ? "Penghematan energi hingga 60%" : "Energy savings of up to 60%"}</span>
            <span><Headphones aria-hidden="true"/>{locale === "id" ? "Perawatan terjadwal" : "Scheduled maintenance"}</span>
          </div>
          <SplitLink light href={localizePath(locale, "/autorev-business")}>{t.corporateCta}</SplitLink>
        </Reveal>
      </div>
    </section>

    <section className={styles.trust} aria-labelledby="autorev-experience-title">
      <div className="container">
        <Reveal className={styles.trustHead}><span>05 · {locale === "id" ? "PRINSIP AUTOREV" : "AUTOREV PRINCIPLES"}</span><h2 id="autorev-experience-title">{locale === "id" ? "Ketenangan Pikiran di Setiap Kilometer." : "Peace of Mind in Every Kilometer."}</h2></Reveal>
        <div className={styles.trustGrid}>
          {[
            { icon: ShieldCheck, title: locale === "id" ? "Transparansi Tanpa Jebakan" : "Transparency without Traps", text: locale === "id" ? "Semua biaya, ketentuan servis, dan skema penggunaan dijelaskan secara terbuka sejak awal. Tidak ada biaya siluman di tengah jalan." : "Every cost, service term, and usage scheme is explained openly from the start. No hidden charges appear along the way." },
            { icon: Route, title: locale === "id" ? "Alur Kerja yang Ringkas" : "A Streamlined Process", text: locale === "id" ? "Kami menghargai waktu Anda. Seluruh proses diawali dari percakapan langsung yang relevan, bukan formulir rumit yang membingungkan." : "We respect your time. Every process begins with a relevant conversation, not a complicated and confusing form." },
            { icon: Headphones, title: locale === "id" ? "Manusia di Balik Teknologi" : "People behind the Technology", text: locale === "id" ? "Sistem digital mempermudah proses, namun tim operasional AutoRev selalu siap mendampingi Anda saat terjadi kendala di lapangan." : "Digital systems simplify the process, while the AutoRev operations team remains ready to support you when challenges arise." },
          ].map((item, index) => { const Icon = item.icon; return <Reveal className={styles.trustCard} delay={index * .08} key={item.title}><span><Icon aria-hidden="true"/></span><h3>{item.title}</h3><p>{item.text}</p></Reveal>; })}
        </div>
      </div>
    </section>

    <section className={styles.faq} aria-labelledby="rental-faq-title">
      <div className={`container ${styles.faqGrid}`}>
        <Reveal className={styles.faqIntro}><span>06 · FAQ</span><h2 id="rental-faq-title">{t.faqTitle}</h2><p>{locale === "id" ? "Temukan jawaban singkat sebelum memilih layanan AutoRev yang sesuai." : "Find concise answers before choosing the AutoRev service that fits you."}</p><Link href={localizePath(locale, "/contact")}>{locale === "id" ? "Hubungi AutoRev" : "Contact AutoRev"}<ArrowUpRight aria-hidden="true"/></Link></Reveal>
        <div className={styles.faqList}>{faq.map(([question, answer]) => <details key={question}><summary><span>{question}</span><ChevronDown aria-hidden="true"/></summary><p>{answer}</p></details>)}</div>
      </div>
    </section>

    <section className={styles.revauto} id="revauto" aria-labelledby="revauto-title">
      <div className={`container ${styles.revGrid}`}>
        <Reveal className={styles.revCopy}><span><Sparkles aria-hidden="true"/> REVAUTO · FLEET SYSTEM</span><h2 id="revauto-title">{t.revTitle}</h2><p>{t.revText}</p><SplitLink light href={localizePath(locale, "/revauto")}>{t.revCta}</SplitLink></Reveal>
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
