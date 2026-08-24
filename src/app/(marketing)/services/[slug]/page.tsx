import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Check } from 'lucide-react'

import { serviceCards } from '@/config/services'

/**
 * Stub detail page, so every service CTA on the homepage resolves instead of
 * 404ing. It renders only the copy already supplied for that service —
 * nothing invented. Replace with the real page when the copy is written.
 */
function getService(slug: string) {
  return serviceCards.find((card) => card.slug === slug)
}

export function generateStaticParams() {
  return serviceCards.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps<'/services/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)

  if (!service) return {}

  return {
    title: service.title,
    description: service.lead,
    alternates: { canonical: `/services/${service.slug}` },
  }
}

export default async function ServicePage({ params }: PageProps<'/services/[slug]'>) {
  const { slug } = await params
  const service = getService(slug)

  if (!service) notFound()

  return (
    <section className="section-y">
      <div className="container-page max-w-3xl">
        <Link
          href="/#services"
          className="text-ink-muted text-small mb-8 inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline"
        >
          <ArrowLeft className="size-4" aria-hidden />
          All services
        </Link>

        <h1 className="text-ink text-h2 font-extrabold tracking-tight text-balance">
          {service.title}
        </h1>

        <p className="text-ink-muted text-body mt-6">{service.lead}</p>

        <ul className="mt-10 grid gap-3 md:grid-cols-2">
          {service.points.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <Check className="text-verified mt-1 size-4 shrink-0" aria-hidden />
              <span className="text-ink-muted text-small">{point}</span>
            </li>
          ))}
        </ul>

        <div className="border-surface-border rounded-card mt-12 border border-dashed p-8">
          <p className="text-ink-muted text-small">
            Full page content for this service is still to be written. Until then this
            page shows only the summary and feature list from the homepage.
          </p>
          <Link
            href="/contact"
            className="bg-primary text-surface rounded-btn text-body mt-6 inline-flex items-center justify-center px-7 py-3.5 font-semibold transition-opacity hover:opacity-90"
          >
            Book a Free Demo
          </Link>
        </div>
      </div>
    </section>
  )
}
