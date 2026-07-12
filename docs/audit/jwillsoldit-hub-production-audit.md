# JWILLSOLDIT Hub — Production Audit & Hardening Pass

**Date:** 2026-07-08
**Repository:** `d8dles/jwillsoldit-hub`
**Production URL tested:** `https://www.jwillsoldit.com/`
**Production commit deployed & tested:** `efa2ad4` (`efa2ad4f27a46bac85f11eda166fe65cd12498e7`, branch `main`)
**Audit branch:** `audit/hardening-pass` (based on `origin/main` @ `efa2ad4`)
**Stack:** Vite 5 + React 18 + TypeScript (strict), static SPA on Vercel — no backend, no API routes.

## Verdict: ✅ Production Healthy (surgical hardening applied)

The live site is healthy, consistent with `main`, and free of broken assets, console errors, or layout defects at every tested breakpoint. The Meet Joey headshot renders correctly. This pass completes the browser-based QA, dependency triage, and SEO consistency work that the earlier docs-only audit (PR #5) explicitly deferred, and applies two low-risk, evidence-backed fixes. Bundle output is byte-identical before and after, so runtime behavior is provably unchanged.

---

## Method & evidence sources

- **Live HTTP checks** — `curl` against production for status codes, `Content-Type`, sizes, redirects.
- **Full source review** — every file under `src/`, `index.html`, `public/`.
- **Clean build** — `npm ci && npm run build` (`tsc && vite build`) from `origin/main`.
- **Dependency audit** — `npm audit` (+ JSON) with per-advisory triage.
- **Rendered browser QA** — the built app served locally via `vite`, driven through a headless preview browser: DOM assertions, console capture, contrast math, and screenshots at six viewports. The deployed JS/CSS bundle hashes (`index-BVXD4jzE.js`, `index-CEM38edH.css`) match the local build exactly, so the rendered evidence reflects production.
  - Note: a live browser extension was not connected in this environment, so visual/console/responsive evidence was captured against a local serve of the identical production build rather than the deployed origin directly. All HTTP-level production behavior was verified directly against `www.jwillsoldit.com`.

---

## 1. Production smoke test — PASS

| Check | Result | Evidence |
|---|---|---|
| Homepage loads | ✅ `200` `text/html` | `curl https://www.jwillsoldit.com/` |
| Console errors | ✅ None | Only Vite HMR debug + React DevTools info notice |
| Meet Joey headshot renders | ✅ `complete=true`, `naturalWidth=1122`, `naturalHeight=1402` | DOM assertion + screenshot |
| Broken image icons | ✅ None anywhere | `brokenImages: []`; CRG logo force-loaded `1536×1024` OK |
| Nav anchors `#top #joey #routes #stays #rentals #manage #invest #guides #contact` | ✅ All targets exist; all links resolve | 10/10 `id`s present, `deadAnchorLinks: []` |
| Smart Move links → `move.jwillsoldit.com` | ✅ All 6 variants | `https://move.jwillsoldit.com/?intent=…` |
| Call / Text / Email formatting | ✅ Correct | `tel:+15616856566`, `sms:+15616856566?…`, `mailto:jwillsoldit@icloud.com?subject=…` |
| Compliance links `/assets/iabs.pdf`, `/assets/cpn.pdf`, `/privacy.html` | ✅ All `200` | `application/pdf` 41.5 KB / 200 KB; privacy `text/html` |
| Old `.jpg` headshot path | ✅ Correctly `404` (removed) | `…/joey-williams-headshot.jpg → 404` |

---

## 2. Asset audit — PASS

All referenced assets exist and are served with correct content types:

| Asset | Bytes | Signature | Served as | Status |
|---|---|---|---|---|
| `editorial/joey-williams-headshot.png` | 303,419 | JPEG (JFIF) | `image/png` | ✅ Renders (see §7 note) |
| `og-hub-v1.png` | 36,260 | PNG 1200×630 | `image/png` | ✅ Ideal OG size |
| `crg-logo-transparent.png` | 232,770 | PNG 1536×1024 | `image/png` | ✅ Renders (oversized — see §7) |
| `iabs.pdf` | 41,516 | PDF 1.4 | `application/pdf` | ✅ |
| `cpn.pdf` | 200,008 | PDF 1.6 | `application/pdf` | ✅ |
| `editorial/texas-outline.svg` | small | SVG | — | ⚠️ Orphan (documented provenance; not loaded at runtime) |
| `editorial/NOTICE.md` | small | Markdown | — | ⚠️ Ships publicly (harmless attribution note) |

- **OG image path** `https://www.jwillsoldit.com/assets/og-hub-v1.png` → exists, correct 1200×630. ✅
- **No placeholder/lorem/junk** in `src/`. No `console.*` statements. No `TODO/FIXME`.
- The single runtime image reference (`MeetJoeySection.tsx`) points at the existing asset. No path drift.

---

## 3. Build & code quality — PASS

```
> tsc && vite build
vite v5.4.21 building for production...
✓ 81 modules transformed.
dist/index.html                   2.41 kB │ gzip:  0.90 kB
dist/assets/index-CEM38edH.css   30.25 kB │ gzip:  6.95 kB
dist/assets/index-BVXD4jzE.js   185.39 kB │ gzip: 59.83 kB
✓ built in ~0.5s
```

- **Zero TypeScript errors** under `strict`, `noUnusedLocals`, `noUnusedParameters`.
- **JS/CSS bundle hashes unchanged** after this pass → changes are provably behavior-neutral.
- **Architecture is genuinely clean** (senior-grade):
  - Single source of truth for contact/links (`src/data/contact.ts`, `src/utils/links.ts`) — **zero scattered phone/email/URL literals**.
  - Content lives in typed data modules (`routes`, `services`, `properties`, `proof`); components render derived views (`PUBLIC_STAYS`, `STAY_COUNT`) so content edits need no component changes.
  - Fair-housing discipline is encoded in the types and data comments (describe the property, never people).
  - `proof.ts` enforces "real facts only" — no invented stats, reviews, or transaction counts.
  - Motion is centralized and restrained; no scroll-jacking.

### Git & deployment hygiene — PASS
- `.gitignore` correctly excludes `node_modules/`, `dist/`, `.env*`, `.DS_Store`.
- **No build artifacts, `node_modules`, or `.DS_Store` are tracked.** (`dist/` and `.DS_Store` on disk are untracked local cruft.)

---

## 4. Accessibility — PASS

- Semantic landmark structure: one `<header>`, one `<main>`, `<footer>`, `<section>` per area with `aria-label`s. Single `<h1>` ("Texas, handled.").
- Images have useful `alt` (`"Joey Williams, REALTOR®"`, `"Christin Rachelle Group"`); decorative SVGs are `aria-hidden`; the hero map is `role="img"` + `<title>`.
- Carousel controls are real `<button type="button">` with `aria-label="Previous/Next stays"`; the track is keyboard-focusable (`tabIndex=0`) with `role="list"`.
- Guides use native `<details>/<summary>` — keyboard-operable with no JS.
- `prefers-reduced-motion` is honored in **both** motion paths (`useReveal` reveals immediately; `CursorTrail` disables itself, and is also gated to fine-pointer devices).
- **Contrast (WCAG AA):** Meet Joey body 18.2:1; Manage heading on dark green 11.5:1; Route Board dimmed secondary text ≈7.4:1 (composited, accounting for 62% alpha). All ≥ AA.
- ARIA is used sparingly and correctly — native HTML first.

---

## 5. Responsive QA — PASS (360 → 1440)

No horizontal overflow at any tested width (`document.scrollWidth ≤ innerWidth`, `scrollingElement.scrollLeft` pinned to 0, `body { overflow-x: hidden }`).

| Viewport | Overflow | Behavior |
|---|---|---|
| 360 / 390 px | ✅ None | Single column; hero legible; headshot uncropped; carousel is a contained `overflow-x` scroller |
| 430 px | ✅ None | Mobile action bar (Call / Text / Smart Move) visible |
| 768 px | ✅ None | Mobile action bar hidden (≥768); route board rows readable |
| 1024 px | ✅ None | Full primary nav appears |
| 1440 px | ✅ None | Full desktop; Texas hero map + 3-col proof row |

- **Mobile action bar** correctly steps aside when the footer is on screen (IntersectionObserver), keeping compliance links reachable — verified in source and behavior.
- The Stays carousel is a horizontal scroller **contained** within its track (`scrollWidth 2239 > clientWidth`), not a page-level overflow.

---

## 6. SEO & compliance — PASS (with fix applied)

- Title, meta description, canonical, Open Graph, and Twitter card tags all present and sane.
- **REALTOR®** used appropriately (contact identity, proof tile, headshot alt) — not overused.
- **Brokerage identity** clear in hero proof row and footer: *Joey Williams · REALTOR® · Christin Rachelle Group · Houston, TX*.
- **IABS** and **Consumer Protection Notice** linked in the footer and live (`200`).
- **Equal Housing Opportunity** language present in the footer.
- No legal claims, guarantees, or invented performance stats.

### Fixed here — canonical host consistency
Production **308-redirects `jwillsoldit.com` → `www.jwillsoldit.com`**, so `www` is the canonical host — but every metadata URL pointed at bare `jwillsoldit.com`. Aligned to the real canonical host (avoids canonical/redirect mismatch and an extra redirect hop for social scrapers):
- `index.html`: `canonical`, `og:url`, `og:image`, `twitter:image` → `https://www.jwillsoldit.com/…`
- `public/robots.txt`: `Sitemap:` → `www`
- `public/sitemap.xml`: both `<loc>` → `www`

---

## 7. Performance — PASS

- JS 59.8 KB gzip, CSS 6.95 KB gzip — lean for a marketing hub. No heavy libraries.
- OG image is right-sized (36 KB, 1200×630).
- Animations are rAF/CSS-based, pointer-gated, and reduced-motion-aware.
- No production `console.*` output.

**Optimization opportunities (non-blocking):**
- `crg-logo-transparent.png` is 232 KB at 1536×1024 for a small footer mark. Lazy-loaded (off critical path), but re-exporting near display size (~2×) would save ~200 KB.
- The headshot is 303 KB — acceptable, already reduced from a prior ~1.4 MB version.

---

## 8. Security / dependency notes

`npm audit` → **2 vulnerabilities (1 moderate, 1 high)**, both in the **dev toolchain only**:

| Advisory | Severity | Scope | Fix |
|---|---|---|---|
| esbuild ≤0.24.2 (GHSA-67mh-4wv8-2f99) | moderate | dev server can be probed by any site | `vite@8` (major) |
| vite ≤6.4.2 (path traversal / `server.fs.deny` bypass / launch-editor) | high | dev server only | `vite@8` (major) |

**Production exposure is effectively nil** — the deployed site is static Vercel output; no dev server runs in production. The only remediation is a **major** `vite 5 → 8` upgrade. Deliberately **not** applying `npm audit fix --force` (unreviewed breaking change for zero production benefit). Recommend scheduling the vite 8 upgrade as its own reviewed PR.

**HTTP headers (production):** `Strict-Transport-Security` present. `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and CSP are absent. Adding them via `vercel.json` is a reasonable hardening — **but** `X-Content-Type-Options: nosniff` interacts with the headshot's format/extension mismatch, so **fix the asset first** (see below), then add headers. Not implemented in this pass to avoid introducing risk.

---

## What was fixed (this branch)

1. **SEO canonical/host consistency** — normalized canonical, OG, Twitter, sitemap, and robots URLs from non-www to the actual canonical `www` host. *(Metadata only; no runtime/layout impact.)*
2. **Removed dead code** — deleted `src/components/EditorialCollage.tsx` + `.module.css`. Unreferenced (0 imports), tree-shaken out of the bundle already, and it pointed at a **deleted** asset (`memorial-park-routes.jpg`) — a latent landmine. Bundle hashes confirm zero behavioral change.

## What was intentionally left alone

- **Headshot `.png` containing JPEG bytes** — renders correctly everywhere and is already optimized; per owner direction, not altered. *Correct fix when scheduled:* re-encode as a true PNG (preserves transparency the blend relies on) **or** rename to `.jpg` and update the single reference in `MeetJoeySection.tsx` (+ `NOTICE.md`). Do **not** rename-only without matching bytes.
- **Dev-only vite/esbuild advisories** — no production exposure; needs a reviewed major upgrade (see §8).
- **`crg-logo` size, orphan `texas-outline.svg`, public `NOTICE.md`** — harmless; noted as housekeeping.
- **Visual identity / architecture** — untouched. No redesign, no dependency additions, no CSS rewrites.

## Remaining recommendations (ranked)

**P1 — none blocking.** Production is healthy.

**P2 — scheduled housekeeping**
1. Resolve the headshot extension/content mismatch (re-encode true PNG or rename `.jpg` + update reference).
2. Plan the `vite 5 → 8` major upgrade in a dedicated PR to clear the dev-server advisories.
3. Re-export `crg-logo-transparent.png` near display size (~200 KB saved).

**P3 — nice to have**
4. Add security headers via `vercel.json` (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`) — after the headshot asset is corrected.
5. Add a lightweight CI check running `npm run build` on PRs to `main`.
6. Tidy the `main` history hygiene: recent headshot fixes were committed directly via the GitHub web UI (flip-flopping `.jpg`/`.png`); route future asset changes through PRs.

---

*Audit performed against live production and a clean `origin/main` build. Bundle output verified byte-identical before/after the applied fixes.*
