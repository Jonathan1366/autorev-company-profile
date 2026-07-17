import { ClipboardList, ScanSearch, Route, BadgeDollarSign, Truck, Wrench, CircleCheck } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { Reveal } from "./reveal";

export function UptimeTimeline({ locale }: { locale: Locale }) {
  const steps = locale === "id" ? [
    ["Masalah dilaporkan", "Foto, video, suara, dan kronologi disusun.", ClipboardList],
    ["Informasi diringkas", "RevAuto membantu melihat konteks dan data yang kurang.", ScanSearch],
    ["Penyedia dicocokkan", "Teknisi internal atau partner ditinjau berdasarkan kebutuhan.", Route],
    ["Kapasitas dikonfirmasi", "Estimasi, kesiapan parts, dan jadwal menjadi terlihat.", BadgeDollarSign],
    ["Pickup atau towing", "Perpindahan kendaraan dikoordinasikan bila diperlukan.", Truck],
    ["Pekerjaan dipantau", "Progress, parts, approval, dan perubahan estimasi tercatat.", Wrench],
    ["Kembali beroperasi", "Kendaraan diserahterimakan setelah verifikasi pihak terkait.", CircleCheck],
  ] as const : [
    ["Issue reported", "Photos, video, voice, and chronology are structured.", ClipboardList],
    ["Information summarized", "RevAuto helps surface context and missing data.", ScanSearch],
    ["Provider matched", "Internal technicians or partners are reviewed by need.", Route],
    ["Capacity confirmed", "Estimate, parts readiness, and timing become visible.", BadgeDollarSign],
    ["Pickup or towing", "Vehicle movement is coordinated when required.", Truck],
    ["Work tracked", "Progress, parts, approvals, and estimate changes are recorded.", Wrench],
    ["Return to service", "The vehicle is handed over after relevant verification.", CircleCheck],
  ] as const;
  return (
    <div className="uptime-timeline">
      {steps.map(([title, text, Icon], index) => (
        <Reveal className="uptime-step" delay={index * .05} key={title}>
          <div className="uptime-step__rail"><span>0{index + 1}</span><i /></div>
          <div className="uptime-step__icon"><Icon size={22} /></div>
          <div><h3>{title}</h3><p>{text}</p></div>
        </Reveal>
      ))}
    </div>
  );
}
