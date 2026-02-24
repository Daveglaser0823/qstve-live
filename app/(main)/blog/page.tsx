import { getAllPosts, seriesLabel } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'All posts by Dave Glaser on AI, fintech, leadership, and building with technology.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  const series = ['all', 'man-and-machine', 'fintech', 'ai-tech', 'koala-papers']
  const seriesNames: Record<string, string> = {
    all: 'All',
    'man-and-machine': 'Man & Machine',
    fintech: 'Fintech',
    'ai-tech': 'AI & Tech',
    'koala-papers': 'Koala Papers',
  }

  return (
    <div className="max-w-content mx-auto px-6 py-12 md:py-16">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-black tracking-[-0.03em] text-ink dark:text-[#F5F2EC] mb-3">
          Writing
        </h1>
        <p className="text-secondary text-lg">
          {posts.length} post{posts.length !== 1 ? 's' : ''} on AI, fintech, leadership, and building.
        </p>
      </div>

      {/* Posts grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-secondary">Posts coming soon.</p>
        </div>
      )}
    </div>
  )
}
