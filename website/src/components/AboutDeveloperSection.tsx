"use client";

import React from "react";
import { ExternalLink, GraduationCap, Linkedin, User } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { siteConfig } from "@/lib/config";

export function AboutDeveloperSection() {
  const { t } = useLanguage();

  return (
    <section
      id="developer"
      className="border-t border-cf-border bg-cf-bg py-14 sm:py-16"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="cf-card p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cf-primary-container border border-cf-border">
                <User className="h-6 w-6 text-cf-primary" aria-hidden="true" />
              </div>

              <div>
                <span className="inline-block rounded-md bg-cf-surface-low px-2.5 py-0.5 text-[11px] font-semibold text-cf-text-muted border border-cf-separator">
                  {t.developer.eyebrow}
                </span>

                <h2 className="mt-2 text-lg font-bold text-cf-on-surface sm:text-xl">
                  {t.developer.name}
                </h2>

                <p className="mt-0.5 text-sm font-semibold text-cf-primary">
                  {t.developer.role}
                </p>

                <p className="mt-2 inline-flex items-center gap-2 text-sm text-cf-on-surface-variant">
                  <GraduationCap
                    className="h-4 w-4 shrink-0 text-cf-text-muted"
                    aria-hidden="true"
                  />
                  <span>{t.developer.education}</span>
                </p>
              </div>
            </div>

            <div className="shrink-0">
              <a
                href={siteConfig.contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cf-transition inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-cf-border bg-cf-surface px-4 py-2.5 text-sm font-semibold text-cf-on-surface hover:border-cf-primary/50 hover:bg-cf-primary-container/50 hover:text-cf-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cf-primary"
              >
                <Linkedin className="h-4 w-4 text-cf-primary" aria-hidden="true" />
                <span>{t.developer.linkedinLabel}</span>
                <ExternalLink
                  className="h-3.5 w-3.5 text-cf-text-muted"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
