# CashFlow website

Public bilingual CashFlow website, built with Next.js static export.

## Cloudflare Pages

Connect this GitHub repository in Cloudflare **Workers & Pages → Pages → Connect to Git**.

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Root directory | `website` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node.js | `22` |

Cloudflare supplies a free `pages.dev` address. Public configuration and release metadata are described in [the Pages guide](docs/release/cloudflare-github-deployment-guide.md) and [website/README.md](website/README.md).

## Local checks

Inside `website/`, run `npm ci`, `npm test`, `npm run build`, `npm run typecheck` and `npm run verify`. The static export is written to `website/out/`.

This repository contains the website sources and public synthetic test fixtures. The local administration dashboard, Android application, backend sources and APKs are maintained separately in the original workspace. No Cloudflare deployment is performed by uploading this repository.
