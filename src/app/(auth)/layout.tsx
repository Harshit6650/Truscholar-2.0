import type * as React from 'react'

import { Logo } from '@/components/common/logo'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-svh place-items-center px-4 py-12">
      <main id="main" className="w-full max-w-sm space-y-8">
        <Logo className="justify-center text-lg" />
        {children}
      </main>
    </div>
  )
}
