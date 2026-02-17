import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { micromark } from 'micromark'
import { gfm, gfmHtml } from 'micromark-extension-gfm'

export interface Post {
  slug: string
  title: string
  series?: string
  number?: number
  date: string
  excerpt: string
  tags: string[]
  body: string
  readingTime: number
}

const postsDirectory = path.join(process.cwd(), 'content/posts')

function calcReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return []

  const files = fs.readdirSync(postsDirectory)

  const posts = files
    .filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
    .map(filename => {
      const raw = fs.readFileSync(path.join(postsDirectory, filename), 'utf8')
      const { data, content: body } = matter(raw)
      const slug = filename.replace(/\.(md|mdx)$/, '')

      return {
        slug,
        title: data.title || slug,
        series: data.series,
        number: data.number,
        date: data.date || '',
        excerpt: data.excerpt || body.split('\n').find(l => l.trim().length > 20) || '',
        tags: data.tags || [],
        body,
        readingTime: calcReadingTime(body),
      } as Post
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getPostBySlug(slug: string): Post | null {
  if (!fs.existsSync(postsDirectory)) return null

  const files = fs.readdirSync(postsDirectory)
  const filename = files.find(f => f.replace(/\.(md|mdx)$/, '') === slug)
  if (!filename) return null

  const raw = fs.readFileSync(path.join(postsDirectory, filename), 'utf8')
  const { data, content: body } = matter(raw)

  return {
    slug,
    title: data.title || slug,
    series: data.series,
    number: data.number,
    date: data.date || '',
    excerpt: data.excerpt || body.split('\n').find(l => l.trim().length > 20) || '',
    tags: data.tags || [],
    body,
    readingTime: calcReadingTime(body),
  }
}

export function getPostsBySeriesAsc(series: string): Post[] {
  return getAllPosts()
    .filter(p => p.series === series)
    .sort((a, b) => (a.number || 0) - (b.number || 0))
}

export function seriesLabel(series?: string): string {
  const labels: Record<string, string> = {
    'man-and-machine': 'Man & Machine',
    'koala-papers': 'Koala Papers',
    'hips': 'HIPS',
    'fintech': 'Fintech Commentary',
    'ai-tech': 'AI & Tech Takes',
  }
  return series ? (labels[series] || series) : 'Essay'
}

export function markdownToHtml(markdown: string): string {
  return micromark(markdown, {
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()],
  })
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}
