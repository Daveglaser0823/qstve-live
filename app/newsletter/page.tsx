import NewsletterForm from '@/components/NewsletterForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Money Moves Weekly',
  description: 'Subscribe to Dave Glaser\'s weekly newsletter on fintech, payments, and building with AI.',
}

export default function NewsletterPage() {
  const pastIssues = [
    {
      title: 'The Real-Time Payments Inflection Point',
      date: 'February 14, 2026',
      teaser: 'Three things happened this week that changed how I think about RTP adoption.',
    },
    {
      title: 'When AI Makes a Compliance Call',
      date: 'February 7, 2026',
      teaser: 'Fraud detection is table stakes. This week we looked at what comes next.',
    },
    {
      title: 'Why Open Banking Is Still Stuck',
      date: 'January 31, 2026',
      teaser: 'The regulation passed. The infrastructure exists. So why isn\'t it working?',
    },
  ]

  return (
    <>
      {/* Header */}
      <section className="border-b border-border dark:border-[#2C2C28]">
        <div className="max-w-content mx-auto px-6 py-14 md:py-20">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-copper" />
              <span className="badge text-copper">Weekly Newsletter</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black tracking-[-0.03em] text-ink dark:text-[#F5F2EC] leading-tight mb-4">
              Money Moves Weekly
            </h1>

            <p className="text-lg text-secondary leading-relaxed mb-8">
              Fintech, payments, and the real work. From a CEO who&apos;s been inside the infrastructure for 20 years. Every Friday morning.
            </p>

            {/* Signup form */}
            <div className="bg-cream dark:bg-[#1C1C1A] border border-border dark:border-[#2C2C28] rounded-lg p-6">
              <h2 className="text-base font-bold text-ink dark:text-[#F5F2EC] mb-1">
                Get it in your inbox
              </h2>
              <p className="text-sm text-secondary mb-4">
                One email. Every Friday. No filler.
              </p>
              <NewsletterForm variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="border-b border-border dark:border-[#2C2C28]">
        <div className="max-w-content mx-auto px-6 py-12">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-ink dark:text-[#F5F2EC] mb-8">What&apos;s in each issue</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  title: 'What I read',
                  desc: 'The 2-3 pieces that actually moved my thinking this week. With context, not just links.',
                },
                {
                  title: 'What I built',
                  desc: 'Progress on whatever is live at Dwolla or in my own AI setup. Real metrics, real updates.',
                },
                {
                  title: 'What I think',
                  desc: 'One take on something happening in fintech or AI. One paragraph. No hedging.',
                },
              ].map(item => (
                <div key={item.title} className="flex flex-col gap-2">
                  <h3 className="text-sm font-bold text-ink dark:text-[#F5F2EC]">{item.title}</h3>
                  <p className="text-sm text-secondary leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Past issues */}
      <section className="max-w-content mx-auto px-6 py-12">
        <h2 className="text-xl font-bold text-ink dark:text-[#F5F2EC] mb-6">Recent Issues</h2>

        <div className="divide-y divide-border dark:divide-[#2C2C28]">
          {pastIssues.map(issue => (
            <div key={issue.title} className="py-5">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-base font-semibold text-ink dark:text-[#F5F2EC]">{issue.title}</h3>
                <time className="text-xs text-secondary shrink-0">{issue.date}</time>
              </div>
              <p className="text-sm text-secondary mt-1">{issue.teaser}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-secondary">
          Full archive available to subscribers.
        </p>
      </section>
    </>
  )
}
