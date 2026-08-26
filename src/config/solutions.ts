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
   /solutions — the hub.
   ---------------------------------------------------------------------------
   This page owns one question: "which solution fits my organisation, and how
   would it work here?" It deliberately does not define what a digital
   credential is, restate the six-step journey, or carry a full security
   section — those belong to the homepage and the Trust Centre and are linked.

   Card copy is operational (the WORK) rather than audience description, so it
   does not restate the homepage "Who it's for" section.

   No India-specific framing here (NEP 2020, NAD, ABC, NAAC). That belongs on
   /solutions/universities and the country pages, so the hub stays relevant to
   a buyer outside India.
   --------------------------------------------------------------------------- */
export type Solution = {
  slug: string
  title: string
  /** The operational reality, not the audience. */
  work: string
  points: string[]
  ctaLabel: string
  icon: LucideIcon
}

export const solutions: Solution[] = [
  {
    slug: 'universities',
    title: 'Universities & Colleges',
    work: 'Thousands of records released against an examination calendar, plus decades of paper archives and a steady stream of alumni requests.',
    points: [
      'Issuance triggered by result publication, not manual upload',
      'Legacy registers digitised and searchable',
      'Reporting your accreditation file can use directly',
    ],
    ctaLabel: 'Explore university solutions',
    icon: GraduationCap,
  },
  {
    slug: 'students',
    title: 'Students & Learners',
    work: 'Collecting everything you have earned in one place, and getting something out of it.',
    points: [
      'Credentials from multiple institutions in one wallet',
      'Verified qualifications, not typed claims, on your resume',
      'Guidance and placement access built in',
    ],
    ctaLabel: 'Explore for learners',
    icon: Users,
  },
  {
    slug: 'corporates',
    title: 'Corporates & L&D',
    work: 'Proving internal training happened, to auditors, clients and departing employees.',
    points: [
      'Issuance on course completion, automatically',
      'Experience letters that still verify after someone leaves',
      'Skills visibility across teams and functions',
    ],
    ctaLabel: 'Explore corporate solutions',
    icon: Building2,
  },
  {
    slug: 'edtech',
    title: 'EdTech & Online Learning',
    work: 'Issuing continuously at unpredictable volume, with no human in the loop.',
    points: [
      'API and webhook issuance the moment a learner completes',
      'Fully white-labelled on your brand and domain',
      'One-click sharing to LinkedIn for every learner',
    ],
    ctaLabel: 'Explore EdTech solutions',
    icon: Laptop,
  },
  {
    slug: 'government',
    title: 'Government & Public Bodies',
    work: 'Population-scale issuance where every record must be auditable years later.',
    points: [
      'Volume without per-record manual handling',
      'Full audit trail on every issuance and access event',
      'Data residency and role-based access controls',
    ],
    ctaLabel: 'Explore government solutions',
    icon: Landmark,
  },
  {
    slug: 'events',
    title: 'Events & Conferences',
    work: 'Nothing for months, then several thousand certificates in one afternoon.',
    points: [
      'Bulk issuance from an attendee list, same day',
      'Participation, speaker and winner templates ready to go',
      'Attendees share and verify without an account',
    ],
    ctaLabel: 'Explore event solutions',
    icon: CalendarDays,
  },
  {
    slug: 'associations',
    title: 'Associations & Awarding Bodies',
    work: 'Credentials that expire, renew, and must be checkable by the public.',
    points: [
      'Expiry and renewal dates built into the credential',
      'CPD points tracked across cycles',
      'Public member directory verification',
    ],
    ctaLabel: 'Explore association solutions',
    icon: Award,
  },
]

/* ---------------------------------------------------------------------------
   Section 3 — comparison table.
   Rendered as a real <table>: the value is in reading ACROSS a row, which a
   card layout destroys.
   --------------------------------------------------------------------------- */
export const comparisonColumns = [
  'What you issue',
  'Typical volume',
  'Issuance triggered by',
  'Usual integration',
  'The thing that matters most',
] as const

export type ComparisonRow = {
  segment: string
  cells: [string, string, string, string, string]
}

