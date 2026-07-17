"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  invert = false,
  children,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  invert?: boolean;
  children?: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const enter = reduceMotion ? false : { opacity: 0, y: 24, filter: "blur(8px)" };
  return (
    <div className={`section-heading section-heading--${align} ${invert ? "section-heading--invert" : ""}`}>
      <motion.span className="eyebrow" initial={reduceMotion ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .7 }} transition={{ duration: .5 }}><i />{eyebrow}</motion.span>
      <motion.h2 initial={enter} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: .35 }} transition={{ duration: .75, ease: [0.22, 1, 0.36, 1] }}>{title}</motion.h2>
      {text && <motion.p initial={enter} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: .5 }} transition={{ duration: .7, delay: .08, ease: [0.22, 1, 0.36, 1] }}>{text}</motion.p>}
      {children}
    </div>
  );
}
