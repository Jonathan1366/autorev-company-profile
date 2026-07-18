"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight, Bot, Building2, CarFront, Check, Headphones, MapPin,
  Gauge, PackageSearch, Route, Sparkles, Store, Truck, Wrench,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n";

export function ServiceMarquee({ locale }: { locale: Locale }) {
  const items = locale === "id" ? ["EV Rental", "Bisnis EV", "Founding Driver", "RevAuto", "Charging", "Maintenance"] : ["EV Rental", "EV Business", "Founding Driver", "RevAuto", "Charging", "Maintenance"];
  const repeated = [...items, ...items];
  return <div className="service-marquee" aria-label={items.join(", ")}><motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 28, ease: "linear", repeat: Infinity }}>{repeated.map((item,index)=><span key={`${item}-${index}`}>{item}<i/></span>)}</motion.div></div>;
}

export function ServiceGateway({ locale }: { locale: Locale }) {
  const reduce = useReducedMotion();
  const cards = locale === "id" ? [
    { label: "UNTUK CUSTOMER", title: "EV Rental", text: "Lepas kunci atau dengan driver.", cta: "Pilih Rental", href: "/autorev-rental", icon: CarFront },
    { label: "JADI MITRA", title: "Founding Driver", text: "Program awal mitra driver EV AutoRev.", cta: "Jadi Mitra", href: "/founding-driver", icon: Gauge },
    { label: "UNTUK BISNIS", title: "AutoRev Business", text: "Armada EV untuk corporate dan owner rental.", cta: "Untuk Bisnis", href: "/autorev-business", icon: Building2 },
  ] : [
    { label: "FOR CUSTOMERS", title: "EV Rental", text: "Self drive or with a driver.", cta: "Choose Rental", href: "/autorev-rental", icon: CarFront },
    { label: "BECOME A PARTNER", title: "Founding Driver", text: "AutoRev's early EV driver partner program.", cta: "Become a Partner", href: "/founding-driver", icon: Gauge },
    { label: "FOR BUSINESS", title: "AutoRev Business", text: "EV fleets for companies and rental owners.", cta: "For Business", href: "/autorev-business", icon: Building2 },
  ];
  return <div className="service-gateway">{cards.map((card,index)=>{const Icon=card.icon;return <motion.article key={card.title} initial={reduce?false:{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.25}} transition={{delay:index*.08,duration:.58}}><div className="service-gateway__top"><span>0{index+1}</span><Icon size={36} strokeWidth={1.6}/></div><small>{card.label}</small><h3>{card.title}</h3><p>{card.text}</p><Link href={localizePath(locale,card.href)}>{card.cta}<ArrowRight size={18}/></Link></motion.article>})}</div>;
}

export function EcosystemStory({ locale }: { locale: Locale }) {
  const [active,setActive]=useState(0);
  const reduce=useReducedMotion();
  const steps=locale==="id"?[
    {number:"01",label:"PILIH",title:"Pilih kendaraan.",text:"Untuk personal atau bisnis.",icon:CarFront},
    {number:"02",label:"JALAN",title:"Mulai perjalanan.",text:"Booking dan serah terima lebih ringkas.",icon:Gauge},
    {number:"03",label:"RAWAT",title:"Dapatkan bantuan.",text:"Bengkel, towing, dan parts siap terhubung.",icon:Wrench},
    {number:"04",label:"PANTAU",title:"Lihat hasilnya.",text:"Owner melihat armada dan langkah berikutnya.",icon:Sparkles},
  ]:[
    {number:"01",label:"CHOOSE",title:"Choose a vehicle.",text:"For people or business.",icon:CarFront},
    {number:"02",label:"DRIVE",title:"Start the journey.",text:"Simpler booking and handover.",icon:Gauge},
    {number:"03",label:"CARE",title:"Get support.",text:"Workshops, towing, and parts connect.",icon:Wrench},
    {number:"04",label:"TRACK",title:"See the result.",text:"Owners see the fleet and next steps.",icon:Sparkles},
  ];
  const ActiveIcon=steps[active].icon;
  return <div className="ecosystem-story"><div className="ecosystem-story__visual"><div className="ecosystem-story__road"><i/><i/></div><AnimatePresence mode="wait"><motion.div key={active} className="ecosystem-story__core" initial={reduce?false:{opacity:0,scale:.86,rotate:-5}} animate={{opacity:1,scale:1,rotate:0}} exit={{opacity:0,scale:.9,rotate:4}} transition={{duration:.36}}><span>{steps[active].number}</span><ActiveIcon size={42}/><small>{steps[active].label}</small></motion.div></AnimatePresence><div className="ecosystem-story__nodes"><span><Store/>Workshop</span><span><Truck/>Towing</span><span><Bot/>RevAuto</span><span><PackageSearch/>Parts</span></div><p>Keep Every Vehicle Moving.</p></div><div className="ecosystem-story__steps">{steps.map((step,index)=><motion.article key={step.number} className={active===index?"is-active":""} onViewportEnter={()=>setActive(index)} viewport={{amount:.65}}><span>{step.number} / {step.label}</span><h3>{step.title}</h3><p>{step.text}</p></motion.article>)}</div></div>;
}

