"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import {
  ArrowUpRight,
  BatteryCharging,
  FileCheck2,
  Gauge,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n";
import styles from "./ownership-journey.module.css";

const content = {
  id: {
    eyebrow: "JALUR PROGRAM LIMA TAHUN",
    title: ["Dari hari pertama", "hingga proses alih milik."],
    intro:
      "Empat fase yang perlu dituntaskan. Pengalihan kepemilikan diproses setelah tenor, seluruh kewajiban, verifikasi, dan administrasi selesai sesuai kontrak.",
    scrollLabel: "JALUR PROGRAM",
    chapters: [
      {
        number: "00",
        period: "PERSIAPAN",
        status: "TAHAP AWAL",
        title: "Siapkan diri dan kendaraan.",
        text: "Pilih Regular atau Premium, selesaikan pemeriksaan dokumen, lalu ikuti persiapan akun dan training apabila diperlukan.",
        meta: "Dokumen · Akun · Training",
        value: "Rp0",
        valueLabel: "deposit / DP",
        icon: FileCheck2,
      },
      {
        number: "01",
        period: "MULAI BEROPERASI",
        status: "TAHUN 01",
        title: "Mulai bekerja dengan EV Car Plus.",
        text: "Operasikan kendaraan sesuai ketentuan program dan gunakan aplikasi transportasi atau pengantaran yang memenuhi kebijakan masing-masing platform.",
        meta: "EV Car Plus · Multi-platform",
        value: "EV",
        valueLabel: "kategori Car Plus",
        icon: Gauge,
      },
      {
        number: "02—04",
        period: "TENOR BERJALAN",
        status: "TAHUN 02—04",
        title: "Jaga ritme kerja dan kondisi unit.",
        text: "Charging gratis sampai 2029 serta servis, perawatan, dan asuransi tersedia sesuai ketentuan program.",
        meta: "Charging · Perawatan · Perlindungan",
        value: "2029",
        valueLabel: "charging gratis",
        icon: BatteryCharging,
      },
      {
        number: "05",
        period: "PROGRAM TUNTAS",
        status: "TAHUN 05",
        title: "Tuntaskan kewajiban. Proses alih milik.",
        text: "Setelah tenor lima tahun, seluruh kewajiban, verifikasi akhir, dan administrasi selesai, pengalihan kepemilikan diproses sesuai kontrak.",
        meta: "Tenor tuntas · Sesuai kontrak",
        value: "5",
        valueLabel: "tahun program",
        icon: KeyRound,
      },
    ],
    finalKicker: "SETELAH TENOR DAN KEWAJIBAN TUNTAS",
    finalWords: ["MENUJU", "MILIK"],
    cta: "Lihat paket lengkap",
    legal: "Alih kepemilikan tidak otomatis: mengikuti kontrak, kelayakan, dan penyelesaian seluruh kewajiban program.",
  },
  en: {
    eyebrow: "THE FIVE-YEAR PROGRAM PATH",
    title: ["From the first day", "to ownership transfer."],
    intro:
      "Four phases to complete. Ownership transfer is processed after the term, every obligation, verification, and administration are completed under the contract.",
    scrollLabel: "PROGRAM PATH",
    chapters: [
      {
        number: "00",
        period: "PREPARATION",
        status: "INITIAL STAGE",
        title: "Prepare yourself and the vehicle.",
        text: "Choose Regular or Premium, complete document checks, then prepare your account and attend training when needed.",
        meta: "Documents · Account · Training",
        value: "IDR 0",
        valueLabel: "deposit / down payment",
        icon: FileCheck2,
      },
      {
        number: "01",
        period: "START OPERATING",
        status: "YEAR 01",
        title: "Start working with a Car Plus EV.",
        text: "Operate under the program terms and use transport or delivery apps that meet each platform's policies.",
        meta: "Car Plus EV · Multi-platform",
        value: "EV",
        valueLabel: "Car Plus category",
        icon: Gauge,
      },
      {
        number: "02—04",
        period: "TERM IN PROGRESS",
        status: "YEARS 02—04",
        title: "Maintain your work rhythm and the vehicle.",
        text: "Free charging through 2029, plus service, maintenance, and insurance, are available under the program terms.",
        meta: "Charging · Maintenance · Protection",
        value: "2029",
        valueLabel: "free charging",
        icon: BatteryCharging,
      },
      {
        number: "05",
        period: "PROGRAM COMPLETE",
        status: "YEAR 05",
        title: "Complete the obligations. Process the transfer.",
        text: "After the five-year term, every obligation, final verification, and administration are complete, ownership transfer is processed under the contract.",
        meta: "Term complete · Under contract",
        value: "5",
        valueLabel: "year program",
        icon: KeyRound,
      },
    ],
    finalKicker: "AFTER THE TERM AND OBLIGATIONS ARE COMPLETE",
    finalWords: ["TOWARD", "OWNERSHIP"],
    cta: "View full plans",
    legal: "Ownership transfer is not automatic: it follows the contract, eligibility, and completion of every program obligation.",
  },
} as const;

