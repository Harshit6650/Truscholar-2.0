import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'

import { pairedProducts } from '@/config/products'

/**
 * TruERP.
 *
 * Kept on /university-management-solution rather than /products/truerp because
 * the brief specifies that URL — it is presumably already earning rankings on
 * university-management terms and should not be moved.
 */
const truerp = pairedProducts.find((product) => product.slug === 'truerp')!

export const metadata: Metadata = {
  title: 'TruERP — University Management Solution',
  description: truerp.lead,
  alternates: { canonical: '/university-management-solution' },
}

export default function UniversityManagementSolutionPage() {
  const Icon = truerp.icon

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
              University Management Solution
            </li>
          </ol>
        </nav>

        <span className="bg-surface-muted rounded-tile grid size-14 place-items-center">
          <Icon className="text-navy size-7" aria-hidden />
        </span>

        <h1 className="text-ink text-h2 mt-6 font-extrabold tracking-tight text-balance">
          TruERP
        </h1>

        <p className="text-ink-muted text-body mt-6">{truerp.lead}</p>

        <ul className="mt-10 space-y-3">
          {truerp.points.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <Check className="text-verified mt-1 size-5 shrink-0" aria-hidden />
              <span className="text-ink text-body">{point}</span>
            </li>
          ))}
        </ul>

        <div className="border-surface-border rounded-card mt-12 border border-dashed p-8">
          <p className="text-ink-muted text-small">
            Full page content for TruERP is still to be written. Until then this page
            carries only the summary and feature list from the homepage.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="bg-primary text-surface rounded-btn text-body inline-flex items-center justify-center px-7 py-3.5 font-semibold transition-opacity hover:opacity-90"
            >
              Book a Free Demo
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
