import type { Locale } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { ButtonLink } from "./button-link";

export function FinalCTA({ locale }: { locale: Locale }) {
  return (
    <section className="final-cta">
      <div className="container final-cta__content">
        <span className="eyebrow eyebrow--light"><i />FOUNDING DRIVER · AUTOREV</span>
        <h2>{locale === "id" ? "Siap memulai jalur menuju EV milik sendiri?" : "Ready to start your path toward owning an EV?"}</h2>
        <p>{locale === "id" ? "Bandingkan paket mulai Rp300.000 per hari, pahami kontraknya, lalu cek kelayakan awal Anda." : "Compare plans from IDR 300,000 per day, understand the contract, then check your initial eligibility."}</p>
        <div><ButtonLink href={localizePath(locale, "/founding-driver#paket")} variant="light">{locale === "id" ? "Bandingkan Paket" : "Compare Plans"}</ButtonLink><ButtonLink href={`https://wa.me/${siteConfig.whatsapp}`} variant="ghost">WhatsApp</ButtonLink></div>
      </div>
    </section>
  );
}
