import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import styles from "./platform-logo-grid.module.css";

const platformLogos = [
  { name: "Grab", src: "/images/platforms/grab.svg", width: 400, height: 142 },
  { name: "Gojek", src: "/images/platforms/gojek.svg", width: 119, height: 28 },
  { name: "Maxim", src: "/images/platforms/maxim.svg", width: 300, height: 105 },
  { name: "inDrive", src: "/images/platforms/indrive.svg", width: 141, height: 40 },
  { name: "Lalamove", src: "/images/platforms/lalamove.png", width: 1200, height: 371 },
  { name: "Shopee", src: "/images/platforms/shopee.svg", width: 1000, height: 320 },
  { name: "Green SM", src: "/images/platforms/green-sm.svg", width: 110, height: 32 },
] as const;

export function PlatformLogoGrid({ locale }: { locale: Locale }) {
  return (
    <ul
      className={styles.grid}
      aria-label={locale === "id" ? "Daftar platform operasional" : "Operating platform list"}
    >
      {platformLogos.map((platform) => (
        <li key={platform.name} className={styles.tile}>
          <Image
            className={styles.logo}
            src={platform.src}
            alt={`Logo ${platform.name}`}
            width={platform.width}
            height={platform.height}
            sizes="(max-width: 520px) 40vw, (max-width: 1050px) 26vw, 180px"
          />
        </li>
      ))}
    </ul>
  );
}
