import { NextResponse } from 'next/server'
import type { z } from 'zod'

import { API_ERROR_STATUS, type ApiErrorCode, type ApiResponse } from '@/types/api'

/** Every route handler returns through these two helpers, so clients see one shape. */
export function apiSuccess<T>(data: T, init?: ResponseInit) {
  return NextResponse.json<ApiResponse<T>>({ ok: true, data }, { status: 200, ...init })
}

export function apiError(
  code: ApiErrorCode,
  message: string,
  fields?: Record<string, string[]>,
) {
  return NextResponse.json<ApiResponse<never>>(
    { ok: false, error: { code, message, ...(fields ? { fields } : {}) } },
    { status: API_ERROR_STATUS[code] },
  )
}

/** Turn a Zod failure into a field-level error payload without echoing input back. */
export function apiValidationError(error: z.ZodError) {
  const fields: Record<string, string[]> = {}

  for (const issue of error.issues) {
    const key = issue.path.join('.') || '_'
    fields[key] = [...(fields[key] ?? []), issue.message]
  }

  return apiError('validation_failed', 'Some fields need attention.', fields)
}
