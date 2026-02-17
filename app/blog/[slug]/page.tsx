import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug, getPostsBySeriesAsc, seriesLabel, formatDate, markdownToHtml } from '@/lib/posts'
import Link from 'next/link'
import type { Metadata } from 'next'
import NewsletterForm from '@/components/NewsletterForm'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['Dave Glaser'],
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const htmlContent = markdownToHtml(post.body)

  // Get series siblings for navigation
  const seriesPosts = post.series ? getPostsBySeriesAsc(post.series) : []
  const currentIdx = seriesPosts.findIndex(p => p.slug === post.slug)
  const prevPost = currentIdx > 0 ? seriesPosts[currentIdx - 1] : null
  const nextPost = currentIdx < seriesPosts.length - 1 ? seriesPosts[currentIdx + 1] : null

  const isMM = post.series === 'man-and-machine'

  return (
    <article>
      {/* Post Header */}
      <header className="border-b border-border dark:border-[#2C2C28] bg-paper dark:bg-[#111110]">
        <div className="max-w-content mx-auto px-6 pt-12 pb-10">
          <div className="max-w-reading">
            {/* Series breadcrumb */}
            {post.series && (
              <div className="flex items-center gap-2 mb-6">
                <Link
                  href={`/${post.series}`}
                  className="text-[11px] font-semibold tracking-[0.1em] uppercase text-copper hover:text-copper-light transition-colors"
                >
                  {seriesLabel(post.series)}
                </Link>
                {post.number && (
                  <>
                    <span className="text-secondary text-xs">/</span>
                    <span className="text-xs text-secondary font-mono">
                      Episode {post.number}
                    </span>
                  </>
                )}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-black tracking-[-0.03em] text-ink dark:text-[#F5F2EC] leading-tight mb-5">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-3 text-sm text-secondary flex-wrap">
              <span>Dave Glaser</span>
              <span aria-hidden>·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden>·</span>
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </div>
      </header>

      {/* Post Body */}
      <div className="max-w-content mx-auto px-6 py-10 md:py-14">
        <div className="max-w-reading">
          <div
            className="prose prose-[17px] dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex items-center gap-2 mt-10 pt-8 border-t border-border dark:border-[#2C2C28]">
              <span className="text-xs text-secondary">Tagged:</span>
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-cream dark:bg-[#2A2520] text-secondary rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Share */}
          <div className="mt-6 flex items-center gap-3 flex-wrap">
            <span className="text-sm text-secondary">Share:</span>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=https://qstve.com/blog/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-secondary hover:text-navy dark:hover:text-[#5B8FD4] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=https://qstve.com/blog/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-secondary hover:text-ink dark:hover:text-paper transition-colors"
            >
              X (Twitter)
            </a>
          </div>
        </div>
      </div>

      {/* Series navigation */}
      {(prevPost || nextPost) && (
        <nav className="border-t border-border dark:border-[#2C2C28]">
          <div className="max-w-content mx-auto px-6 py-8">
            <div className="max-w-reading flex items-center justify-between gap-4">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="group flex flex-col gap-1 flex-1"
                >
                  <span className="text-xs text-secondary flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M19 12H5M12 5l-7 7 7 7"/>
                    </svg>
                    Previous
                  </span>
                  <span className="text-sm font-medium text-ink dark:text-[#F5F2EC] group-hover:text-navy dark:group-hover:text-[#5B8FD4] transition-colors line-clamp-1">
                    {prevPost.title}
                  </span>
                </Link>
              ) : <div />}

              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="group flex flex-col gap-1 flex-1 text-right"
                >
                  <span className="text-xs text-secondary flex items-center gap-1 justify-end">
                    Next
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-ink dark:text-[#F5F2EC] group-hover:text-navy dark:group-hover:text-[#5B8FD4] transition-colors line-clamp-1">
                    {nextPost.title}
                  </span>
                </Link>
              ) : <div />}
            </div>
          </div>
        </nav>
      )}

      {/* Newsletter CTA at bottom of post */}
      <div className="bg-cream dark:bg-[#1C1C1A] border-t border-border dark:border-[#2C2C28]">
        <div className="max-w-content mx-auto px-6 py-10">
          <div className="max-w-reading">
            <span className="badge text-copper mb-2 block">Money Moves Weekly</span>
            <p className="text-sm text-secondary mb-4">
              Get Dave&apos;s weekly take on fintech, payments, and building with AI. Every Friday.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </article>
  )
}
