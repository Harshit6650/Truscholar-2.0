'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { marketingNav } from '@/config/nav'
import { cn } from '@/lib/utils'

export function MobileNav() {
  const pathname = usePathname()

  // The panel closes on navigation. Derived from the pathname it was opened at
  // rather than reset in an effect, so there is no setState-in-effect cascade.
  const [openedAt, setOpenedAt] = useState<string | null>(null)
  const open = openedAt === pathname

  // Locking body scroll is a genuine external-system sync, so it stays an effect.
  useEffect(() => {
    if (!open) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpenedAt(open ? null : pathname)}
      >
        {open ? <X aria-hidden /> : <Menu aria-hidden />}
      </Button>

      {open ? (
        <div
          id="mobile-nav-panel"
          className="bg-background fixed inset-x-0 top-16 bottom-0 z-40 border-t"
        >
          <nav className="container-page flex flex-col gap-1 py-6">
            {marketingNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpenedAt(null)}
                className={cn(
                  'hover:bg-accent rounded-md px-3 py-2 text-base font-medium',
                  pathname === item.href && 'bg-accent',
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  )
}
