import type { Metadata } from 'next'
import Link from 'next/link'

import { FormField } from '@/components/common/form-field'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { authNav } from '@/config/nav'

export const metadata: Metadata = {
  title: 'Sign in',
  robots: { index: false, follow: false },
}

/**
 * Presentational only. No credential handling is wired up yet — pick an auth
 * provider first, then add a Server Action here that verifies against it.
 */
export default function LoginPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Use your work account to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5">
          <FormField name="email" label="Email">
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </FormField>

          <FormField name="password" label="Password">
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </FormField>

          <Button type="submit" className="w-full" disabled>
            Sign in
          </Button>

          <p className="text-muted-foreground text-center text-xs">
            Auth is not wired up yet.{' '}
            <Link href={authNav.register} className="text-foreground underline">
              Create an account
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
