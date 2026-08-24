import Link from 'next/link'

/**
 * Section 12 — Final CTA. Full-bleed navy band. No form: the form lives on the
 * demo page where it can be properly tracked.
 */
export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-heading" className="bg-navy section-y">
      <div className="container-page text-center">
        <h2
          id="final-cta-heading"
          className="text-surface text-h2 mx-auto max-w-3xl font-extrabold tracking-tight text-balance"
        >
          Ready to see it on your own credentials?
        </h2>

        <p className="text-surface text-body mx-auto mt-6 max-w-3xl opacity-90">
          Book a 30-minute walkthrough and we&rsquo;ll show you your institution&rsquo;s
          certificate issued, verified and shared — using your own template.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="bg-primary text-surface rounded-btn text-body focus-visible:ring-ring inline-flex items-center justify-center px-7 py-3.5 font-semibold transition-opacity hover:opacity-90"
          >
            Book a Free Demo
          </Link>
          <Link
            href="/register"
            className="border-surface text-surface rounded-btn text-body focus-visible:ring-ring hover:bg-navy-600 inline-flex items-center justify-center border-2 bg-transparent px-7 py-3.5 font-semibold transition-colors"
          >
            Get Started as a Student
          </Link>
        </div>

        <p className="text-surface text-small mt-8 opacity-60">
          No obligation &middot; Reply within one business day
        </p>
      </div>
    </section>
  )
}
