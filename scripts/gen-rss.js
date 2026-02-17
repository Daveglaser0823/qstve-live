const { promises: fs } = require('fs')
const path = require('path')
const RSS = require('rss')
const matter = require('gray-matter')

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://qstve.com'

async function generate() {
  const feed = new RSS({
    title: 'Dave Glaser | Man & Machine',
    description: "A CEO's real journey building with AI. Not theory. Not hype. What's actually working.",
    site_url: SITE_URL,
    feed_url: `${SITE_URL}/feed.xml`,
    language: 'en',
    managingEditor: 'Dave Glaser',
    webMaster: 'Dave Glaser',
  })

  const postsDir = path.join(__dirname, '..', 'content', 'posts')

  let files = []
  try {
    files = await fs.readdir(postsDir)
  } catch {
    console.log('[gen-rss] No content/posts directory found, writing empty feed')
    await fs.writeFile('./public/feed.xml', feed.xml({ indent: true }))
    return
  }

  const allPosts = []
  await Promise.all(
    files
      .filter(name => name.endsWith('.md') || name.endsWith('.mdx'))
      .map(async (name) => {
        const content = await fs.readFile(path.join(postsDir, name))
        const fm = matter(content)

        allPosts.push({
          title: fm.data.title || name,
          url: `${SITE_URL}/blog/${name.replace(/\.(md|mdx)$/, '')}`,
          date: fm.data.date,
          description: fm.data.excerpt || '',
          categories: fm.data.tags || [],
          author: 'Dave Glaser',
          custom_elements: [
            { 'content:encoded': fm.content },
          ],
        })
      })
  )

  allPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
  allPosts.forEach((post) => feed.item(post))
  await fs.writeFile('./public/feed.xml', feed.xml({ indent: true }))
  console.log(`[gen-rss] Generated feed with ${allPosts.length} posts`)
}

generate()
