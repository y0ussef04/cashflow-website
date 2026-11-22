# GitHub → Cloudflare Pages (free pages.dev)

Date: 2026-11-22, Africa/Cairo. Status: **GITHUB UPLOADED / INITIAL PAGES DEPLOYMENT VERIFIED**. GitHub repository: [y0ussef04/cashflow-website](https://github.com/y0ussef04/cashflow-website). Public site: [cashflow-website-1ur.pages.dev](https://cashflow-website-1ur.pages.dev). GitHub's Cloudflare Pages check succeeded and the public home, privacy, terms, manifest and sitemap returned HTTP 200. The local dashboard remains separate.

Use the prepared website-only snapshot identified in the original workspace's `docs/evidence/final-completion/github-snapshot.json`. The existing CashFlow Git history contains a historical SMS CSV; do not push that history. The snapshot contains the existing `website/` app and public assets without the dashboard, backend, APK, credentials, backups or old Git history. Creating it does not rewrite the original repository. `npm run prepare:github` in the original `website/` creates another snapshot without deleting previous ones.

## Existing Git connection and build settings

1. Use the existing website-only GitHub repository and its standalone publication checkout. See [the project README](../../README.md). The original CashFlow repository is kept separate. Changes pushed to `main` trigger the connected Pages build.
2. The user connected Cloudflare Pages to this repository. For another project, open **Workers & Pages → Create application → Pages → Connect to Git** and authorize the private repository. A screen requesting a Deploy command and Build token is the Workers build setup.
3. Set production branch **main**, root directory **website**, framework preset **Next.js (Static HTML Export)** or **None**, build command **npm run build**, and build output directory **out**. Use Node **22** (`website/.node-version` supplies this). The output is `website/out` relative to the repository. Use project name `cashflow-website` if available; otherwise match `name` in `website/wrangler.jsonc` to the chosen Pages project name before deploying. Do not select `admin-dashboard` or a Workers deployment preset.
4. The site now has approved public defaults for the stable URL, support email and operator. Build variables are optional overrides for those three fields. The Production public catalog key ring is still needed for official pricing. Pages automatically publishes the `out` export; no custom deploy command is used.
5. Check `/`, `/privacy/`, `/terms/`, `/release-manifest.json` and `/sitemap.xml` after changes. Canonical links and sitemap URLs use the stable `pages.dev` address, including separate canonical paths for privacy and terms. Preview deployments also use this stable canonical URL unless `NEXT_PUBLIC_SITE_URL` is explicitly overridden.

## Variables actually used

| Variable | Requirement | Value source |
|---|---|---|
| `NEXT_PUBLIC_SUPPORT_EMAIL` | Optional override of approved support contact | Default: `youssef.mohammed3204@gmail.com` |
| `NEXT_PUBLIC_LEGAL_ENTITY` | Optional override of approved operator identity | Default: `ENG.Youssef Refaat` |
| `NEXT_PUBLIC_CATALOG_SIGNING_PUBLIC_KEYS` | Required to show official pricing/support | Production P-256 **public** SPKI key ring, `keyId=base64;keyId2=base64` |
| `NEXT_PUBLIC_SITE_URL` | Optional override of the stable canonical URL | Default: `https://cashflow-website-1ur.pages.dev` |
| `NEXT_PUBLIC_WHATSAPP_URL` | Optional override | Existing contact remains; override only with the owner's official `https://wa.me/<digits>` link |

Cloudflare supplies `CF_PAGES_URL` automatically, but it may identify a temporary deployment and is not used for canonical metadata. The website's read-only Gateway endpoint is pinned in `website/src/lib/config.ts` to the existing Production Supabase project. **The website needs no Supabase API key, anon key, service-role credential or private signing key.** Pricing stays unavailable without a trusted key ring, valid signature and fresh catalog. Supabase Edge deployment/CORS/Auth behavior remains **NOT VERIFIED** until separately authorized and checked.

APK availability comes only from `website/public/release-manifest.json`, rebuilt with the website. Old `NEXT_PUBLIC_APK_*` variables are no longer used. Keep `PENDING_RELEASE` until a real signed APK, approved HTTPS download URL, file SHA-256, signer-certificate SHA-256, byte count and release date are verified. An APK host is not required to publish the informational website. APK distribution is a separate owner-approved action; no upload/distribution has been performed or required by this preparation.

## Local verification

In `website/`: `npm ci`, `npm test`, `npm run typecheck`, `npm run build`, `npm run verify`. `npm start` serves the static output locally with Cloudflare Pages routing/headers at `http://127.0.0.1:8789`; it does not publish. Optional browser fixtures: `npx playwright install chromium`, then `npm run test:browser` (ephemeral synthetic catalogs only; no production integration claim).

The first Git-connected Pages deployment is verified through GitHub's successful check and live HTTP responses. Cloudflare account administration was not accessed locally; public defaults are maintained in the website source and can be overridden through the user's Cloudflare build variables. Real pricing and signed Production APK availability remain separate configuration work.