export function OwnershipJourney({ locale }: { locale: Locale }) {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const vehicleRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);
  const sunriseRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const t = content[locale];

  useEffect(() => {
    if (reduceMotion || window.matchMedia("(max-width: 760px)").matches || !sectionRef.current) return;

    const section = sectionRef.current;
    if (!sceneRef.current || !headerRef.current || !vehicleRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    section.dataset.driveReady = "true";
    const context = gsap.context(() => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-drive-panel]");
        const markers = gsap.utils.toArray<HTMLElement>("[data-drive-marker]");

        gsap.set(panels, { autoAlpha: 0, y: 30 });
        gsap.set(panels[0], { autoAlpha: 1, y: 0 });
        gsap.set(markers, { opacity: .32, scale: .9 });
        gsap.set(markers[0], { opacity: 1, scale: 1 });
        gsap.set(finalRef.current, { autoAlpha: 0, y: 65, scale: .88 });

        const timeline = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: .72,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .fromTo(vehicleRef.current, { xPercent: -18, yPercent: 12, scale: .76, rotate: -1.5 }, { xPercent: 2, yPercent: 0, scale: 1.02, rotate: 0, duration: 3.6, ease: "none" }, 0)
          .to(sceneRef.current, { "--story-energy": 1, "--story-exposure": 1, duration: 3.6, ease: "none" }, 0)
          .to(progressRef.current, { scaleX: 1, duration: 3.45, ease: "none" }, 0)
          .to(roadRef.current, { "--road-shift": 1, duration: 3.6, ease: "none" }, 0)
          .to(headerRef.current, { autoAlpha: 0, y: -42, duration: .36 }, .34)
          .to(panels[0], { autoAlpha: 0, y: -22, duration: .22 }, .72)
          .to(panels[1], { autoAlpha: 1, y: 0, duration: .28 }, .86)
          .to(markers[1], { opacity: 1, scale: 1, duration: .2 }, .9)
          .to(panels[1], { autoAlpha: 0, y: -22, duration: .22 }, 1.55)
          .to(panels[2], { autoAlpha: 1, y: 0, duration: .28 }, 1.68)
          .to(markers[2], { opacity: 1, scale: 1, duration: .2 }, 1.72)
          .to(sunriseRef.current, { opacity: 1, scale: 1.08, duration: .85 }, 1.9)
          .to(panels[2], { autoAlpha: 0, y: -22, duration: .22 }, 2.42)
          .to(panels[3], { autoAlpha: 1, y: 0, duration: .3 }, 2.56)
          .to(markers[3], { opacity: 1, scale: 1, duration: .2 }, 2.62)
          .to(finalRef.current, { autoAlpha: 1, y: 0, scale: 1, duration: .62 }, 2.62)
          .to(vehicleRef.current, { xPercent: 8, scale: 1.07, duration: .72 }, 2.72);
    }, section);

    const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      delete section.dataset.driveReady;
      context.revert();
    };
  }, [reduceMotion]);

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX / bounds.width - .5;
    const y = event.clientY / bounds.height - .5;
    event.currentTarget.style.setProperty("--pointer-x", `${x * 18}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${y * 12}px`);
  }

  function resetPointer(event: ReactPointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty("--pointer-x", "0px");
    event.currentTarget.style.setProperty("--pointer-y", "0px");
  }

  return (
    <section className={styles.journey} id="ownership-journey" ref={sectionRef} aria-labelledby="ownership-journey-title">
      <div className={styles.scene} ref={sceneRef} onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
        <div className={styles.sky} aria-hidden="true">
          <div className={styles.aurora} />
          <div className={styles.sunrise} ref={sunriseRef} />
          <div className={styles.horizon} />
        </div>

        <div className={`container ${styles.header}`} ref={headerRef}>
          <span className={styles.eyebrow}>{t.eyebrow}</span>
          <h2 id="ownership-journey-title">
            {t.title.map((line, index) => <span key={line} className={index === 2 ? styles.serifLine : undefined}>{line}</span>)}
          </h2>
          <p>{t.intro}</p>
        </div>

        <div className={styles.finalWord} ref={finalRef} aria-hidden="true">
          <small>{t.finalKicker}</small>
          <span>{t.finalWords[0]}</span>
          <strong>{t.finalWords[1]}</strong>
        </div>

        <div className={styles.vehicleRig} ref={vehicleRef} aria-hidden="true">
          <div className={styles.vehicleParallax}>
            <div className={styles.vehicleShadow} />
            <Image
              className={styles.vehicleImage}
              src="/images/autorev-ev-cinematic-cutout.png"
              alt=""
              width={1759}
              height={894}
              sizes="(max-width: 700px) 145vw, 76vw"
              quality={92}
            />
          </div>
        </div>

        <div className={styles.road} ref={roadRef} aria-hidden="true">
          <div className={styles.roadPlane}>
            <i /><i /><i /><i />
          </div>
          <div className={styles.roadGlow} />
        </div>

        <div className={`container ${styles.storyLayer}`}>
          <div className={styles.panelStack}>
            {t.chapters.map((chapter, index) => {
              const Icon = chapter.icon;
              return (
                <article className={styles.panel} data-drive-panel key={chapter.number}>
                  <div className={styles.panelHead}>
                    <span>{chapter.period} · {chapter.status}</span>
                    <Icon aria-hidden="true" />
                  </div>
                  <h3>{chapter.title}</h3>
                  <p>{chapter.text}</p>
                  <div className={styles.panelFoot}>
                    <small>{chapter.meta}</small>
                    <div><strong>{chapter.value}</strong><span>{chapter.valueLabel}</span></div>
                  </div>
                  {index === t.chapters.length - 1 && (
                    <Link href={localizePath(locale, "/founding-driver#paket")}>
                      {t.cta}<ArrowUpRight aria-hidden="true" />
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        </div>

        <div className={`container ${styles.timeline}`}>
          <div className={styles.timelineTop}>
            <span>{t.scrollLabel}</span>
            <span>00 / 05</span>
          </div>
          <div className={styles.timelineTrack}>
            <div className={styles.timelineProgress} ref={progressRef} />
            {t.chapters.map((chapter) => (
              <div className={styles.marker} data-drive-marker key={chapter.number}>
                <i /><span>{chapter.number}</span>
              </div>
            ))}
          </div>
          <p className={styles.legal}><ShieldCheck aria-hidden="true" />{t.legal}</p>
        </div>
      </div>
    </section>
  );
}
