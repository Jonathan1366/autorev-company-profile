"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import type { ReactElement, ReactNode } from "react";
import {
  AlertCircle,
  ArrowRight,
  CalendarClock,
  Check,
  CheckCircle2,
  LoaderCircle,
  LockKeyhole,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { leadSchema, type LeadInput, type LeadType } from "@/lib/lead-schema";
import { siteConfig } from "@/lib/site";

const labels = {
  id: {
    name: "Nama lengkap",
    email: "Alamat email",
    phone: "Nomor WhatsApp aktif",
    organization: "Nama perusahaan / organisasi",
    workshop: "Nama bengkel",
    city: "Kota / lokasi",
    count: "Jumlah kendaraan",
    date: "Tanggal kebutuhan",
    specialization: "Spesialisasi kendaraan",
    capacity: "Kapasitas saat ini",
    need: "Apa yang paling Anda butuhkan?",
    details: "Ceritakan kebutuhan atau pertanyaan Anda",
    consent: "Saya setuju AutoRev menghubungi saya mengenai permintaan ini dan memproses data sesuai Kebijakan Privasi.",
    error: "Data belum berhasil dikirim. Anda tetap dapat melanjutkan melalui WhatsApp.",
    required: "Wajib",
    optional: "Opsional",
  },
  en: {
    name: "Full name",
    email: "Email address",
    phone: "Active WhatsApp number",
    organization: "Company / organization",
    workshop: "Workshop name",
    city: "City / location",
    count: "Number of vehicles",
    date: "Required date",
    specialization: "Vehicle specialization",
    capacity: "Current capacity",
    need: "What do you need most?",
    details: "Tell us what you need or want to ask",
    consent: "I agree that AutoRev may contact me about this request and process my data according to the Privacy Policy.",
    error: "Your details have not been sent. You can still continue through WhatsApp.",
    required: "Required",
    optional: "Optional",
  },
} as const;

const needs: Record<LeadType, { id: string[]; en: string[] }> = {
  rental: { id: ["EV lepas kunci", "EV dengan driver", "Rental EV bulanan", "Antar / jemput"], en: ["Self drive EV", "EV with driver", "Monthly EV rental", "Delivery / pickup"] },
  business: { id: ["Corporate lepas kunci", "Corporate dengan driver", "Armada untuk owner rental", "Charging dan perawatan"], en: ["Corporate self drive", "Corporate with driver", "Fleet for rental owners", "Charging and maintenance"] },
  system: { id: ["Demo RevAuto", "Kelola armada EV", "Kelola booking dan driver", "Charging dan maintenance", "Invoice dan laporan"], en: ["RevAuto demo", "Manage an EV fleet", "Manage bookings and drivers", "Charging and maintenance", "Invoices and reporting"] },
  partner: { id: ["Bengkel", "Teknisi", "Towing", "Supplier parts", "Replacement rental", "Layanan lainnya"], en: ["Workshop", "Technician", "Towing", "Parts supplier", "Replacement rental", "Other services"] },
  driver: { id: ["Cek kelayakan Founding Driver", "Bandingkan Regular dan Premium", "Persiapan akun / training", "Konsultasi kontrak program"], en: ["Check Founding Driver eligibility", "Compare Regular and Premium", "Account preparation / training", "Discuss the program contract"] },
  strategic: { id: ["Kemitraan otomotif", "Teknologi", "Insurance / broker", "Investor", "Media / lainnya"], en: ["Automotive partnership", "Technology", "Insurance / broker", "Investor", "Media / other"] },
};

const submitCopy: Record<LeadType, { id: string; en: string }> = {
  rental: { id: "Cek Ketersediaan EV", en: "Check EV Availability" },
  driver: { id: "Kirim Cek Kelayakan", en: "Submit Eligibility Check" },
  business: { id: "Minta Konsultasi Armada", en: "Request a Fleet Consultation" },
  system: { id: "Jadwalkan Demo RevAuto", en: "Schedule a RevAuto Demo" },
  partner: { id: "Ajukan Kemitraan", en: "Submit Partnership Interest" },
  strategic: { id: "Mulai Percakapan", en: "Start the Conversation" },
};

type Receipt = {
  leadId: string;
  whatsappStatus: string;
};

export function LeadForm({ type, locale, initialPackage = "", initialExperience = "" }: { type: LeadType; locale: Locale; initialPackage?: string; initialExperience?: string }) {
  const t = labels[locale];
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [fallbackUrl, setFallbackUrl] = useState("");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      type,
      locale,
      name: "",
      email: "",
      phone: "",
      organization: "",
      city: "",
      vehicleCount: "",
      vehicleType: "",
      serviceDate: "",
      specialization: "",
      capacity: "",
      driverPackage: initialPackage === "Founding Regular" || initialPackage === "Founding Premium" ? initialPackage : "",
      driverExperience: initialExperience === "driver-baru" || initialExperience === "driver-berpengalaman" ? initialExperience : "",
      platformAccounts: "",
      licenseStatus: "",
      trainingNeeded: "",
      documentReadiness: "",
      preferredContact: "",
      startDate: "",
      need: "",
      details: "",
      consent: false,
      website: "",
    },
  });

  const validation = (error: unknown, id: string, en: string) => error ? (locale === "id" ? id : en) : undefined;

  async function submit(values: LeadInput) {
    setStatus("idle");
    setFallbackUrl("");
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const result = await response.json().catch(() => null) as { leadId?: string; whatsapp?: { status?: string } } | null;
      if (!response.ok || !result?.leadId) throw new Error("Request failed");
      setReceipt({ leadId: result.leadId, whatsappStatus: result.whatsapp?.status || "Menunggu Konfigurasi" });
      setStatus("success");
    } catch {
      const message = locale === "id"
        ? `Halo AutoRev, saya ingin mendaftar.\nJalur: ${type}\nNama: ${values.name}\nPaket: ${values.driverPackage || "-"}\nPengalaman: ${values.driverExperience || "-"}\nKebutuhan: ${values.need}\nDetail: ${values.details}`
        : `Hi AutoRev, I would like to register.\nPath: ${type}\nName: ${values.name}\nPlan: ${values.driverPackage || "-"}\nExperience: ${values.driverExperience || "-"}\nRequirement: ${values.need}\nDetails: ${values.details}`;
      setFallbackUrl(`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`);
      setStatus("error");
    }
  }

  const organizationLabel = type === "partner" ? t.workshop : t.organization;
  const isDriver = type === "driver";

  if (status === "success" && receipt) {
    const whatsappSent = receipt.whatsappStatus === "Terkirim";
    const whatsappPreview = receipt.whatsappStatus === "preview";
    return (
      <div className="lead-form lead-form--complete" role="status" aria-live="polite">
        <div className="lead-success__mark"><CheckCircle2 size={38}/></div>
        <span className="lead-success__eyebrow">{locale === "id" ? "DATA SUDAH MASUK" : "DETAILS RECEIVED"}</span>
        <h2>{locale === "id" ? "Pendaftaran diterima. Kami akan menghubungi Anda." : "Registration received. We’ll contact you."}</h2>
        <p>{locale === "id" ? "Simpan nomor referensi berikut. Tim AutoRev akan melakukan verifikasi dan menjelaskan langkah berikutnya—tanpa keputusan otomatis dari form ini." : "Keep the reference number below. The AutoRev team will verify your details and explain the next step—this form does not make an automatic decision."}</p>
        <div className="lead-success__reference"><small>{locale === "id" ? "NOMOR REFERENSI" : "REFERENCE NUMBER"}</small><strong>{receipt.leadId}</strong></div>
        <div className="lead-success__timeline">
          <div><ShieldCheck size={21}/><span><strong>{locale === "id" ? "Data tercatat" : "Details recorded"}</strong><small>{locale === "id" ? "Masuk ke tracker tim AutoRev." : "Added to the AutoRev team tracker."}</small></span></div>
          <div><MessageCircle size={21}/><span><strong>{whatsappSent ? (locale === "id" ? "Konfirmasi WhatsApp terkirim" : "WhatsApp confirmation sent") : (locale === "id" ? "Konfirmasi sedang diproses" : "Confirmation is being processed")}</strong><small>{whatsappPreview ? (locale === "id" ? "Mode pratinjau lokal." : "Local preview mode.") : (locale === "id" ? "Jika pesan belum masuk, pendaftaran Anda tetap tercatat." : "If no message arrives, your registration is still recorded.")}</small></span></div>
          <div><CalendarClock size={21}/><span><strong>{locale === "id" ? "Maksimal 7 hari" : "Within 7 days"}</strong><small>{locale === "id" ? "Tim menghubungi Anda untuk verifikasi dan langkah berikutnya." : "Our team will contact you for verification and the next step."}</small></span></div>
          <div><MapPin size={21}/><span><strong>{locale === "id" ? "Pertemuan bila diperlukan" : "Meeting if needed"}</strong><small>{locale === "id" ? "Jadwal dan titik temu selalu dikonfirmasi terlebih dahulu." : "The schedule and meeting point will always be confirmed first."}</small></span></div>
        </div>
        <div className="lead-success__actions">
          <a className="button button--primary" href={`/${locale}`}>{locale === "id" ? "Kembali ke Beranda" : "Back to Home"}<ArrowRight size={17}/></a>
          <a className="button button--secondary" href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(locale === "id" ? `Halo AutoRev, saya ingin menanyakan pendaftaran ${receipt.leadId}.` : `Hi AutoRev, I would like to ask about registration ${receipt.leadId}.`)}`} target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
        <button className="lead-success__again" type="button" onClick={() => { setStatus("idle"); setReceipt(null); reset(); }}>{locale === "id" ? "Kirim permintaan lain" : "Submit another request"}</button>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit(submit)} noValidate>
      <input type="hidden" {...register("type")} value={type} />
      <input type="hidden" {...register("locale")} value={locale} />
      <div className="honeypot" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" {...register("website")} /></label></div>

      <FormSection
        number="01"
        title={locale === "id" ? "Data untuk menghubungi Anda" : "How we can reach you"}
        text={locale === "id" ? "Hanya informasi dasar. Jangan unggah KTP, KK, atau SIM di sini." : "Basic details only. Do not upload identity documents here."}
      >
        <Field label={t.name} marker={t.required} error={validation(errors.name, "Masukkan nama lengkap Anda.", "Enter your full name.")}>
          <input autoComplete="name" placeholder={locale === "id" ? "Contoh: Jonathan Emanuel" : "Example: Jonathan Emanuel"} {...register("name")} />
        </Field>
        {type !== "rental" && !isDriver && <Field label={organizationLabel} marker={t.required} error={validation(errors.organization, `Masukkan ${organizationLabel.toLowerCase()}.`, `Enter ${organizationLabel.toLowerCase()}.`)}><input autoComplete="organization" placeholder={locale === "id" ? "Tulis nama usaha atau organisasi" : "Enter your business or organization"} {...register("organization")} /></Field>}
        <div className="form-grid">
          <Field label={t.phone} marker={t.required} error={validation(errors.phone, "Masukkan nomor WhatsApp aktif, minimal 8 digit.", "Enter an active WhatsApp number of at least 8 digits.")}>
            <input type="tel" inputMode="tel" autoComplete="tel" placeholder="0812 3456 7890" {...register("phone")} />
          </Field>
          <Field label={t.email} marker={t.optional} optional error={validation(errors.email, "Periksa kembali format alamat email.", "Check the email address format.")}>
            <input type="email" inputMode="email" autoComplete="email" placeholder="nama@email.com" {...register("email")} />
          </Field>
        </div>
        {isDriver && <Field label={locale === "id" ? "Domisili / wilayah operasi" : "Home / operating area"} marker={t.optional} optional error={validation(errors.city, "Periksa kembali wilayah operasi Anda.", "Check your operating area.")}><input autoComplete="address-level2" placeholder={locale === "id" ? "Contoh: Jakarta Selatan" : "Example: South Jakarta"} {...register("city")} /></Field>}
      </FormSection>

      <FormSection
        number="02"
        title={isDriver ? (locale === "id" ? "Kesiapan program" : "Program readiness") : (locale === "id" ? "Kebutuhan Anda" : "What you need")}
        text={isDriver
          ? (locale === "id" ? "Jawab sesuai kondisi saat ini. Ini belum menjadi persetujuan atau komitmen program." : "Answer based on your current situation. This is not a program approval or commitment.")
          : (locale === "id" ? "Semakin konkret informasinya, semakin relevan respons pertama kami." : "The more specific the details, the more relevant our first response can be.")}
      >
        {(type === "rental" || type === "partner") && <Field label={t.city} marker={type === "rental" ? t.required : t.optional} optional={type !== "rental"} error={validation(errors.city, "Masukkan kota atau lokasi kebutuhan.", "Enter the city or required location.")}><input autoComplete={type === "partner" ? "street-address" : "address-level2"} placeholder={locale === "id" ? "Contoh: Jakarta Selatan" : "Example: South Jakarta"} {...register("city")} /></Field>}
        {type === "rental" && <Field label={t.date} marker={t.optional} optional error={validation(errors.serviceDate, "Periksa kembali tanggal kebutuhan.", "Check the required date.")}><input type="date" {...register("serviceDate")} /></Field>}
        {(type === "business" || type === "system") && <Field label={t.count} marker={t.optional} optional error={validation(errors.vehicleCount, "Periksa kembali jumlah kendaraan.", "Check the vehicle count.")}><input inputMode="numeric" placeholder={locale === "id" ? "Contoh: 10–25 unit" : "Example: 10–25 vehicles"} {...register("vehicleCount")} /></Field>}
        {type === "partner" && <div className="form-grid"><Field label={t.specialization} marker={t.optional} optional error={validation(errors.specialization, "Periksa kembali spesialisasi Anda.", "Check your specialization.")}><input placeholder="EV, charging, body repair" {...register("specialization")} /></Field><Field label={t.capacity} marker={t.optional} optional error={validation(errors.capacity, "Periksa kembali kapasitas Anda.", "Check your capacity.")}><input placeholder={locale === "id" ? "Contoh: 5 slot / hari" : "Example: 5 slots / day"} {...register("capacity")} /></Field></div>}

        {isDriver && <>
          <div className="form-grid">
            <Field label={locale === "id" ? "Paket yang diminati" : "Plan of interest"} marker={t.required} error={validation(errors.driverPackage, "Pilih paket atau opsi belum menentukan.", "Choose a plan or the not-decided option.")}>
              <select {...register("driverPackage")}>
                <option value="">Pilih paket</option>
                <option value="Founding Regular">Founding Regular · Rp300.000 / hari</option>
                <option value="Founding Premium">Founding Premium · Rp350.000 / hari</option>
                <option value="Belum menentukan">{locale === "id" ? "Belum menentukan" : "Not decided yet"}</option>
              </select>
            </Field>
            <Field label={locale === "id" ? "Pengalaman sebagai driver" : "Driver experience"} marker={t.required} error={validation(errors.driverExperience, "Pilih pengalaman driver Anda.", "Choose your driver experience.")}>
              <select {...register("driverExperience")}>
                <option value="">{locale === "id" ? "Pilih pengalaman" : "Choose experience"}</option>
                <option value="driver-baru">{locale === "id" ? "Pemula / belum punya akun" : "New / no account yet"}</option>
                <option value="driver-berpengalaman">{locale === "id" ? "Berpengalaman / sudah punya akun" : "Experienced / existing account"}</option>
              </select>
            </Field>
          </div>
          <div className="form-grid">
            <Field label={locale === "id" ? "Status SIM A" : "Class A licence status"} marker={t.required} error={validation(errors.licenseStatus, "Konfirmasi status SIM A Anda.", "Confirm your licence status.")}>
              <select {...register("licenseStatus")}>
                <option value="">{locale === "id" ? "Pilih status SIM A" : "Choose licence status"}</option>
                <option value="aktif">{locale === "id" ? "Aktif" : "Valid"}</option>
                <option value="proses">{locale === "id" ? "Sedang diperpanjang / diproses" : "Renewal / in process"}</option>
                <option value="belum-ada">{locale === "id" ? "Belum memiliki" : "Not available"}</option>
              </select>
            </Field>
            <Field label={locale === "id" ? "Kesiapan KTP, KK, dan SIM A" : "ID, Family Card, and licence readiness"} marker={t.required} error={validation(errors.documentReadiness, "Konfirmasi kesiapan dokumen Anda.", "Confirm your document readiness.")}>
              <select {...register("documentReadiness")}>
                <option value="">{locale === "id" ? "Pilih kesiapan dokumen" : "Choose readiness"}</option>
                <option value="lengkap">{locale === "id" ? "Sudah lengkap" : "Ready"}</option>
                <option value="sebagian">{locale === "id" ? "Sebagian masih diproses" : "Some are in process"}</option>
                <option value="belum">{locale === "id" ? "Belum lengkap" : "Not ready yet"}</option>
              </select>
            </Field>
          </div>
          <Field label={locale === "id" ? "Akun platform yang sudah dimiliki" : "Existing platform accounts"} marker={t.optional} optional>
            <input placeholder={locale === "id" ? "Contoh: Grab, GoCar, Maxim" : "Example: Grab, GoCar, Maxim"} {...register("platformAccounts")} />
          </Field>
          <div className="form-grid">
            <Field label={locale === "id" ? "Kebutuhan training" : "Training need"} marker={t.optional} optional>
              <select {...register("trainingNeeded")}>
                <option value="">{locale === "id" ? "Pilih jika sudah tahu" : "Choose if known"}</option>
                <option value="perlu">{locale === "id" ? "Ya, saya perlu training" : "Yes, I need training"}</option>
                <option value="tidak">{locale === "id" ? "Tidak perlu" : "Not needed"}</option>
                <option value="konsultasi">{locale === "id" ? "Ingin konsultasi dulu" : "Discuss first"}</option>
              </select>
            </Field>
            <Field label={locale === "id" ? "Rencana mulai" : "Preferred start"} marker={t.optional} optional>
              <input type="date" {...register("startDate")} />
            </Field>
          </div>
          <div className="driver-form-security"><LockKeyhole size={21}/><span>{locale === "id" ? "Jangan kirim foto identitas, password, atau kode OTP melalui form ini. Dokumen baru diperiksa pada proses resmi berikutnya." : "Do not send identity photos, passwords, or OTP codes through this form. Documents are only checked during the official next step."}</span></div>
        </>}

        <Field label={t.need} marker={t.required} error={validation(errors.need, "Pilih kebutuhan utama Anda.", "Choose your primary requirement.")}>
          <select {...register("need")}><option value="">{locale === "id" ? "Pilih satu kebutuhan" : "Choose one requirement"}</option>{needs[type][locale].map((option) => <option key={option}>{option}</option>)}</select>
        </Field>
        <Field label={t.details} marker={t.required} error={validation(errors.details, "Ceritakan kebutuhan atau pertanyaan Anda, minimal 5 karakter.", "Tell us what you need or want to ask, using at least 5 characters.")}>
          <textarea rows={5} placeholder={locale === "id" ? "Contoh: Saya sudah memiliki akun Grab dan ingin memahami jadwal onboarding serta mekanisme hari libur." : "Example: I already have a Grab account and want to understand onboarding and days off."} {...register("details")} />
        </Field>
        {isDriver && <Field label={locale === "id" ? "Waktu yang nyaman untuk dihubungi" : "Preferred contact time"} marker={t.optional} optional>
          <input placeholder={locale === "id" ? "Contoh: Senin–Jumat, 18.00–20.00 WIB" : "Example: Weekdays, 6–8 PM WIB"} {...register("preferredContact")} />
        </Field>}
      </FormSection>

      <div className="form-confirmation">
        <label className={`consent-field ${errors.consent ? "has-error" : ""}`}><input type="checkbox" {...register("consent")} /><span><i><Check size={14} /></i>{t.consent}</span></label>
        {errors.consent && <small className="consent-error">{locale === "id" ? "Persetujuan diperlukan agar kami dapat menghubungi Anda." : "Consent is required so we can contact you."}</small>}
        {status === "error" && <div className="form-alert form-alert--error" role="alert"><AlertCircle size={20} /><span>{t.error} {fallbackUrl && <a href={fallbackUrl} target="_blank" rel="noreferrer">WhatsApp</a>}</span></div>}
        <div className="form-submit-row">
          <button className="button button--primary form-submit" disabled={isSubmitting} type="submit"><span>{isSubmitting ? (locale === "id" ? "Mengirim…" : "Sending…") : submitCopy[type][locale]}</span>{isSubmitting ? <LoaderCircle className="spin" size={20} /> : <ArrowRight size={20} />}</button>
          <p>{isDriver ? (locale === "id" ? "Tidak ada biaya dan belum ada komitmen pada tahap ini." : "There is no fee or commitment at this stage.") : (locale === "id" ? "Tim AutoRev akan meninjau detail Anda sebelum menghubungi." : "The AutoRev team will review your details before contacting you.")}</p>
        </div>
      </div>
    </form>
  );
}

function FormSection({ number, title, text, children }: { number: string; title: string; text: string; children: ReactNode }) {
  return (
    <fieldset className="form-section">
      <legend><span>{number}</span><div><strong>{title}</strong><small>{text}</small></div></legend>
      <div className="form-section__body">{children}</div>
    </fieldset>
  );
}

function Field({ label, marker, optional = false, error, children }: { label: string; marker: string; optional?: boolean; error?: string; children: ReactElement<{ className?: string }> }) {
  return <label className={`form-field ${error ? "has-error" : ""}`}><span><b>{label}</b><em className={optional ? "is-optional" : ""}>{marker}</em></span>{children}{error && <small>{error}</small>}</label>;
}
