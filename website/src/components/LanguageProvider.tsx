"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Language, TranslationContent, translations } from "@/lib/i18n";

const STORAGE_KEY = "cashflow_site_lang";

interface LanguageContextValue {
  lang: Language;
  dir: "rtl" | "ltr";
  t: TranslationContent;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("ar");
  const [preferenceLoaded, setPreferenceLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "ar" || saved === "en") {
        setLangState(saved);
      }
    } catch {
      // Ignore storage access restrictions
    } finally {
      setPreferenceLoaded(true);
    }
  }, []);

  useEffect(() => {
    // Never overwrite a saved preference with the initial SSR default during hydration.
    if (!preferenceLoaded) return;
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.title = translations[lang].meta.title;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore storage access restrictions
    }
  }, [lang, preferenceLoaded]);

  const setLang = (next: Language) => setLangState(next);
  const toggleLang = () => setLangState((prev) => (prev === "ar" ? "en" : "ar"));

  return (
    <LanguageContext.Provider
      value={{
        lang,
        dir: lang === "ar" ? "rtl" : "ltr",
        t: translations[lang],
        setLang,
        toggleLang,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
