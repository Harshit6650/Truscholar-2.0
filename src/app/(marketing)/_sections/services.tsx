import type { Route } from 'next'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

import { Placeholder } from '@/components/common/placeholder'
import {
  campusConnectCard,
  integrationsCard,
  issuanceCard,
  verificationCard,
  walletCard,
  walletTiles,
  type ServiceCard,
} from '@/config/services'
import { cn } from '@/lib/utils'

/** Shared hover behaviour: raise 4px and slide the CTA arrow. */
const cardBase =
  'rounded-card group relative flex flex-col transition-transform duration-200 hover:-translate-y-1'

function Cta({ label, slug, onDark = false }: { label: string; slug: string; onDark?: boolean }) {
  return (
    <Link
      href={`/services/${slug}` as Route}
      className={cn(
        'text-body mt-6 inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline',
        onDark ? 'text-surface' : 'text-navy',
      )}
    >
      {label}
      <ArrowRight
        className="size-4 transition-transform group-hover:translate-x-1"
        aria-hidden
      />
    </Link>
  )
}

function Bullets({ points, onDark = false }: { points: string[]; onDark?: boolean }) {
  return (
    <ul className="mt-6 space-y-3">
      {points.map((point) => (
        <li key={point} className="flex items-start gap-3">
          <Check
            className={cn('mt-1 size-4 shrink-0', onDark ? 'text-surface' : 'text-verified')}
            aria-hidden
          />
          <span className={cn('text-small', onDark ? 'text-surface' : 'text-ink-muted')}>
            {point}
          </span>
        </li>
      ))}
    </ul>
  )
}

/** Card 1 — Credential Wallet. Navy, tall, full width, three nested tiles. */
function WalletCardBlock() {
  return (
    <article className={cn(cardBase, 'bg-navy text-surface min-h-bento-tall p-8 shadow-lg lg:p-12')}>
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div>
          <h3 className="text-h3 font-extrabold tracking-tight">{walletCard.title}</h3>
          <p className="text-body mt-4 opacity-90">{walletCard.lead}</p>
          <Bullets points={walletCard.points} onDark />
          <Cta label={walletCard.ctaLabel} slug={walletCard.slug} onDark />
        </div>

        <Placeholder
          label={walletCard.visual!}
          ratio={walletCard.visualRatio}
          onDark
          className="bg-navy-800 border-navy-600"
        />
      </div>

      {/*
        Nested tiles. On mobile these become a horizontal scroll strip that
        stays inside this card, rather than three more full-width cards in the
        page stack.
      */}
      <p className="text-small mt-12 opacity-75">Built into the wallet</p>
      <ul className="mt-4 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
        {walletTiles.map((tile) => (
          <li
            key={tile.slug}
            className="bg-navy-600 rounded-tile w-4/5 shrink-0 snap-start p-6 sm:w-3/5 lg:w-auto"
          >
            <h4 className="text-h4 font-bold">&rarr; {tile.title}</h4>
            <p className="text-small mt-3 opacity-90">{tile.lead}</p>
            <ul className="mt-4 space-y-2">
              {tile.points.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <Check className="text-surface mt-1 size-3 shrink-0" aria-hidden />
                  <span className="text-small opacity-90">{point}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </article>
  )
}

/** Cards 2–4 — copy plus a visual. */
function StandardCard({
  card,
  tone,
  imageRight = false,
  minHeightClass,
}: {
  card: ServiceCard
  tone: 'surface' | 'muted'
  imageRight?: boolean
  minHeightClass?: string
}) {
  return (
    <article
      className={cn(
        cardBase,
        'border-surface-border border p-8 shadow-sm lg:p-12',
        tone === 'surface' ? 'bg-surface' : 'bg-surface-muted',
        minHeightClass,
      )}
    >
      <div
        className={cn(
          'gap-8',
          imageRight ? 'grid lg:grid-cols-2 lg:items-center lg:gap-12' : 'flex flex-col',
        )}
      >
        <div>
          <h3 className="text-ink text-h3 font-extrabold tracking-tight">{card.title}</h3>
          <p className="text-ink-muted text-body mt-4">{card.lead}</p>
          <Bullets points={card.points} />
          <Cta label={card.ctaLabel} slug={card.slug} />
        </div>

        {card.visual ? (
          <Placeholder label={card.visual} ratio={card.visualRatio} />
        ) : null}
      </div>
    </article>
  )
}

/** Card 5 — Integrations. Short strip, copy left, logo grid right. */
function IntegrationsCardBlock() {
  return (
    <article
      className={cn(
        cardBase,
        'bg-surface border-surface-border border p-8 shadow-sm lg:max-h-bento-short',
      )}
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <h3 className="text-ink text-h3 font-extrabold tracking-tight">
            {integrationsCard.title}
          </h3>
          <p className="text-ink-muted text-small mt-3">{integrationsCard.lead}</p>
          <Cta label={integrationsCard.ctaLabel} slug={integrationsCard.slug} />
        </div>

        <div>
          {/* Two columns keeps the card short, per the layout brief. */}
          <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {integrationsCard.points.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <Check className="text-verified mt-1 size-3 shrink-0" aria-hidden />
                <span className="text-ink-muted text-small">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

export function Services() {
  return (
    <section aria-labelledby="services-heading" className="section-y">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="services-heading" className="text-ink text-h2 font-extrabold tracking-tight text-balance">
            The tools behind every step
          </h2>
          <p className="text-ink-muted text-body mt-6">
            Everything a learner earns lives in one wallet, and everything they do next
            starts from there. Institutions get the tools to issue, verify and connect it
            all.
          </p>
        </div>

        {/* Bento grid. Gap 24px. Collapses to one column in the same order. */}
        <div className="mt-12 grid gap-6">
          <WalletCardBlock />

          <StandardCard
            card={campusConnectCard}
            tone="surface"
            imageRight
            minHeightClass="min-h-bento-mid"
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <StandardCard card={issuanceCard} tone="muted" />
            <StandardCard card={verificationCard} tone="muted" />
          </div>

          <IntegrationsCardBlock />
        </div>
      </div>
    </section>
  )
}
