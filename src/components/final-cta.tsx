import type { Locale } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { ButtonLink } from "./button-link";

export function FinalCTA({ locale }: { locale: Locale }) {
  return (
    <section className="final-cta">
      <div className="container final-cta__content">
        <span className="eyebrow eyebrow--light"><i />AUTOREV</span>
        <h2>{locale === "id" ? "Siap bergerak dengan EV?" : "Ready to move with EV?"}</h2>
        <p>{locale === "id" ? "Pilih rental, program driver, bisnis, atau RevAuto." : "Choose rental, the driver program, business, or RevAuto."}</p>
        <div><ButtonLink href={localizePath(locale, "/contact")} variant="light">{locale === "id" ? "Daftar Sekarang" : "Register Now"}</ButtonLink><ButtonLink href={`https://wa.me/${siteConfig.whatsapp}`} variant="ghost">WhatsApp</ButtonLink></div>
      </div>
    </section>
  );
}
