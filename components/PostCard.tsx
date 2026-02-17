import Link from 'next/link'
import { Post, seriesLabel, formatDate } from '@/lib/posts'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const seriesName = seriesLabel(post.series)
  const isMM = post.series === 'man-and-machine'

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="h-full bg-surface dark:bg-[#1C1C1A] border border-border dark:border-[#2C2C28] rounded-lg overflow-hidden hover:border-copper dark:hover:border-copper transition-all hover:shadow-lg hover:shadow-ink/5 dark:hover:shadow-black/20">
        {/* Illustration placeholder / color band */}
        <div className={`h-1.5 w-full ${isMM ? 'bg-copper' : 'bg-navy'}`} />

        <div className="p-6">
          {/* Series badge */}
          <div className="flex items-center justify-between mb-4">
            <span className={`text-[11px] font-semibold tracking-[0.08em] uppercase ${isMM ? 'text-copper' : 'text-navy dark:text-[#5B8FD4]'}`}>
              {seriesName}
            </span>
            {post.number && (
              <span className="text-[11px] text-secondary font-mono">
                #{String(post.number).padStart(2, '0')}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold tracking-[-0.02em] text-ink dark:text-[#F5F2EC] leading-snug group-hover:text-navy dark:group-hover:text-[#5B8FD4] transition-colors mb-3">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-secondary leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 mt-5 pt-4 border-t border-border dark:border-[#2C2C28] text-xs text-secondary">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingTime} min read</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
