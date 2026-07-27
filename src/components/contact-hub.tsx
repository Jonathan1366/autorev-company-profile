"use client";

import { useState } from "react";
import { Building2, CarFront, Gauge, MonitorCog } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { LeadType } from "@/lib/lead-schema";
import { LeadForm } from "./lead-form";

const types: { type: LeadType; icon: typeof CarFront; id: string; en: string }[] = [
  { type: "rental", icon: CarFront, id: "Rental EV", en: "EV Rental" },
  { type: "driver", icon: Gauge, id: "Sewa Jadi Milik", en: "Rent to Own" },
  { type: "business", icon: Building2, id: "Bisnis EV", en: "EV Business" },
  { type: "system", icon: MonitorCog, id: "Demo RevAuto", en: "RevAuto Demo" },
];

const descriptions: Record<string, { id: string; en: string }> = {
  rental: { id: "Pilih lepas kunci atau dengan driver. Ceritakan rencana perjalanan Anda.", en: "Choose self drive or travel with a driver. Tell us about your journey." },
  driver: { id: "Mulai dengan rental fleksibel atau bangun jalan menuju EV milik Anda. Tim kami menghubungi Anda maksimal 7 hari.", en: "Start with a flexible rental or build your path toward EV ownership. Our team will contact you within 7 days." },
  business: { id: "Ceritakan kebutuhan armada dan operasional agar solusi pertama kami langsung relevan.", en: "Share your fleet and operating needs so our first solution is immediately relevant." },
  system: { id: "Bagikan cara kerja rental Anda saat ini untuk menyiapkan demo RevAuto yang tepat.", en: "Share how your rental operation works today so we can prepare the right RevAuto demo." },
};

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
        <div className="contact-hub__intro"><span>0{types.findIndex((item) => item.type === active) + 1}</span><SelectedIcon size={30} /><h2>{selected[locale]}</h2><p>{descriptions[active]?.[locale] || (locale === "id" ? "Isi detail singkat agar percakapan pertama kami lebih relevan." : "Share a few details so our first conversation is more relevant.")}</p></div>
        <LeadForm key={active} locale={locale} type={active} />
      </div>
    </div>
  );
}
