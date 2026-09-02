import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'

import { ambassadorProgramme } from '@/config/products'

/**
 * Brand Ambassador — a programme, not a product, which is why it sits outside
 * the ItemList schema on both homepage options and keeps its own top-level URL.
 */
export const metadata: Metadata = {
  title: 'Brand Ambassador Programme',
  description: ambassadorProgramme.lead,
  alternates: { canonical: '/brand-ambassador' },
}

export default function BrandAmbassadorPage() {
  const Icon = ambassadorProgramme.icon

  return (
    <section className="section-y">
      <div className="container-page max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="text-ink-muted text-small flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-navy underline-offset-4 hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-ink font-medium">
              Brand Ambassador
            </li>
          </ol>
        </nav>

        <p className="text-ink-muted text-small font-semibold tracking-widest uppercase">
          Programme
        </p>

        <span className="bg-surface-muted rounded-tile mt-4 grid size-14 place-items-center">
          <Icon className="text-navy size-7" aria-hidden />
        </span>

        <h1 className="text-ink text-h2 mt-6 font-extrabold tracking-tight text-balance">
          Brand Ambassador
        </h1>

        <p className="text-ink-muted text-body mt-6">{ambassadorProgramme.lead}</p>

        <ul className="mt-10 space-y-3">
          {ambassadorProgramme.points.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <Check className="text-verified mt-1 size-5 shrink-0" aria-hidden />
              <span className="text-ink text-body">{point}</span>
            </li>
          ))}
        </ul>

        <div className="border-surface-border rounded-card mt-12 border border-dashed p-8">
          <p className="text-ink-muted text-small">
            Full programme details and the application form are still to be written.
            Until then this page carries only the summary from the homepage.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="bg-primary text-surface rounded-btn text-body inline-flex items-center justify-center px-7 py-3.5 font-semibold transition-opacity hover:opacity-90"
            >
              Apply to the programme
            </Link>
            <Link
              href="/"
              className="border-navy text-navy rounded-btn text-body hover:bg-surface-muted inline-flex items-center justify-center border-2 px-7 py-3.5 font-semibold transition-colors"
            >
              <ArrowLeft className="mr-2 size-4" aria-hidden />
              Back to all products
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
