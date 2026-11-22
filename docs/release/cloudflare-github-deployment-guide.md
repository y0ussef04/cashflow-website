# GitHub → Cloudflare Pages (free pages.dev)

Date: 2026-11-22, Africa/Cairo; checks began 2026-11-21. Status: **PREPARED / NOT PUBLISHED**. No GitHub or Cloudflare connector is available in this session and no remote authorization was supplied. Publishing requires the owner's explicit approval. The local dashboard must never be hosted publicly.

Use the prepared website-only snapshot identified in the original workspace's `docs/evidence/final-completion/github-snapshot.json`. The existing CashFlow Git history contains a historical SMS CSV; do not push that history. The snapshot contains the existing `website/` app and public assets without the dashboard, backend, APK, credentials, backups or old Git history. Creating it does not rewrite the original repository. `npm run prepare:github` in the original `website/` creates another snapshot without deleting previous ones.

## Exact manual steps after approval

1. Create an empty GitHub repository. In the prepared snapshot directory, run `git init -b main`, `git add .`, `git commit -m "Prepare CashFlow public website"`, then `git remote add origin <YOUR_GITHUB_REPOSITORY_URL>` and `git push -u origin main`. These are **owner publishing actions**; no push has been performed here. Review `git status` and `snapshot-manifest.json` first.
2. In Cloudflare, open **Workers & Pages → Create application → Pages → Connect to Git** (choose the **Pages** tab if the UI first offers Workers). Authorize that GitHub repository and select it.
3. Set production branch **main**, root directory **website**, framework preset **Next.js (Static HTML Export)** or **None**, build command **npm run build**, and build output directory **out**. Use Node **22** (`website/.node-version` supplies this). The output is `website/out` relative to the repository. Use project name `cashflow-website` if available; otherwise match `name` in `website/wrangler.jsonc` to the chosen Pages project name before deploying. Do not select `admin-dashboard` or a Workers deployment preset.
4. Set the public production variables below. After approval, select **Save and Deploy**. Cloudflare gives the project a free `https://<project-name>.pages.dev` address; no domain purchase, DNS changes, R2 bucket, Worker, API token, Docker or server is required. If a requested project name is unavailable, use the generated available name.
5. Copy the actual production `pages.dev` address into `NEXT_PUBLIC_SITE_URL` and retry the deployment once to pin canonical metadata to that stable address. Open `/`, `/privacy/`, `/terms/`, `/release-manifest.json` and an unknown route. Check RTL/LTR, mobile menu, support, pricing and response security headers. Later approved commits pushed to **main** automatically rebuild and publish this website. Keep preview-branch settings intentional; pushes to preview branches can also create public preview deployments.

## Variables actually used

| Variable | Requirement | Value source |
|---|---|---|
| `NEXT_PUBLIC_SUPPORT_EMAIL` | Required for the customer release/privacy contact | Owner's real support email |
| `NEXT_PUBLIC_LEGAL_ENTITY` | Required for final operator/privacy/terms copy | Owner's real business/person identity; a registered company is not assumed |
| `NEXT_PUBLIC_CATALOG_SIGNING_PUBLIC_KEYS` | Required to show official pricing/support | Production P-256 **public** SPKI key ring, `keyId=base64;keyId2=base64` |
| `NEXT_PUBLIC_SITE_URL` | Set to the actual stable Pages URL after project creation | Free generated production `pages.dev` URL |
| `NEXT_PUBLIC_WHATSAPP_URL` | Optional override | Existing contact remains; override only with the owner's official `https://wa.me/<digits>` link |

Cloudflare supplies `CF_PAGES_URL` automatically; it is a build-time fallback before a stable canonical URL is set. Local builds without either URL use localhost. The website's read-only Gateway endpoint is pinned in `website/src/lib/config.ts` to the existing Production Supabase project. **The website needs no Supabase API key, anon key, service-role credential or private signing key.** Pricing stays unavailable without a trusted key ring, valid signature and fresh catalog. Supabase Edge deployment/CORS/Auth behavior remains **NOT VERIFIED** until separately authorized and checked.

APK availability comes only from `website/public/release-manifest.json`, rebuilt with the website. Old `NEXT_PUBLIC_APK_*` variables are no longer used. Keep `PENDING_RELEASE` until a real signed APK, approved HTTPS download URL, file SHA-256, signer-certificate SHA-256, byte count and release date are verified. An APK host is not required to publish the informational website. APK distribution is a separate owner-approved action; no upload/distribution has been performed or required by this preparation.

## Local verification

In `website/`: `npm ci`, `npm test`, `npm run typecheck`, `npm run build`, `npm run verify`. `npm start` serves the static output locally with Cloudflare Pages routing/headers at `http://127.0.0.1:8789`; it does not publish. Optional browser fixtures: `npx playwright install chromium`, then `npm run test:browser` (ephemeral synthetic catalogs only; no production integration claim).

The Cloudflare account/GitHub authorization, project existence, Git integration and public deployment are **NOT VERIFIED / OWNER ACTION REQUIRED**. The prepared configuration and successful local export establish the build settings, not that automatic deployment already exists.
