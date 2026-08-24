import Link from 'next/link'
import { Plus } from 'lucide-react'

import { faqGroups } from '@/config/faq'

/**
 * Section 11 — FAQ. 33 questions across three groups.
 *
 * Native <details>/<summary>: every answer is present in the DOM whether the
 * item is open or closed — collapsed, never conditionally rendered. Keyboard
 * accessible and fully functional with JavaScript disabled, so no client
 * component is needed.
 *
 * The first two questions in the first group are open by default.
 *
 * Group labels are <p> with small-caps styling rather than heading tags, to
 * keep the hierarchy at h2 (section) → h3 (question).
 */
export function Faq() {
  return (
    <section aria-labelledby="faq-heading" className="bg-surface-muted section-y">
      <div className="container-page">
        <h2
          id="faq-heading"
          className="text-ink text-h2 text-center font-extrabold tracking-tight text-balance"
        >
          Frequently asked questions
        </h2>

        <div className="mt-12 space-y-12">
          {faqGroups.map((group, groupIndex) => (
            <div key={group.label}>
              <p className="text-ink-muted text-small font-semibold tracking-widest uppercase">
                {group.label}
              </p>

              {/* Two-column at lg; each item is a grid child so nothing splits. */}
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {group.items.map((item, itemIndex) => (
                  <details
                    key={item.question}
                    open={groupIndex === 0 && itemIndex < 2}
                    className="group bg-surface border-surface-border rounded-tile h-fit border px-6"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 marker:content-none [&::-webkit-details-marker]:hidden">
                      <h3 className="text-ink text-h4 font-semibold">{item.question}</h3>
                      <Plus
                        className="text-navy size-5 shrink-0 transition-transform duration-200 group-open:rotate-45"
                        aria-hidden
                      />
                    </summary>
                    <p className="text-ink-muted text-small pb-6">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center">
          <Link
            href="/contact"
            className="text-navy text-body font-semibold underline-offset-4 hover:underline"
          >
            Still have questions? Talk to our team &rarr;
          </Link>
        </p>
      </div>
    </section>
  )
}