export const comparisonRows: ComparisonRow[] = [
  {
    segment: 'Universities',
    cells: [
      'Degrees, marksheets, transcripts, migration certificates',
      '5,000–100,000 a year, in peaks',
      'Result publication or convocation',
      'ERP or examination system',
      'Accuracy at peak volume',
    ],
  },
  {
    segment: 'Students',
    cells: [
      '— (holds, does not issue)',
      'Personal',
      '—',
      'Wallet app',
      'Lifetime access',
    ],
  },
  {
    segment: 'Corporates',
    cells: [
      'Training completion, experience letters, skill badges',
      '500–20,000 a year, continuous',
      'Course completion or exit',
      'LMS or HRMS',
      'Verifiability after employment ends',
    ],
  },
  {
    segment: 'EdTech',
    cells: [
      'Course certificates, micro-credentials, badges',
      '10,000–500,000 a year, continuous',
      'Learner completes a module',
      'REST API or webhook',
      'Zero-touch automation',
    ],
  },
  {
    segment: 'Government',
    cells: [
      'Skill certificates, public credentials',
      '100,000+ a year',
      'Scheme or assessment completion',
      'API or bulk upload',
      'Auditability and data residency',
    ],
  },
  {
    segment: 'Events',
    cells: [
      'Participation, speaker, winner certificates',
      '200–10,000 per event, in bursts',
      'Attendance confirmed',
      'Spreadsheet upload or Zapier',
      'Same-day turnaround',
    ],
  },
  {
    segment: 'Associations',
    cells: [
      'Membership, CPD, professional certification',
      '1,000–50,000 a year',
      'Renewal cycle or CPD threshold',
      'Membership database',
      'Expiry and renewal handling',
    ],
  },
]

/* ---------------------------------------------------------------------------
   Section 4 — rollout.
   `weight` drives the visual width of each stage, so the graphic reflects real
   duration instead of five even steps. Integration is the widest because it is
   genuinely the most variable stage.
   --------------------------------------------------------------------------- */
export type RolloutStage = {
  number: string
  title: string
  weeks: string
  weight: number
  body: string
}

export const rolloutStages: RolloutStage[] = [
  {
    number: '1',
    title: 'Scoping',
    weeks: 'Week 1',
    weight: 1,
    body: 'We establish what you issue, at what volume, from which system, and who signs off. You get a written scope covering credential types, integration approach and rollout sequence.',
  },
  {
    number: '2',
    title: 'Template design',
    weeks: 'Week 1–2',
    weight: 1,
    body: 'Your existing certificate designs are rebuilt as digital templates — your seal, signatures, layout and any regional language requirements. Approval sits with your office, not ours.',
  },
  {
    number: '3',
    title: 'Integration',
    weeks: 'Week 2–4',
    weight: 2,
    body: 'Connection to your ERP, SIS, LMS or membership database, or API setup if you are issuing programmatically. This is the stage whose length varies most, depending on how accessible your source data is.',
  },
  {
    number: '4',
    title: 'Pilot cohort',
    weeks: 'Week 4–6',
    weight: 1.5,
    body: 'One department, one programme or one event. Real recipients, real verification, real feedback — before anything runs at scale.',
  },
  {
    number: '5',
    title: 'Full rollout',
    weeks: 'Week 6 onwards',
    weight: 1.5,
    body: 'Staff training, handover of admin roles, and legacy record digitisation if that is in scope. Legacy digitisation usually runs in parallel rather than blocking go-live.',
  },
]

/* ---------------------------------------------------------------------------
   Section 5 — migration paths.
   --------------------------------------------------------------------------- */
export type MigrationPath = {
  from: string
  body: string
  fragment: string
}

export const migrationPaths: MigrationPath[] = [
  {
    from: 'From paper and manual processes',
    body: "The biggest change, and the biggest gain. Records are digitised, issuance moves off the printer, and alumni requests stop landing on someone's desk. Expect the most time in template design and legacy digitisation — and the largest drop in administrative load.",
    fragment: 'Paper register beside a verified credential',
  },
  {
    from: 'From PDFs sent by email',
    body: 'The most common starting point. Your designs carry over almost unchanged, so the visible difference to recipients is small — but every credential becomes verifiable at source instead of forwardable and editable. Usually the fastest migration.',
    fragment: 'PDF attachment beside a verified credential',
  },
  {
    from: 'From another credentialing platform',
    body: 'Existing credential data, recipient records and metadata migrate across. The question worth raising early is what happens to verification links already in circulation — bring it to scoping so previously issued credentials are handled deliberately rather than discovered later.',
    fragment: 'Existing platform dashboard beside a verified credential',
  },
]

/* ---------------------------------------------------------------------------
   Section 6 — testimonials.
   ---------------------------------------------------------------------------
   Real named people at named institutions, supplied as approved marketing
   copy. Roles are still bracketed placeholders, as is one organisation name —
   a quote without a role carries much less weight, and the abbreviation it
   replaced read as the stablecoin.

   Each is labelled with the SOLUTION IN USE, which is what distinguishes this
   section from the homepage testimonials.
   --------------------------------------------------------------------------- */
