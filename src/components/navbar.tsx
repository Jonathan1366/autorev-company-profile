"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Boxes, Building2, ChevronDown, Gauge, Menu, X } from "lucide-react";
import { BrandLogo } from "./brand-logo";
import styles from "./navbar.module.css";
import { alternateLocale, localizePath, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export function Navbar({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const morePanel = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const alternate = alternateLocale(locale);
  const routeWithoutLocale = pathname.replace(/^\/(id|en)/, "") || "";
  const home = localizePath(locale);

  const moreLinks = [
    {
      overline: locale === "id" ? "PERUSAHAAN MOBILITAS" : "MOBILITY COMPANY",
      title: "AutoRev Mobilitas Indonesia",
      text: locale === "id" ? "Arah, nilai, dan perjalanan kami membangun mobilitas yang lebih mudah." : "Our direction, values, and journey toward easier mobility.",
      icon: Building2,
      href: localizePath(locale, "/about"),
    },
    {
      overline: locale === "id" ? "KEBUTUHAN PROYEK" : "PROJECT SUPPORT",
      title: locale === "id" ? "Armada & Peralatan" : "Fleet & Equipment",
      text: locale === "id" ? "Solusi tambahan untuk transportasi proyek, logistik, dan peralatan operasional." : "Additional solutions for project transport, logistics, and operating equipment.",
      icon: Boxes,
      href: localizePath(locale, "/equipment"),
    },
    {
      overline: "FLEET MANAGEMENT SYSTEM",
      title: "RevAuto Fleet System",
      text: locale === "id" ? "Sistem fleet management untuk operasi kendaraan yang lebih terhubung." : "Fleet management for more connected vehicle operations.",
      icon: Gauge,
      href: localizePath(locale, "/revauto"),
    },
  ];

  const links = [
    { href: localizePath(locale, "/founding-driver"), label: "Founding Driver" },
    { href: `${home}#vehicle-catalog`, label: locale === "id" ? "Katalog Mobil" : "Vehicle Catalog" },
    { href: localizePath(locale, "/autorev-rental"), label: locale === "id" ? "Rental Mobil" : "Car Rental" },
    { href: localizePath(locale, "/autorev-business"), label: locale === "id" ? "Corporate Rental" : "Corporate Rental" },
    { href: localizePath(locale, "/about"), label: "AutoRev Mobilitas Indonesia" },
    { href: localizePath(locale, "/equipment"), label: locale === "id" ? "Armada & Peralatan" : "Fleet & Equipment" },
    { href: localizePath(locale, "/revauto"), label: "RevAuto" },
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
      if (event.key === "Escape") { setOpen(false); setMoreOpen(false); }
    };
    window.addEventListener("keydown", closeMenu);
    return () => window.removeEventListener("keydown", closeMenu);
  }, []);

  const openMoreFromKeyboard = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!["ArrowDown", "Enter", " "].includes(event.key)) return;
    event.preventDefault();
    setMoreOpen(true);
    requestAnimationFrame(() => morePanel.current?.querySelector<HTMLAnchorElement>("a")?.focus());
  };

  return <header className={`${styles.header} site-header ${scrolled || open || moreOpen ? "site-header--solid" : ""}`} onMouseLeave={() => setMoreOpen(false)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setMoreOpen(false); }}>
    <div className="nav-shell">
      <BrandLogo locale={locale} inverse/>
      <nav className="desktop-nav" aria-label={locale === "id" ? "Navigasi utama" : "Main navigation"}>
        <Link href={localizePath(locale, "/founding-driver")}>Founding Driver</Link>
        <Link href={`${home}#vehicle-catalog`}>{locale === "id" ? "Katalog Mobil" : "Vehicle Catalog"}</Link>
        <Link href={localizePath(locale, "/autorev-rental")}>{locale === "id" ? "Rental Mobil" : "Car Rental"}</Link>
        <Link href={localizePath(locale, "/autorev-business")}>Corporate</Link>
        <button className={moreOpen ? "is-active" : ""} onMouseEnter={() => setMoreOpen(true)} onClick={() => setMoreOpen((value) => !value)} onKeyDown={openMoreFromKeyboard} aria-expanded={moreOpen} aria-controls="more-navigation">{locale === "id" ? "Lainnya" : "More"}<ChevronDown size={14}/></button>
      </nav>
      <div className="nav-actions">
        <Link className="language-switch" href={localizePath(alternate, routeWithoutLocale)} hrefLang={alternate}>{alternate.toUpperCase()}</Link>
        <Link className="button button--nav" href={localizePath(locale, "/contact?type=business")}>{locale === "id" ? "Minta Penawaran" : "Request a Quote"}</Link>
        <button className="menu-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? (locale === "id" ? "Tutup menu" : "Close menu") : (locale === "id" ? "Buka menu" : "Open menu")}>{open ? <X/> : <Menu/>}</button>
      </div>
    </div>

    <AnimatePresence initial={false}>
      {moreOpen && <motion.div ref={morePanel} id="more-navigation" className={styles.mega} initial={reduceMotion ? false : { opacity: 0, y: -8, scale: .99 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: .99 }} transition={{ duration: .24, ease: [0.22, 1, 0.36, 1] }} onMouseEnter={() => setMoreOpen(true)}>
        <div className={styles.intro}><span>AUTOREV MOBILITAS INDONESIA</span><h2>{locale === "id" ? "Lebih dari perjalanan." : "Beyond the journey."}</h2><p>{locale === "id" ? "Kenali AutoRev, temukan dukungan operasional, lalu kelola armada melalui teknologi yang terus berkembang." : "Meet AutoRev, find operational support, then manage your fleet through evolving technology."}</p><Link href={localizePath(locale, "/about")} onClick={() => setMoreOpen(false)}>{locale === "id" ? "Tentang perusahaan" : "About the company"}<ArrowRight size={18}/></Link></div>
        <div className={styles.grid}>{moreLinks.map((item) => { const Icon = item.icon; return <Link key={item.href} href={item.href} onClick={() => setMoreOpen(false)}><span><Icon size={23}/></span><div><small>{item.overline}</small><strong>{item.title}</strong><p>{item.text}</p></div><ArrowUpRight size={18}/></Link>; })}</div>
      </motion.div>}
    </AnimatePresence>

    <div id="mobile-navigation" className={`mobile-menu ${open ? "mobile-menu--open" : ""}`} aria-hidden={!open}>
      <div className="mobile-menu__path">{locale === "id" ? "Pilih tujuan" : "Choose a path"}</div>
      <nav className="mobile-menu__primary">{links.map((item, index) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} style={{ transitionDelay: open ? `${index * 40}ms` : "0ms" }}><span>0{index + 1}</span>{item.label}</Link>)}</nav>
      <div className="mobile-menu__footer"><a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={14}/></a><Link href={localizePath(locale, "/contact?type=business")} onClick={() => setOpen(false)}>{locale === "id" ? "Minta Penawaran" : "Request a Quote"}<ArrowUpRight size={14}/></Link></div>
    </div>
  </header>;
}
