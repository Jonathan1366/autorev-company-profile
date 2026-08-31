import { Building2, CarFront, CircleGauge, Store, Wrench } from "lucide-react";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";

export function RentalHeroVisual({ locale }: { locale: Locale }) {
  return <PhotoHeroVisual locale={locale} image="/images/autorev-rental-roadtrip-v3.png" altId="Rombongan memulai perjalanan dengan kendaraan listrik" altEn="Friends beginning a journey in an electric vehicle" label={locale === "id" ? "AUTOREV SEWA MOBIL" : "AUTOREV CAR RENTAL"} titleId="Fleksibel untuk setiap perjalanan." titleEn="Flexible for every journey." metaId="Lepas kunci · Dengan pengemudi" metaEn="Self drive · With a driver"/>;
}

export function BusinessHeroVisual({ locale }: { locale: Locale }) {
  return <PhotoHeroVisual locale={locale} image="/images/autorev-corporate-ev-v2.png" altId="Armada kendaraan listrik AutoRev untuk perusahaan" altEn="AutoRev electric fleet for companies" label="AUTOREV FOR BUSINESS" titleId="Armada modern siap bekerja." titleEn="Modern fleets ready to work." metaId="Perusahaan · Pengemudi · Usaha Rental" metaEn="Companies · Drivers · Rental Businesses" icon="business"/>;
}

export function PartnerHeroVisual({ locale }: { locale: Locale }) {
  return <div className="partner-network-visual"><div className="partner-network-visual__core"><Image src="/images/autorev-icon-300.png" alt="" width={52} height={52}/><b>Partner</b></div>{[["Workshop",Store],["Technician",Wrench],["Fleet",CarFront],["Capacity",CircleGauge]].map(([label, Icon],index) => { const IconComponent = Icon as typeof Store; return <div className={`partner-network-visual__node partner-network-visual__node--${index+1}`} key={String(label)}><IconComponent size={18}/><span>{label as string}</span></div>;})}<small>{locale === "id" ? "INITIAL PARTNER NETWORK" : "INITIAL PARTNER NETWORK"}</small></div>;
}

export function AIHeroVisual({ locale }: { locale: Locale }) {
  return <PhotoHeroVisual locale={locale} image="/images/autorev-hyundai-ioniq5-real.jpg" altId="Kendaraan listrik bergerak di jalan kota" altEn="An electric vehicle moving through the city" label="REVAUTO" titleId="Operasional lebih jelas." titleEn="Clearer operations." metaId="Unit · Booking · Charging" metaEn="Fleet · Booking · Charging"/>;
}

export function DriverHeroVisual({ locale }: { locale: Locale }) {
  const description = locale === "id"
    ? "Kendaraan listrik bergerak di pusat kota"
    : "An electric vehicle moving through the city";

  return <div className="business-hero-photo page-photo-visual driver-hero-motion" role="img" aria-label={description}>
    <video autoPlay muted loop playsInline preload="auto" poster="/images/autorev-driver-passenger-v3.png" aria-hidden="true">
      <source src="/videos/autorev-driver-city-web.m4v" type="video/mp4"/>
    </video>
    <div className="business-hero-photo__shade"/>
    <div className="business-hero-photo__card">
      <span><Image src="/images/autorev-icon-300.png" alt="" width={30} height={30}/> FOUNDING DRIVER</span>
      <strong>{locale === "id" ? "Jadi mitra AutoRev." : "Partner with AutoRev."}</strong>
      <small>{locale === "id" ? "EV · Dukungan · Peluang" : "EV · Support · Opportunity"}</small>
    </div>
  </div>;
}

function PhotoHeroVisual({ locale, image, altId, altEn, label, titleId, titleEn, metaId, metaEn, icon }: { locale: Locale; image: string; altId: string; altEn: string; label: string; titleId: string; titleEn: string; metaId: string; metaEn: string; icon?: "business" }) {
  return <div className="business-hero-photo page-photo-visual"><Image src={image} alt={locale === "id" ? altId : altEn} fill priority sizes="(max-width: 900px) 92vw, 48vw" quality={92}/><div className="business-hero-photo__shade"/><div className="business-hero-photo__card"><span>{icon === "business" ? <Building2 size={18}/> : <Image src="/images/autorev-icon-300.png" alt="" width={30} height={30}/>} {label}</span><strong>{locale === "id" ? titleId : titleEn}</strong><small>{locale === "id" ? metaId : metaEn}</small></div></div>;
}
