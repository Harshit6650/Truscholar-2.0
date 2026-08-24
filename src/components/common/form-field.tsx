import type * as React from 'react'

import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

type FormFieldProps = {
  name: string
  label: string
  hint?: string
  errors?: string[]
  children: React.ReactNode
  className?: string
}

/**
 * Wires label, hint and error text to an input via ids so screen readers
 * announce them. Pass `aria-invalid` on the input yourself when errors exist.
 */
export function FormField({
  name,
  label,
  hint,
  errors,
  children,
  className,
}: FormFieldProps) {
  const hasErrors = Boolean(errors?.length)

  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={name}>{label}</Label>
      {children}
      {hint && !hasErrors ? (
        <p id={`${name}-hint`} className="text-muted-foreground text-xs">
          {hint}
        </p>
      ) : null}
      {hasErrors ? (
        <p id={`${name}-error`} role="alert" className="text-destructive text-xs">
          {errors!.join(' ')}
        </p>
      ) : null}
    </div>
  )
}
