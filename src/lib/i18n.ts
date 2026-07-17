export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "id";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localizePath(locale: Locale, path = "") {
  const cleanPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${cleanPath}`;
}

export function alternateLocale(locale: Locale): Locale {
  return locale === "id" ? "en" : "id";
}
