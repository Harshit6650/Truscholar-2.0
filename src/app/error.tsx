'use client'

import { useEffect } from 'react'

import { Button } from '@/components/ui/button'

export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Report to your error tracker here. Log the digest, not the message —
    // production messages are redacted by Next.js anyway.
    console.error('Unhandled route error', { digest: error.digest })
  }, [error])

  return (
    <main className="grid min-h-svh place-items-center px-4">
      <div className="max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Something went wrong</h1>
        <p className="text-muted-foreground text-sm">
          The error has been logged. You can try again, or head back home.
        </p>
        {error.digest ? (
          <p className="text-muted-foreground font-mono text-xs">
            Reference: {error.digest}
          </p>
        ) : null}
        <div className="flex justify-center gap-2">
          <Button onClick={reset}>Try again</Button>
        </div>
      </div>
    </main>
  )
}
