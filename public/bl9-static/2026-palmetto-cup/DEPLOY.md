# Palmetto Cup 2026 - Deployment Instructions

## What This Is
The redesigned BL9 Palmetto Cup "Fiesta Fairway" event page. Single-page scrolling site replacing the 9-slide carousel version. All of Denise's latest revisions are included.

## Files in This Package

```
palmetto-cup-deploy/
  index.html              (21 KB - the page)
  bl9-logo.png            (128 KB - round BL9 logo)
  fiesta-top-border.png   (790 KB - papel picado/flags hero top)
  fiesta-bottom-flowers.png (174 KB - floral vine hero bottom)
  fiesta-divider-small.png  (617 KB - flower divider between sections)
```

## Deployment Steps

### Option A: Replace existing page at same URL
The current page lives at `192.168.1.60:3004/bl9/2026-palmetto-cup`. To replace it:

1. Find the directory Steve's server serves for `/bl9/2026-palmetto-cup`
2. Back up the existing files
3. Drop all 5 files from this package into that directory
4. The `index.html` will be served automatically
5. Verify at the existing URL

### Option B: Deploy to qstve.com (production)
Target URL: `qstve.com/bl9/2026-palmetto-cup` (or similar)

1. SSH into the qstve.com server
2. Create the directory:
   ```bash
   mkdir -p /var/www/qstve.com/bl9/2026-palmetto-cup
   ```
3. Copy all 5 files into that directory:
   ```bash
   cp index.html bl9-logo.png fiesta-*.png /var/www/qstve.com/bl9/2026-palmetto-cup/
   ```
4. Ensure nginx/apache serves `index.html` as the default for that path
5. If using nginx, no config change needed if you already have a catch-all server block for qstve.com

### Option C: Both (local preview + production)
Do Option A first to verify with Denise, then Option B to go live.

## Technical Notes

- **Self-contained**: The page only depends on Google Fonts (Playfair Display + Outfit). All images are local.
- **No JavaScript framework**: Pure HTML/CSS/JS. No build step needed.
- **Mobile responsive**: Works on phone, tablet, desktop.
- **Sticky nav**: Appears when user scrolls past the hero.
- **Smooth scroll**: Nav links scroll to sections.
- **Fade-in animations**: Sections fade in as user scrolls down.

## What NOT to Do

- Do not modify the HTML structure or CSS. If Denise wants changes, route back to Dave/Claude.
- Do not optimize or compress the PNG files - they already have transparency baked in.
- Do not add this to a framework or build pipeline. It's a static page, serve it as-is.

## Future Events

This page can be templated. The key things that change per event:
- Theme artwork (top border, bottom flowers, dividers)
- Event name, dates, theme name
- Schedule details
- Tournament rules/format
- Color scheme (CSS variables at top of file)

A JSON config + template system is the next step. But for now, ship this.
