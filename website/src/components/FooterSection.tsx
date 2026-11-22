"use client";

import React, { useEffect, useState } from "react";
import {
  ExternalLink,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  Shield,
  X,
} from "lucide-react";
import { CashFlowLogoMark } from "@/components/BrandLogo";
import { useLanguage } from "@/components/LanguageProvider";
import { usePathname } from "next/navigation";
import { usePublicCatalog } from "@/components/PublicCatalogProvider";
import { siteConfig } from "@/lib/config";

export function FooterSection() {
  const { lang, t } = useLanguage();
  const path = usePathname();
  const anchor = (hash: string) => path === "/" ? hash : `/${hash}`;
  const { catalog, status } = usePublicCatalog();
  const signedPhone = status === "ready" && typeof catalog?.support.whatsapp_number === "string" && /^\d{8,15}$/.test(catalog.support.whatsapp_number) ? catalog.support.whatsapp_number : null;
  const [privacyOpen, setPrivacyOpen] = useState(false);

  useEffect(() => {
    if (!privacyOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPrivacyOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [privacyOpen]);

  const navLinks = [
    { href: anchor("#top"), label: t.nav.home },
    { href: anchor("#features"), label: t.nav.features },
    { href: anchor("#how-it-works"), label: t.nav.howItWorks },
    { href: anchor("#preview"), label: t.nav.preview },
    { href: anchor("#download"), label: t.nav.downloadCta },
    { href: anchor("#plans"), label: lang === "ar" ? "الباقات" : "Plans" },
    { href: anchor("#faq"), label: t.nav.faq },
  ];

  const {
    supportPhoneDisplay,
    supportPhoneHref,
    whatsappUrl,
    supportEmail,
    linkedinUrl,
  } = signedPhone ? { ...siteConfig.contact, supportPhoneDisplay: `+${signedPhone}`, supportPhoneHref: `tel:+${signedPhone}`, whatsappUrl: `https://wa.me/${signedPhone}` } : siteConfig.contact;

  return (
    <>
      <footer id="support" className="border-t border-cf-border bg-cf-surface">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-12">
            {/* Brand Column */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-3">
                <CashFlowLogoMark size={38} variant="light" />
                <div>
                  <div className="font-tabular text-base font-bold text-cf-on-surface">
                    {t.brand.name}
                  </div>
                  <div className="text-xs text-cf-on-surface-variant">
                    {t.brand.subtitle}
                  </div>
                </div>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-cf-on-surface-variant">
                {t.footer.description}
              </p>
            </div>

            {/* Navigation Column */}
            <div className="md:col-span-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cf-text-muted">
                {t.footer.navigationTitle}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="cf-transition text-sm font-medium text-cf-on-surface-variant hover:text-cf-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Legal Column */}
            <div className="md:col-span-4 space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-cf-text-muted">
                  {t.footer.contactTitle}
                </h3>
                <div className="mt-4 space-y-2.5 text-sm">
                  <a
                    href={supportPhoneHref}
                    className="cf-transition flex items-center gap-2 text-cf-on-surface-variant hover:text-cf-primary"
                  >
                    <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{t.footer.contactPhoneLabel}:</span>
                    <span dir="ltr" className="font-tabular font-semibold text-cf-on-surface">
                      {supportPhoneDisplay}
                    </span>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cf-transition flex items-center gap-2 text-cf-on-surface-variant hover:text-cf-primary"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{t.footer.contactWhatsappLabel}</span>
                    <span dir="ltr" className="font-tabular text-xs text-cf-text-muted">
                      ({supportPhoneDisplay})
                    </span>
                    <ExternalLink className="h-3 w-3 shrink-0 text-cf-text-muted" aria-hidden="true" />
                  </a>

                  {supportEmail && (
                    <a
                      href={`mailto:${supportEmail}`}
                      className="cf-transition flex items-center gap-2 text-cf-on-surface-variant hover:text-cf-primary"
                    >
                      <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span dir="ltr" className="font-tabular">
                        {supportEmail}
                      </span>
                    </a>
                  )}

                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cf-transition flex items-center gap-2 text-cf-on-surface-variant hover:text-cf-primary"
                  >
                    <Linkedin className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{t.footer.contactLinkedinLabel}</span>
                    <ExternalLink className="h-3 w-3 shrink-0 text-cf-text-muted" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-cf-text-muted">
                  {t.footer.legalTitle}
                </h3>
                <div className="mt-3 flex flex-col items-start gap-2">
                  <a
                    href="/privacy/"
                    className="cf-transition inline-flex items-center gap-1.5 text-sm font-medium text-cf-on-surface-variant hover:text-cf-primary"
                  >
                    <Shield className="h-4 w-4" aria-hidden="true" />
                    <span>{t.footer.privacyPolicy}</span>
                  </a>
                  <a
                    href="/terms/"
                    className="cf-transition inline-flex items-center gap-1.5 text-sm font-medium text-cf-on-surface-variant hover:text-cf-primary"
                  >
                    <Shield className="h-4 w-4" aria-hidden="true" />
                    <span>{lang === "ar" ? "شروط الاستخدام" : "Terms of Service"}</span>
                  </a>
                  <p className="text-xs text-cf-text-muted pt-1">
                    {lang === "ar"
                      ? "تنبيه أمني: لن يطلب فريق CashFlow أبداً كلمات المرور أو رموز TOTP أو المفاتيح الخاصة."
                      : "Security notice: CashFlow support will never ask for passwords, TOTP codes, or private keys."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-cf-separator pt-6 text-xs text-cf-text-muted sm:flex-row">
            <p>
              <span className="font-tabular">© {new Date().getFullYear()}</span>{" "}
              {t.footer.copyright}
            </p>
            <p dir="ltr" className="font-tabular">
              com.cashflow.app • v{siteConfig.apk.version}
            </p>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Dialog */}
      {privacyOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setPrivacyOpen(false)}
        >
          <div
            className="cf-card max-h-[85vh] w-full max-w-2xl overflow-y-auto p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-cf-separator pb-4">
              <div>
                <h2
                  id="privacy-modal-title"
                  className="text-lg font-bold text-cf-on-surface"
                >
                  {t.privacyModal.title}
                </h2>
                <p className="mt-1 text-xs text-cf-text-muted">
                  {t.privacyModal.lastUpdated}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPrivacyOpen(false)}
                aria-label={t.privacyModal.close}
                className="cf-transition inline-flex h-9 w-9 items-center justify-center rounded-lg border border-cf-border text-cf-on-surface-variant hover:bg-cf-surface-low cursor-pointer"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-5 space-y-5">
              {t.privacyModal.sections.map((section) => (
                <div key={section.heading}>
                  <h3 className="text-sm font-bold text-cf-on-surface">
                    {section.heading}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-cf-on-surface-variant">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end border-t border-cf-separator pt-4">
              <button
                type="button"
                onClick={() => setPrivacyOpen(false)}
                className="cf-transition rounded-xl bg-cf-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-cf-primary-pressed cursor-pointer"
              >
                {t.privacyModal.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
