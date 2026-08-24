import Link from 'next/link'

import { Placeholder } from '@/components/common/placeholder'
import { complianceMarks, standardBlocks } from '@/config/marketing'

/**
 * Section 7 — Security, standards & compliance.
 * Two columns at lg: 2×2 blocks left, architecture diagram right.
 * Compliance mark row full width beneath, at legible size.
 */
export function SecurityStandards() {
  return (
    <section aria-labelledby="security-heading" className="bg-surface-muted section-y">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="security-heading"
            className="text-ink text-h2 font-extrabold tracking-tight text-balance"
          >
            Credential infrastructure your security team can sign off
          </h2>
          <p className="text-ink-muted text-body mt-6">
            Trust is the product. Here is exactly how it is built, and what it is
            independently held against.
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-start">
          <div className="grid gap-6 md:grid-cols-2">
            {standardBlocks.map((block) => (
              <div
                key={block.title}
                className="bg-surface border-surface-border rounded-card border p-6"
              >
                <h3 className="text-ink text-h4 font-bold">{block.title}</h3>
                <p className="text-ink-muted text-small mt-3">{block.body}</p>
              </div>
            ))}
          </div>

          <Placeholder
            label="Hash-anchoring diagram: personal data stays off-chain"
            ratio="4/3"
            className="bg-surface"
          />
        </div>

        {/* Compliance marks at legible size, not shrunk to icon scale. */}
        <ul className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {complianceMarks.map((mark) => (
            <li key={mark}>
              <Placeholder label={mark} ratio="3/1" className="bg-surface" />
            </li>
          ))}
        </ul>

        <p className="mt-12 text-center">
          <Link
            href="/privacy"
            className="text-navy text-body font-semibold underline-offset-4 hover:underline"
          >
            Visit the Trust Centre &rarr;
          </Link>
        </p>
      </div>
    </section>
  )
}
