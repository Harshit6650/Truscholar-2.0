import Link from 'next/link'
import { ArrowRight, Plus } from 'lucide-react'

import { solutionFaqs } from '@/config/solutions'

/**
 * Section 7 — FAQ.
 *
 * Twelve questions, all about selection, scoping, migration and procurement.
 * None duplicates the homepage FAQ's definitions or verification mechanics.
 *
 * CRITICAL: every answer is present in the served HTML while collapsed. Native
 * <details> collapses, it does not conditionally render — which is the defect
 * the audit found on the old page, where six answers existed only as headings
 * and were invisible to search engines and AI systems.
 *
 * First two open by default.
 */
export function SolutionsFaq() {
  return (
    <section aria-labelledby="solutions-faq-heading" className="section-y">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="solutions-faq-heading"
            className="text-ink text-h2 font-extrabold tracking-tight text-balance"
          >
            Questions about choosing
          </h2>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {solutionFaqs.map((faq, index) => (
            <details
              key={faq.question}
              open={index < 2}
              className="group bg-surface border-surface-border rounded-tile h-fit border px-6"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 marker:content-none [&::-webkit-details-marker]:hidden">
                <h3 className="text-ink text-h4 font-semibold">{faq.question}</h3>
                <Plus
                  className="text-navy size-5 shrink-0 transition-transform duration-200 group-open:rotate-45"
                  aria-hidden
                />
              </summary>
              <p className="text-ink-muted text-small pb-6">{faq.answer}</p>
            </details>
          ))}
        </div>

        <p className="mt-12 text-center">
          <Link
            href="/contact"
            className="text-navy text-body inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline"
          >
            Still deciding? Tell us what you issue
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </p>
      </div>
    </section>
  )
}
