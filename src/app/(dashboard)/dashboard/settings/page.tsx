import type { Metadata } from 'next'

import { PageHeader } from '@/components/common/page-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'Settings',
  robots: { index: false, follow: false },
}

export default function SettingsPage() {
  return (
    <div className="max-w-2xl space-y-8">
      <PageHeader title="Settings" description="Manage your workspace preferences." />

      <Card>
        <CardHeader>
          <CardTitle>Organisation</CardTitle>
          <CardDescription>
            Details shown on issued credentials and verification pages.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Separator />
          <p className="text-muted-foreground text-sm">
            Nothing configurable yet — this page is a placeholder for the settings
            surface.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
