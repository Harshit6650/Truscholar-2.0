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

const nextConfig: NextConfig = {
  reactStrictMode: true,

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
