import React from "react";
import Link from "next/link";
import { CashFlowLogoMark } from "@/components/BrandLogo";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cf-bg px-4 text-center">
      <div className="cf-card max-w-md p-8">
        <div className="mx-auto flex justify-center">
          <CashFlowLogoMark size={52} variant="light" />
        </div>
        <p className="font-tabular mt-5 text-sm font-bold text-cf-primary">404</p>
        <h1 className="mt-2 text-xl font-bold text-cf-on-surface">
          الصفحة غير موجودة / Page Not Found
        </h1>
        <p className="mt-2 text-sm text-cf-on-surface-variant">
          تعذر العثور على الصفحة المطلوبة. يمكنك العودة إلى الصفحة الرئيسية لـ CashFlow.
        </p>
        <Link
          href="/"
          className="cf-transition mt-6 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-cf-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-cf-primary-pressed"
        >
          العودة للرئيسية • Back to Home
        </Link>
      </div>
    </main>
  );
}
