# CashFlow public website

The existing bilingual Next.js site exports static HTML to `out/` for **Cloudflare Pages**, using the free generated `pages.dev` address. The local admin dashboard is a separate application and must never be deployed publicly.

Use Node 22 and `npm ci`. Run `npm test`, `npm run typecheck`, `npm run build`, and `npm run verify`. `npm start` serves the export with Pages routing/security headers on `127.0.0.1:8789`. `npm run cf:preview` builds first. Neither command publishes.

`npm run test:browser` tests local synthetic signed catalogs in Chromium; install Chromium with `npx playwright install chromium` first. Production Supabase integration is not established by these tests.

The published defaults are `https://cashflow-website-1ur.pages.dev`, support email `youssef.mohammed3204@gmail.com`, and operator `ENG.Youssef Refaat`. Copy `.env.example` to ignored `.env.local` or use Cloudflare build variables to override these public values. `NEXT_PUBLIC_SITE_URL` overrides the stable canonical URL; the temporary `CF_PAGES_URL` is not used for canonical metadata. The Production catalog PUBLIC key ring is still required for official prices. The existing WhatsApp link can be overridden. No Supabase API key is needed by this read-only public website. Never add service-role credentials or private keys to frontend variables.

`public/release-manifest.json` is the only source of APK availability/metadata. `PENDING_RELEASE` disables download. A published manifest must match Android identity/version/SDKs and contain a verified HTTPS APK URL, both SHA-256 fingerprints, byte count and release date. All old `NEXT_PUBLIC_APK_*` variables are obsolete. Changing the manifest requires a website rebuild.

Production dependency audit is clean with PostCSS 8.5.33 pinned through an override; keep that override until the maintained Next.js 15 line updates its bundled dependency and audit is clean without it.

See [the exact GitHub/Pages instructions](../docs/release/cloudflare-github-deployment-guide.md). Cloudflare settings: branch `main`, root directory `website`, build command `npm run build`, output directory `out`. Do not use Workers, deploy the dashboard, require a paid domain, or upload an APK as part of website preparation.

`npm run prepare:github` creates a new website-only snapshot under the original workspace's ignored `scratch/release-preparation/`; it does not initialize Git or push. This keeps the historical SMS sample and all backend/local applications out of the publication repository while preserving the original history and backups. Use the prepared snapshot identified in the final report.
