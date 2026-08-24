/** The single shape every route handler in this app responds with. */

export type ApiSuccess<T> = {
  ok: true
  data: T
}

export type ApiFailure = {
  ok: false
  error: {
    code: ApiErrorCode
    message: string
    /** Field-level messages for form validation. Never include raw input. */
    fields?: Record<string, string[]>
  }
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure

export const API_ERROR_CODES = [
  'bad_request',
  'unauthorized',
  'forbidden',
  'not_found',
  'conflict',
  'rate_limited',
  'validation_failed',
  'internal_error',
] as const

export type ApiErrorCode = (typeof API_ERROR_CODES)[number]

export const API_ERROR_STATUS: Record<ApiErrorCode, number> = {
  bad_request: 400,
  unauthorized: 401,
  forbidden: 403,
  not_found: 404,
  conflict: 409,
  rate_limited: 429,
  validation_failed: 422,
  internal_error: 500,
}
