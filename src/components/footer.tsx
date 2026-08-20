import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { BrandLogo } from "./brand-logo";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-intro">
          <BrandLogo locale={locale} inverse />
          <p>{locale === "id" ? "Rental kendaraan, truck, trailer, heavy equipment, dan fleet technology untuk kebutuhan B2B." : "B2B vehicle, truck, trailer, heavy equipment, and fleet technology solutions."}</p>
          <span>Mobility · Equipment · Technology</span>
        </div>
        <div className="footer-links">
          <div>
            <h3>{locale === "id" ? "Solusi" : "Solutions"}</h3>
            <Link href={localizePath(locale, "/founding-driver")}>Founding Driver</Link>
            <Link href={localizePath(locale, "/autorev-rental")}>EV Rental</Link>
            <Link href={`${localizePath(locale)}#catalog`}>{locale === "id" ? "E-Catalog Equipment" : "Equipment E-Catalog"}</Link>
            <Link href={`${localizePath(locale)}#project-solutions`}>{locale === "id" ? "Solusi Proyek" : "Project Solutions"}</Link>
            <Link href={`${localizePath(locale)}#technology`}>Fleet Technology</Link>
            <Link href={localizePath(locale, "/contact?type=business")}>{locale === "id" ? "Minta Penawaran" : "Request a Quote"}</Link>
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
        <span>{locale === "id" ? "Mobility, Equipment & Technology." : "Mobility, Equipment & Technology."}</span>
      </div>
    </footer>
  );
}
