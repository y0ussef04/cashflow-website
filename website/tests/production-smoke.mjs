import { chromium, expect } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
const out = resolve(import.meta.dirname, '../../docs/evidence/final-completion');
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:8789/');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('#plans')).toContainText('اعتماد الإطلاق');
  await expect(page.locator('#plans article')).toHaveCount(0);
  for (const tab of await page.locator('#preview [role="tab"]').all()) {
    await tab.click();
    const featured = page.locator('#preview img').first();
    await featured.scrollIntoViewIfNeeded();
    await expect.poll(() => featured.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
  }
  for (const img of await page.locator('img').all()) {
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate(element => element.complete && element.naturalWidth > 0)).toBe(true);
  }
  await page.screenshot({ path: resolve(out, 'website-production-ar-desktop.png'), fullPage: true });
  results.push({ check: 'Actual exported Arabic desktop: pending pricing/release, all preview images/tabs load', status: 'VERIFIED' });
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: resolve(out, 'website-production-ar-mobile.png'), fullPage: true });
  await page.getByRole('button', { name: 'Switch to English' }).click();
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('button', { name: /open.*menu/i }).click();
  await expect(page.locator('header a[href="#plans"]').last()).toBeVisible();
  await page.locator('header a[href="#plans"]').last().click();
  await expect(page.locator('#plans')).toContainText('release is approved');
  await page.screenshot({ path: resolve(out, 'website-production-en-mobile.png'), fullPage: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await page.goto('http://127.0.0.1:8789/privacy/');
  await expect(page.locator('main h1')).toContainText('Privacy');
  await page.locator('header a[href="/#plans"]').last().evaluate(element => element.click());
  await expect(page).toHaveURL(/\/#plans$/);
  await page.goto('http://127.0.0.1:8789/terms/'); await expect(page.locator('main h1')).toContainText('Terms');
  const missing = await page.goto('http://127.0.0.1:8789/unknown-export-path/');
  expect(missing.status()).toBe(404); await expect(page.locator('body')).toContainText('404');
  expect(errors).toEqual([]);
  results.push({ check: 'Actual Pages export: mobile menu, English persistence, legal links, 404 and no browser errors', status: 'VERIFIED' });
} finally { await browser.close(); }
writeFileSync(resolve(out, 'website-production-smoke.json'), JSON.stringify({ source: 'Actual production static export on local Cloudflare Pages emulator; no external production connection', results }, null, 2) + '\n');
console.log('PASS: actual Pages export browser smoke, preview images, RTL/LTR, mobile, legal navigation and 404.');
