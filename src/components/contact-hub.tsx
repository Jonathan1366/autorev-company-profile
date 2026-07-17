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

export function ContactHub({ locale, initialType = "rental" }: { locale: Locale; initialType?: LeadType }) {
  const [active, setActive] = useState<LeadType>(types.some((item) => item.type === initialType) ? initialType : "rental");
  const selected = types.find((item) => item.type === active)!;
  const SelectedIcon = selected.icon;
  return (
    <div className="contact-hub">
      <div className="contact-hub__types" role="tablist" aria-label="Inquiry type">
        {types.map((item) => { const Icon = item.icon; return <button key={item.type} className={active === item.type ? "is-active" : ""} onClick={() => setActive(item.type)} role="tab" aria-selected={active === item.type}><Icon size={20} /><span>{item[locale]}</span></button>; })}
      </div>
      <div className="contact-hub__body">
        <div className="contact-hub__intro"><span>0{types.findIndex((item) => item.type === active) + 1}</span><SelectedIcon size={30} /><h2>{selected[locale]}</h2><p>{locale === "id" ? "Isi detail singkat agar percakapan pertama kami lebih relevan. Tidak ada biaya atau komitmen pada tahap ini." : "Share a few details so our first conversation is more relevant. There is no fee or commitment at this stage."}</p></div>
        <LeadForm key={active} locale={locale} type={active} />
      </div>
    </div>
  );
}
