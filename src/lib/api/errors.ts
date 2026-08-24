import type { ApiErrorCode } from '@/types/api'

/** Throw this from services; route handlers translate it into a response. */
export class AppError extends Error {
  readonly code: ApiErrorCode
  readonly fields?: Record<string, string[]>

  constructor(
    code: ApiErrorCode,
    message: string,
    options?: { fields?: Record<string, string[]>; cause?: unknown },
  ) {
    super(message, { cause: options?.cause })
    this.name = 'AppError'
    this.code = code
    this.fields = options?.fields
  }
}

export class HttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly body?: unknown,
  ) {
    super(message)
    this.name = 'HttpError'
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError
}

/** Never leak internals to the client. Log the real thing, return a safe message. */
export function toSafeMessage(error: unknown) {
  if (isAppError(error)) return error.message
  return 'Something went wrong. Please try again.'
}
