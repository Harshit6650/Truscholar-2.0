import {
  Award,
  Building2,
  CalendarDays,
  GraduationCap,
  Landmark,
  Laptop,
  Users,
  type LucideIcon,
} from 'lucide-react'

/* ---------------------------------------------------------------------------
   Section 2 — Trusted by
   ---------------------------------------------------------------------------
   18 logo slots. `proof` is present on four of them; the text lives in the DOM
   at all times and is only revealed visually on hover, never created by it.

   No institution is named: a client name is confidential until confirmed
   approved for public display, and logo use normally needs written permission.
   --------------------------------------------------------------------------- */
export type Institution = {
  id: number
  proof?: string
}

export const institutions: Institution[] = Array.from({ length: 18 }, (_, index) => {
  const id = index + 1
  const proofs: Record<number, string> = {
    2: '[Institution] issued [X] credentials across [Y] programmes',
    6: '[Institution] cut alumni verification requests by [X]%',
    11: '[Institution] digitised [X] years of convocation records',
    15: '[Institution] issued a full cohort of [X] in a single run',
  }
  return proofs[id] ? { id, proof: proofs[id] } : { id }
})

/* ---------------------------------------------------------------------------
   Section 3 — The journey
   --------------------------------------------------------------------------- */
export type JourneyStep = {
  number: string
  title: string
  description: string
  /** Interface fragment brief for the step's placeholder. */
  fragment: string
}

export const journeySteps: JourneyStep[] = [
  {
    number: '01',
    title: 'You earn something',
    description:
      'A degree, a course certificate, a badge from a hackathon. It arrives verified at source, not as a PDF anyone could edit.',
    fragment: 'Credential document fragment',
  },
  {
    number: '02',
    title: 'You own it for life',
    description:
      'Every credential in one wallet, including records pulled from DigiLocker, NAD and ABC. Still there long after you graduate, with no institutional login needed.',
    fragment: 'Wallet credential list fragment',
  },
  {
    number: '03',
    title: 'You work out where it leads',
    description:
      'Psychometric assessment and a verified career counsellor help you choose a direction backed by real labour-market data, not guesswork.',
    fragment: 'Counsellor session fragment',
  },
  {
    number: '04',
    title: 'You build a resume that proves itself',
    description:
      'ATS-ready, generated from credentials that are already verified, where every claim links back to its source.',
    fragment: 'Generated resume fragment',
  },
  {
    number: '05',
    title: 'You prepare',
    description:
      'AI interview practice tailored to the roles you are actually targeting, so you walk in ready.',
    fragment: 'Interview practice screen fragment',
  },
  {
    number: '06',
    title: 'You get hired',
    description:
      'Campus Connect puts your verified profile in front of recruiters who can check every claim on it instantly.',
    fragment: 'Recruiter shortlist fragment',
  },
]

/* ---------------------------------------------------------------------------
   Section 5 — Impact
   Public factual claims. Confirm each figure is approved and current, and fill
   in the footnote month and methodology, before this page goes live.
   --------------------------------------------------------------------------- */
export type ImpactStat = {
  /** Numeric portion, used by the count-up. */
  value: number
  /** Rendered prefix/suffix, e.g. '%' or '+'. */
  suffix: string
  label: string
}

export const impactStats: ImpactStat[] = [
  { value: 80, suffix: '%', label: 'Improved Student Engagement' },
  { value: 50, suffix: '%', label: 'Faster Accreditation Processes' },
  { value: 500, suffix: '+', label: 'Universities Onboarded' },
  { value: 5, suffix: 'M+', label: 'Digital Credentials Issued' },
]

/* ---------------------------------------------------------------------------
   Section 6 — Who it's for
   Equal visual weight; Students is listed first but styled identically.
   --------------------------------------------------------------------------- */
export type Audience = {
  slug: string
  title: string
  description: string
  icon: LucideIcon
}

