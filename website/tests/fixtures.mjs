import { generateKeyPairSync, sign } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';

export function loadTs(path, env = {}, overrides = {}) {
  const absolute = resolve(import.meta.dirname, '../', path);
  const exports = {};
  const source = readFileSync(absolute, 'utf8');
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  const require = name => {
    if (Object.hasOwn(overrides, name)) return overrides[name];
    if (name.endsWith('.json')) return JSON.parse(readFileSync(resolve(absolute, '..', name), 'utf8'));
    return loadTs(resolve(absolute, '..', name + '.ts'), env, overrides);
  };
  vm.runInNewContext(js, { exports, require, process: { env }, crypto: globalThis.crypto, atob, btoa, TextDecoder, TextEncoder, URL, Buffer });
  return exports;
}
export const verifier = loadTs('src/lib/catalogProtocol.ts');
export function fixture() {
  const keys = generateKeyPairSync('ec', { namedCurve: 'prime256v1' });
  const publicKey = keys.publicKey.export({ type: 'spki', format: 'der' }).toString('base64');
  const now = Date.now();
  const payload = {
    protocol: 'cashflow.catalog.v1', algorithm: 'ECDSA_P256_SHA256_DER', environment: 'PRODUCTION', project_ref: 'oxttfkanbcfegyqisogp', key_id: 'local-test',
    minimum_client_capabilities: ['signed_catalog_v1', 'minor_units_egp_v1'], sequence: '1', config_version: 2,
    issued_at_ms: now - 1000, not_before_ms: now - 1000, refresh_by_ms: now + 240000, expires_at_ms: now + 300000,
    plans: [{ plan_code: 'MONTHLY', plan_version: 1, title_ar: 'الباقة الشهرية', title_en: 'Monthly plan', description_ar: 'حسابات محلية', description_en: 'Local accounting',
      price_minor: '19950', currency: 'EGP', duration_days: 30, is_active: true, is_visible: true }], offers: [],
    payment_settings: { vodafone_cash_enabled: true, vodafone_cash_number: '01000000001' }, ui_content: {}, support: { whatsapp_number: '201000000001' },
    checkout_policy: { sales_enabled: true, order_validity_minutes: 30, allowed_payment_methods: ['VODAFONE_CASH'] },
  };
  function envelope(value = payload, domain = 'CashFlow-Catalog-v1\n') {
    const text = verifier.canonicalizeJcs(value);
    return { payload_b64u: Buffer.from(text).toString('base64url'), signature_b64u: sign('SHA256', Buffer.from(domain + text), keys.privateKey).toString('base64url') };
  }
  return { payload, envelope, publicKey, options: { expectedEnvironment: 'PRODUCTION', expectedProjectRef: payload.project_ref, trustedPublicKeys: { 'local-test': publicKey }, nowMs: now } };
}
