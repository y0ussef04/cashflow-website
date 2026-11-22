"use client";

import Link from "next/link";
import { Shield, ArrowRight, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FooterSection } from "@/components/FooterSection";
import { useLanguage } from "@/components/LanguageProvider";
import { siteConfig } from "@/lib/config";

export default function PrivacyPolicyPage() {
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
              <Shield className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                {isAr ? "سياسة الخصوصية — CashFlow" : "Privacy Policy — CashFlow"}
              </h1>
              <p className="text-sm text-cf-text-muted">
                {isAr
                  ? `تعكس البنية الفعلية لتطبيق CashFlow v${siteConfig.apk.version}`
                  : `Reflects the actual architecture of CashFlow v${siteConfig.apk.version}`}
              </p>
            </div>
          </div>

          <section className="space-y-3 text-sm sm:text-base leading-relaxed text-cf-on-surface-variant">
            <h2 className="text-lg font-bold text-cf-on-surface">
              {isAr ? "1. البيانات المحاسبية المحلية (Offline-First)" : "1. Local Accounting Data (Offline-First)"}
            </h2>
            <p>
              {isAr
                ? "جميع بياناتك المحاسبية — بما في ذلك المحافظ، المعاملات، العمولات، المصروفات، التقارير ورسائل SMS المعالجة — تُخزَّن محلياً على جهازك داخل قاعدة بيانات Room ولا تُرفع تلقائياً إلى خوادم خارجية. أنت تتحكم في النسخ والتقارير التي تختار تصديرها أو مشاركتها."
                : "All merchant accounting records — including wallets, Cash In / Cash Out operations, commissions, expenses, daily closings, financial reports, parsed SMS transactions, and local backups — are stored strictly locally on your device inside the Room database and are not automatically uploaded to Supabase or any external server. You control any backup or report that you choose to export or share."}
            </p>
          </section>

          <section className="space-y-3 text-sm sm:text-base leading-relaxed text-cf-on-surface-variant">
            <h2 className="text-lg font-bold text-cf-on-surface">
              {isAr ? "2. بيانات الترخيص والاشتراك والفوترة" : "2. Licensing, Subscription & Billing Data"}
            </h2>
            <p>
              {isAr
                ? "للتحقق من صلاحية الترخيص ومنع التلاعب، يتبادل التطبيق مع بوابة الترخيص على Supabase فقط: بصمة الجهاز المختصرة (device_hash)، كود الجهاز المختصر (short_code)، إصدار التطبيق، حالة الترخيص الموقعة رقمياً (ECDSA P-256)، وطلبات الدفع الموثقة. كما تُحفظ بيانات التواصل الخاصة بالاشتراك وسجلات الدفع اليدوي (رقم المرجع، المبلغ، وسيلة الدفع) لإتمام التفعيل والمراجعة الإدارية."
                : "For license verification and anti-tamper protection, the app exchanges only minimal licensing metadata with the Supabase License Gateway: device hash, shop short code, app version, ECDSA P-256 signed license/catalog envelopes, and server-validated checkout orders. Subscription contact details and manual payment records (reference ID, amount, method) are stored in Supabase for owner verification and activation."}
            </p>
          </section>

          <section className="space-y-3 text-sm sm:text-base leading-relaxed text-cf-on-surface-variant">
            <h2 className="text-lg font-bold text-cf-on-surface">
              {isAr ? "3. معالجة رسائل المحافظ والنسخ الاحتياطي والقفل الحيوي" : "3. SMS Processing, Local Backups & Biometric Lock"}
            </h2>
            <p>
              {isAr
                ? "تتم قراءة إشعارات/رسائل المحافظ الإلكترونية محلياً على الجهاز فقط لإنشاء مسودات مراجعة محاسبية دون أي إرسال خارجي. تُحمى النسخ الاحتياطية عبر نظام ملفات Android، ويتم حماية مفاتيح الترخيص عبر Android Keystore (AES-256-GCM) مع دعم القفل البيومتري المحلي."
                : "Wallet SMS/notifications are parsed strictly on-device to populate your local review queue without external transmission. Backups remain under your local file control, license state is encrypted via Android Keystore (AES-256-GCM), and app access can be protected with local Biometric Lock."}
            </p>
          </section>

          <section className="space-y-3 text-sm sm:text-base leading-relaxed text-cf-on-surface-variant">
            <h2 className="text-lg font-bold text-cf-on-surface">
              {isAr ? "4. مزودو البنية التحتية والتواصل" : "4. Infrastructure & Third-Party Processors"}
            </h2>
            <p>
              {isAr
                ? "يستضيف Cloudflare الموقع التسويقي العام وصفحات التحميل. وتستضيف Supabase قاعدة بيانات الاشتراكات والتراخيص والمصادقة وبوابة الترخيص. كما يُستخدم WhatsApp كقناة اختيارية للتواصل مع الدعم الفني وإرسال إثباتات الدفع اليدوي."
                : "Cloudflare hosts this public marketing and APK distribution website. Supabase hosts subscription/licensing records, authentication, and the License Gateway Edge Function. WhatsApp is used as an optional customer support and manual payment proof channel."}
            </p>
          </section>

          <section className="space-y-3 text-sm sm:text-base leading-relaxed text-cf-on-surface-variant">
            <h2 className="text-lg font-bold text-cf-on-surface">
              {isAr ? "5. جهة الاتصال وطلبات الخصوصية" : "5. Contact & Privacy Requests"}
            </h2>
            <p>
              {isAr
                ? `الجهة المسؤولة: ${siteConfig.legalEntity ?? "سيتم نشر بيانات الجهة المسؤولة عند الإطلاق"}. لطلبات الخصوصية أو حذف بيانات الاشتراك، تواصل عبر الهاتف ${siteConfig.contact.supportPhoneDisplay} أو البريد الإلكتروني: ${siteConfig.contact.supportEmail ?? "سيتم نشر بريد الدعم عند الإطلاق"}.`
                : `Operator: ${siteConfig.legalEntity ?? "Operator details will be published at launch"}. For privacy or subscription-data deletion inquiries, contact ${siteConfig.contact.supportPhoneDisplay} or email: ${siteConfig.contact.supportEmail ?? "Support email available at launch"}.`}
            </p>
          </section>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
