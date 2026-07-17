"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, ArrowRight, CarFront, Check, MapPin, PackageSearch, Store, Wrench } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import styles from "./revauto-support-demo.module.css";

export function RevAutoSupportDemo({ locale }: { locale: Locale }) {
  const reduceMotion = useReducedMotion();
  const steps = locale === "id" ? [
    ["Kendaraan dilaporkan", "Lokasi dan kendala tercatat."],
    ["Bantuan terdekat ditemukan", "Bengkel dan teknisi diprioritaskan."],
    ["Suku cadang diperiksa", "Ketersediaan terlihat sebelum unit dikirim."],
  ] : [
    ["Vehicle reported", "Location and issue are captured."],
    ["Nearest support found", "Workshops and technicians are prioritised."],
    ["Parts checked", "Availability is visible before dispatch."],
  ];

  return <section className={styles.section} aria-label={locale === "id" ? "Preview bantuan operasional RevAuto" : "RevAuto operations support preview"}>
    <div className="container">
      <div className={styles.heading}>
        <div><span>REVAUTO · {locale === "id" ? "PREVIEW KONSEP" : "CONCEPT PREVIEW"}</span><i>{locale === "id" ? "DALAM PENGEMBANGAN" : "IN DEVELOPMENT"}</i></div>
        <h2>{locale === "id" ? "Saat unit berhenti, bantuan mulai bergerak." : "When a vehicle stops, support starts moving."}</h2>
        <p>{locale === "id" ? "Rancang alur dari laporan driver ke bengkel terdekat, teknisi, dan ketersediaan suku cadang." : "Designed to connect a driver report with nearby workshops, technicians, and parts availability."}</p>
      </div>

      <motion.div className={styles.desktop} initial={reduceMotion ? false : { opacity: 0, y: 42, scale: .97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: .16 }} transition={{ duration: .8, ease: [0.22, 1, 0.36, 1] }}>
        <div className={styles.toolbar}>
          <div><span>AR</span><strong>RevAuto</strong></div>
          <nav><b>{locale === "id" ? "Operasional" : "Operations"}</b><span>{locale === "id" ? "Armada" : "Fleet"}</span><span>{locale === "id" ? "Bantuan" : "Support"}</span></nav>
          <small>{locale === "id" ? "PREVIEW · DATA ILUSTRATIF" : "PREVIEW · ILLUSTRATIVE DATA"}</small>
        </div>

        <div className={styles.workspace}>
          <div className={styles.map}>
            <div className={styles.mapGrid}/>
            <i className={styles.roadOne}/><i className={styles.roadTwo}/>
            <motion.div className={styles.route} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: .35, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}/>
            <motion.span className={`${styles.pin} ${styles.pinOne}`} animate={reduceMotion ? undefined : { scale: [1, 1.12, 1] }} transition={{ duration: 2.2, repeat: Infinity }}><Store size={18}/></motion.span>
            <span className={`${styles.pin} ${styles.pinTwo}`}><Wrench size={18}/></span>
            <span className={`${styles.pin} ${styles.pinThree}`}><PackageSearch size={18}/></span>
            <motion.div className={styles.incident} animate={reduceMotion ? undefined : { y: [0, -5, 0] }} transition={{ duration: 2.5, repeat: Infinity }}><span><AlertTriangle size={18}/></span><div><small>{locale === "id" ? "UNIT MEMERLUKAN BANTUAN" : "VEHICLE NEEDS SUPPORT"}</small><strong>{locale === "id" ? "Laporan driver diterima" : "Driver report received"}</strong><p><MapPin size={13}/>{locale === "id" ? "Lokasi terdeteksi" : "Location detected"}</p></div></motion.div>
            <div className={styles.workshop}><span><Store size={18}/></span><div><small>{locale === "id" ? "BANTUAN TERDEKAT" : "NEAREST SUPPORT"}</small><strong>{locale === "id" ? "Bengkel mitra tersedia" : "Partner workshop available"}</strong><p>{locale === "id" ? "Rute dan kapasitas terlihat" : "Route and capacity visible"}</p></div><Check size={17}/></div>
          </div>

          <aside className={styles.side}>
            <div className={styles.sideTitle}><span><CarFront size={21}/></span><div><small>{locale === "id" ? "ALUR BANTUAN" : "SUPPORT FLOW"}</small><strong>{locale === "id" ? "Unit kembali bergerak" : "Get the vehicle moving"}</strong></div></div>
            <div className={styles.steps}>{steps.map(([title, text], index) => <motion.div key={title} initial={reduceMotion ? false : { opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: .35 + index * .13 }}><span>0{index + 1}</span><div><strong>{title}</strong><p>{text}</p></div>{index < steps.length - 1 && <ArrowRight size={16}/>}</motion.div>)}</div>
            <div className={styles.parts}><div><span><PackageSearch size={18}/></span><strong>{locale === "id" ? "Ketersediaan parts" : "Parts availability"}</strong></div><p><span>{locale === "id" ? "Komponen teridentifikasi" : "Components identified"}</span><b>{locale === "id" ? "Siap dicek" : "Ready to check"}</b></p><p><span>{locale === "id" ? "Vendor terdekat" : "Nearest vendor"}</span><b>{locale === "id" ? "Terhubung" : "Connected"}</b></p></div>
          </aside>
        </div>
      </motion.div>
    </div>
  </section>;
}
