import type { Locale } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { ButtonLink } from "./button-link";

export function FinalCTA({ locale }: { locale: Locale }) {
  return (
    <section className="final-cta">
      <div className="container final-cta__content">
        <span className="eyebrow eyebrow--light"><i />FOUNDING DRIVER · AUTOREV</span>
        <h2>{locale === "id" ? "Siap mengubah perjalanan jadi kepemilikan?" : "Ready to turn every drive into ownership?"}</h2>
        <p>{locale === "id" ? "Mulai Sewa Jadi Milik dan bangun jalan menuju EV Anda sendiri." : "Start Rent to Own and build your path toward an EV of your own."}</p>
        <div><ButtonLink href={localizePath(locale, "/contact?type=driver")} variant="light">{locale === "id" ? "Mulai Jadi Pemilik" : "Start Your Ownership Path"}</ButtonLink><ButtonLink href={`https://wa.me/${siteConfig.whatsapp}`} variant="ghost">WhatsApp</ButtonLink></div>
      </div>
    </section>
  );
}
