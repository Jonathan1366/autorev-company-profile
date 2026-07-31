"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getCopy } from "@/lib/content";
import { localizePath } from "@/lib/i18n";
import { ButtonLink } from "./button-link";

export function Hero({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [allowVideo, setAllowVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const reduceMotion = useReducedMotion();
  const heroInView = useInView(ref, { amount: .05 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.09]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 75]);
  const copyY = useTransform(scrollYProgress, [0, .72], [0, reduceMotion ? 0 : -45]);
  const copyOpacity = useTransform(scrollYProgress, [0, .68], [1, reduceMotion ? 1 : .12]);
  const { home } = getCopy(locale);
  const titleLines = ["EV Rental."];

  useEffect(() => {
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    const constrained = connection?.saveData || connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g";
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const timer = window.setTimeout(() => setAllowVideo(Boolean(!reduceMotion && !constrained && desktop)), 420);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !allowVideo) return;

    const syncPlayback = () => {
      if (heroInView && !document.hidden) {
        void video.play().catch(() => setVideoReady(false));
      } else {
        video.pause();
      }
    };

    syncPlayback();
    document.addEventListener("visibilitychange", syncPlayback);
    return () => document.removeEventListener("visibilitychange", syncPlayback);
  }, [allowVideo, heroInView]);

  return (
    <section className="hero" id="top" ref={ref}>
      <motion.div className="hero__media" style={{ scale: imageScale, y: imageY }}>
        <Image src="/images/autorev-kia-ev6-real.jpg" alt={locale === "id" ? "Kendaraan listrik melaju di jalan terbuka" : "An electric vehicle driving on the open road"} fill priority fetchPriority="high" sizes="100vw" quality={92} className="hero__image" />
        {allowVideo && (
          <video
            ref={videoRef}
            className={`hero__video ${videoReady ? "hero__video--ready" : ""}`}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="/images/autorev-kia-ev6-real.jpg"
            onCanPlay={() => setVideoReady(true)}
            onError={() => setAllowVideo(false)}
            aria-hidden="true"
          >
            <source src="/videos/autorev-highway-mountain.mp4" type="video/mp4" />
          </video>
        )}
      </motion.div>
      <div className="hero__wash" />
      <div className="hero__grid" aria-hidden="true" />
      <div className="container hero__content">
        <motion.div className="hero__copy" style={{ y: copyY, opacity: copyOpacity }} initial={false}>
          <span className="eyebrow eyebrow--light"><i />{home.eyebrow}</span>
          <h1>
            {titleLines.map((line) => (
              <span className="hero__title-line" key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h1>
          <p>{home.subtitle}</p>
          <div className="hero__actions">
            <ButtonLink href={localizePath(locale, "/founding-driver#paket")} variant="light">{locale === "id" ? "Lihat Paket Driver" : "View Driver Plans"}</ButtonLink>
            <ButtonLink href={localizePath(locale, "/contact?type=driver")} variant="ghost">{locale === "id" ? "Cek Kelayakan Awal" : "Check Initial Eligibility"}</ButtonLink>
          </div>
        </motion.div>
      </div>
      <div className="hero__telemetry" aria-hidden="true">
        <div className="hero__telemetry-head"><span><i />AUTOREV EV</span><small>JABODETABEK</small></div>
        <div className="hero__telemetry-route"><motion.i animate={reduceMotion ? undefined : { x: [0, 78, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }} /><span>ON ROUTE</span></div>
        <strong>01</strong>
      </div>
      <a className="hero__scroll" href="#services" aria-label={locale === "id" ? "Lihat layanan" : "Explore services"}><span>{locale === "id" ? "JELAJAHI" : "EXPLORE"}</span><ChevronDown size={17} /></a>
    </section>
  );
}
