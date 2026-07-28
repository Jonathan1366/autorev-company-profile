import type { Locale } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { ButtonLink } from "./button-link";

export function FinalCTA({ locale }: { locale: Locale }) {
  return (
    <section className="final-cta">
      <div className="container final-cta__content">
        <span className="eyebrow eyebrow--light"><i />FOUNDING DRIVER · AUTOREV</span>
        <h2>{locale === "id" ? "Pelajari programnya. Putuskan dengan tenang." : "Understand the program. Decide with clarity."}</h2>
        <p>{locale === "id" ? "Lihat perbedaan Regular dan Premium, pahami ketentuannya, lalu cek kelayakan awal Anda." : "See the differences between Regular and Premium, review the terms, then check your initial eligibility."}</p>
        <div><ButtonLink href={localizePath(locale, "/founding-driver#paket")} variant="light">{locale === "id" ? "Lihat Struktur Paket" : "View Plan Structure"}</ButtonLink><ButtonLink href={`https://wa.me/${siteConfig.whatsapp}`} variant="ghost">{locale === "id" ? "Tanya via WhatsApp" : "Ask on WhatsApp"}</ButtonLink></div>
      </div>
    </section>
  );
}
