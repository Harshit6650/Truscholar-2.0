import type * as React from 'react'

import { QueryProvider } from './query-provider'

/**
 * Single mount point for every app-wide provider.
 *
 * No theme provider: the specified design is light-only, and next-themes
 * persists its choice in localStorage, which the page rules forbid.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>
}
