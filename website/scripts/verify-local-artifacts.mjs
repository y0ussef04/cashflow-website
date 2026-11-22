import assert from 'node:assert/strict';
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadTs } from '../tests/fixtures.mjs';

const root = resolve(import.meta.dirname, '../..');
const web = resolve(import.meta.dirname, '..');
const result = [];
function test(name, fn) { fn(); result.push({ name, status: 'VERIFIED PASS' }); console.log('PASS:', name); }
test('privacy/terms routes, sitemap and exported security headers exist', () => {
  for (const path of ['privacy/index.html', 'terms/index.html', 'sitemap.xml', '_headers', 'release-manifest.json']) assert.ok(existsSync(resolve(web, 'out', path)), path);
  const sitemap = readFileSync(resolve(web, 'out/sitemap.xml'), 'utf8');
  assert.ok(sitemap.includes('/privacy')); assert.ok(sitemap.includes('/terms'));
  assert.equal(readFileSync(resolve(web, 'out/_headers'), 'utf8'), readFileSync(resolve(web, 'public/_headers'), 'utf8'));
});
test('release manifest agrees with Android version and SDKs', () => {
  const manifest = JSON.parse(readFileSync(resolve(web, 'out/release-manifest.json'), 'utf8'));
  const gradlePath = resolve(root, 'app/build.gradle.kts');
  if (existsSync(gradlePath)) {
    const gradle = readFileSync(gradlePath, 'utf8');
    for (const [field, pattern] of [['version_code', /versionCode = (\d+)/], ['min_sdk', /minSdk = (\d+)/], ['target_sdk', /targetSdk = (\d+)/]]) assert.equal(manifest[field], Number(pattern.exec(gradle)[1]));
    assert.equal(manifest.version_name, /versionName = "([^"]+)"/.exec(gradle)[1]);
  }
  loadTs('src/lib/releaseManifest.ts').validateReleaseManifest(manifest);
  if (manifest.status === 'PENDING_RELEASE') { assert.ok(manifest.download_url.includes('PENDING')); assert.equal(manifest.size_bytes, 0); }
});
test('configured WhatsApp contact changes displayed and clickable support phone', () => {
  const config = loadTs('src/lib/config.ts', { NEXT_PUBLIC_WHATSAPP_URL: 'https://wa.me/201000000001' });
  assert.equal(config.siteConfig.contact.supportPhoneDisplay, '+201000000001');
  assert.equal(config.siteConfig.contact.supportPhoneHref, 'tel:+201000000001');
  assert.equal(config.isApkAvailable, false);
});
test('legal statements match unencrypted Room and configurable order validity', () => {
  const privacy = readFileSync(resolve(web, 'src/app/privacy/page.tsx'), 'utf8');
  assert.ok(!privacy.includes('Room المشفرة'));
  assert.ok(readFileSync(resolve(web, 'src/app/terms/page.tsx'), 'utf8').includes('5 to 120 minutes'));
});
test('security header policy includes framing, MIME, CSP and release cache controls', () => {
  const headers = readFileSync(resolve(web, 'out/_headers'), 'utf8');
  for (const text of ['X-Frame-Options: DENY', 'X-Content-Type-Options: nosniff', "frame-ancestors 'none'", "base-uri 'self'", 'Permissions-Policy:', '/release-manifest.json', 'Cache-Control: no-store']) assert.ok(headers.includes(text));
});
test('Pages configuration and signed catalog connection policy are exported', () => {
  assert.ok(readFileSync(resolve(web, 'wrangler.jsonc'), 'utf8').includes('pages_build_output_dir'));
  assert.ok(readFileSync(resolve(web, 'out/_headers'), 'utf8').includes("connect-src 'self' https://oxttfkanbcfegyqisogp.supabase.co"));
  assert.ok(readFileSync(resolve(web, 'out/index.html'), 'utf8').includes('id="plans"'));
  assert.ok(!readFileSync(resolve(web, 'out/sitemap.xml'), 'utf8').includes('cashflow.example.com'));
});
mkdirSync(resolve(root, 'docs/evidence/final-completion'), { recursive: true });
writeFileSync(resolve(root, 'docs/evidence/final-completion/website-artifacts.json'), JSON.stringify({ results: result, release: 'BLOCKED BY OWNER INPUT', runtime_headers: 'See final local Pages HTTP evidence' }, null, 2)+'\n');