const networkOptions = {
  workshop: { icon: Store, id: ["Bengkel", "Servis & perbaikan"], en: ["Workshop", "Service & repair"] },
  towing: { icon: Truck, id: ["Towing", "Pickup & roadside"], en: ["Towing", "Pickup & roadside"] },
  parts: { icon: PackageSearch, id: ["Parts", "Supplier & delivery"], en: ["Parts", "Supplier & delivery"] },
} as const;

export function WorkshopNetwork({ locale }: { locale: Locale }) {
  const [active,setActive]=useState<keyof typeof networkOptions>("workshop");
  const option=networkOptions[active]; const Icon=option.icon;
  return <div className="network-preview"><div className="network-preview__copy"><span>{locale==="id"?"JARINGAN LAYANAN":"SERVICE NETWORK"}</span><h2>{locale==="id"?"Bantuan, tanpa banyak telepon.":"Help, without endless calls."}</h2><p>{locale==="id"?"Bengkel, towing, teknisi, dan parts dalam satu jaringan.":"Workshops, towing, technicians, and parts in one network."}</p><div>{Object.entries(networkOptions).map(([key,value])=>{const OptionIcon=value.icon;return <button key={key} className={active===key?"is-active":""} onClick={()=>setActive(key as keyof typeof networkOptions)}><OptionIcon size={17}/>{value[locale][0]}</button>})}</div><Link href={localizePath(locale,"/partners")}>{locale==="id"?"Lihat jaringan":"Explore network"}<ArrowRight size={17}/></Link></div><div className="network-preview__map"><div className="network-preview__roads"><i/><i/><i/></div>{[1,2,3,4,5].map((pin,index)=><motion.span key={`${active}-${pin}`} className={`network-dot network-dot--${pin}`} initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} transition={{delay:index*.07}}><Icon size={13}/></motion.span>)}<AnimatePresence mode="wait"><motion.div className="network-preview__card" key={active} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}><span><Icon size={19}/></span><div><small>{locale==="id"?"PREVIEW · SEGERA":"PREVIEW · COMING SOON"}</small><strong>{option[locale][0]}</strong><p>{option[locale][1]}</p></div><Check size={16}/></motion.div></AnimatePresence><div className="network-preview__location"><MapPin size={15}/><span>Jabodetabek</span></div></div></div>;
}

export function OnsitePanel({ locale }: { locale: Locale }) {
  const points=locale==="id"?["Serah terima","Inspeksi","Bantuan langsung","Antar jemput"]:["Handover","Inspection","Direct support","Delivery & pickup"];
  return <div className="onsite-panel"><div className="onsite-panel__visual"><Image src="/images/autorev-fleet-care.png" alt={locale==="id"?"Teknisi memeriksa kendaraan AutoRev":"Technician inspecting an AutoRev vehicle"} fill sizes="(max-width: 900px) 100vw, 45vw" quality={90}/><div className="onsite-panel__visual-shade"/><div className="onsite-panel__signal"><i/><i/><i/></div><Route size={58}/><span>{locale==="id"?"LAYANAN LANGSUNG":"HANDS ON SUPPORT"}</span></div><div className="onsite-panel__copy"><span className="eyebrow"><i/>{locale==="id"?"Tim saat perlu":"People when needed"}</span><h2>{locale==="id"?"Digital saat mudah. Tim saat perlu.":"Digital when simple. Human when needed."}</h2><p>{locale==="id"?"Delivery, pickup, inspeksi, dan bantuan tetap nyata.":"Real delivery, pickup, inspection, and support."}</p><div>{points.map(point=><span key={point}><Headphones size={15}/>{point}</span>)}</div></div></div>;
}
