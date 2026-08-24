import { CountUp } from '@/components/common/count-up'
import { impactStats } from '@/config/marketing'

/**
 * Section 5 — Impact. Full-bleed navy band, no illustration.
 * Figures are plain text nodes, counted up on scroll (disabled under
 * reduced-motion). See CountUp for why the final value is server-rendered.
 */
export function Impact() {
  return (
    <section aria-labelledby="impact-heading" className="bg-navy section-y">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="impact-heading"
            className="text-surface text-h2 font-extrabold tracking-tight text-balance"
          >
            What changes when credentials verify themselves
          </h2>
          <p className="text-surface text-body mt-6 opacity-90">
            TruScholar drives measurable growth for institutions through secure,
            verifiable and globally recognised digital credentials.
          </p>
        </div>

        <dl className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dd className="text-surface text-h1 font-extrabold tracking-tight">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </dd>
              <dt className="text-surface text-small mt-3 opacity-90">{stat.label}</dt>
            </div>
          ))}
        </dl>

        <p className="text-surface text-small mt-12 text-center opacity-60">
          Figures as of [Month YYYY]. [Methodology.]
        </p>
      </div>
    </section>
  )
}
