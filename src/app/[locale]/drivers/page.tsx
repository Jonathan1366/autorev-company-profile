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
  return isLocale(locale) ? pageMetadata(locale, "drivers", locale === "id" ? "Founding Driver AutoRev, program awal kendaraan listrik untuk driver online." : "AutoRev Founding Driver, an early electric vehicle program for online drivers.") : {};
}

export default async function DriversPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const benefits = locale === "id" ? [
    { title: "Charging gratis", text: "Energi harian ditanggung sesuai ketentuan program. Lebih banyak waktu untuk jalan." },
    { title: "Perawatan lebih simpel", text: "Perawatan EV lebih ringkas, sehingga Anda bisa lebih fokus berkendara." },
    { title: "Mulai tanpa DP", text: "Masuk program tanpa beban uang muka kendaraan." },
    { title: "Daftar tanpa biaya", text: "Kirim minat Anda tanpa biaya pendaftaran." },
    { title: "Bebas pilih aplikasi", text: "Berkendara di platform pilihan Anda sesuai ketentuan program." },
    { title: "Operasional lebih ringan", text: "Biaya energi dan perawatan yang lebih terkendali membuka ruang untuk melaju lebih jauh." },
    { title: "Dukungan AutoRev", text: "Tim operasional siap membantu saat Anda membutuhkan arahan." },
    { title: "Raih lebih banyak", text: "Bangun performa, capai target, dan tumbuh bersama jaringan AutoRev." },
  ] : [
    { title: "Charging included", text: "Eligible charging is covered under the program, so more of your day stays on the road." },
    { title: "Simpler maintenance", text: "A streamlined EV service routine keeps the focus on driving." },
    { title: "Start with no down payment", text: "Join the program without an upfront vehicle payment." },
    { title: "Free registration", text: "Submit your interest with no registration fee." },
    { title: "Choose your platform", text: "Drive on your preferred app, subject to program terms." },
    { title: "Lighter running costs", text: "More predictable energy and maintenance costs give you room to go further." },
    { title: "AutoRev support", text: "Get operational guidance when you need it." },
    { title: "Achieve more", text: "Build your performance, reach new goals, and grow with AutoRev." },
  ];
  const path = locale === "id" ? ["Driver", "Senior Driver", "Fleet Captain"] : ["Driver", "Senior Driver", "Fleet Captain"];

  return <>
    <PageHero
      locale={locale}
      eyebrow={locale === "id" ? "JADI MITRA DRIVER EV" : "BECOME AN EV DRIVER PARTNER"}
      status="FOUNDING DRIVER"
      title={locale === "id" ? "Setir lebih ringan. Raih lebih jauh." : "Drive electric. Achieve more."}
      text={locale === "id" ? "Jadi mitra awal AutoRev dengan EV, charging gratis sesuai program, dan perawatan yang lebih simpel." : "Join AutoRev's founding EV driver program with included charging, simpler maintenance, and more room to grow."}
      primaryHref="/contact?type=driver"
      primaryLabel={locale === "id" ? "Daftar Minat" : "Register Interest"}
      secondaryLabel={locale === "id" ? "Lihat Manfaat" : "View Benefits"}
    ><DriverHeroVisual locale={locale}/></PageHero>

    <section className="section driver-program" id="explore">
      <div className="container driver-program__grid">
        <SectionHeading eyebrow={locale === "id" ? "PROGRAM MITRA" : "PARTNER PROGRAM"} title={locale === "id" ? "Lebih ringan untuk jalan. Lebih besar untuk tumbuh." : "Built to move. Ready to grow."}/>
        <div className="driver-benefit-list">{benefits.map((benefit, index) => <Reveal key={benefit.title} className="driver-benefit-row" delay={(index % 4) * .04}><span>0{index + 1}</span><Check size={20}/><div><strong>{benefit.title}</strong><p>{benefit.text}</p></div></Reveal>)}</div>
      </div>
    </section>

    <EVCinematic locale={locale} scene="driver"/>

    <section className="section driver-career">
      <div className="container driver-career__grid">
        <Reveal>
          <span className="eyebrow eyebrow--light">{locale === "id" ? "BUKAN SEKADAR NARIK" : "MORE THAN DRIVING"}</span>
          <h2>{locale === "id" ? "Ikut membentuk standar sejak awal." : "Help set the standard from day one."}</h2>
          <p>{locale === "id" ? "Founding Driver ikut membentuk standar mitra driver EV AutoRev sejak awal." : "Founding Drivers help shape AutoRev's EV driver partner standard from day one."}</p>
          <ButtonLink href={localizePath(locale, "/contact?type=driver")} variant="light">{locale === "id" ? "Daftar Minat" : "Register Interest"}</ButtonLink>
        </Reveal>
        <Reveal className="career-path" delay={.08}>{path.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong>{index < path.length - 1 && <ArrowRight size={24}/>}</div>)}</Reveal>
      </div>
      <div className="container"><p className="program-disclaimer">{locale === "id" ? "Pendaftaran minat tidak menjamin pekerjaan atau pendapatan. Area, persyaratan, dan jadwal program akan dikonfirmasi tim AutoRev." : "Registration does not guarantee work or income. Coverage, requirements, and program timing will be confirmed by AutoRev."}</p></div>
    </section>

    <FinalCTA locale={locale}/>
  </>;
}
