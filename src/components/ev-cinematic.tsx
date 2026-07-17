"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import styles from "./ev-cinematic.module.css";

export function EVCinematic({ locale, scene = "mountain" }: { locale: Locale; scene?: "mountain" | "city" | "driver" }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, .35, .75, 1], reduceMotion ? [1,1,1,1] : [1.12,1,1.02,1.08]);
  const copyY = useTransform(scrollYProgress, [0,.35,.72,1], reduceMotion ? [0,0,0,0] : [100,0,-15,-100]);
  const copyOpacity = useTransform(scrollYProgress, [0,.28,.72,1], [0,1,1,0]);

  const story = scene === "mountain"
    ? {
        source: "/videos/autorev-highway-mountain.mp4",
        poster: "/images/autorev-kia-ev6-real.jpg",
        eyebrow: locale === "id" ? "KOTA · TOL · PEGUNUNGAN" : "CITY · HIGHWAY · MOUNTAINS",
        title: locale === "id" ? "Jalan terus terbuka." : "The road stays open.",
        text: locale === "id" ? "Satu EV untuk perjalanan dekat, jauh, dan semua cerita di antaranya." : "One EV for nearby drives, longer escapes, and every story between.",
      }
    : scene === "city" ? {
        source: "/videos/autorev-highway-city.mp4",
        poster: "/images/autorev-corporate-ev-v2.png",
        eyebrow: locale === "id" ? "OPERASIONAL BISNIS" : "BUSINESS MOBILITY",
        title: locale === "id" ? "Bisnis tetap bergerak." : "Business keeps moving.",
        text: locale === "id" ? "Armada EV untuk perjalanan corporate dan operasional harian." : "EV fleets for corporate travel and everyday operations.",
      }
    : {
        source: "/videos/autorev-highway-city.mp4",
        poster: "/images/autorev-corporate-ev-v2.png",
        eyebrow: locale === "id" ? "FOUNDING DRIVER · DALAM PERJALANAN" : "FOUNDING DRIVER · ON THE ROAD",
        title: locale === "id" ? "Terus jalan. Terus tumbuh." : "Keep moving. Keep growing.",
        text: locale === "id" ? "Setiap perjalanan membawa Anda lebih dekat ke target berikutnya." : "Every trip moves you closer to your next goal.",
      };

  return <section className={styles.cinematic} ref={ref} aria-label={locale === "id" ? "Perjalanan kendaraan listrik" : "Electric vehicle journey"}>
    <div className={styles.sticky}>
      <motion.video className={`${styles.video} ${scene === "driver" ? styles.driverVideo : ""}`} style={{ scale }} autoPlay muted loop playsInline preload="metadata" poster={story.poster} aria-hidden="true">
        <source src={story.source} type="video/mp4"/>
      </motion.video>
      <div className={styles.shade}/>
      <motion.div className={`container ${styles.copy}`} style={{ y: copyY, opacity: copyOpacity }}>
        <span>{story.eyebrow}</span>
        <h2>{story.title}</h2>
        <p>{story.text}</p>
      </motion.div>
      <small className={styles.source}>{locale === "id" ? "VISUAL SINEMATIK" : "CINEMATIC VISUAL"}</small>
    </div>
  </section>;
}
