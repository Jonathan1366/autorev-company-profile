"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import styles from "./scroll-story-image.module.css";

export function ScrollStoryImage({ src, alt, className = "", priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-34, 34]);
  const scale = useTransform(scrollYProgress, [0, .5, 1], reduceMotion ? [1, 1, 1] : [1.08, 1.02, 1.08]);

  return <motion.div ref={ref} className={`${className} ${styles.frame}`} initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(0 0 100% 0)" }} whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }} viewport={{ once: true, amount: .18 }} transition={{ duration: .85, ease: [0.22, 1, 0.36, 1] }}>
    <motion.div className={styles.layer} style={{ y, scale }}>
      <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 900px) 100vw, 58vw" quality={92}/>
    </motion.div>
    <div className={styles.glint}/>
  </motion.div>;
}
