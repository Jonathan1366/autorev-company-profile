"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AlertCircle, ArrowRight, Check, LoaderCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { leadSchema, type LeadInput, type LeadType } from "@/lib/lead-schema";
import { siteConfig } from "@/lib/site";

const labels = {
  id: {
    name: "Nama / PIC", email: "Email", phone: "WhatsApp", organization: "Perusahaan / organisasi", workshop: "Nama bengkel", city: "Kota / lokasi", count: "Jumlah kendaraan", vehicle: "Jenis EV", date: "Tanggal kebutuhan", specialization: "Spesialisasi kendaraan", capacity: "Kapasitas saat ini", need: "Kebutuhan utama", details: "Ceritakan kebutuhan Anda", consent: "Saya setuju AutoRev menghubungi saya terkait permintaan ini dan memproses data sesuai Kebijakan Privasi.", submit: "Kirim Pendaftaran", success: "Terima kasih. Pendaftaran Anda sudah kami terima.", error: "Pendaftaran belum terkirim. Silakan lanjut melalui WhatsApp.", required: "Wajib diisi", optional: "Opsional",
  },
  en: {
    name: "Name / contact person", email: "Email", phone: "WhatsApp", organization: "Company / organization", workshop: "Workshop name", city: "City / location", count: "Number of vehicles", vehicle: "EV type", date: "Required date", specialization: "Vehicle specialization", capacity: "Current capacity", need: "Primary requirement", details: "Tell us what you need", consent: "I agree that AutoRev may contact me about this request and process my data according to the Privacy Policy.", submit: "Submit Registration", success: "Thank you. We have received your registration.", error: "Registration was not sent. Please continue through WhatsApp.", required: "Required", optional: "Optional",
  },
} as const;

const needs: Record<LeadType, { id: string[]; en: string[] }> = {
  rental: { id: ["EV lepas kunci", "EV dengan driver", "Rental EV bulanan", "Antar / jemput"], en: ["Self drive EV", "EV with driver", "Monthly EV rental", "Delivery / pickup"] },
  business: { id: ["Corporate lepas kunci", "Corporate dengan driver", "Armada untuk owner rental", "Charging dan perawatan"], en: ["Corporate self drive", "Corporate with driver", "Fleet for rental owners", "Charging and maintenance"] },
  system: { id: ["Demo RevAuto", "Kelola armada EV", "Kelola booking dan driver", "Charging dan maintenance", "Invoice dan laporan"], en: ["RevAuto demo", "Manage an EV fleet", "Manage bookings and drivers", "Charging and maintenance", "Invoices and reporting"] },
  partner: { id: ["Bengkel", "Teknisi", "Towing", "Supplier parts", "Replacement rental", "Layanan lainnya"], en: ["Workshop", "Technician", "Towing", "Parts supplier", "Replacement rental", "Other services"] },
  driver: { id: ["Daftar Founding Driver", "Program kendaraan EV", "Informasi onboarding", "Peluang Fleet Captain"], en: ["Join Founding Driver", "EV vehicle program", "Onboarding information", "Fleet Captain path"] },
  strategic: { id: ["Kemitraan otomotif", "Teknologi", "Insurance / broker", "Investor", "Media / lainnya"], en: ["Automotive partnership", "Technology", "Insurance / broker", "Investor", "Media / other"] },
};

