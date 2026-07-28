"use client";

import { useState } from "react";
import { Building2, CarFront, Gauge, MonitorCog } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { LeadType } from "@/lib/lead-schema";
import { LeadForm } from "./lead-form";

const types: { type: LeadType; icon: typeof CarFront; id: string; en: string }[] = [
  { type: "rental", icon: CarFront, id: "Rental EV", en: "EV Rental" },
  { type: "driver", icon: Gauge, id: "Founding Driver", en: "Founding Driver" },
  { type: "business", icon: Building2, id: "Bisnis EV", en: "EV Business" },
  { type: "system", icon: MonitorCog, id: "Demo RevAuto", en: "RevAuto Demo" },
];

const descriptions: Record<string, { id: string; en: string }> = {
  rental: { id: "Pilih lepas kunci atau dengan driver. Ceritakan rencana perjalanan Anda.", en: "Choose self drive or travel with a driver. Tell us about your journey." },
  driver: { id: "Cek kelayakan awal untuk paket Regular atau Premium. Tidak perlu mengunggah KTP, KK, atau SIM pada tahap ini.", en: "Complete an initial eligibility check for Regular or Premium. You do not need to upload identity documents at this stage." },
  business: { id: "Ceritakan kebutuhan armada dan operasional agar solusi pertama kami langsung relevan.", en: "Share your fleet and operating needs so our first solution is immediately relevant." },
  system: { id: "Bagikan cara kerja rental Anda saat ini untuk menyiapkan demo RevAuto yang tepat.", en: "Share how your rental operation works today so we can prepare the right RevAuto demo." },
};

export function ContactHub({ locale, initialType = "rental", initialPackage = "", initialExperience = "" }: { locale: Locale; initialType?: LeadType; initialPackage?: string; initialExperience?: string }) {
  const [active, setActive] = useState<LeadType>(types.some((item) => item.type === initialType) ? initialType : "rental");
  const selected = types.find((item) => item.type === active)!;
  const SelectedIcon = selected.icon;
  return (
    <div className="contact-hub">
      <div className="contact-hub__types" role="tablist" aria-label="Inquiry type">
        {types.map((item) => { const Icon = item.icon; return <button key={item.type} className={active === item.type ? "is-active" : ""} onClick={() => setActive(item.type)} role="tab" aria-selected={active === item.type}><Icon size={20} /><span>{item[locale]}</span></button>; })}
      </div>
      <div className="contact-hub__body">
        <div className="contact-hub__intro"><span>0{types.findIndex((item) => item.type === active) + 1}</span><SelectedIcon size={30} /><h2>{selected[locale]}</h2><p>{descriptions[active]?.[locale] || (locale === "id" ? "Isi detail singkat agar percakapan pertama kami lebih relevan." : "Share a few details so our first conversation is more relevant.")}</p></div>
        <LeadForm key={active} locale={locale} type={active} initialPackage={initialPackage} initialExperience={initialExperience} />
      </div>
    </div>
  );
}
