import { cn } from '@/lib/utils'

type PlaceholderProps = {
  /**
   * Descriptive brief for the image that will replace this block. Doubles as
   * the accessible name, so write it as you would write alt text.
   */
  label: string
  /** CSS aspect ratio, e.g. "4/3", "16/9", "3/1". Defaults to 4/3. */
  ratio?: string
  /**
   * Set false for boxes too small to hold text (avatars, small logo marks).
   * The accessible name is unaffected — only the visible caption is dropped.
   */
  labelVisible?: boolean
  /**
   * Set for placeholders sitting on a navy card. The caption switches to
   * `surface`, because `ink-muted` on navy measures 2.45:1 and is barely
   * readable.
   */
  onDark?: boolean
  className?: string
}

/**
 * Stand-in for artwork that does not exist yet.
 *
 * Deliberately not an <img>: there is no file to point at, and a broken image
 * or a stock photo would both be worse than an honest labelled block. It
 * carries `role="img"` plus the label as its accessible name, so assistive
 * tech announces it the way the real image will be announced.
 *
 * `overflow-hidden` plus a clamped micro label matters: several of these boxes
 * are only 45–80px tall, and an unclamped caption spills straight out of the
 * block and reads as a rendering bug.
 *
 * `aspectRatio` is set inline rather than as an arbitrary Tailwind class,
 * because the ratio is a runtime prop and the token rules forbid arbitrary
 * utility values.
 */
export function Placeholder({
  label,
  ratio = '4/3',
  labelVisible = true,
  onDark = false,
  className,
}: PlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      style={{ aspectRatio: ratio }}
      className={cn(
        'bg-surface-muted border-surface-border rounded-card grid w-full place-items-center overflow-hidden border-2 border-dashed p-2',
        className,
      )}
    >
      {labelVisible ? (
        <span
          className={cn(
            'text-micro line-clamp-3 text-center',
            onDark ? 'text-surface' : 'text-ink-muted',
          )}
        >
          {label}
        </span>
      ) : null}
    </div>
  )
}
