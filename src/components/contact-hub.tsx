"use client";

import { useState } from "react";
import { Building2, CarFront, Gauge, MonitorCog } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { LeadType } from "@/lib/lead-schema";
import { LeadForm } from "./lead-form";

const types: { type: LeadType; icon: typeof CarFront; id: string; en: string }[] = [
  { type: "rental", icon: CarFront, id: "Sewa EV", en: "Rent an EV" },
  { type: "driver", icon: Gauge, id: "Program Driver", en: "Driver Program" },
  { type: "business", icon: Building2, id: "Armada Bisnis", en: "Business Fleet" },
  { type: "system", icon: MonitorCog, id: "Demo RevAuto", en: "RevAuto Demo" },
];

const descriptions: Record<string, { id: string; en: string }> = {
  rental: { id: "Beritahu tanggal, lokasi, dan durasi. Tim kami akan membantu mencocokkan kebutuhan Anda dengan unit yang tersedia.", en: "Share your date, location, and duration. Our team will help match your needs with an available vehicle." },
  driver: { id: "Cek kesiapan awal untuk Regular atau Premium. Belum ada biaya, komitmen, atau unggah dokumen pada tahap ini.", en: "Check your initial readiness for Regular or Premium. There is no fee, commitment, or document upload at this stage." },
  business: { id: "Ceritakan jumlah unit, durasi, dan pola operasional. Kami akan menyiapkan percakapan yang lebih relevan.", en: "Share your fleet size, duration, and operating pattern. We’ll prepare a more relevant first conversation." },
  system: { id: "Ceritakan alur rental Anda saat ini agar demo RevAuto fokus pada masalah yang benar-benar ingin diselesaikan.", en: "Tell us how your rental operation works so the RevAuto demo focuses on the problem you actually want to solve." },
};

const signals: Record<string, { id: string[]; en: string[] }> = {
  rental: { id: ["Tanggal & lokasi", "Pilihan dengan / tanpa driver", "Konfirmasi ketersediaan"], en: ["Date & location", "With / without a driver", "Availability confirmation"] },
  driver: { id: ["Sekitar 3 menit", "Tanpa unggah dokumen", "Ditinjau oleh tim AutoRev"], en: ["About 3 minutes", "No document upload", "Reviewed by the AutoRev team"] },
  business: { id: ["Jumlah unit", "Durasi kebutuhan", "Cakupan operasional"], en: ["Fleet size", "Required duration", "Operating scope"] },
  system: { id: ["Alur kerja saat ini", "Kebutuhan demo", "Diskusi bersama tim"], en: ["Current workflow", "Demo requirements", "Team discussion"] },
};

export function ContactHub({ locale, initialType = "rental", initialPackage = "", initialExperience = "", initialVehicle = "" }: { locale: Locale; initialType?: LeadType; initialPackage?: string; initialExperience?: string; initialVehicle?: string }) {
  const [active, setActive] = useState<LeadType>(types.some((item) => item.type === initialType) ? initialType : "rental");
  const selected = types.find((item) => item.type === active)!;
  const SelectedIcon = selected.icon;
  return (
    <div className="contact-hub">
      <div className="contact-hub__types" role="tablist" aria-label={locale === "id" ? "Pilih kebutuhan" : "Choose a request type"}>
        {types.map((item) => { const Icon = item.icon; return <button key={item.type} className={active === item.type ? "is-active" : ""} onClick={() => setActive(item.type)} role="tab" aria-selected={active === item.type}><Icon size={20} /><span>{item[locale]}</span></button>; })}
      </div>
      <div className="contact-hub__body">
        <div className="contact-hub__intro">
          <span>0{types.findIndex((item) => item.type === active) + 1} · {locale === "id" ? "PILIHAN ANDA" : "YOUR SELECTION"}</span>
          <SelectedIcon size={30} />
          <h2>{selected[locale]}</h2>
          <p>{descriptions[active]?.[locale] || (locale === "id" ? "Isi detail singkat agar percakapan pertama kami lebih relevan." : "Share a few details so our first conversation is more relevant.")}</p>
          <ul className="contact-hub__signals">{signals[active][locale].map((signal) => <li key={signal}>{signal}</li>)}</ul>
        </div>
        <LeadForm key={active} locale={locale} type={active} initialPackage={initialPackage} initialExperience={initialExperience} initialVehicle={active === "rental" || active === "business" ? initialVehicle : ""} />
      </div>
    </div>
  );
}
