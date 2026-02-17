import Link from 'next/link'
import NewsletterForm from '@/components/NewsletterForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Dave Glaser',
  description: 'CEO of Dwolla. Building with AI in public. The story behind Man & Machine and qstve.com.',
}

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="border-b border-border dark:border-[#2C2C28]">
        <div className="max-w-content mx-auto px-6 py-14 md:py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-black tracking-[-0.03em] text-ink dark:text-[#F5F2EC] leading-tight mb-5">
              Dave Glaser
            </h1>
            <p className="text-lg text-secondary leading-relaxed">
              CEO of Dwolla. 20+ years in fintech. Currently building a company alongside an AI.
            </p>
          </div>
        </div>
      </section>

      {/* Bio */}
      <div className="max-w-content mx-auto px-6 py-12 md:py-16">
        <div className="max-w-reading">
          <div className="prose dark:prose-invert max-w-none">
            <h2>The real intro</h2>

            <p>
              I run <a href="https://dwolla.com" target="_blank" rel="noopener">Dwolla</a>, a payments infrastructure company. We help businesses move money programmatically via ACH, real-time payments, and open banking. It&apos;s infrastructure work. Not glamorous, but it&apos;s what makes the modern financial system work for real companies.
            </p>

            <p>
              I&apos;ve been in fintech since before fintech was a word. Over two decades of watching the payments industry get disrupted, rebuilt, regulated, and disrupted again. I&apos;ve seen a lot of technology hype cycles.
            </p>

            <p>
              AI is different. Not in the way the breathless press releases say it is. Different in the way I see it in my own work every single day.
            </p>

            <h2>Why I started Man & Machine</h2>

            <p>
              Early in 2026, I had an AI system that could actually do things. Not just answer questions. Act. Read my calendar. Respond to emails. Research competitors. Summarize board materials. Monitor my health data. Manage my smart home.
            </p>

            <p>
              And I realized: nobody is writing about this honestly.
            </p>

            <p>
              There&apos;s the hype side: AI will replace every job, change everything, blah blah. There&apos;s the dismissal side: it&apos;s all fake, just autocomplete, never trust it. And then there&apos;s what actually happens when you give an AI real access to your life and work. Which is messier, more interesting, and more instructive than either camp acknowledges.
            </p>

            <p>
              So I started writing it down. Man & Machine is that account. Specific incidents. Real failures. Genuine surprises. A CEO talking to other operators, not performing thought leadership.
            </p>

            <h2>What is QSTVE?</h2>

            <p>
              Quiet. Focused. A place to write without the platform owning the relationship.
            </p>

            <p>
              The name doesn&apos;t mean anything specific. It&apos;s a domain that was available, easy to remember once you see it, and doesn&apos;t box me into a topic or persona. The writing is what it is.
            </p>

            <h2>The honest attribution</h2>

            <p>
              This site was built with AI. The design, the code, the architecture. Not vibe-coded in an afternoon, but thoughtfully built by an AI system working from a detailed brief.
            </p>

            <p>
              That&apos;s the story. It&apos;s not embarrassing. It&apos;s the whole point.
            </p>
          </div>

          {/* Contact */}
          <div className="mt-12 pt-10 border-t border-border dark:border-[#2C2C28]">
            <h3 className="text-lg font-bold text-ink dark:text-[#F5F2EC] mb-4">Find me</h3>
            <div className="flex items-center gap-5">
              <a
                href="https://www.linkedin.com/in/daveglaser/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-secondary hover:text-navy dark:hover:text-[#5B8FD4] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
                LinkedIn
              </a>
              <a
                href="https://x.com/daveglaser"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-secondary hover:text-ink dark:hover:text-paper transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                X (Twitter)
              </a>
              <a
                href="https://dwolla.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-secondary hover:text-ink dark:hover:text-paper transition-colors"
              >
                Dwolla
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-border dark:border-[#2C2C28] bg-cream dark:bg-[#1C1C1A]">
        <div className="max-w-content mx-auto px-6 py-10">
          <div className="max-w-reading">
            <span className="badge text-copper mb-2 block">Money Moves Weekly</span>
            <p className="text-sm text-secondary mb-4">
              Dave&apos;s weekly take on fintech, payments, and building with AI. Every Friday.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </>
  )
}
