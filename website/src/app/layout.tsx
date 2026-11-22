import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { siteConfig } from "@/lib/config";
import { translations } from "@/lib/i18n";
import { PublicCatalogProvider } from "@/components/PublicCatalogProvider";

const cairo = localFont({
  src: "../fonts/cairo.ttf",
  variable: "--font-cairo-local",
  weight: "400 800",
  display: "swap",
});

const inter = localFont({
  src: "../fonts/inter.ttf",
  variable: "--font-inter-local",
  weight: "400 800",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0B2144",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  alternates: {
    canonical: "/",
  },
  title: translations.ar.meta.title,
  description: translations.ar.meta.description,
  applicationName: "CashFlow",
  keywords: [
    "CashFlow",
    "كاش فلو",
    "فودافون كاش",
    "أورنج كاش",
    "إي آند كاش",
    "وي باي",
    "إدارة المحافظ الإلكترونية",
    "مكاتب الكاش",
    "حساب العمولات",
    "Egyptian e-wallet ledger",
  ],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    alternateLocale: ["en_US"],
    siteName: "CashFlow",
    title: translations.ar.meta.title,
    description: translations.ar.meta.description,
    url: "/",
    images: [{ url: "/screenshots/dashboard.png", width: 1080, height: 1920, alt: "CashFlow" }],
  },
  twitter: {
    card: "summary_large_image",
    title: translations.ar.meta.title,
    description: translations.ar.meta.description,
    images: ["/screenshots/dashboard.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const initLangScript = `
(function() {
  try {
    var saved = localStorage.getItem('cashflow_site_lang');
    if (saved === 'en') {
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
      document.title = ${JSON.stringify(translations.en.meta.title)};
    } else {
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${cairo.variable} ${inter.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: initLangScript }} />
      </head>
      <body className="min-h-screen bg-cf-bg text-cf-on-surface antialiased selection:bg-cf-primary-container selection:text-cf-on-primary-container">
        <LanguageProvider><PublicCatalogProvider>{children}</PublicCatalogProvider></LanguageProvider>
      </body>
    </html>
  );
}
