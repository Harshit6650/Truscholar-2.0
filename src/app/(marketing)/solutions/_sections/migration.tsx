import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Placeholder } from '@/components/common/placeholder'
import { migrationPaths } from '@/config/solutions'

/**
 * Section 5 — Moving from what you use today.
 * Three starting points, three different amounts of work. Understated by
 * design: this is a reassurance section, not a pitch.
 */
export function SolutionsMigration() {
  return (
    <section aria-labelledby="migration-heading" className="section-y">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="migration-heading"
            className="text-ink text-h2 font-extrabold tracking-tight text-balance"
          >
            You are already issuing something. Here is the switch.
          </h2>
          <p className="text-ink-muted text-body mt-6">
            Three starting points, three different amounts of work.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {migrationPaths.map((path) => (
            <li
              key={path.from}
              className="bg-surface border-surface-border rounded-card flex flex-col border p-6"
            >
              <Placeholder label={path.fragment} ratio="16/9" />
              <h3 className="text-ink text-h4 mt-6 font-bold">{path.from}</h3>
              <p className="text-ink-muted text-small mt-3 flex-1">{path.body}</p>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-center">
          <Link
            href="/contact"
            className="text-navy text-body inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline"
          >
            Ask about migration
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </p>
      </div>
    </section>
  )
}
