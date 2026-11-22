"use client";

import React from "react";
import {
  ArrowDown,
  Clock,
  Download,
  ShieldCheck,
  Smartphone,
  WifiOff,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { WalletProviderStrip } from "@/components/BrandLogo";
import { PhoneFrame } from "@/components/PhoneFrame";
import { isApkAvailable, siteConfig } from "@/lib/config";

export function HeroSection() {
  const { lang, t } = useLanguage();

  return (
    <section
      id="top"
      className="relative border-b border-cf-border bg-cf-surface"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Copy Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-cf-border bg-cf-primary-container px-3.5 py-1.5 text-xs font-semibold text-cf-on-primary-container">
              <span
                className="h-2 w-2 rounded-full bg-cf-primary"
                aria-hidden="true"
              />
              <span>{t.hero.badge}</span>
            </div>

            <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-cf-on-surface sm:text-4xl lg:text-[2.75rem] lg:leading-[1.2]">
              {t.hero.headline}
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-cf-on-surface-variant sm:text-lg">
              {t.hero.subheadline}
            </p>

            {/* Primary & Secondary CTAs (solid CashFlow sapphire, no gradients) */}
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              {isApkAvailable && siteConfig.apk.downloadUrl ? (
                <a
                  href={siteConfig.apk.downloadUrl}
                  download
                  className="cf-transition inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-xl bg-cf-primary px-6 py-3 text-sm font-semibold text-white hover:bg-cf-primary-pressed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cf-primary"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span>{t.hero.primaryCtaAvailable}</span>
                </a>
              ) : (
                <a
                  href="#download"
                  className="cf-transition inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-xl bg-cf-primary px-6 py-3 text-sm font-semibold text-white hover:bg-cf-primary-pressed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cf-primary"
                >
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <span>{t.hero.primaryCtaComingSoon}</span>
                </a>
              )}

              <a
                href="#features"
                className="cf-transition inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-cf-border bg-cf-surface px-6 py-3 text-sm font-semibold text-cf-on-surface hover:bg-cf-surface-low focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cf-primary"
              >
                <span>{t.hero.secondaryCta}</span>
                <ArrowDown className="h-4 w-4 text-cf-on-surface-variant" aria-hidden="true" />
              </a>
            </div>

            {/* Verified 14-day Free Trial Notice */}
            <p className="mt-4 max-w-xl text-xs font-medium leading-relaxed text-cf-on-surface-variant sm:text-sm">
              {t.download.trialNotice}
            </p>

            {/* Verified Trust Strip */}
            <div className="mt-8 grid w-full max-w-xl gap-3 sm:grid-cols-3">
              <div className="cf-tonal-panel flex items-center gap-2.5 px-3.5 py-2.5">
                <WifiOff className="h-4 w-4 shrink-0 text-cf-primary" aria-hidden="true" />
                <span className="text-xs font-medium text-cf-on-surface-variant leading-snug">
                  {t.hero.trustPoints.offline}
                </span>
              </div>
              <div className="cf-tonal-panel flex items-center gap-2.5 px-3.5 py-2.5">
                <Smartphone className="h-4 w-4 shrink-0 text-cf-primary" aria-hidden="true" />
                <span className="text-xs font-medium text-cf-on-surface-variant leading-snug">
                  {t.hero.trustPoints.android}
                </span>
              </div>
              <div className="cf-tonal-panel flex items-center gap-2.5 px-3.5 py-2.5">
                <ShieldCheck className="h-4 w-4 shrink-0 text-cf-profit" aria-hidden="true" />
                <span className="text-xs font-medium text-cf-on-surface-variant leading-snug">
                  {t.hero.trustPoints.localData}
                </span>
              </div>
            </div>

            {/* Supported Egyptian E-Wallet Providers */}
            <div className="mt-7 w-full border-t border-cf-separator pt-6">
              <p className="mb-3 text-xs font-semibold text-cf-text-muted">
                {t.hero.supportedProvidersLabel}
              </p>
              <WalletProviderStrip lang={lang} />
            </div>
          </div>

          {/* Authentic App Preview Column (Deep Midnight Sapphire Showcase Panel) */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-cf-hero-border bg-cf-hero-bg p-6 sm:p-8">
              <PhoneFrame
                src="/screenshots/dashboard.png"
                alt={t.hero.screenCaption}
                priority
              />
              <p className="mt-5 text-center text-xs font-medium text-[#CBD5E1]">
                {t.hero.screenCaption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
