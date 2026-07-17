import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";

export function BrandLogo({ locale, inverse = false }: { locale: Locale; inverse?: boolean }) {
  return (
    <Link href={`/${locale}`} className={`brand-logo ${inverse ? "brand-logo--inverse" : ""}`} aria-label="AutoRev home">
      <Image className="brand-logo__image" src="/images/autorev-icon-300.png" alt="" width={48} height={48} sizes="48px" priority />
      <span className="brand-logo__word">AutoRev</span>
    </Link>
  );
}
