import Link from 'next/link'
import { getAllPosts, getPostsBySeriesAsc, formatDate } from '@/lib/posts'
import NewsletterForm from '@/components/NewsletterForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Man & Machine',
  description: "A CEO's ongoing journal about building a company alongside an AI. Real stories, real failures, real lessons.",
}

export default function ManAndMachinePage() {
  const posts = getPostsBySeriesAsc('man-and-machine')
  const latestPost = posts.length > 0 ? posts[posts.length - 1] : null

  return (
    <>
      {/* Series Header */}
      <section className="border-b border-border dark:border-[#2C2C28]">
        <div className="max-w-content mx-auto px-6 py-14 md:py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-copper" />
              <span className="badge text-copper">Ongoing Series</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black tracking-[-0.03em] text-ink dark:text-[#F5F2EC] leading-tight mb-5">
              Man &amp; Machine
            </h1>

            <p className="text-lg text-secondary leading-relaxed mb-6 max-w-xl">
              Every company is figuring out how to work with AI. Most CEOs are reading about it. I&apos;m doing it.
            </p>

            <p className="text-base text-secondary leading-relaxed max-w-xl">
              This series is the raw account. What I built. What broke. What surprised me. What changed how I lead. Published a few times a week, in the order things actually happened.
            </p>

            <div className="flex items-center gap-6 mt-8 text-sm text-secondary">
              <span><strong className="text-ink dark:text-[#F5F2EC]">{posts.length}</strong> episodes</span>
              <span>·</span>
              <span>Published <strong className="text-ink dark:text-[#F5F2EC]">3x/week</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Episode */}
      {latestPost && (
        <section className="border-b border-border dark:border-[#2C2C28] bg-cream dark:bg-[#1C1C1A]">
          <div className="max-w-content mx-auto px-6 py-10">
            <div className="flex items-baseline justify-between mb-4">
              <span className="text-xs font-medium text-copper uppercase tracking-wider">Latest Episode</span>
              <span className="text-xs font-mono text-secondary">#{String(latestPost.number || posts.length).padStart(2, '0')}</span>
            </div>
            <Link href={`/blog/${latestPost.slug}`} className="group">
              <h2 className="text-xl md:text-2xl font-bold tracking-[-0.02em] text-ink dark:text-[#F5F2EC] group-hover:text-navy dark:group-hover:text-[#5B8FD4] transition-colors mb-2">
                {latestPost.title}
              </h2>
              <p className="text-secondary leading-relaxed mb-3">{latestPost.excerpt}</p>
              <span className="text-sm text-navy dark:text-[#5B8FD4] flex items-center gap-1 group-hover:gap-2 transition-all">
                Read episode
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* All Episodes */}
      <section className="max-w-content mx-auto px-6 py-12 md:py-16">
        <h2 className="text-xl font-bold tracking-[-0.02em] text-ink dark:text-[#F5F2EC] mb-6">
          All Episodes
        </h2>

        {posts.length > 0 ? (
          <div className="divide-y divide-border dark:divide-[#2C2C28]">
            {[...posts].reverse().map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-start gap-6 py-5 hover:bg-cream dark:hover:bg-[#1C1C1A] -mx-4 px-4 rounded-md transition-colors"
              >
                {/* Episode number */}
                <span className="text-sm font-mono text-secondary w-8 shrink-0 mt-0.5">
                  #{String(post.number || '').padStart(2, '0')}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-ink dark:text-[#F5F2EC] group-hover:text-navy dark:group-hover:text-[#5B8FD4] transition-colors mb-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-secondary line-clamp-2">{post.excerpt}</p>
                </div>

                {/* Meta */}
                <div className="text-xs text-secondary shrink-0 text-right mt-0.5 hidden sm:block">
                  <div>{formatDate(post.date)}</div>
                  <div>{post.readingTime} min</div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-secondary py-10">Episodes coming soon.</p>
        )}

        {/* Start from beginning CTA */}
        {posts.length > 0 && (
          <div className="mt-10 pt-8 border-t border-border dark:border-[#2C2C28]">
            <Link
              href={`/blog/${posts[0].slug}`}
              className="inline-flex items-center gap-2 text-sm text-navy dark:text-[#5B8FD4] hover:underline"
            >
              Start from Episode #1: {posts[0].title}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        )}
      </section>

      {/* Newsletter */}
      <section className="bg-navy dark:bg-[#1A2F4A]">
        <div className="max-w-content mx-auto px-6 py-12 md:py-14">
          <div className="max-w-lg">
            <span className="badge text-[#D4944A] mb-3 block">Never miss an episode</span>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
              Get Man &amp; Machine in your inbox
            </h2>
            <p className="text-[#9BB5D4] text-sm mb-6">
              New episodes directly to you. Plus the weekly Money Moves newsletter every Friday.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  )
}
