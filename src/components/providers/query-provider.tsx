'use client'

import { useState, type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

/**
 * Client-side cache for interactive data (polling, mutations, infinite lists).
 * Server Components should fetch directly — reach for this only when a
 * component genuinely needs client-side refetching.
 */
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  })
}

export function QueryProvider({ children }: { children: ReactNode }) {
  // One client per component lifetime — never a module-level singleton, which
  // would leak one user's data into another request on the server.
  const [queryClient] = useState(makeQueryClient)

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
