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
  return isLocale(locale) ? pageMetadata(locale, "drivers", locale === "id" ? "Founding Driver AutoRev: sewa EV untuk bekerja atau jalani Sewa Jadi Milik, lengkap dengan dukungan keluarga driver." : "AutoRev Founding Driver: rent an EV for work or follow a Rent to Own path, backed by a driver community.") : {};
}

export default async function DriversPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const benefits = locale === "id" ? [
    { title: "Punya arah, bukan sekadar sewa", text: "Tuntaskan Sewa Jadi Milik. Setelah seluruh kewajiban dan verifikasi selesai, EV menjadi milik Anda." },
    { title: "Tetap fleksibel", text: "Belum siap menuju kepemilikan? Mulai dari rental EV yang mengikuti cara Anda bekerja." },
    { title: "Biaya jalan lebih ringan", text: "Charging gratis tersedia dalam jaringan dan batas pemakaian yang ditentukan program." },
    { title: "Makan siang untuk hari kerja", text: "Makan siang Senin sampai Jumat tersedia di titik program yang berpartisipasi." },
    { title: "Perlindungan yang ikut berjalan", text: "Dukungan BPJS tersedia sesuai status kepesertaan dan kelayakan program." },
    { title: "Ada keluarga di belakang Anda", text: "Paguyuban menjadi tempat berbagi kabar, saling bantu, dan tumbuh bersama." },
    { title: "EV lebih simpel dirawat", text: "Perawatan yang lebih ringkas membantu Anda kembali mencari penghasilan lebih cepat." },
    { title: "Tim yang mendampingi", text: "AutoRev membantu proses verifikasi, onboarding, dan kebutuhan operasional program." },
  ] : [
    { title: "A destination, not just a rental", text: "Complete Rent to Own and every verified obligation. Once cleared, the EV becomes yours." },
    { title: "Freedom to stay flexible", text: "Not ready for ownership? Start with an EV rental that fits the way you work." },
    { title: "Lower everyday running costs", text: "Eligible charging is included within the program network and usage allowance." },
    { title: "Lunch on working days", text: "Lunch is available Monday through Friday at participating program points." },
    { title: "Protection that moves with you", text: "BPJS support is available based on membership status and program eligibility." },
    { title: "A community behind you", text: "Share practical knowledge, find support, and grow with fellow drivers." },
    { title: "Simpler EV care", text: "A streamlined service routine helps you return to earning sooner." },
    { title: "A team by your side", text: "AutoRev supports verification, onboarding, and day-to-day program needs." },
  ];
  const path = locale === "id" ? ["Pilih jalan Anda", "Tuntaskan komitmen", "Bawa pulang EV Anda"] : ["Choose your path", "Complete your commitment", "Make the EV yours"];
  const familyPoints = locale === "id"
    ? ["Makan siang Senin sampai Jumat", "Dukungan BPJS sesuai kelayakan", "Paguyuban yang saling menjaga"]
    : ["Lunch from Monday to Friday", "BPJS support for eligible members", "A driver community that looks out for each other"];

  return <>
    <PageHero
      locale={locale}
      eyebrow={locale === "id" ? "FOUNDING DRIVER · SEWA JADI MILIK" : "FOUNDING DRIVER · RENT TO OWN"}
      status="FOUNDING DRIVER"
      title={locale === "id" ? "Jalan hari ini. Miliki EV Anda nanti." : "Drive it today. Make it yours."}
      text={locale === "id" ? "Mulai dari rental fleksibel, atau pilih Sewa Jadi Milik. Tuntaskan programnya, lalu bawa pulang EV Anda sesuai perjanjian." : "Start with a flexible rental or choose Rent to Own. Complete the program, then make the EV yours under the agreement."}
      primaryHref="/contact?type=driver"
      primaryLabel={locale === "id" ? "Mulai Sewa Jadi Milik" : "Start Rent to Own"}
      secondaryLabel={locale === "id" ? "Kenali Keluarga AutoRev" : "Meet the AutoRev Community"}
    ><DriverHeroVisual locale={locale}/></PageHero>

    <section className="section driver-program" id="explore">
      <div className="container driver-program__grid">
        <SectionHeading eyebrow={locale === "id" ? "PROGRAM UNTUK DRIVER" : "BUILT FOR DRIVERS"} title={locale === "id" ? "Kerja hari ini. Bangun milik Anda." : "Earn today. Build what becomes yours."}/>
        <div className="driver-benefit-list">{benefits.map((benefit, index) => <Reveal key={benefit.title} className="driver-benefit-row" delay={(index % 4) * .04}><span>0{index + 1}</span><Check size={20}/><div><strong>{benefit.title}</strong><p>{benefit.text}</p></div></Reveal>)}</div>
      </div>
    </section>

    <EVCinematic locale={locale} scene="driver"/>

    <section className="section driver-career">
      <div className="container driver-career__grid">
        <Reveal>
          <span className="eyebrow eyebrow--light">{locale === "id" ? "LEBIH DARI MITRA" : "MORE THAN A PARTNER"}</span>
          <h2>{locale === "id" ? "Bukan sekadar mitra. Anda keluarga AutoRev." : "More than a partner. You belong at AutoRev."}</h2>
          <p>{locale === "id" ? "Ada yang menemani saat mulai, membantu ketika jalan terasa berat, dan merayakan saat EV itu akhirnya menjadi milik Anda." : "A community to welcome you at the start, support you through hard days, and celebrate when the EV finally becomes yours."}</p>
          <ul className="driver-family-points">{familyPoints.map((point) => <li key={point}><Check size={18}/><span>{point}</span></li>)}</ul>
          <ButtonLink href={localizePath(locale, "/contact?type=driver")} variant="light">{locale === "id" ? "Mulai Perjalanan Saya" : "Start My Journey"}</ButtonLink>
        </Reveal>
        <Reveal className="career-path" delay={.08}>{path.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong>{index < path.length - 1 && <ArrowRight size={24}/>}</div>)}</Reveal>
      </div>
      <div className="container"><p className="program-disclaimer">{locale === "id" ? "Kepemilikan berlaku setelah seluruh kewajiban program selesai dan lolos verifikasi sesuai perjanjian. Charging, makan siang, BPJS, perawatan, dan manfaat komunitas mengikuti kelayakan, area, kuota, serta ketentuan program. Pendaftaran tidak menjamin pekerjaan atau pendapatan." : "Ownership applies only after every program obligation is completed and verified under the agreement. Charging, lunch, BPJS, maintenance, and community benefits are subject to eligibility, coverage, capacity, and program terms. Registration does not guarantee work or income."}</p></div>
    </section>

    <FinalCTA locale={locale}/>
  </>;
}
