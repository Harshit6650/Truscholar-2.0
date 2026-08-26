import type { Route } from 'next'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

import { solutions } from '@/config/solutions'

/**
 * Section 2 — Choose your solution.
 *
 * Card copy describes the WORK rather than the audience, so it does not
 * restate the homepage "Who it's for" section. Every card is a single
 * focusable link, so the whole surface is clickable and it lands as one tab
 * stop.
 *
 * Four columns at desktop, two at tablet, one on mobile. Seven cards means the
 * last row is short; the grid is left-aligned rather than centred so the
 * columns stay on the same rhythm as the rows above.
 */
export function SolutionsChooser() {
  return (
    <section
      id="chooser"
      aria-labelledby="chooser-heading"
      className="bg-surface-muted section-y"
    >
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="chooser-heading"
            className="text-ink text-h2 font-extrabold tracking-tight text-balance"
          >
            Start from what you issue
          </h2>
          <p className="text-ink-muted text-body mt-6">
            Seven starting points, described by the work rather than the sector.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {solutions.map((solution) => {
            const Icon = solution.icon

            return (
              <li key={solution.slug}>
                <Link
                  href={`/solutions/${solution.slug}` as Route}
                  className="group bg-surface border-surface-border rounded-card hover:border-navy flex h-full flex-col border p-6 transition-all duration-200 hover:-translate-y-1"
                >
                  <span className="bg-surface-muted rounded-tile grid size-12 place-items-center">
                    <Icon className="text-navy size-6" aria-hidden />
                  </span>

                  <h3 className="text-ink text-h4 mt-6 font-bold">{solution.title}</h3>

                  <p className="text-ink-muted text-small mt-3">
                    <span className="text-ink font-semibold">The work: </span>
                    {solution.work}
                  </p>

                  <ul className="mt-4 flex-1 space-y-2">
                    {solution.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <Check
                          className="text-verified mt-1 size-3.5 shrink-0"
                          aria-hidden
                        />
                        <span className="text-ink-muted text-micro">{point}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="text-navy text-small mt-6 inline-flex items-center gap-2 font-semibold">
                    {solution.ctaLabel}
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
