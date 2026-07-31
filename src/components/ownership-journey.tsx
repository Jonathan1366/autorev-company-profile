"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, BatteryCharging, FileCheck2, Gauge, ShieldCheck } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n";
import styles from "./ownership-journey.module.css";

const content = {
  id: {
    eyebrow: "ALUR PROGRAM · 5 TAHUN",
    title: ["Dari rental,", "menuju hak milik."],
    intro:
      "Satu alur yang jelas sejak kendaraan diterima hingga proses pengalihan kepemilikan—sesuai kontrak dan setelah seluruh kewajiban program diselesaikan.",
    motionLabel: "SCROLL UNTUK MELAJU",
    routeLabel: "JABODETABEK · EV ON ROUTE",
    steps: [
      {
        number: "01",
        label: "MULAI",
        title: "Pilih paket dan siapkan akun.",
        text: "Pilih Regular atau Premium, selesaikan pemeriksaan dokumen, lalu ikuti training apabila diperlukan.",
        meta: "VERIFIKASI · ONBOARDING",
        icon: FileCheck2,
      },
      {
        number: "02",
        label: "BEROPERASI",
        title: "Jalankan EV dengan ritme Anda.",
        text: "Gunakan EV Car Plus sesuai ketentuan program, dengan hari libur bebas setoran dan charging gratis sampai 2029.",
        meta: "OPERASIONAL · SUPPORT",
        icon: Gauge,
      },
      {
        number: "03",
        label: "MENUJU MILIK",
        title: "Tuntaskan tenor dan kewajiban.",
        text: "Setelah tenor lima tahun dan seluruh kewajiban terpenuhi, proses pengalihan kepemilikan dilakukan sesuai kontrak.",
        meta: "5 TAHUN · SESUAI KONTRAK",
        icon: ShieldCheck,
      },
    ],
    facts: [
      ["Rp0", "deposit / DP"],
      ["2–3 hari", "libur bebas setoran"],
      ["2029", "charging gratis"],
    ],
    cta: "Lihat paket lengkap",
  },
  en: {
    eyebrow: "PROGRAM ROUTE · 5 YEARS",
    title: ["From rental,", "toward ownership."],
    intro:
      "One clear route from vehicle handover to ownership transfer—under the contract and after every program obligation is completed.",
    motionLabel: "SCROLL TO DRIVE",
    routeLabel: "GREATER JAKARTA · EV ON ROUTE",
    steps: [
      {
        number: "01",
        label: "START",
        title: "Choose a plan and prepare your account.",
        text: "Choose Regular or Premium, complete document checks, then attend training when needed.",
        meta: "VERIFICATION · ONBOARDING",
        icon: FileCheck2,
      },
      {
        number: "02",
        label: "OPERATE",
        title: "Run the EV around your rhythm.",
        text: "Use a Car Plus EV under the program terms, with payment-free days off and free charging through 2029.",
        meta: "OPERATIONS · SUPPORT",
        icon: Gauge,
      },
      {
        number: "03",
        label: "TOWARD OWNERSHIP",
        title: "Complete the term and obligations.",
        text: "After the five-year term and all obligations are fulfilled, ownership transfer is processed under the contract.",
        meta: "5 YEARS · UNDER CONTRACT",
        icon: ShieldCheck,
      },
    ],
    facts: [
      ["IDR 0", "deposit / down payment"],
      ["2–3 days", "payment-free days off"],
      ["2029", "free charging"],
    ],
    cta: "View full plans",
  },
} as const;

