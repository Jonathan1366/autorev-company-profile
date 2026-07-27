import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n";
import { navigation, siteConfig } from "@/lib/site";
import { BrandLogo } from "./brand-logo";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-intro">
          <BrandLogo locale={locale} inverse />
          <p>{locale === "id" ? "Dari kendaraan kerja hari ini menuju EV milik Anda." : "From today’s working vehicle toward an EV of your own."}</p>
          <span>{locale === "id" ? "100% listrik. Jalan kepemilikan jelas." : "100% electric. A clear path to ownership."}</span>
        </div>
        <div className="footer-links">
          <div>
            <h3>{locale === "id" ? "Layanan" : "Explore"}</h3>
            {navigation.slice(0, 5).map((item) => <Link key={item.href} href={localizePath(locale, item.href)}>{item.label[locale]}</Link>)}
          </div>
          <div>
            <h3>{locale === "id" ? "Perusahaan" : "Company"}</h3>
            <Link href={localizePath(locale, "/contact")}>{locale === "id" ? "Kontak" : "Contact"}</Link>
            <Link href={localizePath(locale, "/privacy")}>{locale === "id" ? "Privasi" : "Privacy"}</Link>
            <Link href={localizePath(locale, "/terms")}>{locale === "id" ? "Ketentuan" : "Terms"}</Link>
          </div>
          <div>
            <h3>{locale === "id" ? "Kontak" : "Connect"}</h3>
            <a href={`mailto:${siteConfig.email}`}>Email <ArrowUpRight size={14} /></a>
            <a href={`tel:${siteConfig.phoneTel}`}>{siteConfig.phoneDisplay} <ArrowUpRight size={14} /></a>
            <a href={`https://wa.me/${siteConfig.whatsapp}`} rel="noreferrer">WhatsApp <ArrowUpRight size={14} /></a>
            <span className="muted-link">LinkedIn · {locale === "id" ? "segera" : "coming soon"}</span>
            <span className="muted-link">Instagram · {locale === "id" ? "segera" : "coming soon"}</span>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} AutoRev Mobilitas Indonesia.</span>
        <span>{locale === "id" ? "Sewa. Jalan. Jadi Milik." : "Rent. Drive. Own."}</span>
      </div>
    </footer>
  );
}
