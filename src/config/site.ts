export const siteConfig = {
  name: 'TruScholar',
  shortName: 'TruScholar',
  /** Used as the home page <title>. Kept verbatim from approved marketing copy. */
  metaTitle: 'TruScholar | Digital Credentials, Career Guidance & Jobs',
  tagline: 'Trusted Credentials. Connected Careers.',
  description:
    'From first credential to first job. TruScholar helps institutions issue verified credentials, and learners turn them into resumes, guidance and real opportunities.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  /** Sub-path the site is served from. A GitHub Pages project page uses /<repo>. */
  basePath: process.env.PAGES_BASE_PATH ?? '',
  locale: 'en-IN',
  /** Browser UI colour. Dark matches the navy-tinted `--background` in globals.css. */
  themeColor: { light: '#ffffff', dark: '#0b1b3f' },
  /** Brand hexes, for anything that cannot read the CSS tokens (emails, OG images). */
  brand: {
    navy: '#0b1b3f',
    primary: '#e2333a',
    verified: '#12a150',
    surfaceMuted: '#f4f6fb',
  },
  links: {
    // Fill these in before anything ships publicly.
    linkedin: '',
    twitter: '',
    support: 'mailto:support@truscholar.io',
  },
} as const

export type SiteConfig = typeof siteConfig
