import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/founding-driver", "/autorev-rental", "/autorev-business", "/about", "/equipment", "/revauto", "/partners", "/contact", "/privacy", "/terms"];
  return routes.flatMap((route) => locales.map((locale) => ({
    url: `${siteConfig.url}/${locale}${route}`,
    lastModified: new Date("2026-08-20"),
    changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
    priority: route === "" ? 1 : route === "/privacy" || route === "/terms" ? .3 : .8,
    alternates: { languages: Object.fromEntries(locales.map((alternate) => [alternate, `${siteConfig.url}/${alternate}${route}`])) },
  })));
}
