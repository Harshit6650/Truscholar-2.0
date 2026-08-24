/**
 * Dependency-free auth constants.
 *
 * `proxy.ts` imports from here rather than from `session.ts`, which pulls in
 * `next/headers` — not available in the proxy execution context.
 */
export const SESSION_COOKIE = 'ts_session'
