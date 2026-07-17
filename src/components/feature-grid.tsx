import type { Locale } from "@/lib/i18n";
import { FeatureIcon } from "./icon";
import { Reveal } from "./reveal";

export type Feature = { title: string; text: string; icon?: string; label?: string };

export function FeatureGrid({ features, locale, columns = 3 }: { features: Feature[]; locale: Locale; columns?: 2 | 3 | 4 }) {
  return (
    <div className={`feature-grid feature-grid--${columns}`}>
      {features.map((feature, index) => (
        <Reveal className="feature-card" delay={(index % columns) * .05} key={feature.title}>
          <div className="feature-card__top"><span>0{index + 1}</span><FeatureIcon name={feature.icon || "activity"} size={23} /></div>
          {feature.label && <small>{feature.label}</small>}
          <h3>{feature.title}</h3><p>{feature.text}</p>
          <i>{locale === "id" ? "Dirancang untuk berkembang" : "Designed to evolve"}</i>
        </Reveal>
      ))}
    </div>
  );
}
