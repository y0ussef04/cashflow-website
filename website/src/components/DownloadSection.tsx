"use client";

import React from "react";
import { Clock, Download, Info } from "lucide-react";
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

  const formattedDate = formatReleaseDate(apk.updatedAt, lang);

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
      label: t.download.metaLabels.updatedAt,
      value: formattedDate ?? t.download.metaPending,
      isLtr: false,
    },
  ];

  return (
    <section
      id="download"
      className="border-y border-cf-hero-border bg-cf-hero-bg py-16 text-white sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-cf-hero-border bg-cf-hero-accent p-6 sm:p-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {t.download.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1] sm:text-base">
              {t.download.subtitle}
            </p>
          </div>

          {!isApkAvailable && (
            <div className="mt-6 rounded-xl border border-[#FBBF24]/30 bg-[#0B2144]/70 p-4">
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

          <div className="mt-7">
            {isApkAvailable && apk.downloadUrl ? (
              <a
                href={apk.downloadUrl}
                download
                className="cf-transition inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-xl bg-[#2563EB] px-8 py-3.5 text-base font-bold text-white hover:bg-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
              >
                <Download className="h-5 w-5" aria-hidden="true" />
                <span>{t.download.downloadButton}</span>
              </a>
            ) : (
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="inline-flex min-h-[52px] w-full cursor-not-allowed items-center justify-center gap-2.5 rounded-xl border border-cf-hero-border bg-[#0B2144] px-8 py-3.5 text-base font-semibold text-[#94A3B8] sm:w-auto"
              >
                <Clock className="h-5 w-5 text-[#FBBF24]" aria-hidden="true" />
                <span>{t.download.comingSoonButton}</span>
              </button>
            )}
          </div>

          <dl className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {metadataItems.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-cf-hero-border bg-[#0B2144]/75 px-4 py-3"
              >
                <dt className="text-[11px] font-medium text-[#94A3B8]">
                  {item.label}
                </dt>
                <dd
                  dir={item.isLtr ? "ltr" : undefined}
                  className={`mt-1 text-sm font-semibold text-white ${item.isLtr ? "font-tabular inline-block" : ""
                    }`}
                >
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
