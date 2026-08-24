import { createInMemoryRepositories } from './in-memory'

import type { Repositories } from './types'

/**
 * Single place where the concrete data layer is chosen. Replace the factory
 * here when a database is wired up; nothing else needs to change.
 */
declare global {
  var __repositories: Repositories | undefined
}

function build(): Repositories {
  return createInMemoryRepositories()
}

// Reuse across hot reloads in dev so in-memory state survives a file save.
export const db: Repositories = globalThis.__repositories ?? build()

if (process.env.NODE_ENV !== 'production') {
  globalThis.__repositories = db
}

export type { Repositories } from './types'
