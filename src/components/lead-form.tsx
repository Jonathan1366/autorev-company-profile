"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AlertCircle, ArrowRight, CalendarClock, Check, CheckCircle2, FileText, LoaderCircle, LockKeyhole, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { leadSchema, type LeadInput, type LeadType } from "@/lib/lead-schema";
import { siteConfig } from "@/lib/site";

const labels = {
  id: {
    name: "Nama / PIC", email: "Email", phone: "WhatsApp", organization: "Perusahaan / organisasi", workshop: "Nama bengkel", city: "Kota / lokasi", count: "Jumlah kendaraan", vehicle: "Jenis EV", date: "Tanggal kebutuhan", specialization: "Spesialisasi kendaraan", capacity: "Kapasitas saat ini", need: "Kebutuhan utama", details: "Ceritakan kebutuhan atau pertanyaan Anda", consent: "Saya setuju AutoRev menghubungi saya terkait permintaan ini dan memproses data sesuai Kebijakan Privasi.", submit: "Kirim Pendaftaran", success: "Terima kasih. Pendaftaran Anda sudah kami terima.", error: "Pendaftaran belum terkirim. Silakan lanjut melalui WhatsApp.", required: "Wajib diisi", optional: "Opsional",
  },
  en: {
    name: "Name / contact person", email: "Email", phone: "WhatsApp", organization: "Company / organization", workshop: "Workshop name", city: "City / location", count: "Number of vehicles", vehicle: "EV type", date: "Required date", specialization: "Vehicle specialization", capacity: "Current capacity", need: "Primary requirement", details: "Tell us what you need or want to ask", consent: "I agree that AutoRev may contact me about this request and process my data according to the Privacy Policy.", submit: "Submit Registration", success: "Thank you. We have received your registration.", error: "Registration was not sent. Please continue through WhatsApp.", required: "Required", optional: "Optional",
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
      need: type === "driver" ? needs.driver[locale][0] : "",
      details: "",
      consent: false,
      website: "",
    },
  });

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
  if (status === "success" && receipt) {
    const whatsappSent = receipt.whatsappStatus === "Terkirim";
    const whatsappPreview = receipt.whatsappStatus === "preview";
    return (
      <div className="lead-form lead-form--complete" role="status" aria-live="polite">
        <div className="lead-success__mark"><CheckCircle2 size={38}/></div>
        <span className="lead-success__eyebrow">{locale === "id" ? "PENDAFTARAN DITERIMA" : "REGISTRATION RECEIVED"}</span>
        <h2>{locale === "id" ? "Terima kasih. Kami lanjut dari sini." : "Thank you. We’ll take it from here."}</h2>
        <p>{locale === "id" ? "Data Anda sudah masuk ke antrean AutoRev. Simpan nomor referensi ini untuk percakapan berikutnya." : "Your details are now in the AutoRev queue. Keep this reference number for the next conversation."}</p>
        <div className="lead-success__reference"><small>{locale === "id" ? "NOMOR REFERENSI" : "REFERENCE NUMBER"}</small><strong>{receipt.leadId}</strong></div>
        <div className="lead-success__timeline">
          <div><ShieldCheck size={21}/><span><strong>{locale === "id" ? "Data tercatat" : "Details recorded"}</strong><small>{locale === "id" ? "Masuk ke tracker tim AutoRev." : "Added to the AutoRev team tracker."}</small></span></div>
          <div><MessageCircle size={21}/><span><strong>{whatsappSent ? (locale === "id" ? "Konfirmasi WhatsApp terkirim" : "WhatsApp confirmation sent") : (locale === "id" ? "Konfirmasi sedang diproses" : "Confirmation is being processed")}</strong><small>{whatsappPreview ? (locale === "id" ? "Mode pratinjau lokal." : "Local preview mode.") : (locale === "id" ? "Jika pesan belum masuk, tim tetap dapat melihat pendaftaran Anda." : "If the message has not arrived, your registration is still visible to our team.")}</small></span></div>
          <div><CalendarClock size={21}/><span><strong>{locale === "id" ? "Maksimal 7 hari" : "Within 7 days"}</strong><small>{locale === "id" ? "Tim menghubungi Anda untuk verifikasi dan langkah berikutnya." : "Our team will contact you for verification and the next step."}</small></span></div>
          <div><MapPin size={21}/><span><strong>{locale === "id" ? "Jakarta Pusat, jika diperlukan" : "Central Jakarta, if needed"}</strong><small>{locale === "id" ? "Jadwal dan titik temu selalu dikonfirmasi terlebih dahulu." : "The schedule and meeting point will always be confirmed first."}</small></span></div>
        </div>
        <div className="lead-success__actions">
          <a className="button button--primary" href={`/${locale}`}>{locale === "id" ? "Kembali ke Beranda" : "Back to Home"}<ArrowRight size={17}/></a>
          <a className="button button--secondary" href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(locale === "id" ? `Halo AutoRev, saya ingin menanyakan pendaftaran ${receipt.leadId}.` : `Hi AutoRev, I would like to ask about registration ${receipt.leadId}.`)}`} target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
        <button className="lead-success__again" type="button" onClick={() => { setStatus("idle"); setReceipt(null); reset(); }}>{locale === "id" ? "Kirim pendaftaran lain" : "Submit another registration"}</button>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit(submit)} noValidate>
      <input type="hidden" {...register("type")} value={type} />
      <input type="hidden" {...register("locale")} value={locale} />
      <div className="honeypot" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" {...register("website")} /></label></div>
      <Field label={t.name} error={errors.name?.message}><input autoComplete="name" {...register("name")} /></Field>
      {type !== "rental" && type !== "driver" && <Field label={organizationLabel} error={errors.organization?.message}><input autoComplete="organization" {...register("organization")} /></Field>}
      <div className="form-grid">
        <Field label={`${t.email} · ${t.optional}`} error={errors.email?.message}><input type="email" inputMode="email" autoComplete="email" {...register("email")} /></Field>
        <Field label={t.phone} error={errors.phone?.message}><input type="tel" inputMode="tel" autoComplete="tel" {...register("phone")} /></Field>
      </div>
      {(type === "rental" || type === "partner" || type === "driver") && <Field label={type === "driver" ? (locale === "id" ? "Domisili / wilayah operasi" : "Home / operating area") : t.city} error={errors.city?.message}><input autoComplete={type === "partner" ? "street-address" : "address-level2"} {...register("city")} /></Field>}
      {type === "rental" && <Field label={t.date} error={errors.serviceDate?.message}><input type="date" {...register("serviceDate")} /></Field>}
      {(type === "business" || type === "system") && <Field label={t.count} error={errors.vehicleCount?.message}><input inputMode="numeric" placeholder={locale === "id" ? "Contoh: 10 sampai 25" : "Example: 10 to 25"} {...register("vehicleCount")} /></Field>}
      {type === "partner" && <div className="form-grid"><Field label={t.specialization} error={errors.specialization?.message}><input placeholder={locale === "id" ? "EV, charging, body repair" : "EV, charging, body repair"} {...register("specialization")} /></Field><Field label={t.capacity} error={errors.capacity?.message}><input placeholder={locale === "id" ? "Slot / hari" : "Slots / day"} {...register("capacity")} /></Field></div>}
      {type === "driver" && <>
        <div className="driver-form-heading">
          <span><FileText size={19}/>{locale === "id" ? "Cek kelayakan awal" : "Initial eligibility check"}</span>
          <p>{locale === "id" ? "Belum harus memutuskan. Pilih jawaban yang paling mendekati kondisi Anda." : "You do not need to decide yet. Choose the answer closest to your situation."}</p>
        </div>
        <div className="form-grid">
          <Field label={locale === "id" ? "Paket yang diminati" : "Plan of interest"} error={errors.driverPackage?.message}>
            <select {...register("driverPackage")}>
              <option value="">{locale === "id" ? "Pilih paket" : "Choose a plan"}</option>
              <option value="Founding Regular">Founding Regular · Rp300.000</option>
              <option value="Founding Premium">Founding Premium · Rp350.000</option>
              <option value="Belum menentukan">{locale === "id" ? "Belum menentukan" : "Not decided yet"}</option>
            </select>
          </Field>
          <Field label={locale === "id" ? "Pengalaman driver" : "Driver experience"} error={errors.driverExperience?.message}>
            <select {...register("driverExperience")}>
              <option value="">{locale === "id" ? "Pilih pengalaman" : "Choose experience"}</option>
              <option value="driver-baru">{locale === "id" ? "Pemula / belum punya akun" : "New / no account yet"}</option>
              <option value="driver-berpengalaman">{locale === "id" ? "Berpengalaman / sudah punya akun" : "Experienced / existing account"}</option>
            </select>
          </Field>
        </div>
        <div className="form-grid">
          <Field label={locale === "id" ? "Status SIM A" : "Class A licence status"} error={errors.licenseStatus?.message}>
            <select {...register("licenseStatus")}>
              <option value="">{locale === "id" ? "Pilih status" : "Choose status"}</option>
              <option value="aktif">{locale === "id" ? "Aktif" : "Valid"}</option>
              <option value="proses">{locale === "id" ? "Sedang diperpanjang / diproses" : "Renewal / in process"}</option>
              <option value="belum-ada">{locale === "id" ? "Belum memiliki" : "Not available"}</option>
            </select>
          </Field>
          <Field label={locale === "id" ? "Kesiapan KTP, KK, SIM A" : "ID, Family Card, licence readiness"} error={errors.documentReadiness?.message}>
            <select {...register("documentReadiness")}>
              <option value="">{locale === "id" ? "Pilih kesiapan" : "Choose readiness"}</option>
              <option value="lengkap">{locale === "id" ? "Sudah lengkap" : "Ready"}</option>
              <option value="sebagian">{locale === "id" ? "Sebagian masih diproses" : "Some are in process"}</option>
              <option value="belum">{locale === "id" ? "Belum lengkap" : "Not ready yet"}</option>
            </select>
          </Field>
        </div>
        <Field label={locale === "id" ? `Akun platform yang dimiliki · ${t.optional}` : `Existing platform accounts · ${t.optional}`}>
          <input placeholder={locale === "id" ? "Contoh: Grab, GoCar, Maxim" : "Example: Grab, GoCar, Maxim"} {...register("platformAccounts")} />
        </Field>
        <div className="form-grid">
          <Field label={locale === "id" ? `Kebutuhan training · ${t.optional}` : `Training need · ${t.optional}`}>
            <select {...register("trainingNeeded")}>
              <option value="">{locale === "id" ? "Pilih jika sudah tahu" : "Choose if known"}</option>
              <option value="perlu">{locale === "id" ? "Ya, saya perlu training" : "Yes, I need training"}</option>
              <option value="tidak">{locale === "id" ? "Tidak perlu" : "Not needed"}</option>
              <option value="konsultasi">{locale === "id" ? "Ingin konsultasi dulu" : "Discuss first"}</option>
            </select>
          </Field>
          <Field label={locale === "id" ? `Rencana mulai · ${t.optional}` : `Preferred start · ${t.optional}`}>
            <input type="date" {...register("startDate")} />
          </Field>
        </div>
        <Field label={locale === "id" ? `Waktu nyaman dihubungi · ${t.optional}` : `Preferred contact time · ${t.optional}`}>
          <input placeholder={locale === "id" ? "Contoh: Senin–Jumat, 18.00–20.00 WIB" : "Example: Weekdays, 6–8 PM WIB"} {...register("preferredContact")} />
        </Field>
        <div className="driver-form-security"><LockKeyhole size={19}/><span>{locale === "id" ? "Jangan unggah dokumen identitas di form ini. AutoRev tidak pernah meminta password atau kode OTP akun platform Anda." : "Do not upload identity documents here. AutoRev will never ask for your platform password or OTP code."}</span></div>
      </>}
      <Field label={t.need} error={errors.need?.message}>
        <select defaultValue="" {...register("need")}><option value="" disabled>{locale === "id" ? "Pilih kebutuhan" : "Select a requirement"}</option>{needs[type][locale].map((option) => <option key={option}>{option}</option>)}</select>
      </Field>
      <Field label={t.details} error={errors.details?.message}><textarea rows={5} {...register("details")} /></Field>
      <label className={`consent-field ${errors.consent ? "has-error" : ""}`}><input type="checkbox" {...register("consent")} /><span><i><Check size={12} /></i>{t.consent}</span></label>
      {status === "error" && <div className="form-alert form-alert--error" role="alert"><AlertCircle size={18} /><span>{t.error} {fallbackUrl && <a href={fallbackUrl} target="_blank" rel="noreferrer">WhatsApp</a>}</span></div>}
      <button className="button button--primary form-submit" disabled={isSubmitting} type="submit"><span>{isSubmitting ? (locale === "id" ? "Mengirim…" : "Sending…") : t.submit}</span>{isSubmitting ? <LoaderCircle className="spin" size={18} /> : <ArrowRight size={18} />}</button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactElement<{ className?: string }>; }) {
  return <label className={`form-field ${error ? "has-error" : ""}`}><span>{label}</span>{children}{error && <small>{error}</small>}</label>;
}
