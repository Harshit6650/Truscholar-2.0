'use client'

import { useState } from 'react'

import { FormField } from '@/components/common/form-field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { siteConfig } from '@/config/site'

/**
 * Contact form for a STATIC deployment.
 *
 * GitHub Pages has no server, so there is nowhere to POST: Server Actions and
 * route handlers both require a Node runtime. Rather than render a form that
 * silently fails, this composes the enquiry into a `mailto:` and hands it to
 * the visitor's mail client — no server, no third-party dependency, and the
 * message genuinely reaches the inbox.
 *
 * When this is deployed to a Node host instead, swap this back to the Server
 * Action version: the validation, service and repository layers are all still
 * in the repo under src/server/. See docs/deployment.md.
 */
const SUPPORT_EMAIL = siteConfig.links.support.replace('mailto:', '')

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [organisation, setOrganisation] = useState('')
  const [message, setMessage] = useState('')
  const [consent, setConsent] = useState(false)

  const ready = name.trim() && email.trim() && message.trim().length >= 10 && consent

  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    organisation ? `Organisation: ${organisation}` : null,
    '',
    message,
    '',
    'I agree to be contacted about this enquiry.',
  ]
    .filter((line) => line !== null)
    .join('\n')

  const href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
    'Website enquiry',
  )}&body=${encodeURIComponent(body)}`

  return (
    <form
      className="space-y-5"
      noValidate
      onSubmit={(event) => {
        event.preventDefault()
        window.location.href = href
      }}
    >
      <FormField name="name" label="Full name">
        <Input
          id="name"
          name="name"
          autoComplete="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </FormField>

      <FormField name="email" label="Work email">
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </FormField>

      <FormField name="organisation" label="Organisation" hint="Optional">
        <Input
          id="organisation"
          name="organisation"
          autoComplete="organization"
          value={organisation}
          onChange={(event) => setOrganisation(event.target.value)}
        />
      </FormField>

      <FormField
        name="message"
        label="How can we help?"
        hint="At least 10 characters."
      >
        <Textarea
          id="message"
          name="message"
          rows={5}
          required
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </FormField>

      <label className="flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          name="consent"
          className="border-input accent-primary mt-0.5 size-4 rounded"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
        />
        <span className="text-ink-muted">
          I agree to be contacted about this enquiry.
        </span>
      </label>

      <button
        type="submit"
        disabled={!ready}
        className="bg-primary text-surface rounded-btn text-body inline-flex items-center justify-center px-7 py-3.5 font-semibold transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
      >
        Send enquiry
      </button>

      <p className="text-ink-muted text-micro">
        This opens your email client with the message ready to send.
      </p>
    </form>
  )
}
