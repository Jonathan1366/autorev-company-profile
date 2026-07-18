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
  const { common, home } = getCopy(locale);
  const titleLines = locale === "id"
    ? ["Sewa EV.", "Bangun armada.", "Tetap bergerak."]
    : ["Rent EVs.", "Build fleets.", "Keep moving."];
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
            <ButtonLink href={localizePath(locale, "/contact?type=rental")} variant="light">{common.explore}</ButtonLink>
            <ButtonLink href={localizePath(locale, "/autorev-business")} variant="ghost">{locale === "id" ? "Untuk Bisnis" : "For Business"}</ButtonLink>
          </motion.div>
          <motion.div className="hero__proof" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .78, duration: .7 }}><span>100% EV</span><span>{locale === "id" ? "Lepas kunci atau driver" : "Self drive or with driver"}</span><span>{locale === "id" ? "Personal dan bisnis" : "Personal and business"}</span></motion.div>
        </motion.div>
      </div>
      <a className="hero__scroll" href="#services" aria-label={locale === "id" ? "Lihat layanan" : "Explore services"}><span>{locale === "id" ? "JELAJAHI" : "EXPLORE"}</span><ChevronDown size={17} /></a>
    </section>
  );
}
