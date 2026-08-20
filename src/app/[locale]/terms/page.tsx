import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { locale } = await params; return isLocale(locale) ? pageMetadata(locale, "terms") : {}; }

export default async function TermsPage({ params }: Props) {
  const { locale: raw } = await params; if (!isLocale(raw)) notFound(); const locale = raw as Locale;
  const sections: LegalSection[] = locale === "id" ? [
    { title: "Penerimaan ketentuan", paragraphs: ["Dengan menggunakan website ini, Anda menyetujui ketentuan berikut. Jika tidak menyetujui, mohon tidak menggunakan fitur formulir. AutoRev Mobilitas Indonesia saat ini merupakan nama publik venture pre-launch; status badan hukum PT belum ditampilkan sebelum dikonfirmasi resmi."] },
    { title: "Status informasi dan produk", paragraphs: ["Website ini menjelaskan visi, roadmap, preview produk, dan program awal AutoRev. Istilah seperti ‘dalam pengembangan’, ‘coming soon’, ‘pilot’, atau ‘founding partner’ berarti fungsi, layanan, coverage, pricing, atau ketersediaan belum tentu aktif."], items: ["Preview dashboard memakai data ilustratif.", "Tidak ada jaminan ketersediaan kendaraan, partner, area layanan, atau waktu respons.", "Roadmap adalah arah pengembangan, bukan janji pengiriman pada tanggal tertentu."] },
    { title: "RevAuto dan informasi teknis", paragraphs: ["Informasi otomatis dalam RevAuto merupakan ringkasan awal dan harus diverifikasi oleh pihak yang berwenang. Konten website bukan diagnosis mekanis, persetujuan klaim, nasihat hukum, atau penawaran harga final."] },
    { title: "Formulir dan komunikasi", paragraphs: ["Mengirim formulir menyatakan minat dan mengizinkan AutoRev menanggapi permintaan Anda. Pengiriman tidak otomatis membentuk kontrak, booking, partnership, investasi, jaminan layanan, atau kewajiban eksklusif."] },
    { title: "Penggunaan yang diperbolehkan", items: ["Berikan informasi yang akurat dan tidak melanggar hak pihak lain.", "Jangan mengganggu keamanan, mencoba akses tanpa izin, atau mengirim spam.", "Jangan menyalin identitas, konten, atau aset AutoRev untuk menyesatkan pihak lain.", "Jangan menggunakan website untuk aktivitas yang melanggar hukum."] },
    { title: "Kekayaan intelektual", paragraphs: ["Nama AutoRev, logo yang diberikan founder, desain, copy, dan komponen produk merupakan aset pemiliknya masing-masing. Referensi pihak ketiga disebut hanya untuk konteks dan tidak menyiratkan afiliasi atau endorsement."] },
    { title: "Tautan dan layanan pihak ketiga", paragraphs: ["Website dapat terhubung ke email, WhatsApp, analytics, hosting, atau endpoint lead pihak ketiga setelah dikonfigurasi. Ketentuan dan kebijakan penyedia tersebut dapat berlaku secara terpisah."] },
    { title: "Batasan dan perubahan", paragraphs: ["Sejauh diperbolehkan hukum, website disediakan sebagaimana adanya pada tahap pre-launch. AutoRev dapat memperbarui, menunda, atau mengubah konten dan fungsi untuk menjaga akurasi, keamanan, atau arah produk. Hak konsumen yang tidak dapat dikesampingkan tetap berlaku."] },
    { title: "Kontak", paragraphs: ["Pertanyaan tentang ketentuan ini dapat dikirim ke jonathan@autorevmobilitas.com atau melalui 0813 6740 8145. Detail badan hukum, alamat resmi, dan yurisdiksi spesifik akan diperbarui setelah dikonfirmasi."] },
  ] : [
    { title: "Acceptance", paragraphs: ["By using this website, you agree to these terms. If you do not agree, please do not use the form features. AutoRev Mobilitas Indonesia is currently the public name of a pre-launch venture; PT legal entity status is not shown until officially confirmed."] },
    { title: "Information and product status", paragraphs: ["This website explains AutoRev’s vision, roadmap, product previews, and early programs. Terms such as ‘in development’, ‘coming soon’, ‘pilot’, or ‘founding partner’ mean that features, services, coverage, pricing, or availability may not yet be active."], items: ["Dashboard previews use illustrative data.", "There is no guarantee of vehicle, partner, coverage, or response-time availability.", "The roadmap is a direction, not a promise of delivery by a specific date."] },
    { title: "RevAuto and technical information", paragraphs: ["Automated information in RevAuto is preliminary and must be verified by an authorized party. Website content is not a mechanical diagnosis, claim approval, legal advice, or final quotation."] },
    { title: "Forms and communication", paragraphs: ["Submitting a form expresses interest and allows AutoRev to respond. Submission does not automatically create a contract, booking, partnership, investment, service guarantee, or exclusivity obligation."] },
    { title: "Acceptable use", items: ["Provide accurate information that does not violate others’ rights.", "Do not disrupt security, attempt unauthorized access, or send spam.", "Do not copy AutoRev identity, content, or assets to mislead others.", "Do not use the website for unlawful activity."] },
    { title: "Intellectual property", paragraphs: ["The AutoRev name, founder-provided logos, design, copy, and product components belong to their respective owners. Third-party references are for context only and do not imply affiliation or endorsement."] },
    { title: "Third-party links and services", paragraphs: ["The website may connect to email, WhatsApp, analytics, hosting, or third-party lead endpoints when configured. Those providers’ terms and policies may apply separately."] },
    { title: "Limitations and changes", paragraphs: ["To the extent permitted by law, the website is provided as-is during pre-launch. AutoRev may update, delay, or change content and features for accuracy, security, or product direction. Non-waivable consumer rights remain unaffected."] },
    { title: "Contact", paragraphs: ["Questions about these terms can be sent to jonathan@autorevmobilitas.com or +62 813 6740 8145. Legal entity details, official address, and specific jurisdiction will be updated once confirmed."] },
  ];
  return <LegalPage locale={locale} eyebrow="Legal · Terms" title={locale === "id" ? "Ketentuan Penggunaan" : "Terms of Use"} intro={locale === "id" ? "Ketentuan yang menjaga ekspektasi tetap jelas selama AutoRev berada dalam tahap pengembangan awal." : "Terms that keep expectations clear while AutoRev is in its early development stage."} updated={locale === "id" ? "15 Juli 2026" : "15 July 2026"} sections={sections}/>;
}
