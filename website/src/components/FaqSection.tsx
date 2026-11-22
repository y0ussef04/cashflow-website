"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export function FaqSection() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-block rounded-lg bg-cf-primary-container px-3 py-1 text-xs font-semibold text-cf-primary">
            {t.faq.eyebrow}
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-cf-on-surface sm:text-3xl">
            {t.faq.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-cf-on-surface-variant sm:text-base">
            {t.faq.subtitle}
          </p>
        </div>

        <div className="mt-10 divide-y divide-cf-border cf-card overflow-hidden">
          {t.faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const panelId = `faq-panel-${idx}`;
            const buttonId = `faq-button-${idx}`;

            return (
              <div key={idx}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="cf-transition flex w-full items-center justify-between gap-4 px-5 py-4 text-start text-sm font-bold text-cf-on-surface hover:bg-cf-surface-low sm:px-6 sm:py-5 sm:text-base cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-cf-primary"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-cf-text-muted transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-cf-primary" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-5 pb-5 text-sm leading-relaxed text-cf-on-surface-variant sm:px-6 sm:pb-6"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
