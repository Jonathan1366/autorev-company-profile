import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { PartnerHeroVisual } from "@/components/page-visuals";
import { PartnerCards } from "@/components/partner-cards";
import { FeatureGrid, type Feature } from "@/components/feature-grid";
import { SectionHeading } from "@/components/section-heading";
import { FinalCTA } from "@/components/final-cta";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/button-link";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { locale } = await params; return isLocale(locale) ? pageMetadata(locale, "partners", locale === "id" ? "Program founding partner untuk bengkel, teknisi, towing, supplier parts, dan layanan kendaraan." : "A founding partner program for workshops, technicians, towing, parts suppliers, and vehicle services.") : {}; }

export default async function PartnersPage({ params }: Props) {
  const { locale: raw } = await params; if (!isLocale(raw)) notFound(); const locale = raw as Locale;
  const benefits: Feature[] = locale === "id" ? [
    { title: "Request lebih terstruktur", text: "Terima kebutuhan dengan konteks kendaraan, gejala, lokasi, dan bukti awal.", icon: "activity" },
    { title: "Isi kapasitas kosong", text: "Tampilkan jadwal dan kesiapan untuk menerima pekerjaan yang relevan.", icon: "gauge" },
    { title: "Atur harga & jadwal", text: "Tetap tentukan quotation dan waktu kerja sesuai kemampuan Anda.", icon: "finance" },
    { title: "Progress transparan", text: "Kelola update, konfirmasi parts, dokumentasi, dan invoice dalam satu flow.", icon: "wrench" },
    { title: "Jangkauan lebih luas", text: "Bangun channel digital baru tanpa bergantung hanya pada lokasi fisik.", icon: "map" },
    { title: "Reputasi terukur", text: "Kembangkan rekam performa berdasarkan data pekerjaan yang terverifikasi.", icon: "shield" },
  ] : [
    { title: "More structured requests", text: "Receive requirements with vehicle, symptom, location, and initial evidence context.", icon: "activity" },
    { title: "Fill available capacity", text: "Show your schedule and readiness for relevant work.", icon: "gauge" },
    { title: "Set price & schedule", text: "You retain control of quotations and work timing.", icon: "finance" },
    { title: "Transparent progress", text: "Manage updates, parts confirmation, documentation, and invoices in one flow.", icon: "wrench" },
    { title: "Broader reach", text: "Build a new digital channel beyond your physical location.", icon: "map" },
    { title: "Measurable reputation", text: "Develop a performance record based on verified job data.", icon: "shield" },
  ];
  const steps = locale === "id" ? ["Daftarkan minat dan profil layanan", "Tim AutoRev melakukan percakapan awal", "Validasi layanan, area, dan kapasitas", "Onboarding workflow founding partner", "Mulai menerima request ketika pilot aktif"] : ["Register interest and service profile", "Have an initial conversation with AutoRev", "Validate services, coverage, and capacity", "Onboard into the founding partner workflow", "Receive requests when the pilot becomes active"];
  return <>
    <PageHero locale={locale} eyebrow="AutoRev Partner" status={locale === "id" ? "Jaringan awal · Jabodetabek" : "Initial network · Greater Jakarta"} title={locale === "id" ? "Kendaraan butuh bantuan. Partner siap bergerak." : "A vehicle needs help. Partners get moving."} text={locale === "id" ? "Kami menghubungkan kebutuhan kendaraan dengan bengkel, teknisi, towing, dan supplier yang relevan." : "We connect vehicle needs with relevant workshops, technicians, towing, and suppliers."} primaryHref="/contact?type=partner" primaryLabel={locale === "id" ? "Gabung jaringan" : "Join the network"}><PartnerHeroVisual locale={locale}/></PageHero>
    <section className="section" id="explore"><div className="container"><SectionHeading eyebrow="Partner categories" title={locale === "id" ? "Satu jaringan. Beragam keahlian." : "One network. Many specialties."} text={locale === "id" ? "Program awal tidak eksklusif dan tidak mempublikasikan skema komisi sebelum detailnya ditetapkan." : "The founding program is non-exclusive and does not publish commission terms before they are finalized."}/><PartnerCards locale={locale}/></div></section>
    <section className="section section--soft"><div className="container"><SectionHeading eyebrow="Partner value" title={locale === "id" ? "Lebih banyak konteks. Lebih sedikit pekerjaan manual." : "More context. Less manual work."}/><FeatureGrid locale={locale} features={benefits}/></div></section>
    <section className="section"><div className="container partner-onboarding"><SectionHeading eyebrow="Founding partner onboarding" title={locale === "id" ? "Mulai dari percakapan, bukan kontrak yang rumit." : "Start with a conversation, not a complicated contract."} text={locale === "id" ? "Setiap kategori partner memiliki kebutuhan berbeda. Flow awal membantu kami memahami layanan dan kesiapan Anda sebelum pilot dimulai." : "Every partner category has different needs. The early flow helps us understand your services and readiness before the pilot begins."}><ButtonLink href={localizePath(locale,"/contact?type=partner")} variant="primary">{locale === "id" ? "Daftar minat partner" : "Register partner interest"}</ButtonLink></SectionHeading><Reveal className="onboarding-list">{steps.map((step,index)=><div key={step}><span>0{index+1}</span><p>{step}</p><CheckCircle2 size={19}/></div>)}</Reveal></div></section>
    <FinalCTA locale={locale} variant="partner"/>
  </>;
}
