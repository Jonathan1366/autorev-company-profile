"use client";

import Image from "next/image";
import { useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import { getCopy } from "@/lib/content";
import { localizePath } from "@/lib/i18n";
import { ButtonLink } from "./button-link";

export function Hero({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.02, reduceMotion ? 1.02 : 1.06]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 28]);
  const vehicleX = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 36]);
  const vehicleY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 24]);
  const vehicleScale = useTransform(scrollYProgress, [0, 1], [.97, reduceMotion ? .97 : 1.02]);
  const copyY = useTransform(scrollYProgress, [0, .72], [0, reduceMotion ? 0 : -24]);
  const copyOpacity = useTransform(scrollYProgress, [0, .68], [1, reduceMotion ? 1 : .46]);
  const { home } = getCopy(locale);

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (reduceMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX / bounds.width - .5;
    const y = event.clientY / bounds.height - .5;
    event.currentTarget.style.setProperty("--hero-pointer-x", `${x * 8}px`);
    event.currentTarget.style.setProperty("--hero-pointer-y", `${y * 6}px`);
  }

  function resetPointer(event: ReactPointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--hero-pointer-x", "0px");
    event.currentTarget.style.setProperty("--hero-pointer-y", "0px");
  }

  return (
    <section className="hero hero--electric-road" id="top" ref={ref} onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
      <motion.div className="hero__media" style={{ scale: backgroundScale, y: backgroundY }} aria-hidden="true">
        <Image src="/images/autorev-electric-road-bg.jpg" alt="" fill priority fetchPriority="high" sizes="100vw" quality={90} className="hero__image" />
      </motion.div>

      <motion.div className="hero__vehicle-rig" style={{ x: vehicleX, y: vehicleY, scale: vehicleScale }} aria-hidden="true">
        <div className="hero__vehicle-parallax">
          <div className="hero__vehicle-shadow"/>
          <Image
            className="hero__vehicle"
            src="/images/autorev-ev-cinematic-cutout.png"
            alt=""
            width={1759}
            height={894}
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 620px) 145vw, 70vw"
            quality={92}
          />
        </div>
      </motion.div>

      <div className="hero__wash" />

      <div className="container hero__content">
        <motion.div className="hero__copy" style={{ y: copyY, opacity: copyOpacity }} initial={false}>
          <span className="eyebrow eyebrow--light"><i />{home.eyebrow}</span>
          <h1 aria-label={home.title}>
            <span className="hero__title-line"><span>{locale === "id" ? "EV untuk kerja." : "An EV for work."}</span></span>
            <span className="hero__title-line hero__title-line--ownership"><span>{locale === "id" ? "Menuju " : "A path to "}<em>{locale === "id" ? "milik." : "ownership."}</em></span></span>
          </h1>
          <p>{home.subtitle}</p>
          <div className="hero__actions">
            <ButtonLink href={localizePath(locale, "/founding-driver")} variant="light">{locale === "id" ? "Pelajari Program" : "Explore the Program"}</ButtonLink>
            <ButtonLink href={localizePath(locale, "/contact?type=driver")} variant="ghost">{locale === "id" ? "Cek Kelayakan" : "Check Eligibility"}</ButtonLink>
          </div>
          <div className="hero__proof" aria-label={locale === "id" ? "Ringkasan program" : "Program summary"}>
            <span><strong>{locale === "id" ? "Rp0" : "IDR 0"}</strong><small>{locale === "id" ? "deposit atau DP" : "deposit or down payment"}</small></span>
            <span><strong>5 {locale === "id" ? "tahun" : "years"}</strong><small>{locale === "id" ? "tenor program" : "program term"}</small></span>
            <span><strong>2029</strong><small>{locale === "id" ? "charging gratis*" : "free charging*"}</small></span>
          </div>
          <small className="hero__legal">{locale === "id" ? "*Benefit dan proses alih kepemilikan mengikuti kontrak serta ketentuan program." : "*Benefits and ownership transfer are subject to the contract and program terms."}</small>
        </motion.div>
      </div>
    </section>
  );
}
