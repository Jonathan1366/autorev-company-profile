import { ArrowUpRight, Boxes, CarTaxiFront, Cog, Store, Truck } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n";

export function PartnerCards({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const partners = locale === "id" ? [
    ["Bengkel", "Terima request yang lebih terstruktur dan kelola quotation hingga progress.", Store],
    ["Teknisi", "Tampilkan keahlian, area layanan, jadwal, dan kapasitas Anda.", Cog],
    ["Towing", "Terima kebutuhan pickup dan roadside berdasarkan lokasi serta kesiapan.", Truck],
    ["Supplier parts", "Cocokkan permintaan parts dengan ketersediaan dan estimasi pengiriman.", Boxes],
    ["Rental replacement", "Bantu kendaraan dan bisnis tetap bergerak selama perbaikan.", CarTaxiFront],
  ] as const : [
    ["Workshop", "Receive more structured requests and manage quotations through progress.", Store],
    ["Technician", "Showcase your expertise, service area, schedule, and capacity.", Cog],
    ["Towing", "Receive pickup and roadside requests based on location and readiness.", Truck],
    ["Parts supplier", "Match parts requests with availability and delivery estimates.", Boxes],
    ["Replacement rental", "Help vehicles and businesses keep moving during repairs.", CarTaxiFront],
  ] as const;
  return (
    <div className={`partner-cards ${compact ? "partner-cards--compact" : ""}`}>
      {partners.map(([title, text, Icon], index) => (
        <Link href={localizePath(locale, `/contact?type=partner&category=${encodeURIComponent(title)}`)} className="partner-card" key={title}>
          <div className="partner-card__number">0{index + 1}</div><Icon size={29} strokeWidth={1.5} /><h3>{title}</h3><p>{text}</p><span>{locale === "id" ? "Daftar minat" : "Register interest"}<ArrowUpRight size={17} /></span>
        </Link>
      ))}
    </div>
  );
}
