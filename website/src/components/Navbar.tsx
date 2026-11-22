"use client";

import React, { useEffect, useState } from "react";
import { Download, Globe, Menu, X, Clock } from "lucide-react";
import { CashFlowLogoMark } from "@/components/BrandLogo";
import { useLanguage } from "@/components/LanguageProvider";
import { usePathname } from "next/navigation";
import { isApkAvailable } from "@/lib/config";

export function Navbar() {
  const { lang, t, toggleLang } = useLanguage();
  const path = usePathname();
  const anchor = (hash: string) => path === "/" ? hash : `/${hash}`;
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const navItems = [
    { href: anchor("#top"), label: t.nav.home },
    { href: anchor("#features"), label: t.nav.features },
    { href: anchor("#how-it-works"), label: t.nav.howItWorks },
    { href: anchor("#preview"), label: t.nav.preview },
    { href: anchor("#plans"), label: lang === "ar" ? "الباقات" : "Plans" },
    { href: anchor("#faq"), label: t.nav.faq },
  ];

  const handleLinkClick = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cf-border bg-cf-surface/95 backdrop-blur-sm">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-cf-primary focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-white"
      >
        {lang === "ar" ? "تخطي إلى المحتوى الرئيسي" : "Skip to main content"}
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <a
          href={anchor("#top")}
          className="flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cf-primary rounded-lg"
          aria-label={t.brand.logoAlt}
        >
          <CashFlowLogoMark size={38} variant="light" />
          <div className="flex flex-col">
            <span className="font-tabular text-base font-bold leading-tight text-cf-on-surface">
              {t.brand.name}
            </span>
            <span className="text-[11px] font-medium leading-tight text-cf-on-surface-variant">
              {t.brand.subtitle}
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="cf-transition whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold text-cf-on-surface-variant hover:bg-cf-surface-low hover:text-cf-on-surface focus-visible:outline-2 focus-visible:outline-cf-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t.nav.switchLanguageLabel}
            className="cf-transition inline-flex min-h-[40px] whitespace-nowrap items-center gap-1.5 rounded-xl border border-cf-border bg-cf-surface px-3 py-2 text-xs font-semibold text-cf-on-surface hover:bg-cf-surface-low focus-visible:outline-2 focus-visible:outline-cf-primary cursor-pointer"
          >
            <Globe className="h-4 w-4 text-cf-on-surface-variant" aria-hidden="true" />
            <span className={lang === "ar" ? "font-tabular" : ""}>
              {lang === "ar" ? "EN" : "العربية"}
            </span>
          </button>

          <a
            href={anchor("#download")}
            className="cf-transition inline-flex min-h-[40px] whitespace-nowrap items-center gap-2 rounded-xl bg-cf-primary px-4 py-2 text-sm font-semibold text-white hover:bg-cf-primary-pressed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cf-primary"
          >
            {isApkAvailable ? (
              <Download className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Clock className="h-4 w-4" aria-hidden="true" />
            )}
            <span>{isApkAvailable ? t.nav.downloadCta : t.nav.comingSoonCta}</span>
          </a>
        </div>

        {/* Mobile & Tablet Controls */}
        <div className="flex lg:hidden items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t.nav.switchLanguageLabel}
            className="cf-transition inline-flex h-10 whitespace-nowrap items-center gap-1 rounded-xl border border-cf-border bg-cf-surface px-2.5 text-xs font-semibold text-cf-on-surface hover:bg-cf-surface-low cursor-pointer"
          >
            <Globe className="h-4 w-4 text-cf-on-surface-variant" aria-hidden="true" />
            <span className={lang === "ar" ? "font-tabular" : ""}>
              {lang === "ar" ? "EN" : "العربية"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t.nav.closeMenuLabel : t.nav.openMenuLabel}
            className="cf-transition inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cf-border bg-cf-surface text-cf-on-surface hover:bg-cf-surface-low cursor-pointer"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Menu Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-cf-border bg-cf-surface px-4 pb-5 pt-3">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-cf-on-surface hover:bg-cf-surface-low"
              >
                {item.label}
              </a>
            ))}
            <a
              href={anchor("#download")}
              onClick={handleLinkClick}
              className="mt-2 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-cf-primary px-4 py-3 text-sm font-semibold text-white hover:bg-cf-primary-pressed"
            >
              {isApkAvailable ? (
                <Download className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Clock className="h-4 w-4" aria-hidden="true" />
              )}
              <span>{isApkAvailable ? t.nav.downloadCta : t.nav.comingSoonCta}</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
