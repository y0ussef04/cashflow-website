export const APPROVED_PRODUCTION_APPLICATION_ID = "com.cashflow.app";
export const APPROVED_PRODUCTION_SIGNER_CERT_SHA256 =
  "2689db5025f902bf7399d5cf0b209dea67470fe581e24c5b6e15e2ac1153b90f";
export const FORBIDDEN_DEBUG_CERT_SHA256 =
  "e4328766ef8a866510405a83bb54b95fdfab70c04013defb179a684de447ca98";

export interface ReleaseMetadata {
  status: "PENDING_RELEASE" | "PUBLISHED";
  application_id: string;
  version_name: string;
  version_code: number;
  min_sdk: number;
  target_sdk: number;
  download_url: string;
  apk_sha256: string;
  signer_cert_sha256: string;
  size_bytes: number;
  released_at: string | null;
  min_supported_version_code?: number;
  min_supported_version_name?: string;
  release_notes_ar?: string;
  release_notes_en?: string;
  mandatory_update?: boolean;
}

/** Public metadata only. Enforces permanent Android package identity, production certificate pinning, and integrity fields. */
export function validateReleaseManifest(value: unknown): ReleaseMetadata {
  const m = value as ReleaseMetadata;
  if (
    !m ||
    !["PENDING_RELEASE", "PUBLISHED"].includes(m.status) ||
    m.application_id !== APPROVED_PRODUCTION_APPLICATION_ID ||
    typeof m.version_name !== "string" ||
    !/^\d+\.\d+\.\d+$/.test(m.version_name) ||
    !Number.isSafeInteger(m.version_code) ||
    m.version_code < 1 ||
    m.min_sdk !== 26 ||
    !Number.isSafeInteger(m.target_sdk) ||
    m.target_sdk < 35
  ) {
    throw new Error("Release manifest must carry com.cashflow.app, valid semantic versionName, positive integer versionCode, and SDKs (min 26, target >= 35).");
  }
  if (m.min_supported_version_code !== undefined) {
    if (!Number.isSafeInteger(m.min_supported_version_code) || m.min_supported_version_code < 1 || m.min_supported_version_code > m.version_code) {
      throw new Error("min_supported_version_code must be between 1 and version_code.");
    }
  }
  if (m.min_supported_version_name !== undefined && !/^\d+\.\d+\.\d+$/.test(m.min_supported_version_name)) {
    throw new Error("min_supported_version_name must follow semantic versioning.");
  }
  if (m.status === "PUBLISHED") {
    const url = new URL(m.download_url);
    const apkSha = typeof m.apk_sha256 === "string" ? m.apk_sha256.toLowerCase() : "";
    const signerSha = typeof m.signer_cert_sha256 === "string" ? m.signer_cert_sha256.toLowerCase() : "";
    const expectedFilename = `CashFlow-v${m.version_name}.apk`;
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      !url.pathname.endsWith(`/${expectedFilename}`) ||
      /(?:PENDING|PLACEHOLDER|example\.(?:com|org)|localhost)/i.test(m.download_url) ||
      !/^[a-f0-9]{64}$/.test(apkSha) ||
      !/^[a-f0-9]{64}$/.test(signerSha) ||
      signerSha === FORBIDDEN_DEBUG_CERT_SHA256 ||
      signerSha !== APPROVED_PRODUCTION_SIGNER_CERT_SHA256 ||
      apkSha === signerSha ||
      !Number.isSafeInteger(m.size_bytes) ||
      m.size_bytes <= 0 ||
      !m.released_at ||
      !Number.isFinite(Date.parse(m.released_at))
    ) {
      throw new Error("Published release requires a real HTTPS versioned APK URL, valid APK SHA-256, approved Production signer SHA-256, positive file size, and release date.");
    }
  }
  return m;
}
