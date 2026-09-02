'use client'

import { useRef, useState } from 'react'
import type { Route } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Placeholder } from '@/components/common/placeholder'
import {
  bandVisuals,
  optionBProducts,
  productBands,
  type BandTone,
} from '@/config/products'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

/**
 * OPTION B — fourteen products across three audience categories, as tabs.
 *
 * The three category buttons sit at the TOP, directly under the section
 * heading, with the selected category's cards in the panel below them.
 * Clicking a category swaps the panel in place rather than scrolling.
 *
 * Implemented as a real ARIA tablist. Critically, all three panels stay in the
 * DOM at all times — inactive ones carry the `hidden` attribute rather than
 * being conditionally rendered, so every one of the fifteen entries is in the
 * served HTML and visible to crawlers. That was the point of the original
 * "never conditionally rendered" rule, and it survives the switch to tabs.
 *
 * Keyboard: arrow keys, Home and End move between tabs and take focus with
 * the selection, which is the expected tablist behaviour.
 *
 * Colour carries the categorisation — blue / teal / coral on the icon and
 * badge only, never a card background.
 */
const TONE: Record<
  BandTone,
  { badge: string; iconBg: string; icon: string; ring: string }
> = {
  issuers: {
    badge: 'bg-band-issuers-fill text-band-issuers-ink',
    iconBg: 'bg-band-issuers-fill',
    icon: 'text-band-issuers-ink',
    ring: 'border-band-issuers-ink',
  },
  learners: {
    badge: 'bg-band-learners-fill text-band-learners-ink',
    iconBg: 'bg-band-learners-fill',
    icon: 'text-band-learners-ink',
    ring: 'border-band-learners-ink',
  },
  corporates: {
    badge: 'bg-band-corporates-fill text-band-corporates-ink',
    iconBg: 'bg-band-corporates-fill',
    icon: 'text-band-corporates-ink',
    ring: 'border-band-corporates-ink',
  },
}

