"use client";

import React, { useState } from "react";
import { CheckCircle2, ChevronDown, Clock, Download, Info, ShieldCheck, Wrench } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { isApkAvailable, siteConfig } from "@/lib/config";

function formatReleaseDate(iso: string | null, lang: "ar" | "en"): string | null {
  if (!iso) return null;
  const ms = Date.parse(iso);
  if (!Number.isFinite(ms)) return null;
  return new Intl.DateTimeFormat(lang === "ar" ? "ar-EG-u-nu-latn" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(ms));
}

export function DownloadSection() {
  const { lang, t } = useLanguage();
  const { apk } = siteConfig;
  const [guidesOpen, setGuidesOpen] = useState(false);

  const formattedDate = formatReleaseDate(apk.updatedAt, lang);
  const releaseNotes =
    lang === "ar"
      ? apk.releaseNotesAr || apk.releaseNotesEn
      : apk.releaseNotesEn || apk.releaseNotesAr;

  const metadataItems = [
    {
      label: t.download.metaLabels.version,
      value: `v${apk.version}`,
      isLtr: true,
    },
    {
      label: t.download.metaLabels.size,
      value: apk.fileSize ?? t.download.metaPending,
      isLtr: Boolean(apk.fileSize),
    },
    {
      label: t.download.metaLabels.compatibility,
      value: t.download.compatibilityValue,
      isLtr: false,
    },
    {
      label: t.download.metaLabels.minSupported,
      value: `v${apk.minSupportedVersionName}+`,
      isLtr: true,
    },
    {
      label: t.download.metaLabels.updatedAt,
      value: formattedDate ?? t.download.metaPending,
      isLtr: false,
    },
  ];

  return (
    <section
      id="download"
      className="border-y border-cf-hero-border bg-cf-hero-bg py-10 text-white sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-cf-hero-border bg-cf-hero-accent p-4 sm:p-10">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold tracking-tight text-white sm:text-3xl">
              {t.download.title}
            </h2>
            <p className="mt-2.5 sm:mt-3 text-sm leading-relaxed text-[#CBD5E1] sm:text-base">
              {t.download.subtitle}
            </p>
          </div>

          {!isApkAvailable && (
            <div className="mt-5 sm:mt-6 rounded-xl border border-[#FBBF24]/30 bg-[#0B2144]/70 p-3.5 sm:p-4">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#FBBF24]" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {t.download.comingSoonHeading}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#CBD5E1]">
                    {t.download.comingSoonBody}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-5 sm:mt-7">
            {isApkAvailable && apk.downloadUrl ? (
              <a
                href={apk.downloadUrl}
                download={`CashFlow-v${apk.version}.apk`}
                className="cf-transition inline-flex min-h-[50px] sm:min-h-[52px] w-full items-center justify-center gap-2.5 rounded-xl bg-[#2563EB] px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-bold text-white hover:bg-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
              >
                <Download className="h-5 w-5" aria-hidden="true" />
                <span>{t.download.downloadButton}</span>
              </a>
            ) : (
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="inline-flex min-h-[50px] sm:min-h-[52px] w-full cursor-not-allowed items-center justify-center gap-2.5 rounded-xl border border-cf-hero-border bg-[#0B2144] px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-[#94A3B8] sm:w-auto"
              >
                <Clock className="h-5 w-5 text-[#FBBF24]" aria-hidden="true" />
                <span>{t.download.comingSoonButton}</span>
              </button>
            )}
          </div>

          <dl className="mt-5 sm:mt-7 grid grid-cols-2 gap-2.5 sm:gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {metadataItems.map((item) => (
              <div
                key={item.label}
                className="last:col-span-2 sm:last:col-span-1 rounded-xl border border-cf-hero-border bg-[#0B2144]/75 px-3 py-2.5 sm:px-4 sm:py-3"
              >
                <dt className="text-[11px] font-medium text-[#94A3B8]">
                  {item.label}
                </dt>
                <dd
                  dir={item.isLtr ? "ltr" : undefined}
                  className={`mt-1 text-xs sm:text-sm font-semibold text-white ${
                    item.isLtr ? "font-tabular inline-block" : ""
                  }`}
                >
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          {releaseNotes && (
            <div className="mt-4 sm:mt-6 rounded-xl border border-cf-hero-border bg-[#0B2144]/70 p-3.5 sm:p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <ShieldCheck className="h-4 w-4 text-[#34D399]" aria-hidden="true" />
                <h3>{t.download.releaseNotesHeading}</h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#CBD5E1] sm:text-sm">
                {releaseNotes}
              </p>
            </div>
          )}

          {/* Mobile collapsible toggle for install & troubleshooting guides */}
          <button
            type="button"
            onClick={() => setGuidesOpen((v) => !v)}
            aria-expanded={guidesOpen}
            className="mt-4 flex w-full items-center justify-between gap-2 rounded-xl border border-cf-hero-border bg-[#0B2144]/60 px-4 py-3 text-xs font-semibold text-[#CBD5E1] hover:bg-[#0B2144]/80 md:hidden cursor-pointer"
          >
            <span>
              {lang === "ar"
                ? "دليل التثبيت والتحديث وحل المشكلات"
                : "Installation, update guide & troubleshooting"}
            </span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-[#94A3B8] transition-transform duration-200 ${
                guidesOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>

          <div
            className={`mt-3 md:mt-6 gap-3 md:gap-4 md:grid md:grid-cols-2 ${
              guidesOpen ? "grid" : "hidden"
            }`}
          >
            <div className="rounded-xl border border-cf-hero-border bg-[#0B2144]/60 p-3.5 sm:p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#60A5FA]" aria-hidden="true" />
                <h3>{t.download.updateGuideHeading}</h3>
              </div>
              <ol className="mt-3 space-y-2 text-xs leading-relaxed text-[#CBD5E1]">
                {t.download.updateGuideSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="font-tabular mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#2563EB]/25 text-[10px] font-bold text-[#93C5FD]">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-xl border border-cf-hero-border bg-[#0B2144]/60 p-3.5 sm:p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Wrench className="h-4 w-4 shrink-0 text-[#FBBF24]" aria-hidden="true" />
                <h3>{t.download.troubleshootingHeading}</h3>
              </div>
              <ul className="mt-3 space-y-2 text-xs leading-relaxed text-[#CBD5E1]">
                {t.download.troubleshootingItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FBBF24]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
