import type * as React from 'react'


export function DashboardHeader({ children }: { children?: React.ReactNode }) {
  return (
    <header className="bg-background/80 sticky top-0 z-40 border-b backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">{children}</div>
        <div className="flex items-center gap-2">
        </div>
      </div>
    </header>
  )
}
