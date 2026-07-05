# Visual QA Report — JWILLSOLDIT Hub, Phase 1

**Project path:** `/Users/j0eschm0/Desktop/THE HUB/Real Estate/Website/jwillsoldit-hub`
**Date:** 2026-07-05
**Method:** Headless Chromium (Playwright) rendering the production build (`npm run build` → `vite preview`). Screenshots are of the real rendered page, not mockups.

> **Font caveat:** the QA sandbox blocks Google Fonts, so screenshots show system fallback letterforms. Layout, spacing, hierarchy, and color are exact; live type renders in Instrument Sans / Libre Franklin / Space Mono.

---

## Viewports tested

| Viewport | Size | Captures |
|---|---|---|
| Mobile | 390 × 844 | above-the-fold, full page, mid-scroll with action bar, footer |
| Tablet | 768 × 1024 | full page |
| Desktop | 1440 × 900 | above-the-fold, full page |

## What was tested

- Premium command-center/editorial feel vs. generic realtor template (logo-swap test)
- Hero strength without any 3D/globe element; "Houston, handled." visual impact
- Route Board: editorial index rows vs. generic service cards
- Stays section: expandable/intentional presentation of placeholder-safe inventory
- Manage section: all six ops verticals visible (LTR management, STR/Airbnb operations, maintenance/vendor coordination, turnovers/make-ready, owner reporting; investor/owner support in Invest)
- Mobile bottom action bar: coverage, safe-area, hide-on-footer behavior
- Full rendered-DOM link audit (every `<a href>` on the page)
- Banned-copy scan, sensitive-data check on `src/data/properties.ts`

## Findings & fixes made (scoped visual polish only — no redesign)

1. **Masthead broke at 390px** — brand sub-line and SMART MOVE button wrapped to two lines, overflowing the 60px bar.
   *Fix:* sub-line hidden below 600px, CTA `white-space: nowrap`, tightened paddings/gaps.
   *Evidence:* `before-mobile-390-masthead.png` → `after-mobile-390-masthead.png`
2. **Hero dead space at 1440px** — strong left column, empty right half; read as stretched mobile layout.
   *Fix:* desktop-only (≥1100px) **System Index rail** rendered from `src/data/routes.ts` — routes 01–07 with SMART MOVE / BELOW destination tags. Data-driven, hidden on smaller viewports.
   *Evidence:* `before-desktop-1440-hero.png` → `after-desktop-1440-hero.png`
3. **Hero coordinate line wrapped on mobile** — "· THE JWILLSOLDIT SYSTEM" tail hidden below 600px; one clean line.

All other sections passed review without changes.

## Build result

`tsc` (strict) + `vite build`: **PASS** — dist/index.html 2.38 kB · CSS 22.47 kB (4.99 kB gzip) · JS 177.08 kB (56.51 kB gzip).

## Smart Move link audit (rendered DOM)

Every consumer route resolves to `https://move.jwillsoldit.com` — base URL or `?intent=rent|buy|sell|relocate|not-sure` (params inert by design; Smart Move ignores unknown query params). No local routes, no fake paths, **zero calls to `/api/smart-move` or any API**. All `tel:` / `sms:` links use `+15616856566`; all `mailto:` links use `jwillsoldit@icloud.com` with the correct prefilled subjects (Short-Term Stay Inquiry, Owner / Property Management Intro, Rental Management Question, Investor / Owner Question).

## Banned-copy check

Grep across `src/`, `dist/`, `public/`, `index.html`, `README.md`: **clean.** No "dream home," "unlock your next chapter," "perfect home," "trusted real estate expert," "luxury living," or related clichés. No lorem ipsum.

## Sensitive data check

`src/data/properties.ts` reviewed entry-by-entry: **clean.** All entries are neutral placeholders ("Stay Unit 01," "Details being finalized"). The two `publicVisible: false` entries are structural placeholders only — no addresses, owner names, pricing, or financials. Standing rule documented in the file: everything in `src/data/` ships in the public bundle; flyer-safe info only.

## Known limitations

- OG card (`public/assets/og-hub-v1.png`) uses substitute fonts (Lato/DejaVu Mono); regenerate with brand fonts when convenient.
- Stay cards are typographic by design — no unit photos exist yet; set `imageUrl` in `properties.ts` when real photos are available.
- Property entries await real unit basics (name/area/type/sleeps) — edit `src/data/properties.ts`.
- Hero coordinates are decorative Houston city-center values.
- No analytics (intentional; privacy page states none).
- Final device check recommended on a real phone before deploy.

## Screenshot files (`qa/screenshots/`)

| File | Contents |
|---|---|
| `mobile-390-home.png` | Full homepage, 390px, post-fix |
| `tablet-768-home.png` | Full homepage, 768px, post-fix |
| `desktop-1440-home.png` | Full homepage, 1440px, post-fix |
| `mobile-footer-actionbar-hidden.png` | Footer in view — action bar correctly hidden |
| `before-mobile-390-masthead.png` / `after-mobile-390-masthead.png` | Fix 1 evidence |
| `before-desktop-1440-hero.png` / `after-desktop-1440-hero.png` | Fix 2 evidence |

## Protections confirmed

No files in `d8dles/jwillsoldit-smart-move` touched. No changes to `move.jwillsoldit.com`, DNS, Vercel settings, environment variables, HubSpot, Resend, or `/api/smart-move`. **No deployment performed.**