export type SolutionTestimonial = {
  solution: string
  quote: string
  name: string
  role: string
  organisation: string
}

export const solutionTestimonials: SolutionTestimonial[] = [
  {
    solution: 'Universities & Colleges',
    quote:
      "We've been using the TruScholar platform for certificate issuance and I'm thoroughly impressed with its efficiency and user-friendly interface. Issuing certificates has never been smoother.",
    name: 'Mr. Sabyasachi Sen',
    role: '[Role]',
    organisation: 'Manav Rachna',
  },
  {
    solution: 'Universities & Colleges',
    quote:
      "TruScholar has streamlined our certification process immensely. We can quickly generate and distribute certificates to students, and the platform's reliability means they arrive securely and on time.",
    name: 'Mr. Sourabh Mishra',
    role: '[Role]',
    organisation: 'KIET',
  },
  {
    solution: 'Skill Development & Training',
    quote:
      'TruScholar has simplified our workflow and significantly reduced administrative overhead. The customisable templates let us create professional certificates tailored to our brand.',
    name: 'Mr. Balasaheb Zarekar',
    role: '[Role]',
    organisation: '[Full organisation name]',
  },
]

/* ---------------------------------------------------------------------------
   Section 7 — FAQ.
   ---------------------------------------------------------------------------
   Selection, scoping, migration and procurement only. Definitions and
   verification mechanics belong to the homepage FAQ.

   REGISTER NOTE: "What happens to credentials we have already issued
   elsewhere?" overlaps the homepage's "Can we migrate from another
   credentialing platform?" — same question, different wording. One of the two
   should be retired when the master FAQ register is built.
   --------------------------------------------------------------------------- */
export type SolutionFaq = {
  question: string
  answer: string
}

export const solutionFaqs: SolutionFaq[] = [
  {
    question: 'We fit more than one of these. Which page should I read?',
    answer:
      'Read the one matching your largest volume. Most organisations issue across several categories — a university that also runs hackathons and staff training, for instance — and all of it runs from one account with separate templates and workflows.',
  },
  {
    question: 'Can one account cover multiple departments with different branding?',
    answer:
      'Yes. Each department, school or business unit can have its own templates, sender identity and admin roles, while reporting rolls up centrally.',
  },
  {
    question: 'We issue only twice a year. Is that worth it?',
    answer:
      'Often more worthwhile than continuous issuance. Peak-load issuance is where manual processes break — convocation and result release are exactly when a records office is most stretched.',
  },
  {
    question: 'What is the smallest sensible starting point?',
    answer:
      'One programme, one cohort, or one event. Roughly a few hundred credentials is enough to test the workflow properly without committing your whole institution.',
  },
  {
    question: 'Who needs to be involved from our side?',
    answer:
      'Typically whoever owns the records — a registrar, controller of examinations, L&D lead or membership secretary — plus one IT contact for the integration, and whoever approves the credential design.',
  },
  {
    question: 'How long does integration take if our source data is messy?',
    answer:
      'This is the honest variable. Clean, exportable data integrates in days. Data spread across spreadsheets, legacy systems and departmental silos takes longer, and we would rather find that out during scoping than during rollout.',
  },
  {
    question: 'Can we run TruScholar alongside our current process for a while?',
    answer:
      'Yes, and most organisations do. Issuing digitally while continuing to print is a normal transition step, particularly where a governing body still expects a physical copy.',
  },
  {
    question: 'What happens to credentials we have already issued elsewhere?',
    answer:
      'Historical credentials can be migrated so they sit alongside new ones in the same archive and wallet. Raise existing verification links at scoping so they are handled deliberately.',
  },
  {
    question: 'Do we need our own IT team, or can you handle it?',
    answer:
      'For spreadsheet or Zapier-based issuance, no technical resource is needed. For ERP, SIS, LMS or API integration you will want one IT contact, though the implementation work sits with us.',
  },
  {
    question: 'How is pricing structured across the solutions?',
    answer:
      'Pricing follows credential volume rather than sector, so an event organiser and a university issuing the same number pay the same. Talk to us for a figure against your actual volume.',
  },
  {
    question: 'Can we pilot before committing to a contract?',
    answer:
      'Yes. A pilot with one cohort or one event is the normal way to start, and it is the fastest way to find out whether the workflow fits before anything is signed.',
  },
  {
    question: 'What do procurement teams usually ask for?',
    answer:
      'A data processing agreement, sub-processor list, security documentation and a penetration test summary. All are available during evaluation — see the Trust Centre for what is published, and ask us for the rest.',
  },
]
