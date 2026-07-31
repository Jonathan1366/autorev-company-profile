import "../globals.css";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ContactDock } from "@/components/contact-dock";
import { MotionProvider } from "@/components/motion-provider";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} | ${siteConfig.tagline}`, template: `%s | AutoRev` },
  description: siteConfig.description,
  applicationName: siteConfig.shortName,
  category: "technology",
  robots: { index: true, follow: true },
  icons: { icon: "/images/autorev-icon-512.png", apple: "/images/autorev-icon-300.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#020A18", colorScheme: "light dark" };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: `${siteConfig.url}/${locale}`,
    email: siteConfig.email,
    telephone: siteConfig.phoneTel,
    slogan: siteConfig.tagline,
    description: siteConfig.description,
  };
  return (
    <html lang={locale}>
      <body>
        <MotionProvider>
          <a className="skip-link" href="#main-content">Skip to content</a>
          <Navbar locale={locale} />
          <main id="main-content">{children}</main>
          <ContactDock locale={locale} />
          <Footer locale={locale} />
        </MotionProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
