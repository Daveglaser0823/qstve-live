# BL9 Static Booklet Generator - Build Spec

## Context
qstve-live is an existing Next.js 14 site on Vercel. We're adding a BL9 golf league event booklet system as a `/bl9/[event-slug]` dynamic route.

## Existing Tech Stack
- Next.js 14.2.29
- React 18
- Tailwind CSS 3.4
- TypeScript
- Deployed on Vercel

## What to Build

### 1. Dynamic Route: `/bl9/[event-slug]`
- Reads from a `content.json` file in `public/bl9/events/<event-slug>/`
- Renders a polished flipbook-style event booklet
- Static-exportable (SSG with `generateStaticParams`)

### 2. Content Schema (`content.json`)
Top-level keys: `meta`, `theme`, `hero`, `quickFacts`, `pages`

Allowed page layouts: `text`, `bullets`, `documents`, `contact`

Full schema definition (see below).

### 3. Sample Event: Exchange Day
Create `public/bl9/events/2026-mar-tee-gras-exchange-day/content.json` with mapped content from Denise's email (provided in the plan doc).

### 4. Blank Starter
Create `public/bl9/events/_starter/content.json` as a template for new events.

### 5. Schema Validation
Validate content.json at build/render time. Missing required fields should fail gracefully with clear error messages, not crash the page.

## Design Direction

### Color Palette (v1 default theme)
- Background: warm ivory / very light cream (#f7f4ee or similar)
- Primary accent: deep muted plum (#5b2a86 or similar)
- Secondary accent: soft gold / champagne (#c9a227 or similar)
- Text: dark charcoal (#1f2937)
- Cards/surfaces: white or off-white (#fffdf8)

### Visual Standards
- Elegant, country-club polished, premium but simple
- Mobile-first, excellent phone experience
- Large typography, generous whitespace
- Light backgrounds, one accent palette per event
- Minimal clutter, good image support
- Polished, feminine, refined feel
- Page-by-page navigation on desktop (booklet feel)
- Scroll mode fallback for mobile or users who prefer it

### Avoid
- Fake page curl gimmicks
- Over-decoration, clip art
- Tiny text, dense prose walls
- Too many fonts
- "Scrapbook" look
- Cheesy animations

## Page Structure (standard booklet flow)
1. Cover (hero image, event title, date)
2. Welcome
3. Quick Facts (summary cards)
4. Body pages (arrival, registration, format, awards, shop, links, documents)
5. Contact / Questions
6. Closing

## Content Schema

```json
{
  "meta": {
    "eventSlug": "string (URL-safe, lowercase, hyphens)",
    "title": "string",
    "subtitle": "string (optional)",
    "dateLabel": "string (display format)",
    "hostClub": "string",
    "course": "string (optional)",
    "theme": "string (optional theme name)",
    "contactName": "string",
    "contactEmail": "string",
    "contactPhone": "string"
  },
  "theme": {
    "accent": "#hex",
    "accent2": "#hex",
    "background": "#hex",
    "text": "#hex",
    "card": "#hex"
  },
  "hero": {
    "image": "assets/hero.jpg (optional)",
    "eyebrow": "string",
    "tagline": "string (optional)"
  },
  "quickFacts": [
    { "label": "string", "value": "string" }
  ],
  "pages": [
    {
      "id": "string (unique)",
      "title": "string",
      "layout": "text | bullets | documents | contact",
      "body": ["string array of paragraphs or bullet items"],
      "links": [{ "label": "string", "url": "string" }],
      "documents": [{ "label": "string", "file": "string" }],
      "contact": { "name": "string", "email": "string", "phone": "string" }
    }
  ]
}
```

### Validation Rules
- Every event must include: meta, theme, hero, quickFacts, pages
- Every event must have at least 3 pages
- `eventSlug` must be URL-safe lowercase with hyphens
- `pages[].id` must be unique
- `layout` must be one of the allowed values
- Missing PDFs should not break rendering
- Missing hero image should fail gracefully
- Long body text must wrap without breaking layout
- Links are optional on any page
- Documents array only on `documents` layout pages
- Contact object only on `contact` layout pages

## File Structure

```
public/bl9/events/
  2026-mar-tee-gras-exchange-day/
    content.json
    assets/
      hero.jpg (placeholder for now)
  _starter/
    content.json
    assets/
      .gitkeep

app/bl9/[slug]/
  page.tsx
  components/
    Cover.tsx
    QuickFacts.tsx
    PageRenderer.tsx
    Navigation.tsx
    (etc.)
  lib/
    schema.ts (validation)
    types.ts
```

## Constraints
- Static only - no database, no auth, no CMS, no editing interface
- No unnecessary framework additions
- Keep maintenance burden low
- New event = copy folder + edit content.json
- Must work on Vercel with zero config changes

## Definition of Done
- `/bl9/2026-mar-tee-gras-exchange-day/` renders a polished booklet
- Mobile and desktop both look great
- Navigation between pages works (arrows, dots, or similar)
- Quick facts display as summary cards
- PDFs and links render as clickable elements
- Blank starter exists for new events
- Schema validation catches bad content gracefully
