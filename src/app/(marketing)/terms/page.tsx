import type { Metadata } from 'next'

import { Container, Section } from '@/components/common/container'
import { PageHeader } from '@/components/common/page-header'

export const metadata: Metadata = {
  title: 'Terms of use',
  description: 'The terms that govern use of TruScholar.',
}

export default function TermsPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <PageHeader title="Terms of use" description="Last updated: —" />
        <div className="text-muted-foreground mt-8 space-y-4 text-sm leading-relaxed">
          <p>Placeholder. Replace with reviewed legal copy before launch.</p>
        </div>
      </Container>
    </Section>
  )
}
