# Darshtalks

A premium, typography-first quote & Shayari gallery built with **Next.js (App Router) + JavaScript/JSX only**. Colorful, text-only portrait cards arranged in an asymmetric masonry grid, with a seeded template engine, shuffle, search, filters, and GSAP + Framer Motion animations.

> **100% JavaScript / JSX.** No TypeScript, no `.ts`/`.tsx`, no type annotations anywhere.

## Tech stack

Next.js 15 · React 19 · Tailwind CSS 3 · GSAP + ScrollTrigger · Framer Motion · Lucide React · Google Fonts via `next/font`.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

## How it works

### Content is JSON-driven
- **`src/data/quotes.json`** — the single source of truth: **5000 unique** quotes/Shayaris (English quotes + Hindi/Hinglish shayari). Add, edit, or remove entries here; no component changes needed.
- **`src/data/templates.json`** — 24 visually distinct card templates (font, color, size, spacing, aspect ratio, column span, alignment, CSS-only decoration).

#### Regenerating the dataset
The 5000 entries are produced by a deterministic generator from curated word-banks (every combination is grammatical) plus a core of real quotes:

```bash
npm run generate:quotes   # rewrites src/data/quotes.json (stable, seeded)
```

Edit the banks in `scripts/generate-quotes.js` to change the content, then rerun. To hand-author instead, just edit `quotes.json` directly.

#### Performance at 5000 entries
The dataset is imported inside the (client) `QuoteGrid`, so it ships as a **code-split JS chunk** rather than being serialized into the server HTML. Only one page (12 cards) is rendered at a time via **Load More**, so the DOM stays light regardless of dataset size.

### Template engine (hydration-safe)
- `src/lib/randomUtils.js` — seeded PRNG (xmur3 + mulberry32) and seeded Fisher–Yates shuffle. Deterministic, so server and client render identically.
- `src/lib/templateUtils.js` — assigns a template to every quote, avoiding consecutive repeats of the same template/color, and resolves inline styles.
- The first render uses a **fixed seed + original order** → no hydration mismatch. Only the **Shuffle** button changes the seed/order (`src/hooks/useQuoteTemplates.js`).

### Fonts
- `src/config/fonts.js` loads all 15 Google Fonts once via `next/font` (zero layout shift, each exposed as a CSS variable).
- The 6 optional custom fonts (Sugra, Quinia, Ritteru, Jubble, Etrixo, Lancelot) are declared in `src/styles/fonts.css` and load from `public/fonts/` **if present**, with graceful fallbacks otherwise. See `public/fonts/README.md`.

### Layout & typography fitting
- CSS Grid masonry with measured row-spans keeps every card **portrait** (no landscape cards, no images) while packing an asymmetric, balanced layout. Wide templates span two columns on desktop only.
- Each card **auto-fits its font to the card width**, so a word never splits mid-word or hyphenates, and the card **grows to show the full quote** (nothing is clipped).

### Share & download
- Each card has **Share** and **Download** actions that render the quote to a branded PNG (`src/lib/shareUtils.js`). The **Darshtalks** tag + portfolio URL are baked into the exported image / shared text **only** — never shown on the card. Share prefers the Web Share API (image file), falls back to text, then download.

### SEO
- Rich metadata (Open Graph, Twitter cards, canonicals, keywords), JSON-LD (`WebSite` + `Person`), a dynamic OG/Twitter image (`src/app/opengraph-image.jsx`, edge runtime), plus `robots.txt` and `sitemap.xml`.
- **Set your production domain** in `src/config/site.js` (`SITE_URL`) before deploying — it drives canonical URLs, the sitemap, and absolute OG image URLs.

### Animation split
- **GSAP / ScrollTrigger** → hero entrance + section-header scroll reveals.
- **Framer Motion** → card entrance stagger, hover, layout/shuffle transitions, nav/filter pills.
- The two never animate the same element's transform. `prefers-reduced-motion` is respected throughout.

## Project structure

```
src/
  app/            layout.jsx, page.jsx, globals.css, quotes/ shayari/ about/
  components/
    layout/       Navbar.jsx, Footer.jsx
    sections/     Hero.jsx, QuoteGrid.jsx, QuoteFilters.jsx
    quotes/       QuoteCard.jsx, QuoteCardActions.jsx, ShuffleButton.jsx
    ui/           Button.jsx
  config/         fonts.js
  data/           quotes.json, templates.json
  hooks/          useQuotes.js, useQuoteTemplates.js
  lib/            quoteUtils.js, templateUtils.js, randomUtils.js
  styles/         fonts.css
```

## Adding content

Add a quote by appending an object to `src/data/quotes.json`:

```json
{ "id": "quote-049", "text": "Your text here.", "category": "Motivation", "type": "quote", "language": "English", "author": "Unknown" }
```

It automatically receives a template on the next load. Add new looks by appending to `templates.json`.
