import { cache } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { authNav } from '@/config/nav'

import { SESSION_COOKIE } from './constants'

import type { Role, Session } from './types'

export { SESSION_COOKIE } from './constants'

/**
 * Session boundary. Everything auth-related in the app goes through here, so
 * swapping in Auth.js / a JWT / an opaque session store is a one-file change.
 *
 * Currently a stub: it reads a session cookie and resolves nothing. No
 * credentials, no tokens, no fake users.
 */
export const getSession = cache(async (): Promise<Session | null> => {
  const store = await cookies()
  const token = store.get(SESSION_COOKIE)?.value

  if (!token) return null

  // TODO: verify `token` against the session store and hydrate the user.
  // Until then, treat every request as unauthenticated rather than trusting
  // the cookie's contents.
  return null
})

/**
 * Use in Server Components, Server Actions and Route Handlers.
 *
 * Authorization is checked here, not only in `proxy.ts` — a proxy matcher
 * change must never be able to silently un-protect a Server Action.
 */
export async function requireSession(): Promise<Session> {
  const session = await getSession()
  if (!session) redirect(authNav.login)
  return session
}

export async function requireRole(...allowed: Role[]): Promise<Session> {
  const session = await requireSession()
  if (!allowed.includes(session.user.role)) redirect('/dashboard')
  return session
}

export async function isAuthenticated() {
  return (await getSession()) !== null
}
