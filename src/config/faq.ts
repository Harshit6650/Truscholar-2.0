export type FaqItem = {
  question: string
  answer: string
}

export type FaqGroup = {
  /** Rendered as a small-caps <p>, not a heading, to keep the hierarchy clean. */
  label: string
  items: FaqItem[]
}

export const faqGroups: FaqGroup[] = [
  {
    label: 'For Institutions',
    items: [
      {
        question: 'What is a digital credential?',
        answer:
          'A digital credential is a verified record of a qualification or achievement — a degree, marksheet, certificate or badge — issued electronically with structured data, a permanent verification URL and a QR code. Anyone can confirm it came from the stated issuer and has not been altered.',
      },
      {
        question: 'How does credential verification work?',
        answer:
          'Every credential carries a unique verification link and QR code. Scanning or opening it loads a public page showing the issuing institution, the qualification, the issue date and the current status. Verification takes seconds and requires no account.',
      },
      {
        question: 'Do recipients need an account to view or share a credential?',
        answer:
          'No. Each credential has a public page the recipient can share by link. Verifiers confirm authenticity without logging in. A wallet account is optional and adds lifelong storage, resume building and career tools.',
      },
      {
        question: 'What types of credentials can TruScholar issue?',
        answer:
          'Degrees, diplomas, marksheets, transcripts, provisional and migration certificates, skill badges, micro-credentials, training completion certificates, experience letters, and event, internship and participation certificates.',
      },
      {
        question: 'How is a credential protected against forgery?',
        answer:
          'Each credential is anchored as a cryptographic hash, so any alteration becomes detectable when checked against the anchored record. Verification happens at source rather than by inspecting the document, which means a convincing-looking forgery still fails.',
      },
      {
        question: 'Can we use our own branding and domain?',
        answer:
          'Yes. Credentials, recipient emails, the verification page and the credential portal can all carry your logo, colours, custom domain and sender address. Recipients see your institution, not ours.',
      },
      {
        question: 'How do we issue at scale?',
        answer:
          'Upload a spreadsheet, connect your ERP, SIS or LMS, or call the REST API. Most institutions issue an entire cohort in a single run. Bulk issuance of thousands typically completes in minutes.',
      },
      {
        question: 'Can we migrate from another credentialing platform?',
        answer:
          'Yes. Existing credential data, recipient records and metadata can be migrated. Discuss live verification links for previously issued credentials with our team during scoping.',
      },
      {
        question: 'How long are credentials hosted?',
        answer:
          'Issued credentials and their verification pages remain accessible for the long term, so an alumnus can verify a degree years after graduating.',
      },
      {
        question: 'Can we digitise old paper records?',
        answer:
          'Yes. TruDMS digitises legacy degree registers, convocation records and marksheets into a searchable archive, so alumni requests are answered in minutes instead of weeks.',
      },
      {
        question: 'How quickly can we launch?',
        answer:
          'A first credential can be designed and issued the same day. A full institution-wide rollout including integration, data migration and staff training typically takes a few weeks, depending on the scope of the integration and the volume of legacy records.',
      },
      {
        question: 'Who owns the learner data?',
        answer:
          'Your institution remains the data controller for records you issue. TruScholar acts as a processor under a data processing agreement. Learner data is not sold or used to market unrelated services.',
      },
      {
        question: 'Can employers verify credentials without contacting us?',
        answer:
          'Yes — that is the point. An employer scans the QR code or opens the verification link and confirms authenticity instantly, with no email to your registrar and no phone call.',
      },
    ],
  },
  {
    label: 'For Students & Learners',
    items: [
      {
        question: 'How do I get my certificate from my college?',
        answer:
          "Your institution issues and controls your credentials. Once they issue through TruScholar, you receive it by email and in your wallet. If your certificate hasn't arrived, start with your college's examination or records office.",
      },
      {
        question: 'What can I do with a TruScholar credential?',
        answer:
          'Share it as a verified link with an employer, add it to LinkedIn, use it to build an ATS-ready resume, or attach it to a Campus Connect application. Anyone you share it with can confirm it is genuine in seconds.',
      },
      {
        question: 'Is the wallet free for students?',
        answer:
          'Yes. Storing, viewing and sharing your credentials in the TruScholar Wallet is free for learners, on both iOS and Android.',
      },
      {
        question: 'How do I build a resume from my credentials?',
        answer:
          'The AI Resume Builder generates one automatically from credentials already verified on the platform. Every qualification links back to its verification page, so a recruiter can check any claim in one click.',
      },
      {
        question: 'How does career counselling work, and what does it cost?',
        answer:
          'You complete a psychometric assessment, then book a one-to-one session with a verified career counsellor who has your assessment results and academic profile in front of them. Counsellors set their own session fees, shown before you book.',
      },
      {
        question: 'How do I find jobs through Campus Connect?',
        answer:
          'Campus Connect matches your verified profile with recruiters hiring for roles that fit your qualifications. Because your credentials are already verified, recruiters can confirm every claim rather than screening it out.',
      },
    ],
  },
  {
    label: 'Career Guidance & Career Intelligence',
    items: [
      {
        question: 'How do I know which career is right for me?',
        answer:
          'Start with the psychometric assessment — it maps your personality, interests, aptitude and working style. TruScholar then matches that profile against real occupational data and current hiring demand, and a verified counsellor talks you through what it means for you specifically.',
      },
      {
        question: 'What is Career Intelligence?',
        answer:
          "Career Intelligence means making career decisions from evidence rather than opinion. It combines four things: what you are like, what skills you actually hold, where the job market is heading, and a counsellor's judgement — with AI doing the analysis behind the scenes.",
      },
      {
        question: 'What is a psychometric assessment, and how long does it take?',
        answer:
          'A set of scientifically designed questions measuring your interests, personality traits, aptitude and behavioural style. It usually takes 20 to 30 minutes. There are no right or wrong answers, and honest responses give you a far more useful result.',
      },
      {
        question: "I'm in Class 10 or Class 12 — which stream should I choose?",
        answer:
          'This is one of the most common reasons students come to TruScholar. Your assessment results, academic record and interests are mapped against where each stream can realistically lead, so the choice rests on evidence rather than on what everyone else is picking.',
      },
      {
        question: 'Will AI decide my career for me?',
        answer:
          'No. AI does the analysis — scoring your assessment, reading your academic record, mapping labour-market data. The interpretation and the conversation stay with a human counsellor, and the decision stays with you.',
      },
      {
        question: 'How is this different from a free career quiz online?',
        answer:
          'A quiz gives everyone with similar answers the same result. TruScholar factors in your verified academic record, the skills you actually hold, current hiring demand in your region, and a counsellor who understands your context — and it keeps updating as your profile changes.',
      },
      {
        question: 'Do I have to pay for career counselling?',
        answer:
          'The psychometric assessment and your career insight report are available through the TruScholar Wallet. One-to-one sessions are booked with individual counsellors, who set their own fees — shown clearly before you book anything.',
      },
      {
        question: 'How do I choose the right counsellor?',
        answer:
          'Every TruCareer Coach has a verified profile showing their qualifications, experience and areas of focus — school stream guidance, engineering, management, study abroad, career change. Filter by specialisation and pick someone who matches where you are.',
      },
      {
        question: 'What actually happens in a counselling session?',
        answer:
          'Your counsellor already has your assessment results, academic profile and career insight report before you join. So the session goes on your questions and your decision, rather than on filling in background they should already know.',
      },
      {
        question: 'What if I have already chosen the wrong course?',
        answer:
          'More common than you would think, and rarely fatal. Guidance focuses on which roles your current qualification can still reach, which skills would open up more, and what a realistic switch looks like from where you are now.',
      },
      {
        question: 'Can I get guidance for studying abroad?',
        answer:
          'Yes. Study abroad consultants are part of the TruCareer Coach network, and your verified credentials can be shared directly with overseas institutions in a form they can check for themselves.',
      },
      {
        question: 'How do I know which skills to learn next?',
        answer:
          'Your career insight report compares the skills on your profile against those in demand for the roles you are targeting, and shows you the gap. As you earn new credentials, the report updates.',
      },
      {
        question: 'Does my career plan stay updated over time?',
        answer:
          'Yes. Every new credential, assessment or achievement updates your profile, and your insight report changes with it. A career plan should evolve as you do, rather than sitting in a PDF from two years ago.',
      },
      {
        question: 'Can my college arrange career guidance for all its students?',
        answer:
          'Yes. Institutions run structured guidance programmes through TruScholar, giving every student assessments, insight reports and counsellor access — and giving the college reporting it can use as accreditation evidence.',
      },
    ],
  },
]

/** Flat list for the FAQPage JSON-LD. */
export const allFaqs: FaqItem[] = faqGroups.flatMap((group) => group.items)
