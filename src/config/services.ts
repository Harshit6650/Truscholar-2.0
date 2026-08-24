/**
 * Section 4 — the bento grid, and the five primary services in the ItemList
 * JSON-LD. Slugs also drive the /services/[slug] stub pages so every CTA
 * resolves.
 */
export type ServiceCard = {
  slug: string
  title: string
  lead: string
  points: string[]
  ctaLabel: string
  /** Placeholder brief for the card's visual. */
  visual?: string
  visualRatio?: string
}

/** Nested tiles inside the Credential Wallet card. */
export type WalletTile = {
  slug: string
  title: string
  lead: string
  points: string[]
}

export const walletTiles: WalletTile[] = [
  {
    slug: 'ai-resume-builder',
    title: 'AI Resume Builder & Interview Prep',
    lead: 'Turn verified credentials into an ATS-ready resume in minutes, then practise for the interview.',
    points: [
      'Builds automatically from credentials already verified',
      'Every qualification links back to its verification page',
      'AI interview practice for your target roles',
    ],
  },
  {
    slug: 'trucareer-coach',
    title: 'TruCareer Coach',
    lead: 'Work out where your credentials should lead, with guidance backed by real data.',
    points: [
      'Psychometric aptitude and personality assessment',
      'One-to-one sessions with verified career counsellors',
      'Labour-market insights and study-abroad guidance',
    ],
  },
  {
    slug: 'trudms',
    title: 'TruDMS',
    lead: 'Decades of paper records, digitised — so alumni credentials reach the wallet too.',
    points: [
      'Bulk legacy record digitisation, searchable by name, roll number and year',
      'Alumni certificate reissues in minutes instead of weeks',
      'Complete audit trails and role-based access',
    ],
  },
]

export const walletCard: ServiceCard = {
  slug: 'credential-wallet',
  title: 'Credential Wallet — the centre of everything',
  lead: 'One app where a learner keeps everything they have earned, and where every next step begins.',
  points: [
    'Every credential in one wallet, owned for life',
    'Records pulled from DigiLocker, NAD and ABC',
    'Share a verified link, not an editable PDF',
    'Available on iOS and Android, no institutional login needed',
  ],
  ctaLabel: 'Explore the wallet',
  visual: 'Wallet at centre, resume / counsellor / archive connected around it',
  visualRatio: '4/3',
}

export const campusConnectCard: ServiceCard = {
  slug: 'campus-connect',
  title: 'Campus Connect',
  lead: 'Verified profiles in front of recruiters who can check every claim on them instantly.',
  points: [
    'Apply with a verified profile, not a PDF resume',
    'Recruiters shortlist against proven qualifications',
    'Drives, interviews and offers in one pipeline',
    'Placement reporting and analytics for institutions',
    'Alumni stay connected through the credential wallet',
  ],
  ctaLabel: 'Explore Campus Connect',
  visual: 'Placement dashboard, drive in progress, verified badges beside candidate names',
  visualRatio: '16/9',
}

export const issuanceCard: ServiceCard = {
  slug: 'digital-credential-issuance',
  title: 'Digital Credential Issuance',
  lead: 'Design once, issue to thousands. Every degree, marksheet, transcript and badge your institution awards — created, branded and delivered in a single run.',
  points: [
    'Degrees, diplomas, marksheets and transcripts',
    'Provisional and migration certificates',
    'Skill, event and internship badges',
    'Drag-and-drop credential designer',
    'Bulk issuance via spreadsheet or ERP',
    'QR codes and permanent verification URLs',
  ],
  ctaLabel: 'Explore issuance',
  visual: 'Designer canvas mid-edit with bulk-issue progress alongside',
  visualRatio: '4/3',
}

export const verificationCard: ServiceCard = {
  slug: 'instant-verification',
  title: 'Instant Verification',
  lead: 'The moment a credential is questioned, it answers for itself. Employers, background-check agencies and embassies confirm authenticity at source in under ten seconds.',
  points: [
    'Public verification without login',
    'QR code and URL verification',
    'Tamper-evident credential records',
    'Verification analytics and insights',
    'Paid verification requests',
    'Bulk verification API',
  ],
  ctaLabel: 'Verify a credential',
  visual: 'Verification result screen, green verified state, issuer / date / credential ID',
  visualRatio: '4/3',
}

export const integrationsCard: ServiceCard = {
  slug: 'integrations-and-apis',
  title: 'Integrations & APIs',
  lead: 'Connect your ERP, SIS or LMS and issue automatically from your existing examination workflow. DigiLocker, NAD and ABC push happens in the same run.',
  points: [
    'ERP and SIS platform integrations',
    'LMS integrations for leading platforms',
    'REST API and webhook support',
    'DigiLocker, NAD and ABC integration',
    'Zapier and no-code automation',
    'Sandbox access and API documentation',
  ],
  ctaLabel: 'See integrations',
}

/** Every card, for the /services/[slug] stub route and the ItemList JSON-LD. */
export const serviceCards: ServiceCard[] = [
  walletCard,
  campusConnectCard,
  issuanceCard,
  verificationCard,
  integrationsCard,
]
