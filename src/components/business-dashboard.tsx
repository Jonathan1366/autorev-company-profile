"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bell, Bot, ChevronRight, MapPin } from "lucide-react";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";

export function BusinessDashboardPreview({ locale }: { locale: Locale }) {
  const reduce = useReducedMotion();
  const stats = locale === "id" ? [["Ketersediaan", "Siap"], ["Disewa", "Aktif"], ["Maintenance", "Terjadwal"], ["Downtime", "Tinjau"]] : [["Available", "Ready"], ["Rented", "Active"], ["Maintenance", "Scheduled"], ["Downtime", "Review"]];
  return (
    <div className="dashboard-preview">
      <div className="dashboard-preview__nav">
        <Image className="dashboard-preview__logo" src="/images/autorev-icon-300.png" alt="" width={28} height={28} />
        <div>{["Overview", "Vehicles", "Bookings", "Maintenance", "Partners"].map((item, i) => <span className={i === 0 ? "is-active" : ""} key={item}>{item}</span>)}</div>
        <Bell size={17} />
      </div>
      <div className="dashboard-preview__content">
        <div className="dashboard-preview__heading"><div><small>AUTOREV BUSINESS</small><h3>{locale === "id" ? "Selamat pagi, Fleet Owner" : "Good morning, Fleet Owner"}</h3></div><span>{locale === "id" ? "Preview produk · Data ilustratif" : "Product preview · Illustrative data"}</span></div>
        <div className="dashboard-preview__stats">{stats.map(([label, value], i) => <motion.div key={label} initial={reduce ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }}><small>{label}</small><strong>{value}</strong><span>{locale === "id" ? "Data ilustratif" : "Illustrative data"}</span></motion.div>)}</div>
        <div className="dashboard-preview__grid">
          <div className="dashboard-card dashboard-card--chart">
            <div className="dashboard-card__title"><div><small>{locale === "id" ? "UTILISASI ARMADA" : "FLEET UTILIZATION"}</small><strong>{locale === "id" ? "Kinerja mingguan" : "Weekly performance"}</strong></div><span>7D⌄</span></div>
            <div className="chart-lines"><i /><i /><i /><i /><i /></div>
            <svg className="line-chart" viewBox="0 0 600 170" role="img" aria-label="Illustrative fleet utilization chart"><defs><linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0866ff" stopOpacity=".22"/><stop offset="100%" stopColor="#0866ff" stopOpacity="0"/></linearGradient></defs><path d="M0 139 C55 130 75 80 135 98 S220 125 270 73 S355 44 400 71 S492 102 600 30 L600 170 L0 170Z" fill="url(#chart-fill)"/><motion.path d="M0 139 C55 130 75 80 135 98 S220 125 270 73 S355 44 400 71 S492 102 600 30" fill="none" stroke="#0866ff" strokeWidth="3" initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: "easeOut" }}/></svg>
            <div className="chart-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
          </div>
          <div className="dashboard-card dashboard-card--map">
            <div className="dashboard-card__title"><div><small>{locale === "id" ? "LOKASI KENDARAAN" : "VEHICLE LOCATION"}</small><strong>Jabodetabek</strong></div><MapPin size={18} /></div>
            <div className="map-grid">{[1,2,3,4].map((pin, i) => <motion.i key={pin} className={`map-pin map-pin--${pin}`} initial={reduce ? false : { scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: .5 + i * .12 }} />)}</div>
          </div>
          <motion.div className="dashboard-card dashboard-card--ai" initial={reduce ? false : { opacity: 0, x: 25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: .6 }}>
            <span><Bot size={18} /></span><div><small>REV AI · {locale === "id" ? "REKOMENDASI" : "RECOMMENDATION"}</small><strong>{locale === "id" ? "Tinjau jadwal maintenance sebelum booking berikutnya." : "Review maintenance timing before the next booking."}</strong></div><ChevronRight size={18} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
