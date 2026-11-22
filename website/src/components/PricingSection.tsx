"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { usePublicCatalog } from "@/components/PublicCatalogProvider";

export function PricingSection() {
  const { lang } = useLanguage();
  const { status, catalog, retry } = usePublicCatalog();
  const ar = lang === "ar";
  const plans = catalog?.plans.filter(p => p.is_active === true && p.is_visible === true) ?? [];
  const selling = catalog?.checkout_policy.sales_enabled === true && plans.length > 0;
  const messages = {
    loading: ar ? "جاري التحقق من الباقات الرسمية…" : "Checking official plans…",
    unconfigured: ar ? "الباقات والأسعار غير متاحة حتى اعتماد الإطلاق." : "Plans and prices will be available once the release is approved.",
    unavailable: ar ? "تعذر تحميل الباقات. حاول مرة أخرى." : "Could not load plans. Please try again.",
    invalid: ar ? "تعذر التحقق من الباقات الرسمية. الأسعار غير متاحة حالياً." : "Official plans could not be verified. Prices are currently unavailable.",
    expired: ar ? "انتهت صلاحية الباقات المعروضة. حدّث للحصول على الأسعار الحالية." : "The published plans have expired. Refresh for current prices.",
    ready: selling ? (ar ? "الباقات والأسعار الرسمية الحالية" : "Current official plans and prices") : (ar ? "الاشتراكات الجديدة متوقفة مؤقتاً." : "New subscriptions are temporarily paused."),
  };
  return <section id="plans" className="border-t border-cf-border bg-cf-bg py-16 sm:py-24">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-cf-on-surface sm:text-3xl">{ar ? "الباقات والأسعار" : "Plans and pricing"}</h2>
      <p className="mt-3 text-sm text-cf-on-surface-variant">{ar ? "اختر الباقة داخل تطبيق CashFlow. يُثبّت السعر ووسيلة الدفع عند قبول طلب الاشتراك." : "Choose your plan in the CashFlow app. The price and payment destination are confirmed when your order is accepted."}</p>
      <p role="status" className="mt-6 rounded-xl border border-cf-border bg-cf-surface p-4 text-sm text-cf-on-surface-variant">{messages[status]}</p>
      {["unavailable", "invalid", "expired"].includes(status) && <button type="button" onClick={retry} className="mt-3 min-h-11 rounded-xl bg-cf-primary px-5 py-2 text-sm font-semibold text-white">{ar ? "حاول مرة أخرى" : "Try again"}</button>}
      {status === "ready" && selling && <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {plans.map(p => {
          const minor = BigInt(String(p.price_minor));
          const price = `${minor / 100n}.${(minor % 100n).toString().padStart(2, "0")}`;
          const benefits = p[ar ? "benefits_ar" : "benefits_en"];
          return <article key={String(p.plan_code)} className="cf-card min-w-0 p-6">
            <h3 className="text-lg font-bold text-cf-on-surface">{String(p[ar ? "title_ar" : "title_en"])}</h3>
            <p className="mt-3 text-2xl font-bold text-cf-primary"><bdi>{price} {ar ? "ج.م" : "EGP"}</bdi></p>
            <p className="mt-1 text-sm text-cf-text-muted">{String(p.duration_days)} {ar ? "يوم" : "days"}</p>
            <p className="mt-3 break-words text-sm text-cf-on-surface-variant">{typeof p[ar ? "description_ar" : "description_en"] === "string" ? String(p[ar ? "description_ar" : "description_en"]) : ""}</p>
            {Array.isArray(benefits) && <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-cf-on-surface-variant">{benefits.filter(b => typeof b === "string").map((b, i) => <li key={i}>{String(b)}</li>)}</ul>}
            <a href="#download" className="mt-5 inline-flex min-h-11 items-center rounded-xl border border-cf-border px-4 text-sm font-semibold text-cf-primary">{ar ? "افتح التطبيق للاشتراك" : "Subscribe in the app"}</a>
          </article>;
        })}
      </div>}
      {status === "ready" && selling && <p className="mt-5 text-xs text-cf-text-muted">{ar ? "تُطبق أهلية العروض داخل التطبيق عند إنشاء الطلب. التفعيل بعد التحقق من الدفع." : "Offer eligibility is checked in the app when an order is created. Activation follows payment verification."}</p>}
    </div>
  </section>;
}
