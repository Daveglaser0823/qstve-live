# QSTVE Design System

*Last updated: February 2026*

---

## Design Philosophy

**One principle above all: the content is the design.**

The interface should disappear. The words should land. Everything else - color, spacing, typography - is in service of getting out of the way.

**But "get out of the way" is not the same as "be boring."** The design should feel like someone who knows exactly what they're doing made deliberate choices. Premium but not corporate. Human but not casual.

The M&M illustration style is the one place where personality is explicit: ink on cream paper, cross-hatching, workshop warmth. The rest of the site should echo that warmth without mimicking it.

---

## Color Palette

### Core Colors

| Name | Light Mode | Dark Mode | Usage |
|------|-----------|----------|-------|
| **Ink** | `#0F172A` | `#F5F2EC` | Primary text, headings |
| **Paper** | `#FAFAF7` | `#111110` | Page background |
| **Surface** | `#FFFFFF` | `#1C1C1A` | Card/panel background |
| **Secondary** | `#64748B` | `#9B9590` | Meta text, captions, dates |
| **Border** | `#E8E4DB` | `#2C2C28` | Dividers, card borders |
| **Cream** | `#F5EFE3` | `#2A2520` | Tinted backgrounds, callouts |

### Brand Accent Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Navy** | `#1E3A5F` | Primary links, CTAs, active states |
| **Navy Light** | `#2D5F9E` | Hover state for Navy |
| **Copper** | `#C8873C` | Warm accent, series badges, highlights |
| **Copper Light** | `#E0A060` | Hover/tint for Copper |

### Application

**Dark mode accent colors:**
- Navy becomes `#5B8FD4` (lighter for dark backgrounds)
- Copper becomes `#D4944A` (slightly brighter for dark backgrounds)

**Why Navy + Copper?**
- Navy: authoritative, professional, connects to fintech/finance aesthetic
- Copper: warm, craft, echoes the ink + amber tones of the M&M illustrations
- Together: premium and human. Not another gray tech blog.

---

## Typography

### Font Stack

```css
--font-sans: 'Inter var', 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
```

**Good news:** Inter variable font is already loaded locally (`/public/fonts/Inter-roman.latin.var.woff2`). Zero external requests for body text.

### Type Scale

| Element | Size | Weight | Letter-spacing | Line-height |
|---------|------|--------|----------------|-------------|
| Display (hero) | 56-72px | 800 | -0.03em | 1.1 |
| H1 | 40px | 750 | -0.025em | 1.15 |
| H2 | 28px | 700 | -0.02em | 1.2 |
| H3 | 20px | 650 | -0.015em | 1.3 |
| Body | 17px | 440 | -0.01em | 1.7 |
| Small/Meta | 13px | 400 | 0.01em | 1.5 |
| Series badge | 11px | 600 | 0.08em | - |

### Typography Rules

- **Tight headings.** Negative letter-spacing on display text. Feels crafted.
- **Generous body line-height.** 1.7 for comfortable reading on a long piece.
- **Short measure for blog posts.** Max ~65 characters per line. Never full viewport width.
- **No small print.** Minimum 13px for any text a user needs to read.

---

## Logo Concepts

### Concept A: Wordmark
`QSTVE` in all-caps, Inter 800, -0.04em letter spacing. Clean, confident, slightly compressed. The unusual letter combination does the work. No icon needed.

### Concept B: Monogram + Wordmark
A single `Q` with subtle cross-hatch texture (echoing the illustration style), followed by `STVE` in regular weight. The Q becomes an icon mark that works at small sizes.

### Concept C: Wordmark + Tagline
`QSTVE` in bold over a small tagline in copper: `Man & Machine`. Works well as a site header where you want to immediately signal the main content.

### Usage Guidelines

- **Primary logo:** Concept A or B for header
- **Favicon:** Single `Q` or the full wordmark at small scale
- **Social OG images:** `QSTVE` + post title, Navy bg, cream text, copper accent line
- **Dark mode:** Cream wordmark on dark background

---

## Layout Principles

### Grid System
- **Max content width:** 1200px (site-wide layout)
- **Reading column width:** 680px max (blog post content)
- **Mobile-first:** All layouts designed for 375px, then responsive up

### Spacing Scale (Tailwind-compatible)
Multiples of 4px: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128

### Page Rhythm
- Navigation: 64px height, 80px on desktop
- Hero section: Minimum 400px, comfortable whitespace
- Section breaks: 80-96px vertical padding
- Card grids: 24px gap on desktop, 16px on mobile

### The Newspaper Rule
The most important thing on any page should be immediately obvious. On the homepage, it's the Man & Machine series. On a post page, it's the first sentence. Design should make that clear without tricks.

