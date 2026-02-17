# QSTVE Site Architecture

*Last updated: February 2026*

---

## Page Structure

### `/` - Homepage
**Purpose:** Convert a LinkedIn visitor or Google referral into a subscriber or repeat reader.

**Sections (top to bottom):**
1. **Hero** - "Man & Machine" wordmark + one-line description + primary CTA
2. **About strip** - 2-sentence intro to Dave + site purpose
3. **Featured series** - Man & Machine series intro with latest 3 posts
4. **Newsletter CTA** - Money Moves Weekly signup
5. **Footer**

**Key decisions:**
- No giant hero image (fast, avoids CLS)
- The M&M illustration style CAN appear as a feature but not required
- CTA hierarchy: Read M&M > Subscribe > Explore blog

---

### `/blog` - All Writing
**Purpose:** Browsable archive of all content, filterable by pillar.

**Features:**
- Grid of post cards (3 columns desktop, 2 tablet, 1 mobile)
- Filter tabs: All | Man & Machine | Fintech | AI & Tech | Koala Papers
- Client-side filtering (no page reload, no extra API calls)
- Pagination or infinite scroll (start with pagination, simpler)
- Sort: newest first

---

### `/man-and-machine` - M&M Series
**Purpose:** The canonical home of the series. Permanent URL shared on LinkedIn.

