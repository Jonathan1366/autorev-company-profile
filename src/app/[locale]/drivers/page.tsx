import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { DriverHeroVisual } from "@/components/page-visuals";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/button-link";
import { FinalCTA } from "@/components/final-cta";
import { Reveal } from "@/components/reveal";
import { EVCinematic } from "@/components/ev-cinematic";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? pageMetadata(locale, "drivers", locale === "id" ? "Founding Driver AutoRev: rental EV fleksibel atau Sewa Jadi Milik, dengan dukungan program untuk driver." : "AutoRev Founding Driver: flexible EV rental or a Rent to Own path, with driver program support.") : {};
}

export default async function DriversPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const benefits = locale === "id" ? [
    { title: "Sewa Jadi Milik", text: "Jalankan program sampai tuntas. Setelah seluruh kewajiban dan verifikasi selesai, EV menjadi milik Anda." },
    { title: "Rental fleksibel", text: "Belum ingin mengambil jalur kepemilikan? Mulai dari skema rental yang sesuai kebutuhan." },
    { title: "Charging gratis", text: "Nikmati charging di jaringan dan batas pemakaian yang ditentukan program." },
    { title: "Makan siang hari kerja", text: "Makan siang Senin sampai Jumat tersedia di titik program yang berpartisipasi." },
    { title: "Dukungan BPJS", text: "Akses dukungan BPJS mengikuti status kepesertaan dan kelayakan program." },
    { title: "Paguyuban driver", text: "Tempat berbagi informasi, saling bantu, dan bertumbuh bersama sesama mitra." },
    { title: "Perawatan lebih simpel", text: "Rutinitas servis EV yang ringkas membantu Anda kembali ke jalan lebih cepat." },
    { title: "Dukungan AutoRev", text: "Tim mendampingi proses verifikasi, onboarding, dan kebutuhan operasional program." },
  ] : [
    { title: "Rent to Own", text: "Complete the program and every verified obligation. Once cleared, the EV becomes yours." },
    { title: "Flexible rental", text: "Not ready for the ownership path? Start with an EV rental that fits the way you work." },
    { title: "Charging included", text: "Eligible charging is covered within the program network and usage allowance." },
    { title: "Weekday lunch", text: "Lunch is available Monday through Friday at participating program points." },
    { title: "BPJS support", text: "BPJS support follows membership status and program eligibility." },
    { title: "Driver community", text: "Share practical knowledge, find support, and grow with fellow drivers." },
    { title: "Simpler maintenance", text: "A streamlined EV service routine helps you get back on the road sooner." },
    { title: "AutoRev support", text: "Our team supports verification, onboarding, and day-to-day program needs." },
  ];
  const path = locale === "id" ? ["Pilih skema", "Jalankan program", "Jadi pemilik"] : ["Choose a path", "Complete the program", "Become the owner"];

  return <>
    <PageHero
      locale={locale}
      eyebrow={locale === "id" ? "RENTAL EV · SEWA JADI MILIK" : "EV RENTAL · RENT TO OWN"}
      status="FOUNDING DRIVER"
      title={locale === "id" ? "Sewa. Jalan. Jadi Milik." : "Rent. Drive. Own."}
      text={locale === "id" ? "Pilih rental fleksibel atau jalankan program sampai EV menjadi milik Anda." : "Choose a flexible rental or work through the program until the EV becomes yours."}
      primaryHref="/contact?type=driver"
      primaryLabel={locale === "id" ? "Pilih Program" : "Choose Your Program"}
      secondaryLabel={locale === "id" ? "Lihat Benefit" : "Explore Benefits"}
    ><DriverHeroVisual locale={locale}/></PageHero>

    <section className="section driver-program" id="explore">
      <div className="container driver-program__grid">
        <SectionHeading eyebrow={locale === "id" ? "PROGRAM UNTUK DRIVER" : "BUILT FOR DRIVERS"} title={locale === "id" ? "Hari ini untuk bekerja. Besok bisa jadi milik." : "Drive today. Build toward ownership."}/>
        <div className="driver-benefit-list">{benefits.map((benefit, index) => <Reveal key={benefit.title} className="driver-benefit-row" delay={(index % 4) * .04}><span>0{index + 1}</span><Check size={20}/><div><strong>{benefit.title}</strong><p>{benefit.text}</p></div></Reveal>)}</div>
      </div>
    </section>

    <EVCinematic locale={locale} scene="driver"/>

    <section className="section driver-career">
      <div className="container driver-career__grid">
        <Reveal>
          <span className="eyebrow eyebrow--light">{locale === "id" ? "KERJA · MILIK · KELUARGA" : "WORK · OWN · BELONG"}</span>
          <h2>{locale === "id" ? "Jalan bersama. Tumbuh sebagai keluarga." : "Move together. Grow as a community."}</h2>
          <p>{locale === "id" ? "AutoRev menyatukan jalur kepemilikan, dukungan operasional, dan paguyuban agar perjalanan Anda tidak dijalani sendirian." : "AutoRev brings together an ownership path, operational support, and a driver community so you never have to build alone."}</p>
          <ButtonLink href={localizePath(locale, "/contact?type=driver")} variant="light">{locale === "id" ? "Daftar Minat" : "Register Interest"}</ButtonLink>
        </Reveal>
        <Reveal className="career-path" delay={.08}>{path.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong>{index < path.length - 1 && <ArrowRight size={24}/>}</div>)}</Reveal>
      </div>
      <div className="container"><p className="program-disclaimer">{locale === "id" ? "Kepemilikan berlaku setelah seluruh kewajiban program selesai dan lolos verifikasi sesuai perjanjian. Charging, makan siang, BPJS, perawatan, dan manfaat komunitas mengikuti kelayakan, area, kuota, serta ketentuan program. Pendaftaran tidak menjamin pekerjaan atau pendapatan." : "Ownership applies only after every program obligation is completed and verified under the agreement. Charging, lunch, BPJS, maintenance, and community benefits are subject to eligibility, coverage, capacity, and program terms. Registration does not guarantee work or income."}</p></div>
    </section>

    <FinalCTA locale={locale}/>
  </>;
}
