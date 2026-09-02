import type * as React from 'react'

import type { Route } from 'next'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

import { Placeholder } from '@/components/common/placeholder'
import {
  ambassadorProgramme,
  optionAProducts,
  optionAStack,
  productHref,
  productVisuals,
} from '@/config/products'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

/**
 * OPTION A — nine separate cards in a sticky stack.
 *
 * Every product is its own full-width card. As you scroll, each card rises
 * from below and pins, covering the previous card's body while leaving its
 * heading bar visible above — so the section reads as a deck of labelled tabs
 * and you can always see where you are.
 *
 * Pure CSS `position: sticky` (see .product-stack in globals.css): no scroll
 * listeners, nothing to jank, and it degrades to a plain vertical list where
 * sticky is unsupported.
 *
 * Brand Ambassador is a programme, not a product: it keeps a dashed border and
 * an eyebrow, and sits outside the ItemList schema.
 */
export function ProductsOptionA() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${siteConfig.url}/#products-option-a`,
    name: 'TruScholar products',
    itemListElement: optionAProducts.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: product.name,
      description: product.lead,
      url: `${siteConfig.url}${productHref(product.slug)}`,
    })),
  }

  return (
    <section aria-labelledby="products-a-heading" className="section-y">
      <div className="container-page">
        {/* Review marker — remove with the losing option before ship. */}
        <p className="bg-navy text-surface text-micro rounded-tile mx-auto mb-8 w-fit px-3 py-1 font-semibold tracking-widest uppercase">
          Review · Option A — sticky card stack
        </p>

        <div className="mx-auto max-w-3xl text-center">
          <p className="text-ink-muted text-small font-semibold tracking-widest uppercase">
            Products
          </p>
          <h2
            id="products-a-heading"
            className="text-ink text-h2 mt-3 font-extrabold tracking-tight text-balance"
          >
            The tools behind every step
          </h2>
          <p className="text-ink-muted text-body mt-6">
            Everything a learner earns lives in one wallet, and everything they do next
            starts from there. Institutions get the tools to issue, manage and connect it
            all.
          </p>
        </div>

        {/* The stack. No overflow-hidden anywhere up this tree, or sticky dies. */}
        <div className="product-stack mt-12">
          {optionAStack.map((product, index) => {
            const Icon = product.icon
            const isProgramme = product.slug === ambassadorProgramme.slug

            return (
              <article
                key={product.slug}
                className={cn(
                  'product-card rounded-card mb-6 overflow-hidden shadow-xl',
                  isProgramme
                    ? 'bg-surface border-navy/40 border-2 border-dashed'
                    : 'bg-surface border-surface-border border',
                )}
                style={{ '--card-index': index } as React.CSSProperties}
              >
                {/* Heading bar — the strip that stays visible once covered. */}
                <div className="product-card-bar bg-surface border-surface-border flex items-center gap-3 border-b px-5 sm:px-8">
                  <span className="text-navy font-mono text-sm font-bold tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <Icon className="text-navy size-4 shrink-0" aria-hidden />
                  <h3 className="text-ink truncate text-base font-bold tracking-tight lg:text-lg">
                    {product.name}
                  </h3>
                  {isProgramme ? (
                    <span className="bg-surface-muted text-ink-muted text-micro rounded-tile ml-auto shrink-0 px-2 py-0.5 font-semibold">
                      Programme
                    </span>
                  ) : null}
                </div>

                {/* Body */}
                <div className="grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10">
                  <div>
                    <p className="text-ink text-body lg:text-lg">{product.lead}</p>

                    <ul className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
                      {product.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5">
                          <Check
                            className="text-verified mt-1 size-4 shrink-0"
                            aria-hidden
                          />
                          <span className="text-ink-muted text-small">{point}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={productHref(product.slug) as Route}
                      className="text-navy text-body group mt-7 inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline"
                    >
                      {product.ctaLabel}
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </Link>
                  </div>

                  <Placeholder
                    label={productVisuals[product.slug] ?? product.name}
                    ratio="4/3"
                    className="mx-auto max-w-md"
                  />
                </div>
              </article>
            )
          })}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </section>
  )
}
