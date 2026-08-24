import { z } from 'zod'

/** Reusable field schemas. Keep feature-specific schemas in src/features/*. */

export const emailSchema = z
  .email('Enter a valid email address.')
  .trim()
  .min(1, 'Email is required.')
  .max(254)

/** Indian mobile number, with or without the +91 prefix. */
export const phoneSchema = z
  .string()
  .trim()
  .regex(/^(?:\+91[-\s]?)?[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number.')

export const passwordSchema = z
  .string()
  .min(12, 'Use at least 12 characters.')
  .max(128, 'Use at most 128 characters.')
  .regex(/[a-z]/, 'Include a lowercase letter.')
  .regex(/[A-Z]/, 'Include an uppercase letter.')
  .regex(/\d/, 'Include a number.')

export const nameSchema = z
  .string()
  .trim()
  .min(2, 'Enter at least 2 characters.')
  .max(120, 'That is too long.')

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
})

export const idSchema = z.uuid('Not a valid identifier.')

export type Pagination = z.infer<typeof paginationSchema>
