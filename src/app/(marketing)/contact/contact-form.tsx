'use client'

import { useActionState } from 'react'

import { FormField } from '@/components/common/form-field'
import { SubmitButton } from '@/components/common/submit-button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { submitContactForm, type ContactFormState } from '@/server/actions/contact'

const initialState: ContactFormState = { status: 'idle' }

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState)

  if (state.status === 'success') {
    return (
      <p role="status" className="text-success text-sm">
        {state.message}
      </p>
    )
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <FormField name="name" label="Full name" errors={state.fields?.name}>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          required
          aria-invalid={Boolean(state.fields?.name)}
        />
      </FormField>

      <FormField name="email" label="Work email" errors={state.fields?.email}>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(state.fields?.email)}
        />
      </FormField>

      <FormField
        name="organisation"
        label="Organisation"
        hint="Optional"
        errors={state.fields?.organisation}
      >
        <Input id="organisation" name="organisation" autoComplete="organization" />
      </FormField>

      <FormField name="message" label="How can we help?" errors={state.fields?.message}>
        <Textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-invalid={Boolean(state.fields?.message)}
        />
      </FormField>

      <div className="space-y-2">
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            name="consent"
            className="border-input accent-primary mt-0.5 size-4 rounded"
          />
          <span className="text-muted-foreground">
            I agree to be contacted about this enquiry.
          </span>
        </label>
        {state.fields?.consent ? (
          <p role="alert" className="text-destructive text-xs">
            {state.fields.consent.join(' ')}
          </p>
        ) : null}
      </div>

      {state.status === 'error' && !state.fields ? (
        <p role="alert" className="text-destructive text-sm">
          {state.message}
        </p>
      ) : null}

      <SubmitButton>Send enquiry</SubmitButton>
    </form>
  )
}
