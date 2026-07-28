"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { BrandLogo } from "./brand-logo";
import styles from "./navbar.module.css";
import { alternateLocale, localizePath, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export function Navbar({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const alternate = alternateLocale(locale);
  const routeWithoutLocale = pathname.replace(/^\/(id|en)/, "") || "";
  const services = locale === "id" ? [
    { href: "/founding-driver", label: "01 · FOUNDING DRIVER · MULAI RP300 RIBU/HARI", title: "Sewa Jadi Milik", text: "Program 5 tahun tanpa deposit, DP, atau pelunasan akhir.", image: "/images/autorev-founding-driver-v2.png" },
    { href: "/autorev-rental", label: "02 · RENTAL PERJALANAN", title: "EV Rental", text: "Harian, mingguan, atau bulanan. Lepas kunci atau dengan driver.", image: "/images/autorev-rental-roadtrip-v3.png" },
    { href: "/autorev-business", label: "03 · UNTUK BISNIS", title: "AutoRev Business", text: "Armada EV untuk corporate dan owner rental.", image: "/images/autorev-corporate-ev-v2.png" },
  ] : [
    { href: "/founding-driver", label: "01 · FOUNDING DRIVER · FROM IDR 300K/DAY", title: "Rent to Own", text: "Five-year program with no deposit, down payment, or final balloon payment.", image: "/images/autorev-founding-driver-v2.png" },
    { href: "/autorev-rental", label: "02 · TRAVEL RENTAL", title: "EV Rental", text: "Daily, weekly, or monthly. Self drive or with a driver.", image: "/images/autorev-rental-roadtrip-v3.png" },
    { href: "/autorev-business", label: "03 · FOR BUSINESS", title: "AutoRev Business", text: "EV fleets for companies and rental owners.", image: "/images/autorev-corporate-ev-v2.png" },
  ];
  const links = [
    { href: "/founding-driver", label: locale === "id" ? "Program Driver" : "Driver Program" },
    { href: "/autorev-rental", label: locale === "id" ? "Rental Perjalanan" : "Travel Rental" },
    { href: "/autorev-business", label: locale === "id" ? "Bisnis" : "Business" },
    { href: "/revauto", label: "RevAuto" },
    { href: "/about", label: locale === "id" ? "Tentang" : "About" },
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
      if (event.key === "Escape") { setOpen(false); setServicesOpen(false); }
    };
    window.addEventListener("keydown", closeMenu);
    return () => window.removeEventListener("keydown", closeMenu);
  }, []);

  return (
    <header className={`site-header ${scrolled || open || servicesOpen ? "site-header--solid" : ""}`} onMouseLeave={() => setServicesOpen(false)}>
      <div className="nav-shell">
        <BrandLogo locale={locale} inverse />
        <nav className="desktop-nav" aria-label={locale === "id" ? "Navigasi utama" : "Main navigation"}>
          <button className={servicesOpen ? "is-active" : ""} onMouseEnter={() => setServicesOpen(true)} onClick={() => setServicesOpen((value) => !value)} aria-expanded={servicesOpen} aria-controls="services-navigation">{locale === "id" ? "Pilih Program" : "Choose a Program"}<ChevronDown size={14}/></button>
          <Link href={localizePath(locale, "/revauto")} className={pathname.endsWith("/revauto") ? "is-active" : ""}>RevAuto</Link>
          <Link href={localizePath(locale, "/about")} className={pathname.endsWith("/about") ? "is-active" : ""}>{locale === "id" ? "Tentang" : "About"}</Link>
        </nav>
        <div className="nav-actions">
          <Link className="language-switch" href={localizePath(alternate, routeWithoutLocale)} hrefLang={alternate} aria-label={locale === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}>{alternate.toUpperCase()}</Link>
          <Link className="button button--nav" href={localizePath(locale, "/contact")}>{locale === "id" ? "Daftar" : "Register"}</Link>
          <button className="menu-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? (locale === "id" ? "Tutup menu" : "Close menu") : (locale === "id" ? "Buka menu" : "Open menu")}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {servicesOpen && <motion.div id="services-navigation" className={styles.mega} initial={reduceMotion ? false : { opacity: 0, y: -7, scale: .987 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -5, scale: .993 }} transition={{ duration: reduceMotion ? .01 : .17, ease: [0.22,1,0.36,1] }} onMouseEnter={() => setServicesOpen(true)}>
          <div className={styles.grid}>{services.map((item) => <Link key={item.href} href={localizePath(locale, item.href)} className={styles.card} onClick={() => setServicesOpen(false)}>
            <div className={styles.media}><Image src={item.image} alt="" fill sizes="(max-width: 1100px) 33vw, 410px" quality={90}/></div>
            <small>{item.label}</small><strong>{item.title}</strong><span>{item.text}</span><ArrowUpRight size={20}/>
          </Link>)}</div>
          <Link className={styles.next} href={localizePath(locale, "/revauto")} onClick={() => setServicesOpen(false)}><span><small>{locale === "id" ? "04 · SISTEM" : "04 · SYSTEM"}</small><strong>RevAuto</strong><i>{locale === "id" ? "Kelola unit, booking, driver, charging, maintenance, dan laporan." : "Manage vehicles, bookings, drivers, charging, maintenance, and reporting."}</i></span><ArrowRight size={22}/></Link>
        </motion.div>}
      </AnimatePresence>

      <div id="mobile-navigation" className={`mobile-menu ${open ? "mobile-menu--open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu__path">{locale === "id" ? "Pilih tujuan" : "Choose a path"}</div>
        <nav className="mobile-menu__primary" aria-label={locale === "id" ? "Navigasi mobile" : "Mobile navigation"}>
          {links.map((item, index) => <Link key={item.href} href={localizePath(locale, item.href)} onClick={() => setOpen(false)} style={{ transitionDelay: open ? `${index * 40}ms` : "0ms" }}><span>0{index + 1}</span>{item.label}</Link>)}
        </nav>
        <div className="mobile-menu__footer">
          <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={14}/></a>
          <Link href={localizePath(locale, "/contact")} onClick={() => setOpen(false)}>{locale === "id" ? "Daftar" : "Register"}<ArrowUpRight size={14}/></Link>
        </div>
      </div>
    </header>
  );
}
