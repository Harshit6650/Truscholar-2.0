'use client'

import { useCallback, useSyncExternalStore } from 'react'

/**
 * SSR-safe media query hook. Returns false on the server.
 *
 * Subscribes through `useSyncExternalStore` rather than `useState` +
 * `useEffect`, so there is no setState-in-effect render cascade and the first
 * client render already has the correct value.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', onStoreChange)
      return () => list.removeEventListener('change', onStoreChange)
    },
    [query],
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches, // client
    () => false, // server
  )
}
