# JWILLSOLDIT Hub Production Audit

**Date:** 2026-07-08  
**Repository:** `d8dles/jwillsoldit-hub`  
**Production URL tested:** `https://www.jwillsoldit.com/`  
**Commit SHA tested:** `efa2ad4f27a46bac85f11eda166fe65cd12498e7`  
**Vercel deployment tested:** `dpl_A5SE4kxy8XLFvD6pi3TSXJCWRF5d`  
**Verdict:** Production Healthy, with follow-up asset/security housekeeping recommended.

---

## Executive summary

The production deployment is live and serving the corrected build. The previous broken Meet Joey reference to a missing `.jpg` file has been corrected in source and in the deployed JavaScript bundle. The homepage returns `200 OK`, Vercel reports the production deployment as `READY`, the build completed successfully, and no production error/fatal runtime logs were found for the checked window.

The main remaining quality blemish is the Meet Joey headshot asset hygiene: the file is named `joey-williams-headshot.png`, but its bytes begin with a JPEG signature. Browsers generally tolerate this when served with a usable content type, and the path is now correct, but the codebase would be cleaner if the binary and extension matched.

---

## Verification performed

### Production and deployment

- Confirmed latest production deployment for `jwillsoldit-hub` is `READY`.
- Confirmed deployment aliases include:
  - `www.jwillsoldit.com`
  - `jwillsoldit.com`
  - `jwillsoldit-hub.vercel.app`
- Confirmed production homepage returns `200 OK`.
- Confirmed production HTML loads the expected built assets:
  - `/assets/index-BVXD4jzE.js`
  - `/assets/index-CEM38edH.css`
- Confirmed the deployed JavaScript bundle contains the corrected Meet Joey image path:
  - `/assets/editorial/joey-williams-headshot.png`

### Vercel build output

Vercel build log summary:

```txt
Running build in Washington, D.C., USA (East) – iad1
Cloning github.com/d8dles/jwillsoldit-hub (Branch: main, Commit: efa2ad4)
Running "install" command: `npm install`...
up to date, audited 69 packages in 1s
2 vulnerabilities (1 moderate, 1 high)
> jwillsoldit-hub@1.0.0 build
> tsc && vite build
vite v5.4.21 building for production...
✓ 81 modules transformed.
dist/index.html                 2.39 kB │ gzip:  0.89 kB
dist/assets/index-CEM38edH.css  30.25 kB │ gzip:  6.95 kB
dist/assets/index-BVXD4jzE.js   185.39 kB │ gzip: 59.83 kB
✓ built in 1.21s
Build Completed in /vercel/output [6s]
Deployment completed
```

### Runtime logs

Checked production Vercel runtime logs for `error` and `fatal` levels over the recent window. Result: no matching logs found.

---

## Asset audit

### Passed

| Asset | Result |
|---|---|
| `/assets/og-hub-v1.png` | Exists in GitHub and begins with PNG signature `iVBOR...`. |
| `/assets/crg-logo-transparent.png` | Exists in GitHub and begins with PNG signature `iVBOR...`. |
| `/assets/iabs.pdf` | Exists in GitHub and begins with PDF signature `JVBER...`; production fetch returned `200 OK`. |
| `/assets/cpn.pdf` | Exists in GitHub and begins with PDF signature `JVBER...`. |
| `/privacy.html` | Production fetch returned `200 OK`. |
| `/assets/editorial/joey-williams-headshot.png` | Exists in GitHub and is now referenced by source/deployed JS. |

### Needs follow-up

| Asset | Issue | Recommendation |
|---|---|---|
| `/assets/editorial/joey-williams-headshot.png` | The file exists and the app references it, but its bytes start with JPEG-style `/9j/...` content instead of a true PNG signature. | Either replace it with a true PNG file or rename it to `.jpg` and update the source path. Do this only after visually confirming the live rendering and desired transparency/background behavior. |

---

## Source/code audit notes

### Positive findings

- Contact identity and endpoints are centralized in `src/data/contact.ts`.
- Link generation is centralized in `src/utils/links.ts`, avoiding scattered phone/email/Smart Move strings.
- Footer compliance links are explicit and easy to locate:
  - `/assets/iabs.pdf`
  - `/assets/cpn.pdf`
  - `/privacy.html`