---

## Dark Mode

**Toggle:** Manual (user-controlled) with localStorage persistence. No system-preference override by default - give the user control.

**Dark mode principles:**
- Backgrounds get *warm* dark, not pure black (`#111110`, not `#000000`)
- Borders become subtle, not invisible
- The illustrations (ink on cream) can be displayed with a subtle sepia overlay or as-is
- Copper accent gets slightly brighter on dark (`#D4944A`)

**Implementation:**
- Tailwind `darkMode: 'class'` strategy
- `dark` class added to `<html>` via inline script before paint (prevents flash)

---

## Mobile-First Responsive

| Breakpoint | Min Width | Strategy |
|------------|-----------|---------|
| Base | 0 | Single column, generous padding |
| `sm` | 640px | Two column grids possible |
| `md` | 768px | Navigation expands, side margins increase |
| `lg` | 1024px | Three column post grids |
| `xl` | 1280px | Max width container locks in |

**Touch targets:** Minimum 44px for all interactive elements on mobile. Navigation links, buttons, toggles.

**Typography on mobile:** Reduce display sizes. 40px hero on mobile vs. 72px on desktop.

---

## Image Style Guide

### The M&M Illustration Aesthetic

All Man & Machine series illustrations follow a consistent style that is now the brand visual identity:

**Technical description:**
- Workshop-style cross-hatching
- Ink on cream/parchment paper
- Subjects: human and digital figure in collaborative scenarios
- Warm amber tones, not cold
- Detailed line work, not flat iconography

**Image usage rules:**
- Each M&M post ideally has one illustration
- Illustrations should be square or near-square (1:1 or 4:3)
- Use a subtle cream background tint for illustration cards
- Never crop illustrations; they're composed intentionally

**Photography (if used):**
- Warm tones, natural light
- Process-oriented: desk, notebook, work environments
- No stock photo CEO imagery (conference rooms, handshakes)

**OG Images (for social sharing):**
- Dark background (`#111110` or Navy `#1E3A5F`)
- Post title in large white/cream Inter 750
- `Man & Machine` series badge in Copper
- `qstve.com` URL subtle at bottom

---

## Key UI Components

### Navigation
```
[QSTVE]  Writing | Man & Machine | Newsletter | About     [☀/☾]
```
- Height: 64px desktop, 56px mobile
- Sticky on scroll (subtle shadow appears on scroll)
- Mobile: hamburger, slide-down menu
- Active state: Copper underline, not background change
- Font: 14px, weight 500, slightly tracked

### Post Card
```
┌──────────────────────────────┐
│ [Illustration or placeholder] │
│  MAN & MACHINE    #06        │
│                              │
│  The Memory Problem          │
│                              │
│  My AI forgot who I was...   │
│                              │
│  Feb 17, 2026  · 2 min read  │
└──────────────────────────────┘
```
- Border: 1px `#E8E4DB`, border-radius 8px
- Hover: subtle shadow lift (`0 4px 20px rgba(0,0,0,0.08)`)
- Series badge: 11px all-caps, Copper color, 0.08em tracking
- No underline on title until hover
- Date and reading time in Secondary color

### Newsletter Signup
```
┌─────────────────────────────────────────────┐
│  Money Moves Weekly                          │
│  Fintech, payments, and the real work.       │
│  One email. Every Friday.                    │
│                                              │
│  [your@email.com            ] [Subscribe →]  │
│                                              │
│  No spam. Unsubscribe anytime.              │
└─────────────────────────────────────────────┘
```
- Background: Cream tint (`#F5EFE3`) or Navy (`#1E3A5F` with cream text)
- Input: Clean border, focus ring in Copper
- Button: Navy fill, cream text, hover darkens
- 16px padding inside form

### Series Header (Man & Machine dedicated page)
- Large series number or wordmark at top
- Brief series description (what this is, why it exists)
- Chronological post list with read status (no JS state needed - just show all)
- "Start from #1" prominent CTA

### Quote/Callout Block (for quotable lines in posts)
```
  "Intelligence without memory is a party trick.
   Intelligence with memory is a partner."
```
- Left border: 3px Copper
- Background: Cream tint
- Font: 18px, weight 450, italic optional
- Author attribution not needed (it's always Dave)

### Footer
```
QSTVE by Dave Glaser
CEO, Dwolla

Writing | Man & Machine | Newsletter | About

LinkedIn  X  RSS

© 2026 · Built by human + AI
```
- Dark background (`#0F172A`) always - even in light mode
- Cream text on dark
- "Built by human + AI" is the honest attribution (no shame, it's the story)
