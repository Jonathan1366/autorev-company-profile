"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getCopy } from "@/lib/content";
import { localizePath } from "@/lib/i18n";
import { ButtonLink } from "./button-link";

export function Hero({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.09]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 75]);
  const copyY = useTransform(scrollYProgress, [0, .72], [0, reduceMotion ? 0 : -45]);
  const copyOpacity = useTransform(scrollYProgress, [0, .68], [1, reduceMotion ? 1 : .12]);
  const { home } = getCopy(locale);
  const titleLines = locale === "id"
    ? ["Sewa.", "Jalan.", "Jadi milik."]
    : ["Rent.", "Drive.", "Own."];
  const ownershipSteps = locale === "id"
    ? ["Daftar", "Jalankan", "Jadi milik"]
    : ["Apply", "Drive", "Own"];
  return (
    <section className="hero" id="top" ref={ref}>
      <motion.div className="hero__media" style={{ scale: imageScale, y: imageY }}>
        <Image src="/images/autorev-kia-ev6-real.jpg" alt={locale === "id" ? "Kendaraan listrik melaju di jalan terbuka" : "An electric vehicle driving on the open road"} fill priority fetchPriority="high" sizes="100vw" quality={92} className="hero__image" />
      </motion.div>
      <div className="hero__wash" />
      <div className="container hero__content">
        <motion.div className="hero__copy" style={{ y: copyY, opacity: copyOpacity }} initial={reduceMotion ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, ease: [0.22, 1, 0.36, 1] }}>
          <span className="eyebrow eyebrow--light"><i />{home.eyebrow}</span>
          <motion.h1 initial="hidden" animate="visible" aria-label={home.title}>
            {titleLines.map((line, index) => (
              <span className="hero__title-line" aria-hidden="true" key={line}>
                <motion.span variants={{ hidden: { y: "115%", opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: .78, delay: .14 + index * .1, ease: [0.22, 1, 0.36, 1] } } }}>{line}</motion.span>
              </span>
            ))}
          </motion.h1>
          <motion.p initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .52, duration: .65 }}>{home.subtitle}</motion.p>
          <motion.div className="hero__actions" initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .62, duration: .65 }}>
            <ButtonLink href={localizePath(locale, "/founding-driver#paket")} variant="light">{locale === "id" ? "Bandingkan Paket" : "Compare Plans"}</ButtonLink>
            <ButtonLink href={localizePath(locale, "/contact?type=driver")} variant="ghost">{locale === "id" ? "Cek Kelayakan Saya" : "Check My Eligibility"}</ButtonLink>
          </motion.div>
          <motion.div className="hero__proof" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .78, duration: .7 }}><span>{locale === "id" ? "Mulai Rp300.000/hari" : "From IDR 300,000/day"}</span><span>{locale === "id" ? "Tenor 5 tahun" : "5-year program"}</span><span>{locale === "id" ? "Tanpa deposit / DP" : "No deposit / down payment"}</span></motion.div>
        </motion.div>
      </div>
      <motion.aside
        className="hero__ownership"
        aria-label={locale === "id" ? "Perjalanan menuju kepemilikan EV" : "Your path to EV ownership"}
        initial={reduceMotion ? false : { opacity: 0, x: 28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: .82, duration: .72, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero__ownership-head">
          <span>{locale === "id" ? "PERJALANAN KEPEMILIKAN" : "OWNERSHIP JOURNEY"}</span>
          <i>FOUNDING DRIVER</i>
        </div>
        <ol>{ownershipSteps.map((step, index) => <li key={step}><small>0{index + 1}</small><strong>{step}</strong></li>)}</ol>
        <div className="hero__ownership-foot">
          <span>EV</span>
          <p><strong>{locale === "id" ? "Tujuannya jelas." : "A destination in sight."}</strong><small>{locale === "id" ? "Tuntaskan program. Bawa pulang jadi milik." : "Complete the program. Make the EV yours."}</small></p>
        </div>
      </motion.aside>
      <a className="hero__scroll" href="#services" aria-label={locale === "id" ? "Lihat layanan" : "Explore services"}><span>{locale === "id" ? "JELAJAHI" : "EXPLORE"}</span><ChevronDown size={17} /></a>
    </section>
  );
}
