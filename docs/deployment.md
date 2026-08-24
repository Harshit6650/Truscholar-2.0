# Deployment

## Where things stand

The repository is already on GitHub — `origin` is
`https://github.com/Harshit6650/Truscholar-2.0.git`, and the remote `main`
matches local. `node_modules/` and `.next/` are correctly ignored, and no real
env file is committed (only `.env.example`).

So pushing works. What was missing is a **deployment target**.

## Why GitHub Pages cannot host this app as-is

GitHub Pages serves static files. It has no Node runtime. This app uses server
features, so a static export (`output: 'export'`) fails. Verified by running
the export build and reading the errors:

| Blocker                                          | Build error                                                     |
| ------------------------------------------------ | --------------------------------------------------------------- |
| `src/app/api/health/route.ts`                     | `export const dynamic = "force-dynamic" … cannot be used with "output: export"` |
| `src/app/api/v1/contact/route.ts`                 | Route handler POST — needs a server                             |
| `src/server/actions/contact.ts`                   | `Server Actions are not supported with static export.`          |
| `src/proxy.ts`                                    | Proxy/middleware is unsupported in a static export              |
| `manifest.webmanifest`, `robots.txt`, `sitemap.xml` | Needed `export const dynamic = 'force-static'` — **now fixed**   |

There is also a quieter consequence. `headers()` in `next.config.ts` is a
no-op in an export:

```
⚠ Specified "headers" will not automatically work with "output: export"
```

Which means a Pages deployment ships with **no CSP, no HSTS, no
X-Frame-Options, no Referrer-Policy** — every header in `next.config.ts` is
sent by the Next server, and on Pages there is no server. For a credentialing
product that is a meaningful downgrade, and it cannot be fixed from inside the
repo: GitHub Pages does not let you set response headers at all.

## Option A — a Node host (recommended)

Keeps every feature, needs **no code changes**: the contact form, the API
routes, the `/dashboard` auth gate and all the security headers keep working.

Vercel, Netlify, Cloudflare, Render and Railway all deploy a Next.js app
straight from a GitHub repo. For Vercel:

1. Sign in to Vercel with the GitHub account that owns the repo.
2. **Add New → Project**, import `Harshit6650/Truscholar-2.0`.
3. Framework preset is detected as Next.js. Leave the build settings alone.
4. Add the environment variables from `.env.example` — at minimum
   `NEXT_PUBLIC_SITE_URL`, set to the deployment URL.
5. Deploy. Every later push to `main` redeploys automatically.

Nothing in this repo needs to change for this path.

## Option B — GitHub Pages (reduced)

Possible, but the server features have to go. The config already supports it:

```bash
STATIC_EXPORT=1 PAGES_BASE_PATH=/Truscholar-2.0 npm run build
```

`STATIC_EXPORT=1` switches on `output: 'export'`, `trailingSlash` and
`images.unoptimized`. `PAGES_BASE_PATH` sets `basePath`/`assetPrefix`, which a
project page needs — served from `/<repo>`, every asset 404s without it. Both
are inert in a normal build.

Before this builds, these must be removed or replaced:

- `src/app/api/` — both route handlers
- `src/proxy.ts` — the `/dashboard` redirect gate becomes decorative, so the
  dashboard would be publicly reachable
- `src/server/actions/contact.ts` and the `useActionState` call in
  `src/app/(marketing)/contact/contact-form.tsx` — **the contact form stops
  working.** A static site has nowhere to post to; it would need a third-party
  form endpoint (Formspree, Basin) or a `mailto:` fallback

Then add a Pages workflow:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: npm
      - run: npm ci
      - run: npm run build
        env:
          STATIC_EXPORT: '1'
          PAGES_BASE_PATH: /Truscholar-2.0
          NEXT_PUBLIC_SITE_URL: https://harshit6650.github.io/Truscholar-2.0
      # Stops GitHub's Jekyll step from discarding the _next directory.
      - run: touch out/.nojekyll
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
    steps:
      - uses: actions/deploy-pages@v4
```

Then in the repo: **Settings → Pages → Source → GitHub Actions**.

## Continuous integration

`.github/workflows/ci.yml` runs typecheck, lint and build on every push and
pull request to `main`, on the Node version in `.nvmrc`, installing from the
committed lockfile with `npm ci`. This is independent of which host you pick.

## Before any public deployment

The repository contains `docs/security.md`, which lists the security work not
yet done (nonce-based CSP, rate limiting, real session verification). If this
GitHub repository is public, that file is a public list of the gaps. Either
make the repository private or move that checklist somewhere internal.

The homepage also carries claims that need a compliance read before it is
publicly reachable: the impact figures, "Trusted by 500+", and the CMMI Level 5
/ ISO 27001 / SOC 2 Type II / granted patent statements.
