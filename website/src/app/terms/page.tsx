"use client";

import Link from "next/link";
import { FileText, ArrowRight, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FooterSection } from "@/components/FooterSection";
import { useLanguage } from "@/components/LanguageProvider";
import { siteConfig } from "@/lib/config";

export default function TermsOfServicePage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const BackIcon = isAr ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen flex flex-col bg-cf-bg text-cf-on-surface">
      <Navbar />
      <main id="main-content" className="flex-1 mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-cf-primary hover:underline mb-8"
        >
          <BackIcon className="h-4 w-4" aria-hidden="true" />
          <span>{isAr ? "العودة إلى الصفحة الرئيسية" : "Back to Home"}</span>
        </Link>

        <div className="rounded-2xl border border-cf-separator bg-cf-surface p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cf-primary/10 text-cf-primary">
              <FileText className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                {isAr ? "شروط الاستخدام — CashFlow" : "Terms of Service — CashFlow"}
              </h1>
              <p className="text-sm text-cf-text-muted">
                {isAr
                  ? `سارية على تطبيق CashFlow v${siteConfig.apk.version} والخدمات المرتبطة`
                  : `Applies to CashFlow v${siteConfig.apk.version} and related services`}
              </p>
            </div>
          </div>

          <section className="space-y-3 text-sm sm:text-base leading-relaxed text-cf-on-surface-variant">
            <h2 className="text-lg font-bold text-cf-on-surface">
              {isAr ? "1. نطاق الترخيص والتجربة المجانية" : "1. License Scope & Trial"}
            </h2>
            <p>
              {isAr
                ? "يمنحك تطبيق CashFlow ترخيصاً غير حصري لجهاز واحد (مرتبط بكود الجهاز) لإدارة حسابات المحافظ الإلكترونية محلياً. تخضع الفترة التجريبية وفترة السماح دون إنترنت (Offline Grace Period) للتحقق التشفيري من الخادم."
                : "CashFlow grants a non-exclusive, single-device license (bound to your device short code) for local e-wallet accounting. Trial duration and offline grace periods are enforced cryptographically by signed server licenses."}
            </p>
          </section>

          <section className="space-y-3 text-sm sm:text-base leading-relaxed text-cf-on-surface-variant">
            <h2 className="text-lg font-bold text-cf-on-surface">
              {isAr ? "2. الكتالوج الموقع وطلبات الدفع اليدوي" : "2. Signed Catalog & Manual Payment Verification"}
            </h2>
            <p>
              {isAr
                ? "تُعتمد جميع أسعار الباقات والعروض ووسائل الدفع المتاحة من الكتالوج الموقع. يُثبّت السعر والباقة حتى انتهاء الطلب وفق السياسة الحالية (30 دقيقة افتراضياً، ومن 5 إلى 120 دقيقة). يحتفظ الاشتراك بالسعر والمدة المتفق عليهما طوال الفترة المدفوعة؛ وتُطبق تغييرات السعر عند التجديد بعد قبول العميل. لا يُفعّل الاشتراك بمجرد إرسال رسالة؛ يتطلب التفعيل تحقق المالك من التحويل والمبلغ."
                : "All plan prices, offers and payment methods come from the signed catalog. A checkout order locks its confirmed terms until expiry (30 minutes by default, configurable from 5 to 120 minutes). The agreed price and duration remain fixed for the paid period; new renewal prices require customer acceptance. Sending a WhatsApp message does not activate a subscription: the Owner must verify the transfer and exact amount."}
            </p>
          </section>

          <section className="space-y-3 text-sm sm:text-base leading-relaxed text-cf-on-surface-variant">
            <h2 className="text-lg font-bold text-cf-on-surface">
              {isAr ? "3. الباقة مدى الحياة ونقل الجهاز" : "3. Lifetime Plan & Device Transfers"}
            </h2>
            <p>
              {isAr
                ? "إذا كانت باقة طويلة الأجل متاحة، فتسري المدة المحددة في طلب الاشتراك المعتمد، مع تحقق دوري من الترخيص عبر الإنترنت. يمكن نقل الاشتراك إلى جهاز بديل بعد موافقة المالك، وإلغاء ترخيص الجهاز السابق وتسجيل النقل في سجل التدقيق."
                : "If a long-term plan is available, its duration is the term confirmed in your accepted order, with periodic online license verification. Subscriptions may be transferred to a replacement device upon Owner approval, with the old device license disabled and the transfer recorded."}
            </p>
          </section>

          <section className="space-y-3 text-sm sm:text-base leading-relaxed text-cf-on-surface-variant">
            <h2 className="text-lg font-bold text-cf-on-surface">
              {isAr ? "4. الاسترداد وإخلاء المسؤولية الأمنية" : "4. Refunds & Security Notice"}
            </h2>
            <p>
              {isAr
                ? `لن يطلب فريق دعم CashFlow أبداً كلمات المرور أو رموز التحقق TOTP أو مفاتيح التوقيع الخاصة. تخضع طلبات الاسترداد للمراجعة اليدوية وفق سجل الدفع الموثق. الجهة المسؤولة: ${siteConfig.legalEntity ?? "سيتم نشر بيانات الجهة المسؤولة عند الإطلاق"}.`
                : `CashFlow support will NEVER ask for passwords, TOTP MFA codes, or private signing keys. Refund requests are reviewed manually against verified payment records. Operator: ${siteConfig.legalEntity ?? "Operator details will be published at launch"}.`}
            </p>
          </section>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
