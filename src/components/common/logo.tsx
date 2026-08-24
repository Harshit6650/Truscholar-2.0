import Link from 'next/link'

import { brandIcon as BrandIcon } from '@/config/nav'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn('flex items-center gap-2 font-semibold tracking-tight', className)}
    >
      <BrandIcon className="text-primary size-5" aria-hidden />
      <span>{siteConfig.name}</span>
    </Link>
  )
}
