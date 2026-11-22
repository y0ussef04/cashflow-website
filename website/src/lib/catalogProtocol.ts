// CashFlow Signed Dynamic Catalog v1 — Browser / WebCrypto Verifier
// Converts strict ASN.1 DER P-256 signatures to 64-byte IEEE P1363 (r || s)
// for WebCrypto subtle.verify, enforces RFC 8785 JCS canonicalization,
// domain separation, pinned public key ring, and environment/project_ref pinning.

export interface SignedEnvelope {
  payload_b64u: string;
  signature_b64u: string;
}

export interface VerifiedCatalogSummary {
  sequence: string;
  config_version: number;
  environment: "STAGING" | "PRODUCTION";
  project_ref: string;
  key_id: string;
  payload_sha256: string;
  issued_at_ms: number;
  not_before_ms: number;
  refresh_by_ms: number;
  expires_at_ms: number;
  plans: Array<Record<string, unknown>>;
  offers: Array<Record<string, unknown>>;
  payment_settings: Record<string, unknown>;
  ui_content: Record<string, unknown>;
  support: Record<string, unknown>;
  checkout_policy: Record<string, unknown>;
}

const DOMAIN_CATALOG = "CashFlow-Catalog-v1\n";

export function canonicalizeJcs(value: unknown): string {
  if (value === null) return "null";
  const t = typeof value;
  if (t === "boolean") return value ? "true" : "false";
  if (t === "number") {
    if (!Number.isFinite(value as number)) throw new Error("Non-finite number in JCS");
    return Object.is(value, -0) ? "0" : JSON.stringify(value);
  }
  if (t === "string") return JSON.stringify(value);
  if (Array.isArray(value)) {
    return "[" + value.map((v) => canonicalizeJcs(v)).join(",") + "]";
  }
  if (t === "object") {
    const obj = value as Record<string, unknown>;
    const keys = Object.keys(obj)
      .filter((k) => obj[k] !== undefined)
      .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    return "{" + keys.map((k) => JSON.stringify(k) + ":" + canonicalizeJcs(obj[k])).join(",") + "}";
  }
  throw new Error(`Unsupported JCS type: ${t}`);
}

