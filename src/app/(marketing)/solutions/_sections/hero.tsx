import Link from 'next/link'

import { Placeholder } from '@/components/common/placeholder'

/**
 * Section 1 — Hero.
 *
 * CTAs deliberately differ from the homepage's "Book a Free Demo / Explore Our
 * Platform": a visitor here is comparing, not discovering.
 *
 * The first CTA is a same-page anchor, so it is a plain <a> rather than a
 * <Link> — no router involvement needed for a fragment.
 */
export function SolutionsHero() {
  return (
    <section className="section-y pt-12 lg:pt-16">
      <div className="container-page">
        {/* Breadcrumb — mirrors the BreadcrumbList schema on the page. */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="text-ink-muted text-small flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-navy underline-offset-4 hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-ink font-medium">
              Solutions
            </li>
          </ol>
        </nav>

        <div className="grid items-center gap-12 lg:grid-cols-[55fr_45fr] lg:gap-16">
          <div>
            <p className="text-ink-muted text-small font-semibold tracking-widest uppercase">
              Solutions
            </p>

            <h1 className="text-ink text-h1 mt-6 font-extrabold tracking-tight text-balance">
              Seven ways to issue. One record that holds up.
            </h1>

            <p className="text-ink-muted text-body max-w-lede mt-6">
              A university issuing 40,000 marksheets at convocation and an event
              organiser issuing 500 certificates in an afternoon need almost nothing in
              common — except that both must still be verifiable in ten years. Start from
              whichever describes you.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#comparison"
                className="bg-primary text-surface rounded-btn text-body focus-visible:ring-ring inline-flex items-center justify-center px-7 py-3.5 font-semibold transition-opacity hover:opacity-90"
              >
                Compare all solutions
              </a>
              <Link
                href="/contact"
                className="border-navy text-navy rounded-btn text-body focus-visible:ring-ring hover:bg-surface-muted inline-flex items-center justify-center border-2 bg-transparent px-7 py-3.5 font-semibold transition-colors"
              >
                Talk to us about scoping
              </Link>
            </div>
          </div>

          <Placeholder
            label="Four credential frames fanned out — degree, corporate training badge, event participation certificate, professional membership card with renewal date"
            ratio="4/3"
          />
        </div>
      </div>
    </section>
  )
}
