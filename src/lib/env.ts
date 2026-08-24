import { z } from 'zod'

/**
 * Fail fast on bad configuration instead of discovering it at request time.
 *
 * Server variables are only ever read on the server. Client variables must be
 * prefixed NEXT_PUBLIC_ and are inlined into the browser bundle at build time,
 * so nothing secret may live there.
 */
const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  API_BASE_URL: z.union([z.url(), z.literal('')]).optional(),

  // Uncomment as these services get wired up.
  // DATABASE_URL: z.url(),
  // AUTH_SECRET: z.string().min(32),
})

const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url().default('http://localhost:3000'),
  NEXT_PUBLIC_ENABLE_ANALYTICS: z
    .enum(['true', 'false'])
    .default('false')
    .transform((value) => value === 'true'),
})

function parse<T extends z.ZodType>(schema: T, source: unknown, label: string): z.infer<T> {
  const result = schema.safeParse(source)

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`)
      .join('\n')
    throw new Error(`Invalid ${label} environment variables:\n${issues}`)
  }

  return result.data
}

/** Client-safe config. Referenced literally so Next.js can inline the values. */
export const clientEnv = parse(
  clientSchema,
  {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS,
  },
  'client',
)

/**
 * Server-only config. Importing this from a Client Component is a bug — keep it
 * behind Server Components, Route Handlers and Server Actions.
 */
export const serverEnv = parse(serverSchema, process.env, 'server')

export const isProduction = serverEnv.NODE_ENV === 'production'
export const isDevelopment = serverEnv.NODE_ENV === 'development'
