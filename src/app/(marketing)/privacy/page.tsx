import type { Metadata } from 'next'

import { Container, Section } from '@/components/common/container'
import { PageHeader } from '@/components/common/page-header'

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'How TruScholar collects, uses and protects personal data.',
}

export default function PrivacyPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <PageHeader title="Privacy policy" description="Last updated: —" />
        <div className="text-muted-foreground mt-8 space-y-4 text-sm leading-relaxed">
          <p>
            Placeholder. This page needs reviewed legal copy covering lawful basis,
            purpose limitation, data retention, grievance officer details and data
            principal rights under the Digital Personal Data Protection Act, 2023 before
            it goes live.
          </p>
        </div>
      </Container>
    </Section>
  )
}
