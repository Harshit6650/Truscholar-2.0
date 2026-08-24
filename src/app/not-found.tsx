import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center px-4">
      <div className="max-w-md space-y-4 text-center">
        <p className="text-muted-foreground font-mono text-sm">404</p>
        <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
        <p className="text-muted-foreground text-sm">
          The page you are looking for has moved or never existed.
        </p>
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </main>
  )
}
