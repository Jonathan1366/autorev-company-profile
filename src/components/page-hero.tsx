"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n";
import { ButtonLink } from "./button-link";
import { Reveal } from "./reveal";

export function PageHero({
  locale, eyebrow, title, text, status, children, primaryHref = "/contact", primaryLabel,
  secondaryHref = "#explore", secondaryLabel,
}: {
  locale: Locale; eyebrow: string; title: string; text: string; status?: string; children?: ReactNode; primaryHref?: string; primaryLabel?: string; secondaryHref?: string; secondaryLabel?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, .8], [0, reduceMotion ? 0 : -52]);
  const copyOpacity = useTransform(scrollYProgress, [0, .72], [1, reduceMotion ? 1 : .16]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 82]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.055]);
  return (
    <section className="page-hero" ref={ref}>
      <div className="container page-hero__layout">
        <motion.div className="page-hero__copy" style={{ y: copyY, opacity: copyOpacity }}>
          <Reveal>
            <span className="eyebrow eyebrow--light"><i />{eyebrow}</span>
            {status && <span className="page-hero__status">{status}</span>}
            <h1>{title}</h1>
            <p>{text}</p>
            <div className="page-hero__actions">
              <ButtonLink href={localizePath(locale, primaryHref)} variant="light">{primaryLabel || (locale === "id" ? "Mulai percakapan" : "Start a conversation")}</ButtonLink>
              <ButtonLink href={secondaryHref.startsWith("#") ? secondaryHref : localizePath(locale, secondaryHref)} variant="ghost">{secondaryLabel || (locale === "id" ? "Lihat Detail" : "View Details")}</ButtonLink>
            </div>
          </Reveal>
        </motion.div>
        <motion.div className="page-hero__visual" style={{ y: visualY, scale: visualScale }}><Reveal delay={.12}>{children}</Reveal></motion.div>
      </div>
    </section>
  );
}
