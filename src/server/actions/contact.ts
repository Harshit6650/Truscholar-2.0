'use server'

import { isAppError } from '@/lib/api/errors'
import { logger } from '@/lib/logger'
import { contactService } from '@/server/services/contact-service'

export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  fields?: Record<string, string[]>
}

/**
 * Server Action for the contact form, used with `useActionState`.
 *
 * Server Actions are POSTs to the route they live on, so `proxy.ts` matchers
 * cannot be relied on for protection — authorize inside the action itself when
 * the operation needs it.
 */
export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  try {
    await contactService.submit({
      name: formData.get('name'),
      email: formData.get('email'),
      organisation: formData.get('organisation') || undefined,
      message: formData.get('message'),
      consent: formData.get('consent') === 'on',
    })

    return { status: 'success', message: 'Thanks — we will get back to you shortly.' }
  } catch (error) {
    if (isAppError(error)) {
      return { status: 'error', message: error.message, fields: error.fields }
    }

    logger.error('contact.action.failed', {
      reason: error instanceof Error ? error.message : 'unknown',
    })

    return { status: 'error', message: 'Something went wrong. Please try again.' }
  }
}