export function LeadForm({ type, locale }: { type: LeadType; locale: Locale }) {
  const t = labels[locale];
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [fallbackUrl, setFallbackUrl] = useState("");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: { type, name: "", email: "", phone: "", organization: "", city: "", vehicleCount: "", vehicleType: "", serviceDate: "", specialization: "", capacity: "", need: "", details: "", consent: false, website: "" },
  });

  async function submit(values: LeadInput) {
    setStatus("idle");
    setFallbackUrl("");
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      reset({ ...values, name: "", email: "", phone: "", organization: "", city: "", vehicleCount: "", vehicleType: "", serviceDate: "", specialization: "", capacity: "", need: "", details: "", consent: false, website: "" });
    } catch {
      const message = locale === "id"
        ? `Halo AutoRev, saya ingin mendaftar.\nJalur: ${type}\nNama: ${values.name}\nKebutuhan: ${values.need}\nDetail: ${values.details}`
        : `Hi AutoRev, I would like to register.\nPath: ${type}\nName: ${values.name}\nRequirement: ${values.need}\nDetails: ${values.details}`;
      setFallbackUrl(`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`);
      setStatus("error");
    }
  }

  const organizationLabel = type === "partner" ? t.workshop : t.organization;
  return (
    <form className="lead-form" onSubmit={handleSubmit(submit)} noValidate>
      <input type="hidden" {...register("type")} value={type} />
      <div className="honeypot" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" {...register("website")} /></label></div>
      <Field label={t.name} error={errors.name?.message}><input autoComplete="name" {...register("name")} /></Field>
      {type !== "rental" && type !== "driver" && <Field label={organizationLabel} error={errors.organization?.message}><input autoComplete="organization" {...register("organization")} /></Field>}
      <div className="form-grid">
        <Field label={`${t.email} · ${t.optional}`} error={errors.email?.message}><input type="email" inputMode="email" autoComplete="email" {...register("email")} /></Field>
        <Field label={t.phone} error={errors.phone?.message}><input type="tel" inputMode="tel" autoComplete="tel" {...register("phone")} /></Field>
      </div>
      {(type === "rental" || type === "partner" || type === "driver") && <Field label={t.city} error={errors.city?.message}><input autoComplete={type === "partner" ? "street-address" : "address-level2"} {...register("city")} /></Field>}
      {type === "rental" && <Field label={t.date} error={errors.serviceDate?.message}><input type="date" {...register("serviceDate")} /></Field>}
      {(type === "business" || type === "system") && <Field label={t.count} error={errors.vehicleCount?.message}><input inputMode="numeric" placeholder={locale === "id" ? "Contoh: 10 sampai 25" : "Example: 10 to 25"} {...register("vehicleCount")} /></Field>}
      {type === "partner" && <div className="form-grid"><Field label={t.specialization} error={errors.specialization?.message}><input placeholder={locale === "id" ? "EV, charging, body repair" : "EV, charging, body repair"} {...register("specialization")} /></Field><Field label={t.capacity} error={errors.capacity?.message}><input placeholder={locale === "id" ? "Slot / hari" : "Slots / day"} {...register("capacity")} /></Field></div>}
      <Field label={t.need} error={errors.need?.message}>
        <select defaultValue="" {...register("need")}><option value="" disabled>{locale === "id" ? "Pilih kebutuhan" : "Select a requirement"}</option>{needs[type][locale].map((option) => <option key={option}>{option}</option>)}</select>
      </Field>
      <Field label={t.details} error={errors.details?.message}><textarea rows={5} {...register("details")} /></Field>
      <label className={`consent-field ${errors.consent ? "has-error" : ""}`}><input type="checkbox" {...register("consent")} /><span><i><Check size={12} /></i>{t.consent}</span></label>
      {status === "success" && <div className="form-alert form-alert--success" role="status"><Check size={18} />{t.success}</div>}
      {status === "error" && <div className="form-alert form-alert--error" role="alert"><AlertCircle size={18} /><span>{t.error} {fallbackUrl && <a href={fallbackUrl} target="_blank" rel="noreferrer">WhatsApp</a>}</span></div>}
      <button className="button button--primary form-submit" disabled={isSubmitting} type="submit"><span>{isSubmitting ? (locale === "id" ? "Mengirim…" : "Sending…") : t.submit}</span>{isSubmitting ? <LoaderCircle className="spin" size={18} /> : <ArrowRight size={18} />}</button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactElement<{ className?: string }>; }) {
  return <label className={`form-field ${error ? "has-error" : ""}`}><span>{label}</span>{children}{error && <small>{error}</small>}</label>;
}
