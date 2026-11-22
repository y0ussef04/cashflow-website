"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { PhoneFrame } from "@/components/PhoneFrame";

export function HowItWorksSection() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeStep = t.howItWorks.steps[activeIndex] ?? t.howItWorks.steps[0];
  const matchedScreen =
    t.preview.screens.find((s) => s.id === activeStep.screenId) ??
    t.preview.screens[0];

  return (
    <section
      id="how-it-works"
      className="border-y border-cf-border bg-cf-surface py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-block rounded-lg bg-cf-primary-container px-3 py-1 text-xs font-semibold text-cf-primary">
            {t.howItWorks.eyebrow}
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-cf-on-surface sm:text-3xl">
            {t.howItWorks.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-cf-on-surface-variant sm:text-base">
            {t.howItWorks.subtitle}
          </p>
        </div>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-12">
          {/* Interactive Steps List */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            {t.howItWorks.steps.map((step, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`cf-transition w-full rounded-2xl border p-5 text-start cursor-pointer focus-visible:outline-2 focus-visible:outline-cf-primary ${
                    isSelected
                      ? "border-cf-primary bg-cf-primary-container/60"
                      : "border-cf-border bg-cf-surface hover:bg-cf-surface-low"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`font-tabular flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                        isSelected
                          ? "bg-cf-primary text-white"
                          : "bg-cf-surface-container text-cf-on-surface-variant"
                      }`}
                    >
                      {step.number}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-cf-on-surface">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-cf-on-surface-variant">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Synchronized Authentic App Screenshot */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-cf-border bg-cf-bg p-6 sm:p-8">
              <PhoneFrame
                src={matchedScreen.src}
                alt={matchedScreen.title}
              />
              <div className="mt-5 text-center">
                <span className="inline-block rounded-md bg-cf-primary-container px-2.5 py-0.5 text-xs font-semibold text-cf-primary">
                  {matchedScreen.tag}
                </span>
                <p className="mt-2 text-sm font-semibold text-cf-on-surface">
                  {matchedScreen.title}
                </p>
                <p className="mt-1 text-xs text-cf-on-surface-variant">
                  {matchedScreen.caption}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
