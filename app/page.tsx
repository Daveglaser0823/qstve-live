import Link from 'next/link'
import { getAllPosts, seriesLabel, formatDate } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import NewsletterForm from '@/components/NewsletterForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dave Glaser | Man & Machine',
  description: "A CEO's real journey building with AI. Not theory. Not hype. What's actually working.",
}

export default function HomePage() {
  const posts = getAllPosts()
  const latestPosts = posts.slice(0, 3)
  const mmPosts = posts.filter(p => p.series === 'man-and-machine')

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border dark:border-[#2C2C28] bg-paper dark:bg-[#111110]">
        <div className="max-w-content mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            {/* Series label */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-copper" />
              <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-copper">
                Man &amp; Machine
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] text-ink dark:text-[#F5F2EC] leading-[1.1] mb-6">
              A CEO building{' '}
              <span className="text-navy dark:text-[#5B8FD4]">with AI.</span>
              <br />
              In public.
            </h1>

            {/* Subhead */}
            <p className="text-lg md:text-xl text-secondary leading-relaxed mb-8 max-w-xl">
              Not theory. Not hype. What&apos;s actually working when a fintech CEO and an AI system try to run a company together.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                href="/man-and-machine"
                className="inline-flex items-center gap-2 px-5 py-3 bg-navy hover:bg-navy-light text-white text-sm font-medium rounded-md transition-colors"
              >
                Read the series
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link
                href="/newsletter"
                className="inline-flex items-center gap-2 px-5 py-3 border border-border dark:border-[#2C2C28] text-secondary hover:text-ink dark:hover:text-paper hover:border-copper text-sm font-medium rounded-md transition-all"
              >
                Subscribe to newsletter
              </Link>
            </div>
          </div>

          {/* Stats strip */}
          {mmPosts.length > 0 && (
            <div className="mt-16 flex items-center gap-8 text-sm">
              <div>
                <span className="font-bold text-2xl text-ink dark:text-[#F5F2EC]">{mmPosts.length}</span>
                <span className="text-secondary ml-2">episodes</span>
              </div>
              <div className="w-px h-6 bg-border dark:bg-[#2C2C28]" />
              <div>
                <span className="font-bold text-2xl text-ink dark:text-[#F5F2EC]">
                  {mmPosts.reduce((acc, p) => acc + p.readingTime, 0)}
                </span>
                <span className="text-secondary ml-2">min total read</span>
              </div>
              <div className="w-px h-6 bg-border dark:bg-[#2C2C28]" />
              <div className="text-secondary">
                Published <span className="text-ink dark:text-[#F5F2EC] font-medium">3x/week</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Latest Writing */}
      <section className="max-w-content mx-auto px-6 py-16 md:py-20">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-[-0.02em] text-ink dark:text-[#F5F2EC]">
            Latest Writing
          </h2>
          <Link
            href="/blog"
            className="text-sm text-secondary hover:text-navy dark:hover:text-[#5B8FD4] transition-colors flex items-center gap-1"
          >
            All posts
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        {latestPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {latestPosts.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-secondary">Posts coming soon.</p>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="border-t border-border dark:border-[#2C2C28]">
        <div className="max-w-content mx-auto px-6 py-16 md:py-20">
          <div className="max-w-xl">
            <span className="badge text-copper mb-3 block">Money Moves Weekly</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.025em] text-ink dark:text-[#F5F2EC] mb-3">
              Fintech, payments, and the real work.
            </h2>
            <p className="text-secondary mb-6">
              One email every Friday. What I&apos;m reading, building, and thinking about. From a CEO who is actually in it.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* About strip */}
      <section className="bg-cream dark:bg-[#1C1C1A] border-t border-border dark:border-[#2C2C28]">
        <div className="max-w-content mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
            <div className="flex-1">
              <p className="text-sm text-secondary leading-relaxed">
                <strong className="text-ink dark:text-[#F5F2EC] font-medium">Dave Glaser</strong> is the CEO of{' '}
                <a href="https://dwolla.com" target="_blank" rel="noopener" className="text-navy dark:text-[#5B8FD4] hover:underline">
                  Dwolla
                </a>
                , a fintech payments infrastructure company. He&apos;s been building with AI since before the hype cycle, and Man &amp; Machine is the honest account of what that actually looks like.
              </p>
            </div>
            <Link
              href="/about"
              className="text-sm text-secondary hover:text-ink dark:hover:text-[#F5F2EC] transition-colors whitespace-nowrap flex items-center gap-1"
            >
              More about Dave
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
