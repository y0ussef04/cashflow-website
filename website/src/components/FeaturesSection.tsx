"use client";

import React from "react";
import {
  ArrowLeftRight,
  BarChart3,
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
  const { t } = useLanguage();

  return (
    <section id="features" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-block rounded-lg bg-cf-primary-container px-3 py-1 text-xs font-semibold text-cf-primary">
            {t.features.eyebrow}
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-cf-on-surface sm:text-3xl">
            {t.features.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-cf-on-surface-variant sm:text-base">
            {t.features.subtitle}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.features.items.map((item) => (
            <article
              key={item.id}
              className="cf-card cf-transition flex flex-col p-5 hover:border-cf-primary/40"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cf-primary-container">
                  <FeatureIcon kind={item.icon} />
                </div>
                <span className="rounded-md bg-cf-surface-low px-2.5 py-1 text-[11px] font-semibold text-cf-text-muted border border-cf-separator">
                  {item.badge}
                </span>
              </div>

              <h3 className="mt-4 text-base font-bold leading-snug text-cf-on-surface">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-cf-on-surface-variant">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
