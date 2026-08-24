import type * as React from 'react'

import { cn } from '@/lib/utils'

export function Container({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('container-page', className)} {...props} />
}

export function Section({ className, ...props }: React.ComponentProps<'section'>) {
  return <section className={cn('py-16 sm:py-24', className)} {...props} />
}
