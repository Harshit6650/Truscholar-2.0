import type { Metadata } from 'next'

import { Container, Section } from '@/components/common/container'
import { PageHeader } from '@/components/common/page-header'

export const metadata: Metadata = {
  title: 'About',
  description: 'What TruScholar does and who it is for.',
}

export default function AboutPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <PageHeader
          title="About TruScholar"
          description="Credential infrastructure for institutions, employers and learners."
        />
        <div className="text-muted-foreground mt-8 space-y-4 text-sm leading-relaxed">
          <p>
            Replace this copy with the approved public description before launch. Nothing
            on this page should reveal internal architecture, security findings, client
            names or unreleased features.
          </p>
        </div>
      </Container>
    </Section>
  )
}
