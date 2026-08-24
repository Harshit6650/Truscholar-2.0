import { randomUUID } from 'node:crypto'

import type {
  ContactEnquiry,
  ContactRepository,
  NewContactEnquiry,
  Repositories,
} from './types'

/**
 * Development-only implementations. State lives in module scope, so it resets
 * on every server restart and is not shared between serverless instances.
 */
function createContactRepository(): ContactRepository {
  const rows: ContactEnquiry[] = []

  return {
    async create(input: NewContactEnquiry) {
      const row: ContactEnquiry = { ...input, id: randomUUID(), createdAt: new Date() }
      rows.unshift(row)
      return row
    },

    async list({ page, pageSize }) {
      const start = (page - 1) * pageSize
      const items = rows.slice(start, start + pageSize)

      return {
        items,
        page,
        pageSize,
        total: rows.length,
        hasMore: start + items.length < rows.length,
      }
    },
  }
}

export function createInMemoryRepositories(): Repositories {
  return { contact: createContactRepository() }
}