export function ProductsOptionB() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = productBands.length - 1
    let next: number | null = null

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown')
      next = index === last ? 0 : index + 1
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp')
      next = index === 0 ? last : index - 1
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = last

    if (next !== null) {
      event.preventDefault()
      setActive(next)
      tabRefs.current[next]?.focus()
    }
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${siteConfig.url}/#products-option-b`,
    name: 'TruScholar products by audience',
    itemListElement: optionBProducts.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: product.name,
      description: product.lead,
      url: `${siteConfig.url}${product.href}`,
    })),
  }

  return (
    <section aria-labelledby="products-b-heading" className="bg-surface-muted section-y">
      <div className="container-page">
        {/* Review marker — remove with the losing option before ship. */}
        <p className="bg-navy text-surface text-micro rounded-tile mx-auto mb-8 w-fit px-3 py-1 font-semibold tracking-widest uppercase">
          Review · Option B — category tabs
        </p>

        <div className="mx-auto max-w-3xl text-center">
          <p className="text-ink-muted text-small font-semibold tracking-widest uppercase">
            Products
          </p>
          <h2
            id="products-b-heading"
            className="text-ink text-h2 mt-3 font-extrabold tracking-tight text-balance"
          >
            The tools behind every step
          </h2>
          <p className="text-ink-muted text-body mt-6">
            Fourteen products across three audiences. Choose the one that describes you.
          </p>
        </div>

        {/* ---------- Category buttons, at the top ---------- */}
        <div
          role="tablist"
          aria-label="Product audience"
          className="mt-10 grid gap-4 md:grid-cols-3"
        >
          {productBands.map((band, bandIndex) => {
            const tone = TONE[band.tone]
            const isActive = bandIndex === active

            return (
              <button
                key={band.id}
                id={`tab-${band.id}`}
                ref={(node) => {
                  tabRefs.current[bandIndex] = node
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${band.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(bandIndex)}
                onKeyDown={(event) => onKeyDown(event, bandIndex)}
                className={cn(
                  'rounded-card focus-visible:ring-ring flex items-center gap-3 border-2 p-5 text-left transition-colors',
                  isActive
                    ? cn('bg-surface shadow-sm', tone.ring)
                    : 'bg-surface/60 border-surface-border hover:bg-surface',
                )}
              >
                <span
                  className={cn(
                    'text-micro rounded-tile shrink-0 px-2 py-1 font-bold',
                    tone.badge,
                  )}
                >
                  {band.badge}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="text-ink block font-bold">{band.heading}</span>
                  <span className="text-ink-muted text-micro block">
                    {band.products.length} products
                  </span>
                </span>
                {/* Points down at the panel when this tab is the active one. */}
                <ArrowRight
                  className={cn(
                    'size-4 shrink-0 transition-transform',
                    isActive ? 'text-navy rotate-90' : 'text-ink-muted',
                  )}
                  aria-hidden
                />
              </button>
            )
          })}
        </div>

        {/* ---------- Panels, below the category buttons ---------- */}
        <div className="mt-6">
          {productBands.map((band, bandIndex) => {
            const tone = TONE[band.tone]
            const isActive = bandIndex === active

            return (
              <div
                key={band.id}
                id={`panel-${band.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${band.id}`}
                hidden={!isActive}
                className="bg-surface border-surface-border rounded-card border p-6 lg:p-10"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-ink text-h3 font-extrabold tracking-tight">
                    {band.heading}
                  </h3>
                  <span
                    className={cn(
                      'text-micro rounded-tile px-2.5 py-1 font-bold',
                      tone.badge,
                    )}
                  >
                    {band.badge}
                  </span>
                </div>
                <p className="text-ink-muted text-small mt-1">{band.audience}</p>

                <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {band.products
                    .filter((product) => !product.isProgramme)
                    .map((product) => {
                      const Icon = product.icon

                      return (
                        <li key={product.name}>
                          <Link
                            href={product.href as Route}
                            className="group bg-surface border-surface-border rounded-card hover:border-navy flex h-full flex-col overflow-hidden border transition-all duration-200 hover:-translate-y-1"
                          >
                            <Placeholder
                              label={bandVisuals[product.name] ?? product.name}
                              ratio="16/9"
                              className="rounded-none border-0 border-b border-dashed"
                            />

                            <div className="flex flex-1 flex-col p-5">
                              <span
                                className={cn(
                                  'rounded-tile grid size-10 place-items-center',
                                  tone.iconBg,
                                )}
                              >
                                <Icon className={cn('size-5', tone.icon)} aria-hidden />
                              </span>

                              <h4 className="text-ink text-h4 mt-4 font-bold">
                                {product.name}
                              </h4>

                              <p className="text-ink-muted text-small mt-2 flex-1">
                                {product.lead}
                              </p>

                              <ArrowRight
                                className="text-navy mt-4 size-4 transition-transform group-hover:translate-x-1"
                                aria-hidden
                              />
                            </div>
                          </Link>
                        </li>
                      )
                    })}
                </ul>

                {/* Programme strip, dashed and outside the product grid. */}
                {band.products
                  .filter((product) => product.isProgramme)
                  .map((product) => {
                    const Icon = product.icon

                    return (
                      <Link
                        key={product.name}
                        href={product.href as Route}
                        className="group bg-surface border-navy/30 rounded-card mt-4 flex items-center gap-4 border-2 border-dashed p-5 transition-transform duration-200 hover:-translate-y-1"
                      >
                        <span
                          className={cn(
                            'rounded-tile grid size-10 shrink-0 place-items-center',
                            tone.iconBg,
                          )}
                        >
                          <Icon className={cn('size-5', tone.icon)} aria-hidden />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-ink-muted text-micro font-semibold tracking-widest uppercase">
                            Programme
                          </p>
                          <h4 className="text-ink text-h4 font-bold">{product.name}</h4>
                          <p className="text-ink-muted text-small mt-1">{product.lead}</p>
                        </div>
                        <ArrowRight
                          className="text-navy size-4 shrink-0 transition-transform group-hover:translate-x-1"
                          aria-hidden
                        />
                      </Link>
                    )
                  })}
              </div>
            )
          })}
        </div>

        <p className="text-ink-muted text-micro mt-6 text-center">
          The six corporate cards all open the corporate solutions page for now — one
          page with six sections, split out once each has enough distinct content.
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </section>
  )
}
