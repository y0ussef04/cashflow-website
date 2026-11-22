import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser', workers: 1, timeout: 45000,
  use: { baseURL: 'http://127.0.0.1:3009', headless: true },
  webServer: { command: 'node tests/serve-fixture.mjs', url: 'http://127.0.0.1:3009', reuseExistingServer: false, timeout: 90000 },
  reporter: [['list'], ['json', { outputFile: '../docs/evidence/final-completion/website-browser-results.json' }]],
});
