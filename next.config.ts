import type { NextConfig } from 'next'

/**
 * Security headers applied to every response.
 * CSP is intentionally strict; loosen it deliberately (per-source) rather than
 * reaching for `unsafe-*` wholesale.
 *
 * NOTE: `'unsafe-inline'` on script-src is required by Next.js' inline
 * bootstrap in dev. In production we rely on nonces once auth/CSP middleware
 * is wired up — see docs/security.md.
 */
const isDev = process.env.NODE_ENV === 'development'

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self' data:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
]

/**
 * GitHub Pages serves static files only — no Node runtime. Setting
 * STATIC_EXPORT=1 switches the build to a static export for that target.
 *
 * A project page is served from a sub-path (/<repo>), so basePath and
 * assetPrefix have to match or every asset 404s. PAGES_BASE_PATH carries it.
 *
 * `headers()` and `poweredByHeader` are no-ops in an export: there is no
 * server to send them, so the security headers in this file DO NOT apply to a
 * Pages deployment. See docs/deployment.md.
 */
const isStaticExport = process.env.STATIC_EXPORT === '1'
const basePath = process.env.PAGES_BASE_PATH ?? ''

const nextConfig: NextConfig = {
  reactStrictMode: true,

  ...(isStaticExport
    ? {
        output: 'export' as const,
        basePath,
        assetPrefix: basePath || undefined,
        // Directory-style URLs so Pages resolves /about to /about/index.html.
        trailingSlash: true,
        // The Image optimiser needs a server; without this, <Image> 404s.
        images: { unoptimized: true },
      }
    : {}),

  // Statically typed `<Link href>` and router calls. Stable in Next.js 16.
  typedRoutes: true,

  // Opt in when you are ready to adopt `use cache` + PPR everywhere.
  // cacheComponents: true,

  // `next lint` and the `eslint` config option were removed in Next.js 16.
  // Type errors still fail the build by default; keep it that way.
  typescript: { ignoreBuildErrors: false },

  poweredByHeader: false,

  images: {
    // Add remote hosts explicitly as they are needed.
    remotePatterns: [],
  },

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig
