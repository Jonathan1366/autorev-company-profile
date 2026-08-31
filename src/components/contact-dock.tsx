"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CarFront, Gauge, MessageCircle, Phone, Wrench, X } from "lucide-react";
import { localizePath, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export function ContactDock({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const isDriverPage = pathname.includes("/founding-driver") || pathname.includes("/drivers");
  const isEquipmentPage = pathname.includes("/equipment");
  const MobileIcon = isDriverPage ? Gauge : isEquipmentPage ? Wrench : CarFront;
  const whatsapp = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(isDriverPage
    ? (locale === "id" ? "Halo AutoRev, saya ingin bertanya tentang Program Founding Driver." : "Hi AutoRev, I would like to ask about the Founding Driver program.")
    : isEquipmentPage
      ? (locale === "id" ? "Halo AutoRev, saya ingin membahas kebutuhan armada proyek atau peralatan operasional." : "Hi AutoRev, I would like to discuss project fleet or operating equipment support.")
      : (locale === "id" ? "Halo AutoRev, saya ingin bertanya tentang rental mobil untuk kebutuhan pribadi atau perusahaan." : "Hi AutoRev, I would like to ask about car rental for personal or corporate needs."))}`;
  return <><div className={`contact-dock ${open ? "is-open" : ""}`}>
    <AnimatePresence>
      {open && <motion.div className="contact-dock__panel" initial={reduceMotion ? false : { opacity: 0, y: 14, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: .97 }} transition={{ duration: .22 }}>
        <span>{locale === "id" ? "Bicara dengan AutoRev" : "Talk to AutoRev"}</span>
        <a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={18}/><div><strong>WhatsApp</strong><small>{siteConfig.phoneDisplay}</small></div></a>
        <a href={`tel:${siteConfig.phoneTel}`}><Phone size={18}/><div><strong>{locale === "id" ? "Telepon langsung" : "Call directly"}</strong><small>{siteConfig.phoneDisplay}</small></div></a>
      </motion.div>}
    </AnimatePresence>
    <button onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? (locale === "id" ? "Tutup kontak" : "Close contact") : (locale === "id" ? "Hubungi AutoRev" : "Contact AutoRev")}>{open ? <X size={21}/> : <MessageCircle size={21}/>}<span>{open ? "" : locale === "id" ? "Hubungi" : "Contact"}</span></button>
  </div><div className="mobile-action-bar"><Link href={localizePath(locale, isDriverPage ? "/founding-driver#platforms" : isEquipmentPage ? "/equipment#catalog" : "/#vehicle-catalog")}><MobileIcon size={21}/><span>{isDriverPage ? (locale === "id" ? "Lihat Platform" : "View Platforms") : (locale === "id" ? "Buka Katalog" : "Open Catalog")}</span></Link><Link href={localizePath(locale, isDriverPage ? "/contact?type=driver" : "/contact?type=business")}><MessageCircle size={21}/><span>{locale === "id" ? "Minta Penawaran" : "Request Quote"}</span></Link></div></>;
}
