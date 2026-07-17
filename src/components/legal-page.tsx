import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n";

export type LegalSection = { title: string; paragraphs?: string[]; items?: string[] };

export function LegalPage({ locale, eyebrow, title, intro, updated, sections }: { locale: Locale; eyebrow: string; title: string; intro: string; updated: string; sections: LegalSection[] }) {
  return <>
    <section className="legal-hero"><div className="container"><span className="eyebrow eyebrow--light"><i/>{eyebrow}</span><h1>{title}</h1><p>{intro}</p><small>{locale === "id" ? "Terakhir diperbarui" : "Last updated"}: {updated}</small></div></section>
    <section className="legal-body"><div className="container legal-layout"><aside><span>{locale === "id" ? "DALAM DOKUMEN INI" : "IN THIS DOCUMENT"}</span>{sections.map((section,index)=><a key={section.title} href={`#section-${index+1}`}><b>0{index+1}</b>{section.title}</a>)}<Link href={localizePath(locale,"/contact")}>{locale === "id" ? "Punya pertanyaan? Hubungi kami" : "Questions? Contact us"}</Link></aside><article>{sections.map((section,index)=><section id={`section-${index+1}`} key={section.title}><span>0{index+1}</span><h2>{section.title}</h2>{section.paragraphs?.map((paragraph)=><p key={paragraph}>{paragraph}</p>)}{section.items && <ul>{section.items.map((item)=><li key={item}>{item}</li>)}</ul>}</section>)}</article></div></section>
  </>;
}
