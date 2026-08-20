import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { locale } = await params; return isLocale(locale) ? pageMetadata(locale, "privacy") : {}; }

export default async function PrivacyPage({ params }: Props) {
  const { locale: raw } = await params; if (!isLocale(raw)) notFound(); const locale = raw as Locale;
  const sections: LegalSection[] = locale === "id" ? [
    { title: "Ruang lingkup", paragraphs: ["Kebijakan ini menjelaskan bagaimana AutoRev Mobilitas Indonesia mengumpulkan, menggunakan, melindungi, dan mengelola informasi ketika Anda mengunjungi website atau mengirim formulir minat. AutoRev saat ini berada pada tahap pre-launch."] },
    { title: "Data yang kami kumpulkan", paragraphs: ["Kami hanya meminta informasi yang relevan dengan jenis permintaan Anda."], items: ["Identitas dan kontak, seperti nama, email, dan WhatsApp.", "Informasi organisasi, armada, workshop, lokasi, spesialisasi, atau kebutuhan rental.", "Isi pesan, tantangan operasional, dan minat kemitraan.", "Data teknis terbatas seperti alamat IP untuk pencegahan spam dan keamanan."] },
    { title: "Tujuan penggunaan", items: ["Menanggapi permintaan rental, pilot, partnership, atau early access.", "Memahami kebutuhan dan mempersiapkan percakapan lanjutan.", "Meningkatkan keamanan, pengalaman, dan performa website.", "Memenuhi kewajiban hukum apabila diwajibkan."] },
    { title: "Dasar dan persetujuan", paragraphs: ["Kami memproses data berdasarkan persetujuan yang Anda berikan melalui formulir, kebutuhan untuk menanggapi permintaan Anda, kepentingan yang sah dalam mengamankan website, atau kewajiban hukum yang berlaku."] },
    { title: "Penyimpanan dan pembagian", paragraphs: ["Data formulir hanya dikirim ke endpoint penyimpanan atau workflow yang dikonfigurasi secara aman oleh AutoRev. Kami tidak menjual data pribadi. Data dapat diproses oleh penyedia infrastruktur terbatas yang diperlukan untuk hosting, email, keamanan, atau pengelolaan lead, dengan perlindungan yang sesuai."], items: ["Data disimpan hanya selama relevan untuk tujuan pengumpulan atau kewajiban hukum.", "Akses dibatasi kepada pihak yang membutuhkannya untuk menindaklanjuti permintaan.", "Tidak ada alamat, nomor telepon, atau partner pihak ketiga yang dicantumkan sebelum dikonfirmasi."] },
    { title: "Hak Anda", paragraphs: ["Sesuai ketentuan yang berlaku, Anda dapat meminta akses, koreksi, penghapusan, pembatasan, atau penarikan persetujuan atas data pribadi Anda. Beberapa permintaan mungkin memerlukan verifikasi identitas."] },
    { title: "Keamanan dan perubahan", paragraphs: ["Kami menggunakan langkah teknis dan organisasi yang wajar, namun tidak ada transmisi internet yang sepenuhnya bebas risiko. Kebijakan ini dapat diperbarui seiring produk, penyedia layanan, dan kewajiban AutoRev berkembang. Tanggal pembaruan akan dicantumkan di atas."] },
    { title: "Kontak privasi", paragraphs: ["Untuk pertanyaan atau permintaan privasi, hubungi jonathan@autorevmobilitas.com dengan subjek ‘Privacy Request’. Identitas badan hukum akan diperbarui setelah dikonfirmasi secara resmi."] },
  ] : [
    { title: "Scope", paragraphs: ["This policy explains how AutoRev Mobilitas Indonesia collects, uses, protects, and manages information when you visit the website or submit an interest form. AutoRev is currently pre-launch."] },
    { title: "Data we collect", paragraphs: ["We only request information relevant to your inquiry type."], items: ["Identity and contact information such as name, email, and WhatsApp.", "Organization, fleet, workshop, location, specialization, or rental requirement information.", "Message content, operating challenges, and partnership interest.", "Limited technical data such as IP address for spam prevention and security."] },
    { title: "How we use data", items: ["Respond to rental, pilot, partnership, or early access requests.", "Understand requirements and prepare relevant follow-up.", "Improve website security, experience, and performance.", "Meet legal obligations where required."] },
    { title: "Basis and consent", paragraphs: ["We process data based on the consent you provide through the form, the need to respond to your request, legitimate interests in securing the website, or applicable legal requirements."] },
    { title: "Storage and sharing", paragraphs: ["Form data is sent only to a securely configured storage endpoint or workflow. We do not sell personal data. Data may be processed by limited infrastructure providers needed for hosting, email, security, or lead management, subject to appropriate protections."], items: ["Data is retained only while relevant to its purpose or legal obligations.", "Access is limited to parties who need it to follow up on requests.", "No unconfirmed address, phone number, or third-party partner is published."] },
    { title: "Your rights", paragraphs: ["Subject to applicable rules, you may request access, correction, deletion, restriction, or withdrawal of consent for your personal data. Some requests may require identity verification."] },
    { title: "Security and updates", paragraphs: ["We use reasonable technical and organizational measures, but no internet transmission is completely risk-free. This policy may evolve with AutoRev’s product, providers, and obligations. The update date will appear above."] },
    { title: "Privacy contact", paragraphs: ["For privacy questions or requests, email jonathan@autorevmobilitas.com with the subject ‘Privacy Request’. Legal entity details will be updated once officially confirmed."] },
  ];
  return <LegalPage locale={locale} eyebrow="Legal · Privacy" title={locale === "id" ? "Kebijakan Privasi" : "Privacy Policy"} intro={locale === "id" ? "Transparansi tentang data yang kami minta, mengapa kami membutuhkannya, dan bagaimana Anda tetap memegang kendali." : "Transparency about what data we request, why we need it, and how you remain in control."} updated={locale === "id" ? "15 Juli 2026" : "15 July 2026"} sections={sections}/>;
}
