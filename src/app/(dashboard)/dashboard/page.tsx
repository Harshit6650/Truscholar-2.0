import type { Metadata } from 'next'

import { PageHeader } from '@/components/common/page-header'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Overview',
  robots: { index: false, follow: false },
}

const stats = [
  { label: 'Credentials issued', value: '—' },
  { label: 'Verifications this month', value: '—' },
  { label: 'Pending approvals', value: '—' },
]

export default function DashboardPage() {
  // Once auth is wired up, gate this page here as well as in proxy.ts:
  // const session = await requireSession()

  return (
    <div className="space-y-8">
      <PageHeader
        title="Overview"
        description="A snapshot of issuing and verification activity."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="space-y-1">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-3xl">{stat.value}</CardTitle>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
