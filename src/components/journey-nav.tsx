"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Locale } from "@/lib/i18n";

const sectionIds = ["services", "rental", "ecosystem", "ai-support"] as const;

export function JourneyNav({ locale }: { locale: Locale }) {
  const [active, setActive] = useState<(typeof sectionIds)[number]>("services");
  const reduceMotion = useReducedMotion();
  const labels = locale === "id"
    ? ["Pilih", "Sewa", "Hubungkan", "Dukung"]
    : ["Choose", "Rent", "Connect", "Support"];

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id as (typeof sectionIds)[number]);
      },
      { rootMargin: "-24% 0px -58%", threshold: [0, 0.15, 0.35, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="journey-nav" aria-label={locale === "id" ? "Alur halaman" : "Page journey"}>
      <div className="container journey-nav__inner">
        <span className="journey-nav__label">{locale === "id" ? "ALUR" : "JOURNEY"}</span>
        <div>
          {sectionIds.map((id, index) => (
            <a key={id} href={`#${id}`} className={active === id ? "is-active" : ""} aria-current={active === id ? "step" : undefined}>
              <small>0{index + 1}</small>
              <span>{labels[index]}</span>
              {active === id && (
                <motion.i
                  layoutId="journey-active"
                  transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34 }}
                />
              )}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
