import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Compass, Flag, HeartHandshake, Map, MoveRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { FinalCTA } from "@/components/final-cta";
import { Reveal } from "@/components/reveal";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { locale } = await params; return isLocale(locale) ? pageMetadata(locale, "about", locale === "id" ? "Visi, misi, dan cerita AutoRev Mobilitas Indonesia." : "The vision, mission, and story of AutoRev Mobilitas Indonesia.") : {}; }

export default async function AboutPage({ params }: Props) {
  const { locale: raw } = await params; if (!isLocale(raw)) notFound(); const locale = raw as Locale;
  const missions = locale === "id" ? [
    "Membuat rental EV lebih mudah untuk customer.", "Membuka peluang tumbuh bagi mitra driver EV.", "Menyediakan armada listrik untuk corporate dan owner rental.", "Merapikan unit, booking, driver, charging, dan maintenance melalui RevAuto.", "Menjalankan teknologi secara bertahap dan transparan.", "Membangun operasi kendaraan listrik yang relevan untuk Indonesia."
  ] : [
    "Make EV rental easier for customers.", "Create room for EV driver partners to grow.", "Provide electric fleets for companies and rental owners.", "Bring fleets, bookings, drivers, charging, and maintenance into RevAuto.", "Build technology in clear, honest stages.", "Create electric vehicle operations that fit Indonesia."
  ];
  return <>
    <PageHero locale={locale} eyebrow="ABOUT AUTOREV" status="100% EV" title={locale === "id" ? "Mulai dari EV rental. Tumbuh bersama RevAuto." : "Starting with EV rental. Growing with RevAuto."} text={locale === "id" ? "AutoRev membangun layanan kendaraan listrik untuk customer, mitra driver, corporate, dan owner rental." : "AutoRev is building electric vehicle services for customers, driver partners, companies, and rental owners."} primaryHref="/contact" primaryLabel={locale === "id" ? "Daftar Minat" : "Register Interest"}><div className="about-hero-mark"><Image src="/images/autorev-icon-512.png" alt="AutoRev logo" width={310} height={310} priority/><span>100% EV<br/>Indonesia.</span></div></PageHero>
    <section className="section" id="explore"><div className="container brand-story"><Reveal className="brand-story__logo"><Image src="/images/autorev-logo-horizontal.png" alt="AutoRev Mobilitas Indonesia" width={1672} height={941} sizes="(max-width: 900px) 100vw, 50vw"/></Reveal><Reveal className="brand-story__copy"><span className="eyebrow"><i/>Our starting point</span><h2>{locale === "id" ? "Masalah kendaraan jarang berdiri sendiri." : "Vehicle problems rarely stand alone."}</h2><p>{locale === "id" ? "Satu kendaraan yang berhenti dapat melibatkan driver, owner, teknisi, bengkel, towing, supplier parts, dan pihak lain. Ketika informasi tersebar di Excel, WhatsApp, dan dokumen fisik, downtime menjadi sulit dikendalikan." : "One stopped vehicle can involve a driver, owner, technician, workshop, towing provider, parts supplier, and others. When information is scattered across spreadsheets, messaging, and physical documents, downtime becomes harder to control."}</p><p>{locale === "id" ? "AutoRev dibangun untuk menghubungkan pihak-pihak tersebut melalui pengalaman yang lebih sederhana, transparan, dan dapat berkembang." : "AutoRev is being built to connect those parties through an experience that is simpler, more transparent, and able to scale."}</p></Reveal></div></section>
    <section className="section section--soft"><div className="container vision-grid"><Reveal className="vision-card vision-card--primary"><Compass/><span>VISION</span><h2>{locale === "id" ? "Membuat kendaraan listrik lebih mudah diakses dan dioperasikan." : "Make electric vehicles easier to access and operate."}</h2><p>{locale === "id" ? "Dimulai dari rental nyata. Diperkuat oleh RevAuto." : "Grounded in real rental. Strengthened by RevAuto."}</p></Reveal><Reveal className="vision-card"><Map/><span>ARAH JANGKA PANJANG</span><h3>{locale === "id" ? "Dari Indonesia menuju Asia Tenggara." : "From Indonesia toward Southeast Asia."}</h3><p>{locale === "id" ? "Membangun layanan dan sistem operasi rental EV yang dapat tumbuh bersama partner." : "Building EV rental services and operating systems that can grow with partners."}</p></Reveal></div></section>
    <section className="section"><div className="container mission-layout"><SectionHeading eyebrow="MISSION" title={locale === "id" ? "Enam arah yang memandu kami." : "Six directions that guide us."}/><div className="mission-list">{missions.map((mission,index)=><Reveal key={mission} className="mission-item" delay={(index%2)*.04}><span>{String(index+1).padStart(2,"0")}</span><p>{mission}</p><MoveRight size={18}/></Reveal>)}</div></div></section>
    <section className="section section--founder"><div className="container founder-note"><div><Flag size={26}/><span>FOUNDER STORY</span></div><blockquote>“{locale === "id" ? "AutoRev lahir dari kebutuhan nyata untuk melihat unit, merencanakan maintenance, mengatur vendor, dan memahami biaya downtime." : "AutoRev grew from a real need to see vehicles, plan maintenance, coordinate vendors, and understand downtime costs."}”</blockquote><p>{locale === "id" ? "Cerita ini menunjukkan arah pengembangan AutoRev." : "This story reflects the direction of AutoRev."}</p></div></section>
    <section className="section"><div className="container human-band"><HeartHandshake/><h2>{locale === "id" ? "Indonesia. Realistis. Human-centered." : "Indonesian. Realistic. Human-centered."}</h2><p>{locale === "id" ? "Teknologi hanya berguna ketika membuat pekerjaan orang lebih jelas dan kendaraan kembali produktif." : "Technology is only useful when it makes people’s work clearer and vehicles productive again."}</p></div></section>
    <FinalCTA locale={locale} variant="about"/>
  </>;
}
