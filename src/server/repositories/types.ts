import type { Paginated } from '@/types'

/**
 * Data access contracts. Services depend on these interfaces, never on a
 * concrete driver, so Postgres + Drizzle/Prisma can be dropped in later
 * without rewriting the app.
 */

export type ContactEnquiry = {
  id: string
  name: string
  email: string
  organisation?: string
  message: string
  createdAt: Date
}

export type NewContactEnquiry = Omit<ContactEnquiry, 'id' | 'createdAt'>

export interface ContactRepository {
  create(input: NewContactEnquiry): Promise<ContactEnquiry>
  list(params: { page: number; pageSize: number }): Promise<Paginated<ContactEnquiry>>
}

export interface Repositories {
  contact: ContactRepository
}
