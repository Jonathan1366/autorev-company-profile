"use client";

import { usePathname } from "next/navigation";

export default function Loading() {
  const isEnglish = usePathname().startsWith("/en");
  const label = isEnglish ? "Preparing the AutoRev page" : "Menyiapkan halaman AutoRev";

  return (
    <div className="route-loading" role="status" aria-live="polite" aria-label={label}>
      <div className="route-loading__mark" aria-hidden="true">
        <span>AR</span>
        <i />
      </div>
      <strong>AutoRev</strong>
      <p>{isEnglish ? "Preparing your journey." : "Menyiapkan perjalanan Anda."}</p>
      <div className="route-loading__road" aria-hidden="true"><i /></div>
    </div>
  );
}
