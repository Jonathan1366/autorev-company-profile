"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function PageTemplate({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  return <motion.div initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .42, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
