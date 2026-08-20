"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, Construction, Gauge, Menu, Tractor, Truck, X } from "lucide-react";
import { BrandLogo } from "./brand-logo";
import styles from "./navbar.module.css";
import { alternateLocale, localizePath, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export function Navbar({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const alternate = alternateLocale(locale);
  const routeWithoutLocale = pathname.replace(/^\/(id|en)/, "") || "";
  const home = localizePath(locale);

  const solutions = [
    { code: "KBLI 77100", title: "Vehicle & Transportation", text: locale === "id" ? "Corporate fleet, truck, trailer, dan project transport." : "Corporate fleets, trucks, trailers, and project transport.", icon: Truck, href: `${home}#catalog` },
    { code: "KBLI 77393", title: "Construction Equipment", text: locale === "id" ? "Earthmoving, lifting, road, dan material handling." : "Earthmoving, lifting, road, and material handling.", icon: Construction, href: `${home}#catalog` },
    { code: "KBLI 77395", title: "Mining & Quarry", text: locale === "id" ? "Production, hauling, processing, dan site support." : "Production, hauling, processing, and site support.", icon: Tractor, href: `${home}#catalog` },
    { code: "KBLI 58290", title: "Fleet Technology", text: locale === "id" ? "Monitoring, maintenance, utilization, IoT, dan AI." : "Monitoring, maintenance, utilization, IoT, and AI.", icon: Gauge, href: `${home}#technology` },
  ];

  const links = [
    { href: `${home}#catalog`, label: locale === "id" ? "Katalog Equipment" : "Equipment Catalog" },
    { href: `${home}#project-solutions`, label: locale === "id" ? "Solusi Proyek" : "Project Solutions" },
    { href: `${home}#technology`, label: "Fleet Technology" },
    { href: localizePath(locale, "/about"), label: locale === "id" ? "Tentang AutoRev" : "About AutoRev" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const closeMenu = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); setSolutionsOpen(false); }
    };
    window.addEventListener("keydown", closeMenu);
    return () => window.removeEventListener("keydown", closeMenu);
  }, []);

  return <header className={`site-header ${scrolled || open || solutionsOpen ? "site-header--solid" : ""}`} onMouseLeave={() => setSolutionsOpen(false)}>
    <div className="nav-shell">
      <BrandLogo locale={locale} inverse/>
      <nav className="desktop-nav" aria-label={locale === "id" ? "Navigasi utama" : "Main navigation"}>
        <button className={solutionsOpen ? "is-active" : ""} onMouseEnter={() => setSolutionsOpen(true)} onClick={() => setSolutionsOpen((value) => !value)} aria-expanded={solutionsOpen} aria-controls="solutions-navigation">{locale === "id" ? "Solusi" : "Solutions"}<ChevronDown size={14}/></button>
        <Link href={`${home}#catalog`}>E-Catalog</Link>
        <Link href={`${home}#project-solutions`}>{locale === "id" ? "Solusi Proyek" : "Project Solutions"}</Link>
        <Link href={`${home}#technology`}>Technology</Link>
        <Link href={localizePath(locale, "/about")}>{locale === "id" ? "Tentang" : "About"}</Link>
      </nav>
      <div className="nav-actions">
        <Link className="language-switch" href={localizePath(alternate, routeWithoutLocale)} hrefLang={alternate}>{alternate.toUpperCase()}</Link>
        <Link className="button button--nav" href={localizePath(locale, "/contact?type=business")}>{locale === "id" ? "Minta Penawaran" : "Request a Quote"}</Link>
        <button className="menu-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? (locale === "id" ? "Tutup menu" : "Close menu") : (locale === "id" ? "Buka menu" : "Open menu")}>{open ? <X/> : <Menu/>}</button>
      </div>
    </div>

    <AnimatePresence initial={false}>
      {solutionsOpen && <motion.div id="solutions-navigation" className={styles.mega} initial={reduceMotion ? false : { opacity: 0, y: -8, scale: .99 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: .99 }} transition={{ duration: .2 }} onMouseEnter={() => setSolutionsOpen(true)}>
        <div className={styles.intro}><span>AUTOREV SOLUTION LINES</span><h2>{locale === "id" ? "Satu pintu untuk aset operasional." : "One gateway for operating assets."}</h2><p>{locale === "id" ? "Pilih lini KBLI atau mulai langsung dari unit yang Anda perlukan." : "Choose a KBLI line or start with the equipment you need."}</p><Link href={`${home}#solutions`} onClick={() => setSolutionsOpen(false)}>{locale === "id" ? "Lihat semua solusi" : "See all solutions"}<ArrowRight size={17}/></Link></div>
        <div className={styles.grid}>{solutions.map((item) => { const Icon = item.icon; return <Link key={item.code} href={item.href} onClick={() => setSolutionsOpen(false)}><span><Icon size={21}/></span><div><small>{item.code}</small><strong>{item.title}</strong><p>{item.text}</p></div><ArrowUpRight size={18}/></Link>; })}</div>
      </motion.div>}
    </AnimatePresence>

    <div id="mobile-navigation" className={`mobile-menu ${open ? "mobile-menu--open" : ""}`} aria-hidden={!open}>
      <div className="mobile-menu__path">{locale === "id" ? "Pilih tujuan" : "Choose a path"}</div>
      <nav className="mobile-menu__primary">{links.map((item, index) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} style={{ transitionDelay: open ? `${index * 40}ms` : "0ms" }}><span>0{index + 1}</span>{item.label}</Link>)}</nav>
      <div className="mobile-menu__footer"><a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={14}/></a><Link href={localizePath(locale, "/contact?type=business")} onClick={() => setOpen(false)}>{locale === "id" ? "Minta Penawaran" : "Request a Quote"}<ArrowUpRight size={14}/></Link></div>
    </div>
  </header>;
}
