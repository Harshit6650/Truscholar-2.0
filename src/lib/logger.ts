type Level = 'debug' | 'info' | 'warn' | 'error'

type Fields = Record<string, unknown>

/**
 * Minimal structured logger. Swap the sink for Pino / OpenTelemetry later
 * without touching call sites.
 *
 * Never log secrets or personal data (names, contact details, IDs, assessment
 * results). Log identifiers you can join against, not the payload itself.
 */
const REDACTED_KEYS = new Set([
  'password',
  'token',
  'secret',
  'authorization',
  'cookie',
  'apiKey',
  'accessToken',
  'refreshToken',
  'email',
  'phone',
])

function redact(fields: Fields): Fields {
  return Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [
      key,
      REDACTED_KEYS.has(key) ? '[redacted]' : value,
    ]),
  )
}

function emit(level: Level, message: string, fields: Fields = {}) {
  const entry = {
    level,
    message,
    time: new Date().toISOString(),
    ...redact(fields),
  }

  const line = JSON.stringify(entry)

  if (level === 'error') console.error(line)
  else if (level === 'warn') console.warn(line)
  else if (process.env.NODE_ENV !== 'production') console.warn(line)
}

export const logger = {
  debug: (message: string, fields?: Fields) => emit('debug', message, fields),
  info: (message: string, fields?: Fields) => emit('info', message, fields),
  warn: (message: string, fields?: Fields) => emit('warn', message, fields),
  error: (message: string, fields?: Fields) => emit('error', message, fields),
}
