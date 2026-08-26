import type * as React from 'react'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { rolloutStages } from '@/config/solutions'

/**
 * Section 4 — What the first ninety days look like.
 *
 * Stage widths are proportional to real duration (`weight` in the config)
 * rather than five even steps — Integration is visibly widest because it is
 * genuinely the most variable stage. Honest proportions build more confidence
 * than a tidy graphic.
 *
 * ONE list, two layouts: a vertical timeline below lg, a proportional
 * horizontal path at lg. The column template is passed as a CSS variable and
 * only consumed inside the `lg` media query in globals.css, so there is no
 * second copy of the markup and no string appears twice in the DOM.
 */
export function SolutionsRollout() {
  const template = rolloutStages.map((stage) => `${stage.weight}fr`).join(' ')

  return (
    <section aria-labelledby="rollout-heading" className="bg-surface-muted section-y">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="rollout-heading"
            className="text-ink text-h2 font-extrabold tracking-tight text-balance"
          >
            What the first ninety days look like
          </h2>
          <p className="text-ink-muted text-body mt-6">
            Whichever solution you start from, adoption follows the same five stages. Most
            organisations reach a live pilot within three weeks.
          </p>
        </div>

        <ol
          className="rollout-path border-surface-border relative mt-12 space-y-10 border-l-2 pl-8"
          style={{ '--rollout-cols': template } as React.CSSProperties}
        >
          {rolloutStages.map((stage) => (
            <li key={stage.number} className="relative">
              <span
                aria-hidden
                className="bg-primary text-surface absolute top-0 left-0 grid size-8 -translate-x-1/2 place-items-center rounded-full text-sm font-bold lg:static lg:size-10 lg:translate-x-0"
              >
                {stage.number}
              </span>

              <p className="text-navy text-micro font-semibold tracking-widest uppercase lg:mt-4">
                {stage.weeks}
              </p>
              <h3 className="text-ink text-h4 mt-1 font-bold">{stage.title}</h3>
              <p className="text-ink-muted text-small mt-2">{stage.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-12 text-center">
          <Link
            href="/contact"
            className="text-navy text-body inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline"
          >
            Talk to us about scoping
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </p>
      </div>
    </section>
  )
}
