import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fixture, loadTs, verifier } from './fixtures.mjs';

test('actual Gateway golden catalog verifies with exact minor units', async () => {
  const vectors = loadTs('src/lib/config.ts', {}, { '../../public/release-manifest.json': {
    status: 'PENDING_RELEASE', application_id: 'com.cashflow.app', version_name: '1.1.0', version_code: 2, min_sdk: 26, target_sdk: 35,
  } });
  assert.equal(vectors.isApkAvailable, false);
  const { readFileSync, existsSync } = await import('node:fs');
  const source = new URL('../../supabase/tests/catalog-golden-vectors.json', import.meta.url);
  const golden = JSON.parse(readFileSync(existsSync(source) ? source : new URL('./catalog-golden-vectors.json', import.meta.url), 'utf8'));
  const payload = JSON.parse(Buffer.from(golden.catalog_v1.payload_b64u, 'base64url'));
  const result = await verifier.verifySignedCatalogEnvelope(golden.catalog_v1, { expectedEnvironment: 'PRODUCTION', expectedProjectRef: payload.project_ref,
    trustedPublicKeys: { [golden.key_id]: golden.public_key_spki_b64 }, nowMs: payload.issued_at_ms + 1000 });
  assert.equal(result.ok, true);
  assert.equal(result.catalog.plans[0].price_minor, '19950');
});
test('tampered bytes and wrong signing domain never verify', async () => {
  const f = fixture(); const envelope = f.envelope();
  const bytes = Buffer.from(envelope.signature_b64u, 'base64url'); bytes[bytes.length - 1] ^= 1;
  assert.equal((await verifier.verifySignedCatalogEnvelope({ ...envelope, signature_b64u: bytes.toString('base64url') }, f.options)).ok, false);
  assert.equal((await verifier.verifySignedCatalogEnvelope(f.envelope(f.payload, 'CashFlow-CheckoutOrder-v1\n'), f.options)).ok, false);
});
test('expiry boundary, future validity, rollback and conflicting sequence fail closed', async () => {
  const f = fixture(); const verified = await verifier.verifySignedCatalogEnvelope(f.envelope(), f.options);
  assert.equal(verified.ok, true);
  assert.equal((await verifier.verifySignedCatalogEnvelope(f.envelope(), { ...f.options, nowMs: f.payload.expires_at_ms })).code, 'CATALOG_EXPIRED');
  assert.equal((await verifier.verifySignedCatalogEnvelope(f.envelope(), { ...f.options, nowMs: f.payload.not_before_ms - 1 })).code, 'CATALOG_NOT_YET_VALID');
  assert.equal((await verifier.verifySignedCatalogEnvelope(f.envelope(), { ...f.options, highWater: { sequence: '2', payloadSha256: verified.catalog.payload_sha256 } })).code, 'CATALOG_ROLLBACK');
  assert.equal((await verifier.verifySignedCatalogEnvelope(f.envelope(), { ...f.options, highWater: { sequence: '1', payloadSha256: '0'.repeat(64) } })).code, 'CATALOG_ROLLBACK');
  assert.equal((await verifier.verifySignedCatalogEnvelope(f.envelope(), { ...f.options, highWater: { sequence: '1', payloadSha256: verified.catalog.payload_sha256 } })).ok, true);
});
test('wrong environment, unknown keys, capabilities and malformed signed price are rejected', async () => {
  const f = fixture();
  for (const change of [{ environment: 'STAGING' }, { key_id: 'unknown' }, { minimum_client_capabilities: ['unknown_v2'] },
    { plans: [{ ...f.payload.plans[0], price_minor: '199.50' }] }, { sequence: '9007199254740992' }]) {
    assert.equal((await verifier.verifySignedCatalogEnvelope(f.envelope({ ...f.payload, ...change }), f.options)).ok, false);
  }
});
test('noncanonical payload, padded base64 and negative DER integers are rejected', async () => {
  const f = fixture(); const envelope = f.envelope();
  assert.equal((await verifier.verifySignedCatalogEnvelope({ ...envelope, payload_b64u: envelope.payload_b64u + '=' }, f.options)).ok, false);
  assert.equal((await verifier.verifySignedCatalogEnvelope({ ...envelope, payload_b64u: Buffer.from(JSON.stringify(f.payload)).toString('base64url') }, f.options)).ok, false);
  assert.throws(() => verifier.derToRawP1363(Uint8Array.from([48,6,2,1,128,2,1,1])));
});
test('pending manifest and obsolete APK environment variables never enable download', () => {
  const config = loadTs('src/lib/config.ts', { NEXT_PUBLIC_APK_DOWNLOAD_URL: 'https://downloads.invalid/demo.apk', CF_PAGES_URL: 'https://local-fixture.pages.dev' });
  assert.equal(config.isApkAvailable, false); assert.equal(config.siteConfig.apk.downloadUrl, null);
  assert.equal(config.siteConfig.siteUrl, 'https://local-fixture.pages.dev');
});
test('a base64 alias of the same valid signature bytes is rejected', async () => {
  const f = fixture(); let envelope;
  for (let attempt = 0; attempt < 32; attempt++) {
    envelope = f.envelope();
    if (envelope.signature_b64u.length % 4 !== 0) break;
  }
  assert.notEqual(envelope.signature_b64u.length % 4, 0);
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  const signature = envelope.signature_b64u;
  const alias = signature.slice(0, -1) + alphabet[alphabet.indexOf(signature.at(-1)) + 1];
  assert.deepEqual(Buffer.from(alias, 'base64url'), Buffer.from(signature, 'base64url'));
  assert.equal((await verifier.verifySignedCatalogEnvelope(envelope, f.options)).ok, true);
  assert.equal((await verifier.verifySignedCatalogEnvelope({ ...envelope, signature_b64u: alias }, f.options)).ok, false);
});
test('published release needs complete matching Android identity and integrity metadata', () => {
  const { validateReleaseManifest } = loadTs('src/lib/releaseManifest.ts');
  const published = { status: 'PUBLISHED', application_id: 'com.cashflow.app', version_name: '1.1.0', version_code: 2, min_sdk: 26, target_sdk: 35,
    download_url: 'https://downloads.invalid/CashFlow-v1.1.0.apk', apk_sha256: 'a'.repeat(64), signer_cert_sha256: 'b'.repeat(64), size_bytes: 123456, released_at: '2026-11-21T12:00:00Z' };
  assert.equal(validateReleaseManifest(published).status, 'PUBLISHED');
  for (const changes of [{ download_url: 'javascript:alert(1)' }, { download_url: 'https://user:password@downloads.invalid/app.apk' }, { apk_sha256: '' }, { signer_cert_sha256: '' }, { size_bytes: 0 }, { version_code: 1 }, { released_at: null }]) assert.throws(() => validateReleaseManifest({ ...published, ...changes }));
});
test('public config validates contact/keyring and emits no custom-domain fallback', () => {
  const f = fixture(); const config = loadTs('src/lib/config.ts', { NEXT_PUBLIC_CATALOG_SIGNING_PUBLIC_KEYS: `local-test=${f.publicKey}`, NEXT_PUBLIC_WHATSAPP_URL: 'https://wa.me/201000000001' });
  assert.equal(config.siteConfig.contact.supportPhoneHref, 'tel:+201000000001');
  assert.equal(config.siteConfig.contact.supportPhoneDisplay, '+201000000001');
  assert.equal(config.siteConfig.siteUrl, 'http://localhost:3000');
  assert.throws(() => loadTs('src/lib/config.ts', { NEXT_PUBLIC_CATALOG_SIGNING_PUBLIC_KEYS: 'private=not-a-public-key' }));
  assert.throws(() => loadTs('src/lib/config.ts', { NEXT_PUBLIC_SUPPORT_EMAIL: 'bad\naddress' }));
});
