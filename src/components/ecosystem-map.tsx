import type { Locale } from "@/lib/i18n";
import { modules } from "@/lib/content";
import { FeatureIcon } from "./icon";
import Image from "next/image";

export function EcosystemMap({ locale }: { locale: Locale }) {
  return (
    <div className="ecosystem-map" aria-label="AutoRev product ecosystem">
      <div className="ecosystem-map__rings" aria-hidden="true"><i /><i /><i /></div>
      <div className="ecosystem-map__core">
        <Image className="ecosystem-map__logo" src="/images/autorev-icon-300.png" alt="" width={54} height={54} />
        <strong>AutoRev</strong>
        <small>{locale === "id" ? "Mobility OS" : "Mobility OS"}</small>
      </div>
      {modules.map((module, index) => (
        <div className={`ecosystem-node ecosystem-node--${index + 1}`} key={module.name}>
          <span><FeatureIcon name={module.icon} size={18} /></span>
          <div><strong>AutoRev {module.name}</strong><small>{module.desc[locale]}</small></div>
        </div>
      ))}
    </div>
  );
}
