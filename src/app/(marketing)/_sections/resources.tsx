import Link from 'next/link'

import { Placeholder } from '@/components/common/placeholder'
import { resources } from '@/config/marketing'

/**
 * Section 10 — Resources. Titles and summaries are bracketed placeholders: a
 * fabricated article headline is as misleading as a fabricated quote.
 */
export function Resources() {
  return (
    <section aria-labelledby="resources-heading" className="section-y">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="resources-heading"
            className="text-ink text-h2 font-extrabold tracking-tight text-balance"
          >
            Guides and research for credentialing teams
          </h2>
          <p className="text-ink-muted text-body mt-6">
            Practical material for institutions planning a credential programme.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {resources.map((resource) => (
            <li key={resource.id}>
              <article className="bg-surface border-surface-border rounded-card flex h-full flex-col border p-6">
                <Placeholder label={`Resource cover ${resource.id}`} ratio="16/9" />

                <p className="text-navy text-small mt-6 font-semibold tracking-widest uppercase">
                  {resource.format}
                </p>

                <h3 className="text-ink text-h4 mt-3 font-bold">{resource.title}</h3>

                <p className="text-ink-muted text-small mt-3 flex-1">
                  {resource.summary}
                </p>

                <Link
                  href="/about"
                  className="text-navy text-small mt-6 font-semibold underline-offset-4 hover:underline"
                >
                  Read more &rarr;
                </Link>
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-center">
          <Link
            href="/about"
            className="text-navy text-body font-semibold underline-offset-4 hover:underline"
          >
            All resources &rarr;
          </Link>
        </p>
      </div>
    </section>
  )
}
