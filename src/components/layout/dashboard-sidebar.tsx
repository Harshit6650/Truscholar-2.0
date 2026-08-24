'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Logo } from '@/components/common/logo'
import { dashboardNav } from '@/config/nav'
import { cn } from '@/lib/utils'

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="bg-card hidden w-64 shrink-0 border-r md:flex md:flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <Logo />
      </div>

      <nav aria-label="Dashboard" className="flex flex-1 flex-col gap-1 p-3">
        {dashboardNav.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`)

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                active
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground',
              )}
            >
              <Icon className="size-4" aria-hidden />
              {item.title}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
