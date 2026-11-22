import { test, expect } from '@playwright/test';
const endpoint = 'https://oxttfkanbcfegyqisogp.supabase.co/functions/v1/license-gateway';
async function catalog(page: import('@playwright/test').Page, mode = '') {
  await page.route(endpoint, async route => {
    const data = await page.request.get(`http://127.0.0.1:3010/?mode=${mode}`);
    await route.fulfill({ status: 200, contentType: 'application/json', body: await data.text() });
  });
}
test('Arabic desktop and English mobile show verified decimal pricing/support with no overflow', async ({ page }) => {
  await catalog(page);
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('#plans')).toContainText('199.50');
  await expect(page.locator('#support a[href="https://wa.me/201000000001"]')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await page.getByRole('button', { name: /switch.*english|التبديل إلى الإنجليزية/i }).first().click();
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await expect(page.locator('#plans')).toContainText('Monthly plan');
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: '../docs/evidence/final-completion/website-en-mobile.png', fullPage: true });
  await page.reload(); await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  expect(errors).toEqual([]);
});
for (const mode of ['tampered', 'expired', 'paused']) test(`${mode} catalog hides prices and keeps error/paused state`, async ({ page }) => {
  await catalog(page, mode); await page.goto('/');
  await expect(page.locator('#plans [role="status"]')).not.toContainText('جاري');
  await expect(page.locator('#plans article')).toHaveCount(0);
  if (mode !== 'paused') await expect(page.locator('#plans button')).toBeVisible();
});
test('network failure offers a working retry', async ({ page }) => {
  await page.route(endpoint, route => route.abort()); await page.goto('/');
  const retry = page.locator('#plans button'); await expect(retry).toBeVisible();
  await page.unroute(endpoint); await catalog(page); await retry.click();
  await expect(page.locator('#plans')).toContainText('199.50');
});
test('legal navigation returns to real home anchors; pending release cannot download', async ({ page }) => {
  await catalog(page); await page.goto('/privacy/');
  await expect(page.locator('main h1')).toContainText('الخصوصية');
  await page.locator('header nav a[href="/#plans"]').click();
  await expect(page).toHaveURL(/\/#plans$/);
  await expect(page.locator('#plans')).toContainText('199.50');
  await page.goto('/terms/'); await expect(page.locator('main h1')).toContainText('شروط');
  await page.goto('/'); await expect(page.locator('#download a[download]')).toHaveCount(0);
  await expect(page.locator('#download button[disabled]')).toBeVisible();
  await page.goto('/missing-route/'); await expect(page.locator('body')).toContainText('404');
});
