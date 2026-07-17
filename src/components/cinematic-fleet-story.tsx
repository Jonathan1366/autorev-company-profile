"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Locale } from "@/lib/i18n";

type Scene = {
  src: string;
  alt: { id: string; en: string };
  label: string;
  title: { id: string; en: string };
  text: { id: string; en: string };
  align: "left" | "right";
};

const scenes: Scene[] = [
  {
    src: "/images/autorev-fleet-city.png",
    alt: { id: "SUV dan MPV melaju di kawasan bisnis Jakarta", en: "SUV and MPV driving through Jakarta's business district" },
    label: "01 · RENTAL",
    title: { id: "Mobil siap. Anda jalan.", en: "Cars ready. You move." },
    text: { id: "Rental personal dan bisnis di Jabodetabek.", en: "Personal and business rental across Greater Jakarta." },
    align: "left",
  },
  {
    src: "/images/autorev-fleet-care.png",
    alt: { id: "Teknisi memeriksa kendaraan di bengkel modern", en: "Technician inspecting a vehicle in a modern workshop" },
    label: "02 · CARE",
    title: { id: "Dirawat untuk terus jalan.", en: "Cared for. Ready to move." },
    text: { id: "Inspeksi dan maintenance dalam alur yang rapi.", en: "Inspection and maintenance in one clear flow." },
    align: "right",
  },
  {
    src: "/images/autorev-fleet-delivery.png",
    alt: { id: "SUV AutoRev melaju di jalan tol saat matahari terbenam", en: "AutoRev SUV driving on a highway at sunset" },
    label: "03 · DELIVERY",
    title: { id: "Kami antar. Anda lanjut.", en: "We deliver. You keep moving." },
    text: { id: "Delivery dan pickup saat dibutuhkan.", en: "Delivery and pickup when you need it." },
    align: "left",
  },
];

function FleetScene({ scene, locale, index }: { scene: Scene; locale: Locale; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const direction = scene.align === "left" ? 1 : -1;
  const imageX = useTransform(scrollYProgress, [0, .5, 1], reduceMotion ? [0, 0, 0] : [-42 * direction, 0, 42 * direction]);
  const imageY = useTransform(scrollYProgress, [0, .5, 1], reduceMotion ? [0, 0, 0] : [48, 0, -48]);
  const imageScale = useTransform(scrollYProgress, [0, .5, 1], reduceMotion ? [1, 1, 1] : [1.14, 1.04, 1.12]);
  const copyY = useTransform(scrollYProgress, [0, .5, 1], reduceMotion ? [0, 0, 0] : [70, 0, -55]);
  const copyOpacity = useTransform(scrollYProgress, [0, .2, .78, 1], reduceMotion ? [1, 1, 1, 1] : [0, 1, 1, 0]);
  const progress = useTransform(scrollYProgress, [.12, .88], [0, 1]);

  return (
    <section className={`scroll-film__scene scroll-film__scene--${scene.align}`} ref={ref}>
      <div className="scroll-film__frame">
        <motion.div className="scroll-film__media" style={{ x: imageX, y: imageY, scale: imageScale }}>
          <Image src={scene.src} alt={scene.alt[locale]} fill sizes="100vw" quality={92} />
        </motion.div>
        <div className="scroll-film__shade" />
        <motion.div className="container scroll-film__copy" style={{ y: copyY, opacity: copyOpacity }}>
          <span>{scene.label}</span>
          <h2>{scene.title[locale]}</h2>
          <p>{scene.text[locale]}</p>
        </motion.div>
        <div className="scroll-film__counter"><small>0{index + 1}</small><i><motion.b style={{ scaleY: progress }} /></i><small>03</small></div>
      </div>
    </section>
  );
}

export function CinematicFleetStory({ locale }: { locale: Locale }) {
  return (
    <div className="scroll-film" aria-label={locale === "id" ? "AutoRev dalam gerak" : "AutoRev in motion"}>
      {scenes.map((scene, index) => <FleetScene key={scene.src} scene={scene} locale={locale} index={index} />)}
    </div>
  );
}
