import Link from 'next/link'

/**
 * Section 9 — Final CTA.
 *
 * The offer is deliberately different from the homepage's "walkthrough on your
 * own template": a comparing visitor wants scoping and a price, not a product
 * tour. The second button is a same-page anchor back to the chooser, so it is
 * a plain <a>.
 */
export function SolutionsFinalCta() {
  return (
    <section aria-labelledby="solutions-final-cta-heading" className="bg-navy section-y">
      <div className="container-page text-center">
        <h2
          id="solutions-final-cta-heading"
          className="text-surface text-h2 mx-auto max-w-3xl font-extrabold tracking-tight text-balance"
        >
          Tell us what you issue, and how many
        </h2>

        <p className="text-surface text-body mx-auto mt-6 max-w-3xl opacity-90">
          Two questions, and we can tell you which solution fits, roughly what rollout
          looks like, and what it would cost. No demo required unless you want one.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="bg-primary text-surface rounded-btn text-body focus-visible:ring-ring inline-flex items-center justify-center px-7 py-3.5 font-semibold transition-opacity hover:opacity-90"
          >
            Get a scoping call
          </Link>
          <a
            href="#chooser"
            className="border-surface text-surface rounded-btn text-body focus-visible:ring-ring hover:bg-navy-600 inline-flex items-center justify-center border-2 bg-transparent px-7 py-3.5 font-semibold transition-colors"
          >
            Compare solutions again
          </a>
        </div>

        <p className="text-surface text-small mt-8 opacity-60">
          No obligation &middot; Reply within one business day
        </p>
      </div>
    </section>
  )
}
