"use client";

import React, { useState } from "react";
import {
  ArrowLeftRight,
  BarChart3,
  ChevronDown,
  ClipboardCheck,
  MessageSquareText,
  Percent,
  Receipt,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import type { FeatureItem } from "@/lib/i18n";

function FeatureIcon({ kind }: { kind: FeatureItem["icon"] }) {
  const props = { className: "h-5 w-5 text-cf-primary", "aria-hidden": true as const };
  switch (kind) {
    case "wallets":
      return <Wallet {...props} />;
    case "transactions":
      return <ArrowLeftRight {...props} />;
    case "commissions":
      return <Percent {...props} />;
    case "reports":
      return <BarChart3 {...props} />;
    case "expenses":
      return <Receipt {...props} />;
    case "closing":
      return <ClipboardCheck {...props} />;
    case "sms":
      return <MessageSquareText {...props} />;
    case "offline":
      return <ShieldCheck {...props} />;
  }
}

export function FeaturesSection() {
  const { lang, t } = useLanguage();
  const [showAllMobile, setShowAllMobile] = useState(false);

  return (
    <section id="features" className="py-10 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-block rounded-lg bg-cf-primary-container px-3 py-1 text-xs font-semibold text-cf-primary">
            {t.features.eyebrow}
          </span>
          <h2 className="mt-3 text-xl font-bold tracking-tight text-cf-on-surface sm:text-3xl">
            {t.features.title}
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm leading-relaxed text-cf-on-surface-variant sm:text-base">
            {t.features.subtitle}
          </p>
        </div>

        <div className="mt-6 sm:mt-10 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.features.items.map((item, idx) => (
            <article
              key={item.id}
              className={`cf-card cf-transition flex-col p-4 sm:p-5 hover:border-cf-primary/40 ${
                !showAllMobile && idx >= 4 ? "hidden sm:flex" : "flex"
              }`}
            >
              <div className="flex items-center gap-3 sm:justify-between sm:gap-2">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-cf-primary-container">
                  <FeatureIcon kind={item.icon} />
                </div>
                <h3 className="text-[15px] font-bold leading-snug text-cf-on-surface sm:hidden">
                  {item.title}
                </h3>
                <span className="hidden sm:inline-block rounded-md bg-cf-surface-low px-2.5 py-1 text-[11px] font-semibold text-cf-text-muted border border-cf-separator">
                  {item.badge}
                </span>
              </div>

              <h3 className="hidden sm:block mt-4 text-base font-bold leading-snug text-cf-on-surface">
                {item.title}
              </h3>

              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-cf-on-surface-variant">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        {t.features.items.length > 4 && (
          <div className="mt-4 flex justify-center sm:hidden">
            <button
              type="button"
              onClick={() => setShowAllMobile((v) => !v)}
              aria-expanded={showAllMobile}
              className="cf-transition inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-cf-border bg-cf-surface px-5 py-2 text-xs font-semibold text-cf-on-surface hover:bg-cf-surface-low cursor-pointer"
            >
              <span>
                {showAllMobile
                  ? lang === "ar"
                    ? "عرض أقل"
                    : "Show less"
                  : lang === "ar"
                    ? `عرض كل المميزات (${t.features.items.length})`
                    : `Show all features (${t.features.items.length})`}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-cf-text-muted transition-transform duration-200 ${
                  showAllMobile ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
