import { CalendarDays, CarFront, CircleCheck, KeyRound, MapPin } from "lucide-react";
import type { Locale } from "@/lib/i18n";

export function RentalFlow({ locale }: { locale: Locale }) {
  const steps = locale === "id" ? [
    ["Pilih EV", "100% kendaraan listrik", CarFront],
    ["Atur perjalanan", "Tanggal & lokasi antar", CalendarDays],
    ["Verifikasi", "Detail yang terstruktur", CircleCheck],
    ["Terima & berkendara", "Serah-terima digital", KeyRound],
    ["Kelola dari aplikasi", "Perpanjangan & bantuan", MapPin],
  ] as const : [
    ["Choose an EV", "100% electric vehicles", CarFront],
    ["Plan your trip", "Date & delivery location", CalendarDays],
    ["Verify", "Structured details", CircleCheck],
    ["Receive & drive", "Digital handover", KeyRound],
    ["Manage in the app", "Extensions & assistance", MapPin],
  ] as const;
  return (
    <div className="rental-flow">
      {steps.map(([title, text, Icon], index) => (
        <div className="rental-flow__step" key={title}>
          <span className="rental-flow__number">0{index + 1}</span>
          <Icon size={23} strokeWidth={1.7} />
          <strong>{title}</strong>
          <small>{text}</small>
        </div>
      ))}
    </div>
  );
}