function base64UrlToBytes(b64u: string): Uint8Array {
  if (!/^[A-Za-z0-9_-]+$/.test(b64u)) throw new Error("Invalid unpadded base64url");
  const norm = b64u.replace(/-/g, "+").replace(/_/g, "/");
  const padded = norm.padEnd(norm.length + ((4 - (norm.length % 4)) % 4), "=");
  const bin = atob(padded);
  if (btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") !== b64u) throw new Error("Non-canonical base64url");
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function base64ToBytes(b64: string): Uint8Array {
  const cleaned = b64
    .replace(/-----BEGIN [A-Z ]+-----/g, "")
    .replace(/-----END [A-Z ]+-----/g, "")
    .replace(/\s+/g, "");
  const bin = atob(cleaned);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

/**
 * Strictly converts ASN.1 DER ECDSA P-256 signature to 64-byte raw (r || s) for WebCrypto.
 * Rejects trailing bytes, non-minimal integers, and invalid lengths.
 */
export function derToRawP1363(der: Uint8Array): Uint8Array {
  if (der.length < 8 || der.length > 72 || der[0] !== 0x30) {
    throw new Error("Invalid DER sequence header");
  }
  const seqLen = der[1];
  if (seqLen + 2 !== der.length) {
    throw new Error("Invalid DER sequence length");
  }
  let offset = 2;
  const readInt = (): Uint8Array => {
    if (offset + 2 > der.length || der[offset] !== 0x02) throw new Error("Expected ASN.1 INTEGER");
    const len = der[offset + 1];
    offset += 2;
    if (len === 0 || offset + len > der.length) throw new Error("Invalid INTEGER length");
    let slice = der.slice(offset, offset + len);
    offset += len;
    if ((slice[0] & 0x80) !== 0) throw new Error("Negative DER integer");
    if (slice.length > 1 && slice[0] === 0x00 && (slice[1] & 0x80) === 0) {
      throw new Error("Non-minimal DER integer padding");
    }
    if (slice[0] === 0x00) slice = slice.slice(1);
    if (slice.length > 32) throw new Error("P-256 integer exceeds 32 bytes");
    const padded = new Uint8Array(32);
    padded.set(slice, 32 - slice.length);
    return padded;
  };
  const r = readInt();
  const s = readInt();
  if (offset !== der.length) throw new Error("Trailing bytes after DER signature");
  const raw = new Uint8Array(64);
  raw.set(r, 0);
  raw.set(s, 32);
  return raw;
}

async function sha256Hex(bytes: Uint8Array): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifySignedCatalogEnvelope(
  envelope: SignedEnvelope,
  opts: {
    expectedEnvironment: "STAGING" | "PRODUCTION";
    expectedProjectRef: string;
    trustedPublicKeys: Record<string, string>;
    nowMs?: number;
    highWater?: { sequence: string; payloadSha256: string };
  },
): Promise<{ ok: true; catalog: VerifiedCatalogSummary } | { ok: false; code: string; message: string }> {
  try {
    const payloadBytes = base64UrlToBytes(envelope.payload_b64u);
    if (payloadBytes.byteLength > 131072) {
      return { ok: false, code: "PAYLOAD_TOO_LARGE", message: "Catalog payload exceeds 128 KiB limit." };
    }
    const payloadText = new TextDecoder("utf-8", { fatal: true }).decode(payloadBytes);
    const parsed = JSON.parse(payloadText) as Record<string, unknown>;
    if (canonicalizeJcs(parsed) !== payloadText) {
      return { ok: false, code: "NON_CANONICAL_JSON", message: "Catalog payload is not canonical JCS." };
    }
    if (parsed.protocol !== "cashflow.catalog.v1" || parsed.algorithm !== "ECDSA_P256_SHA256_DER") {
      return { ok: false, code: "UNSUPPORTED_PROTOCOL", message: "Unsupported catalog protocol or algorithm." };
    }
    if (parsed.environment !== opts.expectedEnvironment || parsed.project_ref !== opts.expectedProjectRef) {
      return { ok: false, code: "ENVIRONMENT_MISMATCH", message: "Catalog environment or project reference mismatch." };
    }
    const keyId = String(parsed.key_id ?? "");
    const spkiB64 = opts.trustedPublicKeys[keyId];
    if (!spkiB64) {
      return { ok: false, code: "UNKNOWN_KEY_ID", message: `Untrusted catalog signing key: ${keyId}` };
    }
    const spkiBytes = base64ToBytes(spkiB64);
    const pubKey = await crypto.subtle.importKey(
      "spki",
      spkiBytes.buffer.slice(spkiBytes.byteOffset, spkiBytes.byteOffset + spkiBytes.byteLength) as ArrayBuffer,
      { name: "ECDSA", namedCurve: "P-256" },
      false,
      ["verify"],
    );

    const derSig = base64UrlToBytes(envelope.signature_b64u);
    const rawSig = derToRawP1363(derSig);
    const domainBytes = new TextEncoder().encode(DOMAIN_CATALOG);
    const signingInput = new Uint8Array(domainBytes.length + payloadBytes.length);
    signingInput.set(domainBytes, 0);
    signingInput.set(payloadBytes, domainBytes.length);

    const valid = await crypto.subtle.verify(
      { name: "ECDSA", hash: "SHA-256" },
      pubKey,
      rawSig.buffer as ArrayBuffer,
      signingInput.buffer as ArrayBuffer,
    );
    if (!valid) {
      return { ok: false, code: "INVALID_SIGNATURE", message: "Catalog signature verification failed." };
    }

    const payload_sha256 = await sha256Hex(payloadBytes);
    const sequence = parsed.sequence;
    if (typeof sequence !== "string" || !/^[1-9][0-9]{0,15}$/.test(sequence) || BigInt(sequence) > BigInt(Number.MAX_SAFE_INTEGER)) throw new Error("Invalid sequence");
    const required = parsed.minimum_client_capabilities;
    if (!Array.isArray(required) || required.some(c => !["signed_catalog_v1", "minor_units_egp_v1"].includes(String(c)))) return { ok: false, code: "UNSUPPORTED_CAPABILITY", message: "Unsupported catalog capability." };
    const times = [parsed.issued_at_ms, parsed.not_before_ms, parsed.refresh_by_ms, parsed.expires_at_ms];
    if (times.some(v => typeof v !== "number" || !Number.isSafeInteger(v) || v <= 0) ||
        Number(parsed.not_before_ms) < Number(parsed.issued_at_ms) || Number(parsed.refresh_by_ms) <= Number(parsed.not_before_ms) || Number(parsed.expires_at_ms) < Number(parsed.refresh_by_ms)) throw new Error("Invalid catalog timestamps");
    const now = opts.nowMs ?? Date.now();
    if (now < Number(parsed.not_before_ms)) return { ok: false, code: "CATALOG_NOT_YET_VALID", message: "Catalog is not yet valid." };
    if (now >= Number(parsed.expires_at_ms)) return { ok: false, code: "CATALOG_EXPIRED", message: "Catalog expired." };
    if (opts.highWater && (BigInt(sequence) < BigInt(opts.highWater.sequence) || (sequence === opts.highWater.sequence && payload_sha256 !== opts.highWater.payloadSha256))) return { ok: false, code: "CATALOG_ROLLBACK", message: "Catalog rollback or conflicting publication." };
    if (!Number.isSafeInteger(parsed.config_version) || Number(parsed.config_version) < 1 || !Array.isArray(parsed.plans) || parsed.plans.length > 64) throw new Error("Invalid catalog schema");
    const codes = new Set<string>();
    for (const raw of parsed.plans) {
      const p = raw as Record<string, unknown>;
      if (!p || typeof p.plan_code !== "string" || !/^[A-Z][A-Z0-9_]{1,63}$/.test(p.plan_code) || p.plan_code === "TRIAL" || codes.has(p.plan_code) ||
          typeof p.price_minor !== "string" || !/^[1-9][0-9]*$/.test(p.price_minor) || BigInt(p.price_minor) < 100n || BigInt(p.price_minor) > 100000000n || p.currency !== "EGP" ||
          !Number.isSafeInteger(p.duration_days) || Number(p.duration_days) < 1 || Number(p.duration_days) > 36500 ||
          !Number.isSafeInteger(p.plan_version) || Number(p.plan_version) < 1 || typeof p.title_ar !== "string" || p.title_ar.length < 2 || typeof p.title_en !== "string" || p.title_en.length < 2 ||
          typeof p.is_active !== "boolean" || typeof p.is_visible !== "boolean") throw new Error("Invalid plan schema");
      codes.add(p.plan_code);
    }
    const policy = parsed.checkout_policy as Record<string, unknown>;
    if (!policy || typeof policy.sales_enabled !== "boolean" || !Array.isArray(policy.allowed_payment_methods) || policy.allowed_payment_methods.some(v => !["VODAFONE_CASH", "INSTAPAY"].includes(String(v)))) throw new Error("Invalid checkout policy");
    return {
      ok: true,
      catalog: {
        sequence: String(parsed.sequence),
        config_version: Number(parsed.config_version),
        environment: parsed.environment as "STAGING" | "PRODUCTION",
        project_ref: String(parsed.project_ref),
        key_id: keyId,
        payload_sha256,
        issued_at_ms: Number(parsed.issued_at_ms),
        not_before_ms: Number(parsed.not_before_ms),
        refresh_by_ms: Number(parsed.refresh_by_ms),
        expires_at_ms: Number(parsed.expires_at_ms),
        plans: Array.isArray(parsed.plans) ? (parsed.plans as Array<Record<string, unknown>>) : [],
        offers: Array.isArray(parsed.offers) ? (parsed.offers as Array<Record<string, unknown>>) : [],
        payment_settings: (parsed.payment_settings as Record<string, unknown>) ?? {},
        ui_content: (parsed.ui_content as Record<string, unknown>) ?? {},
        support: (parsed.support as Record<string, unknown>) ?? {},
        checkout_policy: (parsed.checkout_policy as Record<string, unknown>) ?? {},
      },
    };
  } catch (err) {
    return {
      ok: false,
      code: "MALFORMED_ENVELOPE",
      message: err instanceof Error ? err.message : "Failed to verify catalog envelope.",
    };
  }
}
