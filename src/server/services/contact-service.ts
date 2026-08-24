import { z } from 'zod'

import { AppError } from '@/lib/api/errors'
import { logger } from '@/lib/logger'
import { emailSchema, nameSchema } from '@/lib/validations/common'
import { db } from '@/server/repositories'

/**
 * Business logic sits between route handlers / server actions and the data
 * layer. Validation happens here too, so every entry point gets the same rules.
 */
export const contactInputSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  organisation: z.string().trim().max(160).optional(),
  message: z.string().trim().min(10, 'Tell us a little more.').max(2000),
  /** Consent is captured explicitly — DPDP Act 2023, purpose limitation. */
  consent: z
    .boolean()
    .refine((value) => value, 'Please confirm you agree to be contacted.'),
})

export type ContactInput = z.infer<typeof contactInputSchema>

export const contactService = {
  async submit(raw: unknown) {
    const parsed = contactInputSchema.safeParse(raw)

    if (!parsed.success) {
      throw new AppError('validation_failed', 'Some fields need attention.', {
        fields: z.flattenError(parsed.error).fieldErrors as Record<string, string[]>,
      })
    }

    const { consent: _consent, ...data } = parsed.data
    const enquiry = await db.contact.create(data)

    // Identifier only — never the name, email or message body.
    logger.info('contact.enquiry.created', { enquiryId: enquiry.id })

    return { id: enquiry.id }
  },
}