- Footer includes brokerage identity and Equal Housing Opportunity language.
- Mobile action bar intentionally hides when the footer is visible, helping compliance links remain reachable.
- The Meet Joey image source now points at the existing asset path.
- Build size is reasonable for a Vite/React marketing hub: JS gzip under 60 kB and CSS gzip under 7 kB.

### Items not changed in this audit

- I did not convert or replace the headshot binary because the currently deployed path works and the user indicated the current asset is acceptable.
- I did not redesign components, rewrite CSS architecture, or add new dependencies.
- I did not add a CI workflow because branch protection/status-check behavior should be planned intentionally after the current deploy flow stabilizes.

---

## Accessibility and UX notes

Static source review indicates the site uses semantic sections, nav labels, image alt text, and native anchor/button behavior. The carousel uses real buttons with `aria-label` attributes. The animation utilities include `prefers-reduced-motion` handling.

Limit: this pass did not include a visual browser screenshot, Lighthouse, axe, or keyboard traversal recording. The next developer pass should run browser-based QA at the listed breakpoints below.

Recommended viewport checks:

- 360px mobile
- 390px mobile
- 430px mobile
- 768px tablet
- 1024px laptop
- 1440px desktop

What to confirm visually:

- No horizontal overflow.
- Header/nav does not crush content.
- Hero remains legible.
- Meet Joey portrait does not crop awkwardly.
- Route board rows remain readable.
- Stays carousel is usable by touch and keyboard.
- Mobile action bar does not cover footer/compliance links.

---

## SEO and compliance notes

### Passed

- Title and description are present.
- Canonical URL is present.
- Open Graph and Twitter tags are present.
- OG image path points to a real PNG asset.
- Brokerage identity appears in footer.
- IABS and Consumer Protection Notice links are present.
- Equal Housing Opportunity language appears in footer.
- Privacy page is live and includes a link back to the hub.

### Follow-up

- Consider whether canonical should consistently use `https://www.jwillsoldit.com/` or non-www `https://jwillsoldit.com/`. Current canonical uses non-www while production was tested on www. This is not a blocker, but it should be a deliberate SEO choice.

---

## Performance notes

### Passed

- Production bundle sizes are healthy for the current scope.
- No heavy new libraries were introduced.
- Vercel build finishes quickly.
- Runtime logs show no production error/fatal issues in the checked window.

### Follow-up

- Audit actual dimensions/file sizes of image assets locally, especially:
  - `public/assets/editorial/joey-williams-headshot.png`
  - `public/assets/og-hub-v1.png`
  - `public/assets/crg-logo-transparent.png`
- If the headshot is large, generate an optimized web image and update references after visual QA.

---

## Security/dependency notes

Vercel `npm install` reported:

```txt
2 vulnerabilities (1 moderate, 1 high)
```

Recommendation:

1. Run `npm audit` locally or in a controlled PR environment.
2. Identify the packages and whether they affect production code or dev tooling only.
3. Patch without using `npm audit fix --force` unless the breaking changes are reviewed.

---

## Remaining recommendations by priority

### P1 — Developer-grade cleanup

1. Resolve the headshot extension/content mismatch after visual confirmation.
2. Run `npm audit` and patch the reported vulnerabilities intentionally.
3. Add a lightweight CI check for `npm run build` once branch protection/status checks are ready.

### P2 — QA polish

1. Run full browser QA with screenshots across mobile/tablet/desktop breakpoints.
2. Run Lighthouse and axe/accessibility checks.
3. Confirm every anchor scroll and every call/text/email/Smart Move link on a real mobile device.

### P3 — SEO refinement

1. Decide whether canonical should be www or non-www and keep it consistent with the preferred production domain.
2. Verify social previews in platform debuggers after cache refresh.

---

## Final verdict

Production is healthy enough to stay live. The headshot path problem is fixed. The site is not in a broken state from the checked deployment, but the codebase still deserves a focused follow-up pass for image hygiene, dependency audit, and browser-based QA screenshots.
