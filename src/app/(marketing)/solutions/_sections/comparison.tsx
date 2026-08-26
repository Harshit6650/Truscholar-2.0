import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { comparisonColumns, comparisonRows } from '@/config/solutions'
import { cn } from '@/lib/utils'

/**
 * Section 3 — Comparison table.
 *
 * A real <table>, not cards: the value is in reading ACROSS a row, and a card
 * layout destroys that.
 *
 * On narrow screens the table scrolls horizontally with the segment column
 * pinned via `sticky left-0`. The pinned cells need their own opaque
 * background, or the scrolling cells show through underneath them — which is
 * why the zebra colour is set on the cell rather than only on the row.
 *
 * The scroll container carries tabindex=0 and a group role so keyboard users
 * can scroll it without a pointer.
 */
export function SolutionsComparison() {
  return (
    <section id="comparison" aria-labelledby="comparison-heading" className="section-y">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="comparison-heading"
            className="text-ink text-h2 font-extrabold tracking-tight text-balance"
          >
            Side by side
          </h2>
          <p className="text-ink-muted text-body mt-6">
            The same platform behaves quite differently depending on what you issue. This
            is how.
          </p>
        </div>

        <div
          role="group"
          aria-labelledby="comparison-heading"
          tabIndex={0}
          className="border-surface-border rounded-card focus-visible:ring-ring mt-12 overflow-x-auto border"
        >
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              TruScholar solutions compared by what you issue, typical volume, issuance
              trigger, usual integration and the priority that matters most.
            </caption>

            <thead>
              <tr className="bg-navy text-surface">
                <th
                  scope="col"
                  className="bg-navy text-small sticky left-0 z-10 px-5 py-4 font-semibold"
                >
                  Solution
                </th>
                {comparisonColumns.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="text-small px-5 py-4 font-semibold whitespace-nowrap"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {comparisonRows.map((row, index) => {
                // Zebra colour lives on the cells so the pinned column stays
                // opaque while the rest of the row scrolls beneath it.
                const zebra = index % 2 === 1 ? 'bg-surface-muted' : 'bg-surface'

                return (
                  <tr key={row.segment} className="border-surface-border border-t">
                    <th
                      scope="row"
                      className={cn(
                        'text-ink text-small sticky left-0 z-10 px-5 py-4 font-bold',
                        zebra,
                      )}
                    >
                      {row.segment}
                    </th>
                    {row.cells.map((cell, cellIndex) => (
                      <td
                        key={comparisonColumns[cellIndex]}
                        className={cn('text-ink-muted text-small px-5 py-4', zebra)}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <p className="text-ink-muted text-micro mt-3 lg:hidden">
          Scroll the table sideways to see every column.
        </p>

        <p className="mt-10 text-center">
          <Link
            href="/contact"
            className="text-navy text-body inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline"
          >
            Not sure which row you are in? Tell us what you issue
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </p>
      </div>
    </section>
  )
}
