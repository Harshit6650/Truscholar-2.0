import Link from 'next/link'

import { Logo } from '@/components/common/logo'
import { MobileNav } from '@/components/layout/mobile-nav'
import { Button } from '@/components/ui/button'
import { authNav, marketingNav } from '@/config/nav'

export function SiteHeader() {
  return (
    <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {marketingNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href={authNav.login}>Sign in</Link>
          </Button>
          <Button asChild size="sm">
            <Link href={authNav.register}>Get started</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
