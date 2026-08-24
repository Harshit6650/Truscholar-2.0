# Deployment

The site deploys to **GitHub Pages** as a static export, via
`.github/workflows/deploy-pages.yml`.

Target URL: `https://harshit6650.github.io/Truscholar-2.0/`

## One-time repository setup

The workflow cannot enable Pages by itself. In the repository:

**Settings → Pages → Build and deployment → Source → GitHub Actions**

Until that is set, the workflow runs but the URL stays a 404.

## How the build works

```bash
STATIC_EXPORT=1 PAGES_BASE_PATH=/Truscholar-2.0 npm run build
```

- `STATIC_EXPORT=1` switches `next.config.ts` to `output: 'export'`, plus
  `trailingSlash` (so `/about` resolves to `/about/index.html`) and
  `images.unoptimized` (the image optimiser needs a server).
- `PAGES_BASE_PATH` sets `basePath` and `assetPrefix`. A project page is served
  from `/<repo>`, so without this every asset 404s.

Both are inert when unset, so `npm run dev` and a normal `npm run build` are
unchanged.

`manifest.webmanifest` and `robots.txt` prefix the base path by hand —
Next does not rewrite strings inside those files, so a bare `/icon.svg` would
404 on a project page.

The workflow also runs `touch out/.nojekyll`. Without it GitHub's Jekyll step
discards every directory beginning with an underscore, which is the whole
`_next` asset folder.

## What was removed to make a static export possible

GitHub Pages has no Node runtime. These were deleted, each confirmed by a build
error before removal:

| Removed                    | Why                                                    |
| -------------------------- | ------------------------------------------------------ |
| `src/app/api/`             | Route handlers need a server                            |
| `src/proxy.ts`             | Proxy/middleware unsupported in a static export         |
| `src/server/actions/`      | `Server Actions are not supported with static export`   |

Consequences, in plain terms:

- **The contact form no longer posts anywhere.** It now composes the enquiry
  into a `mailto:` and hands it to the visitor's mail client. That works with
  no server and no third-party dependency, but it is not a tracked form
  submission.
- **`/dashboard` is publicly reachable.** The redirect gate lived in
  `proxy.ts`. The dashboard only renders placeholder figures, so nothing real
  is exposed, but it is no longer gated. `robots.txt` disallows it; that is a
  crawler hint, not access control.
- **No security headers.** `headers()` in `next.config.ts` is a no-op in an
  export — the build says so explicitly:

  ```
  ⚠ rewrites, redirects, and headers are not applied when exporting
  ```

  So the deployed site has no CSP, no HSTS, no `X-Frame-Options` and no
  `Referrer-Policy`. GitHub Pages provides no way to set response headers, so
  this cannot be fixed from inside the repo.

The validation, service and repository layers are still in `src/server/`,
unused. They are the seam to restore server behaviour later.

## Restoring full functionality

Any Node-capable host runs this app with no code changes beyond putting back
the three deleted paths. On Vercel: import the repo, add
`NEXT_PUBLIC_SITE_URL`, deploy. The contact form, API routes, auth gate and
security headers all work again, and `basePath` is not needed because the site
is served from a domain root.

## Continuous integration

`.github/workflows/ci.yml` runs typecheck, lint and build on every push and
pull request to `main`, on the Node version in `.nvmrc`, installing from the
committed lockfile with `npm ci`.

## Before this URL is shared

The repository is **public**. Two things follow:

1. `docs/security.md` is a public list of security work not yet done on a
   credentialing platform. Make the repository private, or move that checklist
   somewhere internal.
2. The homepage states CMMI Level 5, ISO/IEC 27001, SOC 2 Type II and a granted
   patent, plus the impact figures and "Trusted by 500+". Those are now
   publicly published claims and want a compliance read.
