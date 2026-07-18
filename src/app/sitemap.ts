import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/autorev-rental", "/founding-driver", "/autorev-business", "/partners", "/revauto", "/about", "/contact", "/privacy", "/terms"];
  return routes.flatMap((route) => locales.map((locale) => ({
    url: `${siteConfig.url}/${locale}${route}`,
    lastModified: new Date("2026-07-15"),
    changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
    priority: route === "" ? 1 : route === "/privacy" || route === "/terms" ? .3 : .8,
    alternates: { languages: Object.fromEntries(locales.map((alternate) => [alternate, `${siteConfig.url}/${alternate}${route}`])) },
  })));
}
