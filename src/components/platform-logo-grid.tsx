import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import styles from "./platform-logo-grid.module.css";

const platformLogos = [
  { name: "Grab", src: "/images/platforms/grab.svg" },
  { name: "GoCar by Gojek", src: "/images/platforms/gocar.svg" },
  { name: "Maxim", src: "/images/platforms/maxim.svg" },
  { name: "inDrive", src: "/images/platforms/indrive.svg" },
  { name: "Lalamove", src: "/images/platforms/lalamove.svg" },
  { name: "Shopee", src: "/images/platforms/shopee.svg" },
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
            width={240}
            height={80}
            sizes="(max-width: 520px) 40vw, (max-width: 1050px) 26vw, 180px"
          />
        </li>
      ))}
    </ul>
  );
}
