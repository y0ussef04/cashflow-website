"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { PhoneFrame } from "@/components/PhoneFrame";

export function AppPreviewSection() {
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState<string>(
    t.preview.screens[0]?.id ?? "dashboard"
  );

  const activeScreen =
    t.preview.screens.find((s) => s.id === selectedId) ?? t.preview.screens[0];

  return (
    <section id="preview" className="py-10 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="inline-block rounded-lg bg-cf-primary-container px-3 py-1 text-xs font-semibold text-cf-primary">
              {t.preview.eyebrow}
            </span>
            <h2 className="mt-3 text-xl font-bold tracking-tight text-cf-on-surface sm:text-3xl">
              {t.preview.title}
            </h2>
            <p className="mt-2.5 sm:mt-3 text-sm leading-relaxed text-cf-on-surface-variant sm:text-base">
              {t.preview.subtitle}
            </p>
          </div>

          {/* Filter Pills matching CashFlowSegmentedWell / CashFlowFilterPill */}
          <div
            role="tablist"
            aria-label={t.preview.title}
            className="no-scrollbar -mx-4 flex flex-nowrap gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
          >
            {t.preview.screens.map((screen) => {
              const active = screen.id === activeScreen.id;
              return (
                <button
                  key={screen.id}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => setSelectedId(screen.id)}
                  className={`cf-transition shrink-0 whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-semibold cursor-pointer focus-visible:outline-2 focus-visible:outline-cf-primary ${
                    active
                      ? "bg-cf-primary text-white"
                      : "border border-cf-border bg-cf-surface text-cf-on-surface-variant hover:bg-cf-surface-low hover:text-cf-on-surface"
                  }`}
                >
                  {screen.tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Screen + Strip */}
        <div className="mt-6 sm:mt-10 cf-card p-4 sm:p-8 lg:p-10">
          <div className="grid items-center gap-5 sm:gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <PhoneFrame src={activeScreen.src} alt={activeScreen.title} />
            </div>

            <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6">
              <div className="text-center sm:text-start">
                <span className="inline-block rounded-md bg-cf-primary-container px-2.5 py-1 text-xs font-semibold text-cf-primary">
                  {activeScreen.tag}
                </span>
                <h3 className="mt-2.5 sm:mt-3 text-lg font-bold text-cf-on-surface sm:text-2xl">
                  {activeScreen.title}
                </h3>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-base leading-relaxed text-cf-on-surface-variant">
                  {activeScreen.caption}
                </p>
              </div>

              {/* Thumbnail Selector Strip (desktop/tablet; mobile uses top pill bar) */}
              <div className="hidden sm:grid sm:grid-cols-5 gap-3">
                {t.preview.screens.map((screen) => {
                  const active = screen.id === activeScreen.id;
                  return (
                    <button
                      key={screen.id}
                      type="button"
                      onClick={() => setSelectedId(screen.id)}
                      className={`cf-transition flex flex-col items-center gap-2 rounded-xl border p-2 text-center cursor-pointer focus-visible:outline-2 focus-visible:outline-cf-primary ${
                        active
                          ? "border-cf-primary bg-cf-primary-container/60"
                          : "border-cf-border bg-cf-surface-low hover:border-cf-primary/40"
                      }`}
                    >
                      <div className="aspect-[9/16] w-full overflow-hidden rounded-lg border border-cf-border bg-cf-bg">
                        <img
                          src={screen.src}
                          alt={screen.title}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-cf-on-surface line-clamp-1">
                        {screen.tag}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="text-center sm:text-start text-xs text-cf-text-muted">{t.preview.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
