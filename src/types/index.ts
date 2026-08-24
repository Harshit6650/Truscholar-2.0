/** Shared, app-wide types. Feature-specific types belong in src/features/*. */

export type Nullable<T> = T | null

export type Prettify<T> = { [K in keyof T]: T[K] } & {}

/** Result type for operations that are expected to fail sometimes. */
export type Result<T, E = Error> = { ok: true; data: T } | { ok: false; error: E }

export type Paginated<T> = {
  items: T[]
  page: number
  pageSize: number
  total: number
  hasMore: boolean
}

export type SortDirection = 'asc' | 'desc'
