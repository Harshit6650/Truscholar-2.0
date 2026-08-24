import { HttpError } from './errors'

import type { ApiResponse } from '@/types/api'

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown
  /** Query params. Never put secrets or personal data here. */
  query?: Record<string, string | number | boolean | undefined>
}

function buildUrl(path: string, query?: RequestOptions['query']) {
  const base = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || ''
  const url = new URL(path, base || 'http://localhost:3000')

  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined) url.searchParams.set(key, String(value))
  }

  return base ? url.toString() : `${url.pathname}${url.search}`
}

/**
 * Thin typed wrapper over fetch that unwraps the `ApiResponse` envelope.
 * Works on the server and in the browser.
 */
export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, query, headers, ...rest } = options

  const response = await fetch(buildUrl(path, query), {
    ...rest,
    headers: {
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  })

  let payload: ApiResponse<T> | undefined

  try {
    payload = (await response.json()) as ApiResponse<T>
  } catch {
    // Non-JSON response — fall through to the status-based error below.
  }

  if (!response.ok || !payload?.ok) {
    const message =
      payload && !payload.ok ? payload.error.message : `Request failed (${response.status})`
    throw new HttpError(response.status, message, payload)
  }

  return payload.data
}

export const api = {
  get: <T>(path: string, options?: RequestOptions) =>
    apiFetch<T>(path, { ...options, method: 'GET' }),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    apiFetch<T>(path, { ...options, method: 'POST', body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    apiFetch<T>(path, { ...options, method: 'PATCH', body }),
  delete: <T>(path: string, options?: RequestOptions) =>
    apiFetch<T>(path, { ...options, method: 'DELETE' }),
}
