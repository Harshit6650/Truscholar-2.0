import {
  Archive,
  Award,
  BadgeCheck,
  Briefcase,
  ClipboardList,
  Compass,
  FileCheck2,
  FileText,
  FolderOpen,
  GraduationCap,
  Megaphone,
  Mic,
  Network,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react'

/* ---------------------------------------------------------------------------
   Homepage products section — two competing versions, built side by side for
   review. Exactly one survives, along with the existing Services bento which
   both of these replace.

   Route policy: no card points at a route that does not exist.
   - Seven products resolve through /products/[slug]
   - TruERP and Brand Ambassador keep the URLs specified in the brief
   - The six corporate cards all point at /solutions/corporates, which is the
     brief's own interim position ("a card linking to a stub is worse than no
     card") until each has enough distinct content to stand alone
   --------------------------------------------------------------------------- */

export const TRUERP_HREF = '/university-management-solution'
export const AMBASSADOR_HREF = '/brand-ambassador'
export const CORPORATES_HREF = '/solutions/corporates'

/* =========================================================================
   OPTION A — flat product grid, nine entries in a bento layout
   ========================================================================= */
export type ProductCard = {
  slug: string
  name: string
  lead: string
  points: string[]
  ctaLabel: string
  icon: LucideIcon
}

/** Nested inside the wallet card: the three things a learner does next. */
export const walletNested: ProductCard[] = [
  {
    slug: 'resume-builder',
    name: 'Resume Builder',
    lead: 'An ATS-ready resume built automatically from verified credentials, where a recruiter can check any claim on it in one click.',
    points: [
      'Populates automatically from verified credentials',
      "ATS-ready structure recruiters' systems can read",
      'Every qualification links to its verification page',
      'Role-specific versions from one profile',
      'Export as PDF or share a live link',
    ],
    ctaLabel: 'Build a resume',
    icon: FileText,
  },
  {
    slug: 'ai-interview-prep',
    name: 'Interview Preparation with AI',
    lead: 'Practise for the roles you are actually applying to, and get feedback on structure, clarity and specificity after every answer.',
    points: [
      'Questions matched to your target role and level',
      'Technical and behavioural rounds',
      'Feedback on structure, clarity and specificity',
      'Practise as often as you like',
      'Free for learners',
    ],
    ctaLabel: 'Start practising',
    icon: Mic,
  },
  {
    slug: 'career-coach',
    name: 'TruCareer Coach',
    lead: 'Psychometric assessment, real labour-market data, and a verified human counsellor who has already read your profile before the session starts.',
    points: [
      'Aptitude and personality assessment in twenty minutes',
      'Career report mapped to real hiring demand',
      'Sessions with verified, background-checked counsellors',
      'Stream and course guidance after Class 10 and 12',
      'Study-abroad guidance for learners going overseas',
    ],
    ctaLabel: 'Find a counsellor',
    icon: Compass,
  },
]

export const walletProduct: ProductCard = {
  slug: 'learner-wallet',
  name: 'Learner Wallet',
  lead: 'Every certificate a learner earns, from any institution, held in one free app they keep for life — no expiry, no login.',
  points: [
    'Every credential in one place, owned for life',
    'Records pulled from DigiLocker, NAD and ABC',
    'Share a verified link, not an editable PDF',
    'One-tap addition to LinkedIn',
    'Free on iOS and Android',
  ],
  ctaLabel: 'Explore the wallet',
  icon: Wallet,
}

/** Row 2 and row 3 of the bento, two columns each. */
export const pairedProducts: ProductCard[] = [
  {
    slug: 'digital-issuance',
    name: 'Digital Issuance',
    lead: 'Design your certificate once, then issue thousands of them in a single run — on your branding, verifiable in seconds by anyone.',
    points: [
      'Degrees, marksheets, transcripts and diplomas',
      'Badges, event and internship certificates',
      'Drag-and-drop designer, 200+ languages',
      'Bulk issuance from spreadsheet, ERP or LMS',
      'QR code and verification link on every credential',
    ],
    ctaLabel: 'Explore issuance',
    icon: FileCheck2,
  },
  {
    slug: 'truerp',
    name: 'TruERP',
    lead: 'A complete university ERP built around credentials, so admissions, examinations and student records feed issuance without any second system at all.',
    points: [
      'Admissions, enrolment and student information',
      'Examination management through to result publication',
      'Fees, attendance and academic records',
      'Role-based access across departments and campuses',
      'Results publish straight into issuance, no re-entry',
    ],
    ctaLabel: 'Explore TruERP',
    icon: Network,
  },
  {
    slug: 'trudms',
    name: 'TruDMS',
    lead: 'Decades of paper registers and marksheets, digitised into a searchable archive so alumni requests now take minutes instead of weeks.',
    points: [
      'Bulk digitisation of legacy registers and ledgers',
      'Searchable by name, roll number, programme or year',
      'Alumni reissues in minutes, not weeks',
      'Old records issuable as verifiable credentials',
      'Full audit trail on every record and access',
    ],
    ctaLabel: 'Explore TruDMS',
    icon: Archive,
  },
  {
    slug: 'campus-connect',
    name: 'Campus Connect',
    lead: 'Placement cells, students and recruiters on one platform — where every claim on every shortlist has already been checked at source.',
    points: [
      'Verified student profiles, built from issued credentials',
      'Recruiters shortlist proven qualifications, not claims',
      'Drives, interviews and offers in one pipeline',
      'Placement reporting for accreditation and rankings',
      'Students apply with a profile, not a PDF',
    ],
    ctaLabel: 'Explore Campus Connect',
    icon: Briefcase,
  },
]

/** Closing strip. A programme, not a product — so it sits outside ItemList. */
export const ambassadorProgramme: ProductCard = {
  slug: 'brand-ambassador',
  name: 'Brand Ambassador',
  lead: 'Represent TruScholar on your campus, build a verified public profile, and earn rewards while helping other students discover what credentials can do.',
  points: [
    'Open to students at any college, in any year',
    'A verified ambassador credential for your wallet',
    'Rewards and recognition for campus activity',
    'Training, materials and team support',
    'A route into internships and roles at TruScholar',
  ],
  ctaLabel: 'Become an ambassador',
  icon: Megaphone,
}

/** Everything with a /products/[slug] stub page. */
export const stubbedProducts: ProductCard[] = [
  walletProduct,
  ...walletNested,
  ...pairedProducts.filter((product) => product.slug !== 'truerp'),
]

/** The eight products for Option A's ItemList. Ambassador excluded. */
export const optionAProducts: ProductCard[] = [
  walletProduct,
  ...walletNested,
  ...pairedProducts,
]

/** Resolves a product slug to its real route. */
export function productHref(slug: string) {
  if (slug === 'truerp') return TRUERP_HREF
  if (slug === 'brand-ambassador') return AMBASSADOR_HREF
  return `/products/${slug}`
}

/* =========================================================================
   OPTION B — fourteen products across three audience bands
   ========================================================================= */

/**
 * Band accents. The brief calls for blue / teal / coral applied to the icon
 * and badge ONLY, never a card background, with a 100 stop as badge fill and
 * an 800 stop as badge text.
 *
 * These are defined as tokens in globals.css rather than inline hexes, and the
 * fill/text pairs were chosen to clear 4.5:1 — a pale-on-pale badge is the
 * usual way this pattern fails.
 */
export type BandTone = 'issuers' | 'learners' | 'corporates'

export type BandProduct = {
  name: string
  lead: string
  href: string
  icon: LucideIcon
  /** Marks the programme that sits outside the product ItemList. */
  isProgramme?: boolean
}

export type ProductBand = {
  id: string
  badge: 'B2B' | 'B2C'
  heading: string
  audience: string
  tone: BandTone
  products: BandProduct[]
}

export const productBands: ProductBand[] = [
  {
    id: 'for-issuers',
    badge: 'B2B',
    heading: 'For issuers',
    audience: 'Universities, colleges, schools and boards',
    tone: 'issuers',
    products: [
      {
        name: 'Digital Issuance',
        lead: 'Degrees, marksheets and transcripts at convocation scale, released against your examination calendar.',
        href: '/products/digital-issuance',
        icon: FileCheck2,
      },
      {
        name: 'TruERP',
        lead: 'Admissions, examinations and fees in one system, where publishing a result issues the credential.',
        href: TRUERP_HREF,
        icon: Network,
      },
      {
        name: 'TruDMS',
        lead: 'Decades of paper registers digitised into a searchable, verifiable institutional archive.',
        href: '/products/trudms',
        icon: Archive,
      },
      {
        name: 'Campus Connect',
        lead: 'Run placement drives on verified student profiles, with reporting ready for accreditation.',
        href: '/products/campus-connect',
        icon: Briefcase,
      },
    ],
  },
  {
    id: 'for-learners',
    badge: 'B2C',
    heading: 'For learners',
    audience: 'Students, alumni and jobseekers',
    tone: 'learners',
    products: [
      {
        name: 'Learner Wallet',
        lead: 'Every credential you earn, from any institution, in one free app you keep for life.',
        href: '/products/learner-wallet',
        icon: Wallet,
      },
      {
        name: 'Resume Builder',
        lead: 'An ATS-ready resume built from verified credentials, where every claim can be checked.',
        href: '/products/resume-builder',
        icon: FileText,
      },
      {
        name: 'Interview Preparation with AI',
        lead: 'A live AI interviewer that has already read your credentials and your target role.',
        href: '/products/ai-interview-prep',
        icon: Mic,
      },
      {
        name: 'TruCareer Coach',
        lead: 'Psychometric assessment, real labour-market data and verified human counsellors.',
        href: '/products/career-coach',
        icon: Compass,
      },
      {
        name: 'Brand Ambassador',
        lead: 'Represent TruScholar on your campus and earn rewards, recognition and a verified credential.',
        href: AMBASSADOR_HREF,
        icon: Megaphone,
        isProgramme: true,
      },
    ],
  },
  {
    id: 'for-corporates',
    badge: 'B2B',
    heading: 'For corporates',
    audience: 'Employers, L&D teams and HR',
    tone: 'corporates',
    products: [
      {
        name: 'Corporate Learning & Development',
        lead: 'Training and course completion certificates, issued automatically the moment a course ends.',
        href: CORPORATES_HREF,
        icon: GraduationCap,
      },
      {
        name: 'Employee Background Check',
        lead: "Verify any candidate's degrees, certifications and experience letters at source in seconds.",
        href: CORPORATES_HREF,
        icon: BadgeCheck,
      },
      {
        name: 'HR Analytics & Credentials Intelligence',
        lead: 'See what capability your teams actually hold, mapped from verified credentials rather than self-reported skills.',
        href: CORPORATES_HREF,
        icon: Users,
      },
      {
        name: 'Corporate Job Posting',
        lead: 'Post roles to candidate pools where every qualification has already been confirmed.',
        href: CORPORATES_HREF,
        icon: ClipboardList,
      },
      {
        name: 'Corporate Licences & Awards',
        lead: 'Internal certifications, licences and recognition, with expiry and renewal cycles built in.',
        href: CORPORATES_HREF,
        icon: Award,
      },
      {
        name: 'Employee Record Management',
        lead: 'Employment records, experience letters and training history, digitised and instantly retrievable.',
        href: CORPORATES_HREF,
        icon: FolderOpen,
      },
    ],
  },
]

/** The thirteen products for Option B's ItemList. Ambassador excluded. */
export const optionBProducts = productBands.flatMap((band) =>
  band.products.filter((product) => !product.isProgramme),
)

/* =========================================================================
   Shared: per-card visual briefs.
   ---------------------------------------------------------------------------
   Both options now carry an image on every card. Briefs only — no artwork
   exists yet, so these render as labelled Placeholder blocks.
   ========================================================================= */
export const productVisuals: Record<string, string> = {
  'learner-wallet': 'Wallet credential list on a phone, several institutions in one place',
  'resume-builder': 'Generated resume with a verification tooltip on one qualification',
  'ai-interview-prep': 'Interview practice screen mid-answer, with feedback panel',
  'career-coach': 'Counsellor session beside a psychometric result summary',
  'digital-issuance': 'Designer canvas mid-edit with bulk-issue progress alongside',
  truerp: 'ERP result-publication screen feeding straight into issuance',
  trudms: 'Paper register on one side, searchable digital archive on the other',
  'campus-connect': 'Placement dashboard, drive in progress, verified badges beside names',
  'brand-ambassador': 'Campus ambassador profile with a verified ambassador credential',
}

/**
 * OPTION A display order for the sticky stack.
 *
 * Wallet leads because every learner journey starts there, then the three
 * things it unlocks, then the institutional tools, and the programme closes.
 * Each product is now its OWN card in the stack rather than a nested tile.
 */
export const optionAStack: ProductCard[] = [
  walletProduct,
  ...walletNested,
  ...pairedProducts,
  ambassadorProgramme,
]

/**
 * OPTION B card visuals, keyed by product name.
 *
 * BandProduct has no slug, and the corporate six do not appear in
 * `productVisuals`, so the whole set is listed here explicitly rather than
 * falling back to a generic label on six of fifteen cards.
 */
export const bandVisuals: Record<string, string> = {
  'Digital Issuance': 'Designer canvas mid-edit with bulk-issue progress alongside',
  TruERP: 'ERP result-publication screen feeding straight into issuance',
  TruDMS: 'Paper register on one side, searchable digital archive on the other',
  'Campus Connect': 'Placement dashboard with verified badges beside candidate names',
  'Learner Wallet': 'Wallet credential list on a phone, several institutions in one place',
  'Resume Builder': 'Generated resume with a verification tooltip on one qualification',
  'Interview Preparation with AI': 'Interview practice screen mid-answer, feedback panel',
  'TruCareer Coach': 'Counsellor session beside a psychometric result summary',
  'Brand Ambassador': 'Campus ambassador profile with a verified ambassador credential',
  'Corporate Learning & Development': 'Course completion certificate issued from an LMS',
  'Employee Background Check': 'Candidate verification result in a green verified state',
  'HR Analytics & Credentials Intelligence':
    'Team capability map built from verified credentials',
  'Corporate Job Posting': 'Role posting alongside a pre-verified candidate pool',
  'Corporate Licences & Awards': 'Internal licence showing expiry and renewal dates',
  'Employee Record Management': 'Searchable employee record archive with audit trail',
}
