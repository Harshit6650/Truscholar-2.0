'use client'

import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'

import { Button, type ButtonProps } from '@/components/ui/button'

/** Reads the pending state of the enclosing <form>, so no prop threading. */
export function SubmitButton({ children, disabled, ...props }: ButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending || disabled} {...props}>
      {pending ? <Loader2 className="animate-spin" aria-hidden /> : null}
      {children}
    </Button>
  )
}
