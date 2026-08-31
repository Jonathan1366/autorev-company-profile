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
          <p>{locale === "id" ? "AutoRev menghadirkan akses mobilitas yang adil dan transparan, mulai dari sewa harian, penyediaan armada perusahaan, hingga program kepemilikan mobil listrik bagi pengemudi." : "AutoRev provides fair and transparent access to mobility, from daily rentals and corporate fleet supply to an electric car ownership program for drivers."}</p>
          <span>Car Rental · Founding Driver · Fleet</span>
        </div>
        <div className="footer-links">
          <div>
            <h3>{locale === "id" ? "Solusi" : "Solutions"}</h3>
            <Link href={localizePath(locale, "/founding-driver")}>Founding Driver</Link>
            <Link href={`${localizePath(locale)}#vehicle-catalog`}>{locale === "id" ? "Katalog Mobil" : "Vehicle Catalog"}</Link>
            <Link href={localizePath(locale, "/autorev-rental")}>{locale === "id" ? "Sewa Mobil" : "Car Rental"}</Link>
            <Link href={localizePath(locale, "/autorev-business")}>{locale === "id" ? "Solusi Bisnis" : "Business Solutions"}</Link>
            <Link href={localizePath(locale, "/contact?type=business")}>{locale === "id" ? "Hubungi Kami" : "Contact Us"}</Link>
          </div>
          <div>
            <h3>{locale === "id" ? "Perusahaan" : "Company"}</h3>
            <Link href={localizePath(locale, "/about")}>{locale === "id" ? "Tentang AutoRev" : "About AutoRev"}</Link>
            <Link href={localizePath(locale, "/equipment")}>{locale === "id" ? "Armada & Peralatan" : "Fleet & Equipment"}</Link>
            <Link href={localizePath(locale, "/revauto")}>{locale === "id" ? "Sistem Fleet RevAuto" : "RevAuto Fleet System"}</Link>
            <Link href={localizePath(locale, "/contact")}>{locale === "id" ? "Pusat Bantuan" : "Help Center"}</Link>
            <Link href={localizePath(locale, "/privacy")}>{locale === "id" ? "Kebijakan Privasi" : "Privacy Policy"}</Link>
            <Link href={localizePath(locale, "/terms")}>{locale === "id" ? "Syarat & Ketentuan" : "Terms & Conditions"}</Link>
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
        <span>{locale === "id" ? "Hak Cipta Dilindungi Undang-Undang." : "All Rights Reserved."}</span>
      </div>
    </footer>
  );
}
