'use client'

import { useSyncExternalStore } from 'react'

/** Never changes, so React never resubscribes. */
const subscribe = () => () => {}

/**
 * True only after hydration — use to avoid SSR/client markup mismatches.
 *
 * Uses `useSyncExternalStore` rather than `useState` + `useEffect`: the server
 * snapshot is `false` and the client snapshot is `true`, so React resolves it
 * during hydration instead of triggering a second render pass.
 */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true, // client
    () => false, // server
  )
}
