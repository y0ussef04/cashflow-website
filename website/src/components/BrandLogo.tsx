import React from "react";

interface CashFlowLogoMarkProps {
  size?: number;
  variant?: "light" | "navy";
  className?: string;
}

/**
 * Official CashFlow "Flow Nexus" brand symbol reproduced verbatim from
 * app/src/main/res/drawable/ic_launcher_foreground.xml and CashFlowBrandLogo.kt.
 */
export function CashFlowLogoMark({
  size = 40,
  variant = "light",
  className = "",
}: CashFlowLogoMarkProps) {
  const isNavy = variant === "navy";
  const bg = isNavy ? "#071936" : "#FFFFFF";
  const border = isNavy ? "#1E3A6D" : "#E2E8F0";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 108 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <rect width="108" height="108" rx="28" fill={bg} />
      <rect x="2" y="2" width="104" height="104" rx="26" stroke={border} strokeWidth="2.5" />
      <g transform="translate(54 54) rotate(-45) scale(0.76) translate(-54 -54)">
        <path
          fill="#1E6BFF"
          d="M30,56V38C30,25.85 39.85,16 52,16H60C69.94,16 78,24.06 78,34V37H63V34C63,32.34 61.66,31 60,31H52C48.13,31 45,34.13 45,38V56C45,58.76 42.76,61 40,61H30V56Z"
        />
        <path
          fill="#0D47B8"
          d="M30,46H45V56C45,58.76 42.76,61 40,61H30V46Z"
        />
        <path
          fill="#38BDF8"
          d="M78,52V70C78,82.15 68.15,92 56,92H48C38.06,92 30,83.94 30,74V71H45V74C45,75.66 46.34,77 48,77H56C59.87,77 63,73.87 63,70V52C63,49.24 65.24,47 68,47H78V52Z"
        />
        <path
          fill="#1E6BFF"
          d="M63,52C63,49.24 65.24,47 68,47H78V62H63V52Z"
        />
      </g>
    </svg>
  );
}

interface ProviderBadgeItem {
  id: string;
  labelAr: string;
  labelEn: string;
  ink: string;
  bg: string;
  border: string;
  dot: string;
}

const PROVIDERS: ProviderBadgeItem[] = [
  {
    id: "vodafone",
    labelAr: "فودافون كاش",
    labelEn: "Vodafone Cash",
    ink: "#7F1D1D",
    bg: "#FFF1F1",
    border: "#FECACA",
    dot: "#E60000",
  },
  {
    id: "orange",
    labelAr: "أورنج كاش",
    labelEn: "Orange Cash",
    ink: "#7A3500",
    bg: "#FFF4EA",
    border: "#FED7AA",
    dot: "#FF7900",
  },
  {
    id: "eand",
    labelAr: "إي آند كاش",
    labelEn: "e& Cash",
    ink: "#8C030E",
    bg: "#FFF0F2",
    border: "#FECDD3",
    dot: "#F20519",
  },
  {
    id: "we",
    labelAr: "وي باي",
    labelEn: "WE Pay",
    ink: "#3B0764",
    bg: "#F6F0FE",
    border: "#E9D5FF",
    dot: "#6B21A8",
  },
];

export function WalletProviderStrip({ lang }: { lang: "ar" | "en" }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {PROVIDERS.map((p) => (
        <span
          key={p.id}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold"
          style={{
            backgroundColor: p.bg,
            color: p.ink,
            border: `1px solid ${p.border}`,
          }}
        >
          <span
            className="h-2 w-2 rounded-full shrink-0"
            style={{ backgroundColor: p.dot }}
            aria-hidden="true"
          />
          {lang === "ar" ? p.labelAr : p.labelEn}
        </span>
      ))}
    </div>
  );
}
