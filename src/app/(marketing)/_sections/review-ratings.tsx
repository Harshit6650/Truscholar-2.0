import { Placeholder } from '@/components/common/placeholder'
import { reviewPlatforms } from '@/config/marketing'

/**
 * Section 9 — Review ratings.
 *
 * The rating sits inside the placeholder rather than being written out: every
 * one of these is a third-party trademark, and a score must be read off the
 * live listing before it is published. No figure is invented here.
 */
export function ReviewRatings() {
  return (
    <section
      aria-labelledby="review-ratings-heading"
      className="bg-surface-muted py-12 md:py-16"
    >
      <div className="container-page">
        <h2
          id="review-ratings-heading"
          className="text-ink text-h3 text-center font-bold tracking-tight"
        >
          Rated by the people who use it
        </h2>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-6">
          {reviewPlatforms.map((platform) => (
            <li key={platform} className="w-44">
              <Placeholder
                label={`${platform} logo + rating`}
                ratio="2/1"
                className="bg-surface"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
