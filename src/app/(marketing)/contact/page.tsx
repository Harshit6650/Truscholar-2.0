import type { Metadata } from 'next'

import { Container, Section } from '@/components/common/container'
import { PageHeader } from '@/components/common/page-header'

import { ContactForm } from './contact-form'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the TruScholar team.',
}

export default function ContactPage() {
  return (
    <Section>
      <Container className="max-w-xl">
        <PageHeader
          title="Contact us"
          description="Tell us what you need and we will get back to you."
        />
        <div className="mt-8">
          <ContactForm />
        </div>
      </Container>
    </Section>
  )
}