export function OwnershipJourney({ locale }: { locale: Locale }) {
  const sectionRef = useRef<HTMLElement>(null);
  const routeRef = useRef<SVGPathElement>(null);
  const progressRef = useRef<SVGPathElement>(null);
  const vehicleRef = useRef<SVGGElement>(null);
  const reduceMotion = useReducedMotion();
  const t = content[locale];

  useEffect(() => {
    if (reduceMotion) return;

    let cancelled = false;
    let revertMedia: (() => void) | undefined;

    void (async () => {
      const [{ gsap }, { ScrollTrigger }, { MotionPathPlugin }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/MotionPathPlugin"),
      ]);

      if (cancelled || !sectionRef.current || !routeRef.current || !progressRef.current || !vehicleRef.current) return;

      gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
      const media = gsap.matchMedia();
      revertMedia = () => media.revert();

      media.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
        const root = sectionRef.current;
        const route = routeRef.current;
        const progress = progressRef.current;
        const vehicle = vehicleRef.current;
        if (!root || !route || !progress || !vehicle) return;

        const panels = Array.from(root.querySelectorAll<HTMLElement>("[data-journey-panel]"));
        const milestones = Array.from(root.querySelectorAll<SVGGElement>("[data-journey-node]"));

        gsap.set(panels, { autoAlpha: 0, y: 22 });
        gsap.set(panels[0], { autoAlpha: 1, y: 0 });
        gsap.set(milestones, { opacity: .36 });
        gsap.set(milestones[0], { opacity: 1 });
        gsap.set(progress, { strokeDashoffset: 1 });

        const timeline = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: .65,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(progress, { strokeDashoffset: 0, duration: 3, ease: "none" }, 0)
          .to(vehicle, {
            motionPath: { path: route, align: route, alignOrigin: [.5, .5], autoRotate: true },
            duration: 3,
            ease: "none",
          }, 0)
          .to(milestones[0], { opacity: 1, duration: .2 }, .12)
          .to(panels[0], { autoAlpha: 0, y: -18, duration: .22 }, .76)
          .to(panels[1], { autoAlpha: 1, y: 0, duration: .28 }, .88)
          .to(milestones[1], { opacity: 1, duration: .24 }, 1.08)
          .to(panels[1], { autoAlpha: 0, y: -18, duration: .22 }, 1.78)
          .to(panels[2], { autoAlpha: 1, y: 0, duration: .28 }, 1.9)
          .to(milestones[2], { opacity: 1, duration: .24 }, 2.12);

        return () => timeline.kill();
      });
    })();

    return () => {
      cancelled = true;
      revertMedia?.();
    };
  }, [reduceMotion]);

  return (
    <section className={styles.journey} id="ownership-journey" ref={sectionRef} aria-labelledby="ownership-journey-title">
      <div className={styles.scene}>
        <div className={styles.ambient} aria-hidden="true" />
        <div className={`container ${styles.header}`}>
          <div>
            <span className={styles.eyebrow}>{t.eyebrow}</span>
            <h2 id="ownership-journey-title">
              {t.title[0]} <em>{t.title[1]}</em>
            </h2>
          </div>
          <p>{t.intro}</p>
        </div>

        <div className={`container ${styles.route}`} aria-hidden="true">
          <div className={styles.routeStatus}>
            <span><i />{t.routeLabel}</span>
            <small>{t.motionLabel}</small>
          </div>
          <svg viewBox="-50 0 1200 340" role="presentation" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="ownership-route-gradient" x1="0" x2="1">
                <stop offset="0" stopColor="#10d9e8" />
                <stop offset=".52" stopColor="#3e8dff" />
                <stop offset="1" stopColor="#b8c5ff" />
              </linearGradient>
              <linearGradient id="ownership-ev-paint" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f8fbff" />
                <stop offset=".26" stopColor="#b7d6ff" />
                <stop offset=".58" stopColor="#2b78ff" />
                <stop offset=".82" stopColor="#0b3a8a" />
                <stop offset="1" stopColor="#d8e9ff" />
              </linearGradient>
              <linearGradient id="ownership-ev-glass" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#3f74a8" />
                <stop offset=".45" stopColor="#06182f" />
                <stop offset="1" stopColor="#0e315c" />
              </linearGradient>
              <filter id="ownership-car-glow" x="-220%" y="-220%" width="440%" height="440%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <path className={styles.routeShadow} d="M70 246 C205 52 365 52 489 188 S760 333 1030 92" />
            <path ref={routeRef} className={styles.routeBase} d="M70 246 C205 52 365 52 489 188 S760 333 1030 92" />
            <path className={styles.routeCharge} pathLength="1" d="M70 246 C205 52 365 52 489 188 S760 333 1030 92" />
            <path ref={progressRef} className={styles.routeProgress} pathLength="1" d="M70 246 C205 52 365 52 489 188 S760 333 1030 92" />

            <g className={styles.milestone} data-journey-node transform="translate(70 246)">
              <circle r="24" /><circle className={styles.milestoneCore} r="6" /><text y="47">01</text>
            </g>
            <g className={styles.milestone} data-journey-node transform="translate(520 215)">
              <circle r="24" /><circle className={styles.milestoneCore} r="6" /><text y="47">02</text>
            </g>
            <g className={styles.milestone} data-journey-node transform="translate(1030 92)">
              <circle r="24" /><circle className={styles.milestoneCore} r="6" /><text y="47">03</text>
            </g>

            <g ref={vehicleRef} className={styles.vehicle} transform="translate(70 246)">
              <g className={styles.vehicleAura}>
                <ellipse rx="62" ry="38" />
                <ellipse rx="52" ry="30" />
              </g>
              <g className={styles.vehicleTrails} aria-hidden="true">
                <path d="M-82-13H-49" />
                <path d="M-92 0H-51" />
                <path d="M-78 13H-48" />
              </g>
              <ellipse className={styles.vehicleShadow} cx="-2" cy="8" rx="49" ry="20" />
              <g className={styles.vehicleWheels}>
                <rect x="-31" y="-24" width="17" height="7" rx="3" />
                <rect x="20" y="-24" width="17" height="7" rx="3" />
                <rect x="-31" y="17" width="17" height="7" rx="3" />
                <rect x="20" y="17" width="17" height="7" rx="3" />
              </g>
              <path className={styles.vehicleBody} d="M-43-14C-34-23 20-24 36-16 44-12 48-6 49 0 48 7 44 12 36 16 20 24-34 23-43 14-49 8-49-8-43-14Z" />
              <path className={styles.vehicleCabin} d="M-21-15C-8-20 14-19 29-12L34-2 33 10C16 19-8 19-21 15-26 7-26-7-21-15Z" />
              <path className={styles.vehicleGlass} d="M-15-13C-4-16 12-16 23-11L27-3 26 9C13 14-4 15-15 12-19 5-19-6-15-13Z" />
              <path className={styles.vehicleRoofLine} d="M-8-12C2-14 12-13 19-10M-8 12C2 14 12 13 19 10" />
              <path className={styles.vehicleFrontLight} filter="url(#ownership-car-glow)" d="M37-11C44-7 47-3 47 0S44 8 37 11" />
              <path className={styles.vehicleRearLight} d="M-41-10C-45-6-47-3-47 0S-45 6-41 10" />
              <circle className={styles.vehicleChargePort} cx="-30" cy="0" r="4" />
              <text className={styles.vehicleLabel} x="5" y="4">EV</text>
            </g>
          </svg>
        </div>

        <div className={`container ${styles.lower}`}>
          <div className={styles.facts}>
            {t.facts.map(([value, label]) => (
              <div key={label}><strong>{value}</strong><span>{label}</span></div>
            ))}
          </div>

          <div className={styles.panelStack}>
            {t.steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article className={styles.panel} data-journey-panel key={step.number}>
                  <div className={styles.panelTop}>
                    <span>{step.number} / 03 · {step.label}</span>
                    <Icon aria-hidden="true" />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  <small>{step.meta}</small>
                  {index === 2 && (
                    <Link href={localizePath(locale, "/founding-driver#paket")}>
                      {t.cta}<ArrowUpRight aria-hidden="true" />
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        </div>

        <div className={styles.energyMark} aria-hidden="true">
          <BatteryCharging />
          <span>EV</span>
        </div>
      </div>
    </section>
  );
}
