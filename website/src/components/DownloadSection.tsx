"use client";

import React from "react";
import {
  CheckCircle2,
  Clock,
  Download,
  Info,
  ShieldAlert,
  Smartphone,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { isApkAvailable, siteConfig } from "@/lib/config";

export function DownloadSection() {
  const { lang, t } = useLanguage();
  const { apk } = siteConfig;

  const metadataRows = [
    {
      label: t.download.metaLabels.version,
      value: `v${apk.version}`,
      isTabular: true,
    },
    {
      label: t.download.metaLabels.size,
      value: apk.fileSize ?? t.download.metaPending,
      isTabular: Boolean(apk.fileSize),
    },
    {
      label: t.download.metaLabels.updatedAt,
      value: apk.updatedAt ?? t.download.metaPending,
      isTabular: Boolean(apk.updatedAt),
    },
    {
      label: t.download.metaLabels.compatibility,
      value: apk.minAndroidVersion,
      isTabular: true,
    },
    {
      label: t.download.metaLabels.packageId,
      value: apk.applicationId,
      isTabular: true,
    },
  ];

  return (
    <section
      id="download"
      className="border-y border-cf-hero-border bg-cf-hero-bg py-16 text-white sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-block rounded-lg border border-cf-hero-border bg-cf-hero-accent px-3 py-1 text-xs font-semibold text-[#93C5FD]">
            {t.download.eyebrow}
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {t.download.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1] sm:text-base">
            {t.download.subtitle}
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-xl border border-cf-hero-border bg-cf-hero-accent px-4 py-2.5 text-xs font-medium text-[#E2E8F0] sm:text-sm">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-[#34D399]" aria-hidden="true" />
            <span>{t.download.trialNotice}</span>
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          {/* Primary Download / Coming Soon Card */}
          <div className="lg:col-span-7 rounded-2xl border border-cf-hero-border bg-cf-hero-accent p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-[#0B2144] border border-cf-hero-border">
                {isApkAvailable ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#34D399]" aria-hidden="true" />
                    <span className="text-[#D1FAE5]">{t.download.statusAvailable}</span>
                  </>
                ) : (
                  <>
                    <Clock className="h-3.5 w-3.5 text-[#FBBF24]" aria-hidden="true" />
                    <span className="text-[#FEF3C7]">{t.download.statusComingSoon}</span>
                  </>
                )}
              </div>

              {!isApkAvailable && (
                <div className="mt-5 rounded-xl border border-[#FBBF24]/30 bg-[#0B2144]/70 p-4">
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

              {/* Verified Release Metadata Grid */}
              <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {metadataRows.map((row, idx) => (
                  <div
                    key={row.label}
                    className={`rounded-xl border border-cf-hero-border bg-[#0B2144]/75 px-4 py-3 ${idx === metadataRows.length - 1 && metadataRows.length % 2 === 1
                        ? "sm:col-span-2"
                        : ""
                      }`}
                  >
                    <dt className="text-[11px] font-medium text-[#94A3B8]">
                      {row.label}
                    </dt>
                    <dd
                      dir={row.isTabular ? "ltr" : undefined}
                      className={`mt-1 text-sm font-semibold text-white ${row.isTabular ? "font-tabular inline-block" : ""
                        }`}
                    >
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {apk.sha256 && (
                <div className="mt-3 rounded-xl border border-cf-hero-border bg-[#0B2144]/75 px-4 py-3">
                  <div className="text-[11px] font-medium text-[#94A3B8]">
                    {t.download.metaLabels.sha256}
                  </div>
                  <div className="font-tabular mt-1 break-all text-xs text-[#CBD5E1]">
                    {apk.sha256}
                  </div>
                </div>
              )}
              {apk.signerSha256 && <div className="mt-3 rounded-xl border border-cf-hero-border bg-[#0B2144]/75 px-4 py-3">
                <div className="text-[11px] font-medium text-[#94A3B8]">{lang === "ar" ? "SHA-256 — شهادة التوقيع" : "Signing certificate SHA-256"}</div>
                <div dir="ltr" className="font-tabular mt-1 break-all text-xs text-[#CBD5E1]">{apk.signerSha256}</div>
              </div>}
            </div>

            {/* Action Button */}
            <div className="mt-7">
              {isApkAvailable && apk.downloadUrl ? (
                <a
                  href={apk.downloadUrl}
                  download
                  className="cf-transition inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-xl bg-[#2563EB] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
                >
                  <Download className="h-5 w-5" aria-hidden="true" />
                  <span>{t.download.downloadButton}</span>
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="inline-flex min-h-[52px] w-full cursor-not-allowed items-center justify-center gap-2.5 rounded-xl border border-cf-hero-border bg-[#0B2144] px-6 py-3.5 text-sm font-semibold text-[#94A3B8] sm:w-auto"
                >
                  <Clock className="h-5 w-5 text-[#FBBF24]" aria-hidden="true" />
                  <span>{t.download.comingSoonButton}</span>
                </button>
              )}
            </div>
          </div>

          {/* Installation Instructions & Safety Card */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="rounded-2xl border border-cf-hero-border bg-[#0B2144]/85 p-6">
              <div className="flex items-center gap-2.5">
                <Smartphone className="h-5 w-5 text-[#38BDF8]" aria-hidden="true" />
                <h3 className="text-base font-bold text-white">
                  {t.download.installTitle}
                </h3>
              </div>

              <ol className="mt-4 space-y-3">
                {t.download.installSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#E2E8F0]">
                    <span className="font-tabular flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-cf-hero-accent text-xs font-bold text-[#93C5FD] border border-cf-hero-border">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl border border-cf-hero-border bg-[#0B2144]/85 p-5">
              <div className="flex items-start gap-3">
                <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#38BDF8]" aria-hidden="true" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {t.download.safetyTitle}
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#CBD5E1]">
                    {t.download.safetyNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
