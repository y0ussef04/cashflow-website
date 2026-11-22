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
}

/** Public metadata only. A URL alone never enables a release download. */
export function validateReleaseManifest(value: unknown): ReleaseMetadata {
  const m = value as ReleaseMetadata;
  if (!m || !["PENDING_RELEASE", "PUBLISHED"].includes(m.status) || m.application_id !== "com.cashflow.app" ||
      m.version_name !== "1.1.0" || m.version_code !== 2 || m.min_sdk !== 26 || m.target_sdk !== 35) throw new Error("Release manifest must match the current Android version and SDKs.");
  if (m.status === "PUBLISHED") {
    const url = new URL(m.download_url);
    if (url.protocol !== "https:" || url.username || url.password || !url.pathname.endsWith(".apk") || /(?:PENDING|PLACEHOLDER|example\.(?:com|org)|localhost)/i.test(m.download_url) ||
        !/^[a-fA-F0-9]{64}$/.test(m.apk_sha256) || !/^[a-fA-F0-9]{64}$/.test(m.signer_cert_sha256) ||
        !Number.isSafeInteger(m.size_bytes) || m.size_bytes <= 0 || !m.released_at || !Number.isFinite(Date.parse(m.released_at))) throw new Error("Published release requires a real HTTPS APK URL, both SHA-256 fingerprints, file size and release date.");
  }
  return m;
}
