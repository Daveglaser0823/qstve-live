'use client'

import { useState } from 'react'

interface NewsletterFormProps {
  variant?: 'default' | 'hero'
  className?: string
}

export default function NewsletterForm({ variant = 'default', className = '' }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage('You\'re in. Check your inbox for a confirmation.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <svg className="text-copper shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
          <path d="M22 4L12 14.01l-3-3"/>
        </svg>
        <p className="text-sm text-secondary">{message}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className={`flex gap-2 ${variant === 'hero' ? 'flex-col sm:flex-row' : 'flex-row'}`}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-4 py-3 rounded-md border border-border dark:border-[#2C2C28] bg-surface dark:bg-[#1C1C1A] text-ink dark:text-[#F5F2EC] text-sm placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-copper/40 focus:border-copper transition-all"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-5 py-3 bg-navy hover:bg-navy-light dark:bg-[#2D5F9E] text-white text-sm font-medium rounded-md transition-colors disabled:opacity-60 whitespace-nowrap"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
      {status === 'error' && (
        <p className="mt-2 text-sm text-red-500">{message}</p>
      )}
      <p className="mt-2 text-xs text-secondary">No spam. Unsubscribe anytime.</p>
    </form>
  )
}
