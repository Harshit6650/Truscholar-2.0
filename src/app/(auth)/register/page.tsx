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
  title: 'Create account',
  robots: { index: false, follow: false },
}

export default function RegisterPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Start issuing and verifying credentials.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5">
          <FormField name="name" label="Full name">
            <Input id="name" name="name" autoComplete="name" required />
          </FormField>

          <FormField name="email" label="Work email">
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </FormField>

          <FormField
            name="password"
            label="Password"
            hint="At least 12 characters, with upper case, lower case and a number."
          >
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
            />
          </FormField>

          <Button type="submit" className="w-full" disabled>
            Create account
          </Button>

          <p className="text-muted-foreground text-center text-xs">
            Already have an account?{' '}
            <Link href={authNav.login} className="text-foreground underline">
              Sign in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