export const audiences: Audience[] = [
  {
    slug: 'students-and-learners',
    title: 'Students & Learners',
    description:
      'Own every credential you earn, get career guidance, build a verified resume, and connect with employers who can check it.',
    icon: Users,
  },
  {
    slug: 'universities-and-colleges',
    title: 'Universities & Colleges',
    description:
      'Degrees, marksheets and transcripts at convocation scale, with records that survive decades.',
    icon: GraduationCap,
  },
  {
    slug: 'corporates-and-l-and-d',
    title: 'Corporates & L&D',
    description:
      'Training completion, experience letters and skill badges your employees can prove anywhere.',
    icon: Building2,
  },
  {
    slug: 'edtech-and-online-learning',
    title: 'EdTech & Online Learning',
    description:
      'Automated issuance the moment a learner completes a course, via API or LMS.',
    icon: Laptop,
  },
  {
    slug: 'government-and-public-bodies',
    title: 'Government & Public Bodies',
    description:
      'Skill certification and public credentials at population scale, with full audit trails.',
    icon: Landmark,
  },
  {
    slug: 'events-and-conferences',
    title: 'Events & Conferences',
    description:
      'Participation and speaker certificates for hackathons, FDPs and conferences, at any volume.',
    icon: CalendarDays,
  },
  {
    slug: 'associations-and-awarding-bodies',
    title: 'Associations & Awarding Bodies',
    description:
      'Membership, CPD and professional certification with renewals and expiry built in.',
    icon: Award,
  },
]

/* ---------------------------------------------------------------------------
   Section 7 — Security, standards & compliance
   --------------------------------------------------------------------------- */
export type StandardBlock = {
  title: string
  body: string
}

export const standardBlocks: StandardBlock[] = [
  {
    title: 'Certified and audited',
    body: 'CMMI Level 5, ISO/IEC 27001 and SOC 2 Type II certified, with encryption in transit and at rest, role-based access control, single sign-on and full audit logging.',
  },
  {
    title: 'Patented issuance technology',
    body: "TruScholar's credential issuance method is protected by a granted patent, developed specifically for academic and professional records.",
  },
  {
    title: 'Tamper evidence',
    body: 'Each credential is anchored as a cryptographic hash, so any alteration becomes detectable against the anchored record. No personal data is written on-chain.',
  },
  {
    title: 'Data protection',
    body: "Your institution remains the data controller for records you issue. TruScholar processes on your behalf under a data processing agreement, aligned to India's Digital Personal Data Protection Act, 2023.",
  },
]

export const complianceMarks = [
  'CMMI Level 5',
  'ISO/IEC 27001',
  'SOC 2 Type II',
  'Patented IP',
]

/* ---------------------------------------------------------------------------
   Section 8 — Testimonials
   Structure in place, content deliberately unsupplied. A quote or an
   institution name invented here would be a fabricated review.
   --------------------------------------------------------------------------- */
export type Testimonial = {
  id: number
  quote: string
  name: string
  role: string
  institution: string
  hasVideo: boolean
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: '[Quote 1 to be supplied]',
    name: '[Full name 1]',
    role: '[Role 1]',
    institution: '[Institution 1]',
    hasVideo: true,
  },
  {
    id: 2,
    quote: '[Quote 2 to be supplied]',
    name: '[Full name 2]',
    role: '[Role 2]',
    institution: '[Institution 2]',
    hasVideo: false,
  },
  {
    id: 3,
    quote: '[Quote 3 to be supplied]',
    name: '[Full name 3]',
    role: '[Role 3]',
    institution: '[Institution 3]',
    hasVideo: false,
  },
]

/* ---------------------------------------------------------------------------
   Section 9 — Review ratings
   Third-party trademarks. No rating figure is stated here: every score must be
   read off the live listing before it is published.
   --------------------------------------------------------------------------- */
export const reviewPlatforms = [
  'G2',
  'Capterra',
  'TrustRadius',
  'Software Advice',
  'GetApp',
  'SoftwareSuggest',
]

/* ---------------------------------------------------------------------------
   Section 10 — Resources
   --------------------------------------------------------------------------- */
export type Resource = {
  id: number
  format: 'Guide' | 'Report' | 'Comparison'
  title: string
  summary: string
}

export const resources: Resource[] = [
  {
    id: 1,
    format: 'Guide',
    title: '[Guide title to be supplied]',
    summary: '[Guide summary to be supplied]',
  },
  {
    id: 2,
    format: 'Report',
    title: '[Report title to be supplied]',
    summary: '[Report summary to be supplied]',
  },
  {
    id: 3,
    format: 'Comparison',
    title: '[Comparison title to be supplied]',
    summary: '[Comparison summary to be supplied]',
  },
]
