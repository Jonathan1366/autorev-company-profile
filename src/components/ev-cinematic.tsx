"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Pause, Play } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import styles from "./ev-cinematic.module.css";

type NetworkInformation = EventTarget & {
  effectiveType?: string;
  saveData?: boolean;
};

type NetworkAwareNavigator = Navigator & {
  connection?: NetworkInformation;
};

function initialPlaybackPreference() {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem("autorev-cinematic-paused") === "true";
  } catch {
    return false;
  }
}

export function EVCinematic({ locale, scene = "mountain" }: { locale: Locale; scene?: "mountain" | "city" | "driver" }) {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [allowVideo, setAllowVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [userPaused, setUserPaused] = useState(initialPlaybackPreference);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, { amount: 0.05 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, .35, .75, 1], reduceMotion ? [1,1,1,1] : [1.065,1,1.015,1.045]);
  const copyY = useTransform(scrollYProgress, [0,.35,.72,1], reduceMotion ? [0,0,0,0] : [100,0,-15,-100]);
  const copyOpacity = useTransform(scrollYProgress, [0,.28,.72,1], reduceMotion ? [1,1,1,1] : [0,1,1,0]);

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
        eyebrow: locale === "id" ? "FOUNDING DRIVER · SEWA JADI MILIK" : "FOUNDING DRIVER · RENT TO OWN",
        title: locale === "id" ? "Kerja Anda punya arah." : "Your work can build toward more.",
        text: locale === "id" ? "Gunakan EV untuk mencari penghasilan hari ini. Tuntaskan tenor lima tahun dan seluruh kewajiban, lalu proses kepemilikan sesuai kontrak." : "Use the EV to pursue earnings today. Complete the five-year term and all obligations, then transfer ownership under the contract.",
      };

  useEffect(() => {
    const connection = (navigator as NetworkAwareNavigator).connection;

    const updateVideoPreference = () => {
      const constrainedConnection = connection?.saveData
        || connection?.effectiveType === "slow-2g"
        || connection?.effectiveType === "2g";
      const shouldAllowVideo = reduceMotion === false && !constrainedConnection;

      if (!shouldAllowVideo) setVideoReady(false);
      setAllowVideo(shouldAllowVideo);
    };

    updateVideoPreference();
    connection?.addEventListener("change", updateVideoPreference);

    return () => connection?.removeEventListener("change", updateVideoPreference);
  }, [reduceMotion]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !allowVideo) return;

    const syncPlayback = () => {
      if (isInView && !userPaused && !document.hidden) {
        void video.play().catch(() => {
          // The optimized poster remains visible when autoplay is unavailable.
        });
      } else {
        video.pause();
      }
    };

    syncPlayback();
    document.addEventListener("visibilitychange", syncPlayback);
    return () => document.removeEventListener("visibilitychange", syncPlayback);
  }, [allowVideo, isInView, userPaused]);

  const togglePlayback = () => {
    const nextPaused = !userPaused;
    setUserPaused(nextPaused);
    try {
      sessionStorage.setItem("autorev-cinematic-paused", String(nextPaused));
    } catch {
      // Playback control still works when storage is unavailable.
    }
  };

  return <section className={styles.cinematic} ref={ref} aria-label={locale === "id" ? "Perjalanan kendaraan listrik" : "Electric vehicle journey"}>
    <div className={styles.sticky}>
      <motion.div className={styles.media} style={{ scale }} aria-hidden="true">
        <Image
          alt=""
          className={`${styles.poster} ${scene === "driver" ? styles.driverVideo : ""}`}
          fill
          quality={90}
          sizes="100vw"
          src={story.poster}
        />
        {allowVideo && <video
          className={`${styles.video} ${videoReady ? styles.videoReady : ""} ${scene === "driver" ? styles.driverVideo : ""}`}
          loop
          muted
          onCanPlay={() => setVideoReady(true)}
          playsInline
          preload="none"
          ref={videoRef}
        >
          <source src={story.source} type="video/mp4"/>
        </video>}
      </motion.div>
      <div className={styles.shade}/>
      <motion.div className={`container ${styles.copy}`} style={{ y: copyY, opacity: copyOpacity }}>
        <span>{story.eyebrow}</span>
        <h2>{story.title}</h2>
        <p>{story.text}</p>
      </motion.div>
      {scene === "driver" && <div className={styles.telemetry} aria-hidden="true">
        <span><i />EV · ON ROUTE</span>
        <div><small>JABODETABEK</small><strong>05</strong></div>
      </div>}
      {allowVideo && <button className={styles.playback} type="button" onClick={togglePlayback} aria-label={userPaused ? (locale === "id" ? "Putar visual sinematik" : "Play cinematic visual") : (locale === "id" ? "Jeda visual sinematik" : "Pause cinematic visual")}>
        {userPaused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
        <span>{userPaused ? (locale === "id" ? "PUTAR" : "PLAY") : (locale === "id" ? "JEDA" : "PAUSE")}</span>
      </button>}
      <small className={styles.source}>{locale === "id" ? "VISUAL SINEMATIK" : "CINEMATIC VISUAL"}</small>
    </div>
  </section>;
}
