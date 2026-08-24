import { apiSuccess } from '@/lib/api/response'

/** Liveness probe. No auth, no data — safe to expose. */
export const dynamic = 'force-dynamic'

export async function GET() {
  return apiSuccess({
    status: 'ok',
    // Version, not commit SHA — do not leak build internals publicly.
    version: process.env.npm_package_version ?? '0.0.0',
    time: new Date().toISOString(),
  })
}
