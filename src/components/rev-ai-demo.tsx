"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Bot, Check, CircleDot, FileSearch, Route, ShieldAlert, Wrench } from "lucide-react";
import type { Locale } from "@/lib/i18n";

const demos = {
  id: [
    { label: "Kendaraan overheat", prompt: "Suhu mesin meningkat dan indikator menyala.", steps: ["Kumpulkan gejala & foto", "Periksa informasi yang belum lengkap", "Sarankan berhenti di lokasi aman", "Rute ke teknisi atau towing"], result: "Perlu pemeriksaan fisik sebelum kendaraan digunakan kembali." },
    { label: "Jadwalkan maintenance", prompt: "Cari waktu service tanpa mengganggu booking.", steps: ["Baca kilometer & usia", "Tinjau booking mendatang", "Cari slot kendaraan", "Susun rekomendasi jadwal"], result: "Jadwal perlu dikonfirmasi oleh fleet owner dan penyedia layanan." },
    { label: "Cari bengkel", prompt: "Temukan bengkel yang relevan untuk kebutuhan ini.", steps: ["Klasifikasikan kebutuhan", "Tinjau lokasi & spesialisasi", "Periksa kapasitas & estimasi", "Bandingkan opsi vendor"], result: "Pilihan akhir mempertimbangkan kapasitas, harga, ETA, dan kesiapan parts." },
    { label: "Analisis downtime", prompt: "Mengapa kendaraan belum kembali beroperasi?", steps: ["Petakan status pekerjaan", "Deteksi pihak yang ditunggu", "Tinjau risiko keterlambatan", "Susun tindakan follow-up"], result: "Prediksi dapat berubah setelah inspeksi atau konfirmasi parts." },
  ],
  en: [
    { label: "Vehicle overheating", prompt: "Engine temperature is rising and a warning is on.", steps: ["Collect symptoms & photos", "Detect missing information", "Recommend a safe stop", "Route to technician or towing"], result: "A physical inspection is required before returning the vehicle to use." },
    { label: "Schedule maintenance", prompt: "Find a service slot without disrupting bookings.", steps: ["Read mileage & vehicle age", "Review upcoming bookings", "Find vehicle availability", "Propose a service window"], result: "The fleet owner and service provider must confirm the schedule." },
    { label: "Find a workshop", prompt: "Find a relevant workshop for this requirement.", steps: ["Classify the requirement", "Review location & specialty", "Check capacity & estimate", "Compare vendor options"], result: "The final choice considers capacity, price, ETA, and parts readiness." },
    { label: "Analyze downtime", prompt: "Why has this vehicle not returned to service?", steps: ["Map job status", "Detect the waiting party", "Review delay risk", "Prepare follow-up actions"], result: "Predictions may change after inspection or parts confirmation." },
  ],
} as const;

const stepIcons = [FileSearch, ShieldAlert, Wrench, Route];

export function RevAIDemo({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const demo = demos[locale][active];
  return (
    <div className="ai-demo">
      <div className="ai-demo__prompts" role="tablist" aria-label="RevAuto demo scenarios">
        <span>{locale === "id" ? "PILIH SKENARIO" : "SELECT A SCENARIO"}</span>
        {demos[locale].map((item, index) => <button key={item.label} className={index === active ? "is-active" : ""} onClick={() => setActive(index)} role="tab" aria-selected={index === active}><CircleDot size={17} />{item.label}</button>)}
      </div>
      <div className="ai-demo__workspace">
        <div className="ai-demo__top"><span><Bot size={17} />RevAuto</span><small>{locale === "id" ? "Demo alur terstruktur" : "Structured workflow demo"}</small></div>
        <motion.div className="ai-demo__content" key={active} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="ai-demo__request"><small>{locale === "id" ? "PERMINTAAN" : "REQUEST"}</small><p>“{demo.prompt}”</p></div>
          <div className="ai-demo__steps">
            {demo.steps.map((step, index) => {
              const Icon = stepIcons[index];
              return <motion.div key={step} initial={reduce ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .1 }}><span><Icon size={17} /></span><div><small>0{index + 1}</small><strong>{step}</strong></div><Check size={16} /></motion.div>;
            })}
          </div>
          <div className="ai-demo__result"><span><Bot size={19} /></span><div><small>{locale === "id" ? "HASIL AWAL" : "PRELIMINARY OUTCOME"}</small><p>{demo.result}</p></div></div>
        </motion.div>
      </div>
    </div>
  );
}
