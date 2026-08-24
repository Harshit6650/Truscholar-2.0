import { NextResponse, type NextRequest } from 'next/server'

import { SESSION_COOKIE } from '@/lib/auth/constants'

/**
 * Runs before routes render (Next.js 16 renamed `middleware` to `proxy`).
 *
 * Treat this as a cheap first gate only. Server Actions are POSTs to the route
 * they live on, so a matcher change can silently drop coverage — every
 * protected page, action and route handler must authorize itself as well
 * (see `requireSession` in src/lib/auth/session.ts).
 */
const PROTECTED_PREFIXES = ['/dashboard']
const AUTH_ROUTES = ['/login', '/register']

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const hasSessionCookie = request.cookies.has(SESSION_COOKIE)

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )

  if (isProtected && !hasSessionCookie) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.search = ''
    url.searchParams.set('next', `${pathname}${search}`)
    return NextResponse.redirect(url)
  }

  // Signed-in users have no business on the sign-in screens.
  if (AUTH_ROUTES.includes(pathname) && hasSessionCookie) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    url.search = ''
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Everything except static assets and metadata files.
    '/((?!_next/static|_next/image|favicon.ico|icon.svg|sitemap.xml|robots.txt|manifest.webmanifest).*)',
  ],
}
