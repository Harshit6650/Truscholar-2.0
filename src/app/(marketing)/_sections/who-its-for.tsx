import type { Route } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { audiences } from '@/config/marketing'

/**
 * Section 6 — Who it's for. Seven cards of equal visual weight; Students is
 * listed first but styled identically to the rest.
 *
 * Each card is a single focusable link, not a div with a click handler, so the
 * whole surface is clickable and it lands as one tab stop.
 */
export function WhoItsFor() {
  return (
    <section aria-labelledby="who-its-for-heading" className="section-y">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="who-its-for-heading"
            className="text-ink text-h2 font-extrabold tracking-tight text-balance"
          >
            Built for everyone who issues, holds or checks a credential
          </h2>
          <p className="text-ink-muted text-body mt-6">
            The same platform, configured for very different workflows.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience) => {
            const Icon = audience.icon

            return (
              <li key={audience.slug}>
                <Link
                  href={`/contact?interest=${audience.slug}` as Route}
                  className="group bg-surface border-surface-border rounded-card hover:border-navy flex h-full flex-col border p-8 transition-all duration-200 hover:-translate-y-1"
                >
                  <span className="bg-surface-muted rounded-tile grid size-12 place-items-center">
                    <Icon className="text-navy size-6" aria-hidden />
                  </span>

                  <h3 className="text-ink text-h4 mt-6 font-bold">{audience.title}</h3>

                  <p className="text-ink-muted text-small mt-3 flex-1">
                    {audience.description}
                  </p>

                  <span className="text-navy text-small mt-6 inline-flex items-center gap-2 font-semibold">
                    Explore
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
