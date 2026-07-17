import type { Locale } from "@/lib/i18n";

export function Roadmap({ locale }: { locale: Locale }) {
  const phases = locale === "id" ? [
    ["Sekarang", "Layanan EV", ["EV rental customer", "Founding Driver", "Corporate EV rental", "Persiapan pilot RevAuto"]],
    ["Berikutnya", "RevAuto", ["Booking & unit", "Driver & charging", "Maintenance", "Invoice & laporan"]],
    ["Visi ke depan", "Operasi regional", ["Sistem owner rental", "Jaringan charging", "Kemitraan pembiayaan", "Ekspansi Asia Tenggara"]],
  ] : [
    ["Now", "EV services", ["Customer EV rental", "Founding Driver", "Corporate EV rental", "RevAuto pilot preparation"]],
    ["Next", "RevAuto", ["Bookings & vehicles", "Drivers & charging", "Maintenance", "Invoices & reporting"]],
    ["Future vision", "Regional operations", ["Rental owner systems", "Charging network", "Financing partnerships", "Southeast Asia expansion"]],
  ];
  return (
    <div className="roadmap">
      <div className="roadmap__line" aria-hidden="true"><i /><i /><i /></div>
      {phases.map(([phase, title, items], index) => (
        <div className={`roadmap__phase ${index === 0 ? "is-current" : ""}`} key={String(phase)}>
          <span>0{index + 1} · {phase}</span><h3>{title}</h3><ul>{(items as string[]).map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      ))}
    </div>
  );
}
