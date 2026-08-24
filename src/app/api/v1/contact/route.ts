import { isAppError } from '@/lib/api/errors'
import { apiError, apiSuccess } from '@/lib/api/response'
import { logger } from '@/lib/logger'
import { contactService } from '@/server/services/contact-service'

/**
 * Reference route handler: parse → delegate to a service → return the envelope.
 * The handler never touches the data layer directly.
 */
export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return apiError('bad_request', 'Expected a JSON body.')
  }

  try {
    const result = await contactService.submit(body)
    return apiSuccess(result, { status: 201 })
  } catch (error) {
    if (isAppError(error)) {
      return apiError(error.code, error.message, error.fields)
    }

    logger.error('api.contact.failed', {
      reason: error instanceof Error ? error.message : 'unknown',
    })

    return apiError('internal_error', 'Something went wrong. Please try again.')
  }
}