**Features:**
- Series description + Dave's "why I'm doing this"
- Numbered list of all M&M posts in order (#1, #2, #3...)
- Latest post featured at top
- "Start from the beginning" option
- Share buttons (LinkedIn, X, copy link)
- Series RSS feed: `/feed/man-and-machine.xml`

---

### `/blog/[slug]` - Individual Post
**Purpose:** The reading experience. Clean, distraction-free.

**Features:**
- Title, series badge, date, read time
- Illustration (if available)
- Post body (MDX, rendered with prose typography)
- Quotable line highlighted (blockquote styling)
- Share links at top and bottom
- "Next post" and "Previous post" navigation
- Related posts (same series) at bottom
- Newsletter signup embed at bottom

**URL structure:** `/blog/man-and-machine-06-the-memory-problem`
**Canonical series URLs also work:** `/man-and-machine/06`

---

### `/newsletter` - Money Moves Weekly
**Purpose:** Newsletter subscription + archive.

**Features:**
- Description of the newsletter (what it is, cadence, audience)
- Email signup form (newsletter provider integration)
- Archive of past issues (link out to provider's hosted archive or embedded)
- Social proof: subscriber count (optional, only if meaningful)

---

### `/about` - Dave Glaser + The QSTVE Story
**Purpose:** Answer "who is this and why should I care?"

**Content:**
- Dave's bio (CEO of Dwolla, 20+ years fintech, building with AI)
- The QSTVE story (what the name means, why this site exists)
- Man & Machine origin story
- Photo (optional, warm/natural)
- Links to Dwolla, LinkedIn, X

---

### `/feed.xml` - RSS Feed
**Purpose:** Enable subscription via RSS readers (Brad Feld, technical audiences).

**Implementation:** Server-side generated at build time via `scripts/gen-rss.js` (already exists in repo). Update to pull from content directory.

---

## Tech Stack

### Framework
**Next.js 14 App Router** on existing project infrastructure.

Why App Router over Pages Router (which was previously used):
- Server components = faster initial load, no client JS overhead for static content
- Better metadata API (per-page OG images, canonical URLs)
- Streaming for future use
- App directory MDX support is cleaner

### Content
**Plain Markdown with frontmatter** (`.md` files in `/content/posts/`).

Why not MDX?
- MDX adds complexity (custom components, compilation overhead)
- Dave's M&M posts are short, text-focused pieces - no need for embedded components
- Plain markdown is easier to edit, version control, and migrate
- Can upgrade to MDX later if needed

Why not a CMS?
- **Phase 1 (now):** File-based. Lowest friction. Dave or Steve adds `.md` files.
- **Phase 2 (optional):** Add a headless CMS (Sanity, Contentlayer) if the volume justifies it
- **Rule:** Don't add infrastructure until there's a problem to solve.

**Frontmatter schema:**
```yaml
---
title: "The Memory Problem"
series: "man-and-machine"
number: 6
date: "2026-02-17"
excerpt: "My AI forgot who I was every single morning."
tags: ["AI", "BuildInPublic"]
---
```

### Styling
**Tailwind CSS** with `@tailwindcss/typography` for post body prose styling.

Custom design tokens extend the Tailwind theme:
- Colors: `ink`, `paper`, `navy`, `copper`, `slate`, `cream`, `surface`, `border`
- Font: Inter variable (already loaded locally)

### MDX/Markdown Rendering
**next-mdx-remote/rsc** (already installed) for rendering markdown in server components.
Pipeline: `gray-matter` (frontmatter) + `next-mdx-remote` (body) = clean server-rendered HTML.

### Database
**Neon PostgreSQL** is already configured. Phase 1 does NOT use the database for content (file-based). Future use cases:
- Newsletter subscriber management
- Analytics/pageview counts
- Comments (if desired)

### Authentication
**Clerk** is already installed. Phase 1 does NOT use auth (content is public). Future use:
- Protected drafts/preview
- Member-only content

---

## SEO Strategy

### Meta Tags
Every page has:
```tsx
export const metadata: Metadata = {
  title: 'Post Title | Man & Machine',
  description: 'First 150 chars of post...',
  openGraph: {
    title: '...',
    description: '...',
    images: [{ url: '/api/og?title=...' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@DaveGlaser',
  },
  alternates: {
    canonical: 'https://qstve.com/blog/[slug]',
  },
}
```

### OG Image Generation
**`/app/api/og/route.tsx`** - Dynamic OG image generation using `@vercel/og` (Satori).
Template: Navy background, post title in large cream Inter, "Man & Machine" + series number in Copper, qstve.com footer.

### Structured Data
Each post page includes `application/ld+json`:
```json
{
  "@type": "BlogPosting",
  "headline": "...",
  "author": { "@type": "Person", "name": "Dave Glaser" },
  "datePublished": "...",
  "url": "..."
}
```

### URL Structure
- Human-readable slugs from frontmatter or filename
- `/man-and-machine` canonical for the series (not just a tag)
- Stable URLs - once published, never change a slug

---

## Newsletter Integration

**Recommended: Buttondown**

Why Buttondown over ConvertKit/Mailchimp:
- Built for writers, not marketers
- Clean API for embedding signup forms
- Native RSS-to-email option (auto-sends when new posts are published)
- Privacy-respecting (no pixel tracking by default)
- Substack crosspost option available
- $9/month for 1000 subscribers

**Integration approach:**
- Signup form POSTs to Buttondown API endpoint
- `/app/api/newsletter/route.ts` handles the API call server-side (keeps API key off client)
- Success/error state handled in the `NewsletterForm` client component

**Substack strategy:**
- Option to crosspost M&M posts to Substack automatically via RSS
- Keeps the Substack audience while building owned platform
- Do NOT make Substack primary - own the email list

---

## Analytics

**Vercel Analytics** - already enabled on the Vercel project.
- Privacy-respecting by default
- Zero config, already works
- Pageviews, unique visitors, top pages

**Plausible** (optional upgrade):
- More control, can self-host
- Better dashboard for content-specific metrics
- $9/month SaaS or free self-hosted

**Rule:** No Google Analytics. No cookies. The "built by AI, built right" site should not compromise reader privacy.

---

## RSS Feed

**Location:** `/feed.xml`
**Generator:** Updated `scripts/gen-rss.js` (already in repo)
**Update trigger:** Build time (regenerated on every deploy)

**Feed includes:**
- All posts, newest first
- Full post body (not just excerpt) for RSS readers that show full content
- Proper `<author>`, `<pubDate>`, `<link>` fields
- Ping services on publish (optional)

**Series-specific feeds (future):**
- `/feed/man-and-machine.xml` - M&M only
- `/feed/fintech.xml` - Fintech content only

---

## Deployment & Infrastructure

**Current stack (keep as-is):**
- Vercel: hosting + edge functions + analytics
- Cloudflare: DNS + CDN layer
- Neon: PostgreSQL (not used in Phase 1)
- GitHub: `Daveglaser0823/qstve-live`

**Build pipeline:**
```
git push → GitHub → Vercel builds → gen-rss.js → next build → deploy
```

**Environment variables needed:**
- `BUTTONDOWN_API_KEY` (newsletter)
- `DATABASE_URL` (Neon, already configured)
- `NEXT_PUBLIC_SITE_URL` (for OG images, RSS)

---

## File Structure

```
qstve-live/
├── app/
│   ├── layout.tsx          # Root layout, Nav, Footer
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Tailwind + base styles
│   ├── blog/
│   │   ├── page.tsx        # Blog listing with filters
│   │   └── [slug]/
│   │       └── page.tsx    # Individual post
│   ├── man-and-machine/
│   │   └── page.tsx        # M&M series page
│   ├── newsletter/
│   │   └── page.tsx        # Newsletter signup + archive
│   ├── about/
│   │   └── page.tsx        # About Dave
│   └── api/
│       ├── newsletter/
│       │   └── route.ts    # Newsletter API
│       └── og/
│           └── route.tsx   # OG image generation
├── components/
│   ├── Nav.tsx
│   ├── Footer.tsx
│   ├── ThemeToggle.tsx
│   ├── PostCard.tsx
│   ├── NewsletterForm.tsx
│   └── ShareButtons.tsx
├── lib/
│   └── posts.ts            # Post reading + processing
├── content/
│   └── posts/
│       ├── man-and-machine-06-memory.md
│       ├── man-and-machine-07-guardrails.md
│       └── man-and-machine-08-health.md
├── public/
│   ├── fonts/              # Inter variable (already there)
│   ├── man-and-machine.png # Existing hero image
│   └── favicon.ico
├── BRAND-CONCEPT.md
├── DESIGN-SYSTEM.md
├── SITE-ARCHITECTURE.md
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```
