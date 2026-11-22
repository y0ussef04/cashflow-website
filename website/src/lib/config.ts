import releaseManifest from "../../public/release-manifest.json";
import { validateReleaseManifest } from "./releaseManifest";

function cleanEnv(value: string | undefined): string | null { return value?.trim() || null; }
function httpsUrl(value: string | null): string | null {
  if (!value) return null;
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password) throw new Error("Public URLs must use HTTPS without credentials.");
  return url.href.replace(/\/$/, "");
}
export const release = validateReleaseManifest(releaseManifest);
export const isApkAvailable = release.status === "PUBLISHED";
const whatsappUrl = httpsUrl(cleanEnv(process.env.NEXT_PUBLIC_WHATSAPP_URL)) ?? "https://wa.me/201027780575";
const supportMatch = /^https:\/\/wa\.me\/(\d{8,15})(?:\?|$)/.exec(whatsappUrl);
if (!supportMatch) throw new Error("NEXT_PUBLIC_WHATSAPP_URL must be an official wa.me phone link.");
const supportEmail = cleanEnv(process.env.NEXT_PUBLIC_SUPPORT_EMAIL);
if (supportEmail && !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(supportEmail)) throw new Error("Invalid public support email.");

export const siteConfig = {
  // Cloudflare supplies CF_PAGES_URL at build time; custom domains are optional.
  siteUrl: httpsUrl(cleanEnv(process.env.NEXT_PUBLIC_SITE_URL) ?? cleanEnv(process.env.CF_PAGES_URL)) ?? "http://localhost:3000",
  apk: {
    downloadUrl: isApkAvailable ? release.download_url : null,
    version: release.version_name,
    fileSize: isApkAvailable ? `${(release.size_bytes / 1048576).toFixed(1)} MB` : null,
    updatedAt: isApkAvailable ? release.released_at : null,
    sha256: isApkAvailable ? release.apk_sha256 : null,
    signerSha256: isApkAvailable ? release.signer_cert_sha256 : null,
    minAndroidVersion: "Android 8.0 (API 26)+",
    targetSdk: release.target_sdk,
    applicationId: release.application_id,
  },
  legalEntity: cleanEnv(process.env.NEXT_PUBLIC_LEGAL_ENTITY),
  catalog: {
    environment: "PRODUCTION" as const,
    projectRef: "oxttfkanbcfegyqisogp",
    url: "https://oxttfkanbcfegyqisogp.supabase.co/functions/v1/license-gateway",
    trustedPublicKeys: parseCatalogPublicKeys(cleanEnv(process.env.NEXT_PUBLIC_CATALOG_SIGNING_PUBLIC_KEYS)),
  },
  contact: {
    supportPhoneDisplay: `+${supportMatch[1]}`,
    supportPhoneHref: `tel:+${supportMatch[1]}`,
    whatsappUrl, supportEmail,
    linkedinUrl: "https://www.linkedin.com/in/youssef-refaat-054a60248",
  },
};
function parseCatalogPublicKeys(raw: string | null): Record<string, string> {
  const keys: Record<string, string> = {};
  if (!raw) return keys;
  for (const entry of raw.split(";")) {
    const index = entry.indexOf("=");
    const id = entry.slice(0, index).trim();
    const spki = entry.slice(index + 1).trim();
    if (index < 1 || !/^[A-Za-z0-9_-]{1,64}$/.test(id) || keys[id] || !/^[A-Za-z0-9+/]+=*$/.test(spki) || spki.length < 100) throw new Error("Invalid public catalog key ring; use keyId=P256-SPKI-base64.");
    keys[id] = spki;
  }
  return keys;
}
