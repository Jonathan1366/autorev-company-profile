"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CarFront, Building2, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getCopy } from "@/lib/content";
import { localizePath } from "@/lib/i18n";

export function ProductModeSwitcher({ locale }: { locale: Locale }) {
  const [mode, setMode] = useState<"people" | "business">("people");
  const reduce = useReducedMotion();
  const { home } = getCopy(locale);
  const people = {
    title: home.peopleTitle,
    text: home.peopleText,
    items: locale === "id" ? ["Sewa kendaraan", "Temukan bantuan", "Jadwalkan perawatan", "Pantau perbaikan"] : ["Rent a vehicle", "Find assistance", "Schedule maintenance", "Track repair"],
    href: localizePath(locale, "/rental"),
  };
  const business = {
    title: home.businessTitle,
    text: home.businessText,
    items: locale === "id" ? ["Kelola armada", "Pantau ketersediaan", "Atur maintenance", "Kendalikan downtime"] : ["Manage your fleet", "Monitor availability", "Plan maintenance", "Control downtime"],
    href: localizePath(locale, "/business"),
  };
  const active = mode === "people" ? people : business;

  return (
    <div className="mode-switcher">
      <div className="mode-switcher__tabs" role="tablist" aria-label="AutoRev product mode">
        <button className={mode === "people" ? "is-active" : ""} onClick={() => setMode("people")} role="tab" aria-selected={mode === "people"}><CarFront size={18} />{locale === "id" ? "Personal" : "Personal"}</button>
        <button className={mode === "business" ? "is-active" : ""} onClick={() => setMode("business")} role="tab" aria-selected={mode === "business"}><Building2 size={18} />Business</button>
      </div>
      <div className="mode-switcher__body">
        <motion.div key={mode} initial={reduce ? false : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }}>
          <span className="kicker">0{mode === "people" ? "1" : "2"} / {mode === "people" ? "AutoRev" : "AutoRev Business"}</span>
          <h3>{active.title}</h3>
          <p>{active.text}</p>
          <ul>{active.items.map((item) => <li key={item}>{item}</li>)}</ul>
          <Link href={active.href}>{locale === "id" ? "Jelajahi pengalaman" : "Explore the experience"}<ArrowUpRight size={18} /></Link>
        </motion.div>
        <ProductDevice mode={mode} locale={locale} />
      </div>
    </div>
  );
}

function ProductDevice({ mode, locale }: { mode: "people" | "business"; locale: Locale }) {
  if (mode === "people") {
    return (
      <div className="phone-preview" aria-label="AutoRev app product preview">
        <div className="phone-preview__bar"><span>9:41</span><i /></div>
        <div className="phone-preview__greeting"><small>{locale === "id" ? "Selamat datang" : "Welcome back"}</small><strong>{locale === "id" ? "Mau pergi ke mana?" : "Where are you going?"}</strong></div>
        <div className="phone-preview__search"><span>⌖</span>{locale === "id" ? "Lokasi pengantaran" : "Delivery location"}</div>
        <div className="phone-preview__car"><CarFront size={64} strokeWidth={1.15} /><small>100% EV</small><strong>{locale === "id" ? "Pilih kendaraan" : "Choose a vehicle"}</strong></div>
        <div className="phone-preview__quick"><span>{locale === "id" ? "Rental" : "Rental"}</span><span>Care</span><span>Assist</span></div>
      </div>
    );
  }
  return (
    <div className="mini-dashboard" aria-label="AutoRev Business product preview">
      <div className="mini-dashboard__top"><span>AutoRev <b>Business</b></span><small>Product preview</small></div>
      <div className="mini-dashboard__stats"><div><small>{locale === "id" ? "Tersedia" : "Available"}</small><strong>{locale === "id" ? "Siap" : "Ready"}</strong></div><div><small>{locale === "id" ? "Perlu tindakan" : "Needs action"}</small><strong>{locale === "id" ? "Tinjau" : "Review"}</strong></div></div>
      <div className="mini-dashboard__chart"><i /><i /><i /><i /><i /><i /><i /></div>
      <div className="mini-dashboard__rows"><span><i className="dot dot--green" />Vehicle 01 <b>{locale === "id" ? "Tersedia" : "Available"}</b></span><span><i className="dot dot--blue" />Vehicle 02 <b>{locale === "id" ? "Disewa" : "Rented"}</b></span><span><i className="dot dot--orange" />Vehicle 03 <b>Maintenance</b></span></div>
    </div>
  );
}
