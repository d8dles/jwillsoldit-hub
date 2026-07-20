# JWILLSOLDIT Listings and Tulip Oak Rental Design

## Goal

Add a JWILLSOLDIT-owned listings surface without introducing an IDX feed, a backend, or a redirect to HAR. JWILLSOLDIT should present the active property locally, use the MLS record as a linked reference for verification, and send renter inquiries through the existing Smart Move intake.

## URL architecture

- `/listings` — inventory landing page.
- `/listings/rentals` — active rental inventory.
- `/listings/rentals/4231-tulip-oak-dr/` — canonical Tulip Oak rental detail page.
- `/listings/sales` — reserved for future active sale inventory.
- `/rentals` — remains the broader renter/owner service entry point and Smart Move handoff.

The URL does not include `current`. Availability is listing data, not URL identity. If the home becomes leased or pending, the detail URL can remain stable while its status and active-inventory visibility change.

## Page experience

### Listings landing

Use the existing JWILLSOLDIT hub shell and visual language. The page opens with a concise “Current listings” thesis, a rental/sale category split, and only real public inventory. With one active rental, the Tulip Oak card is the focal listing rather than a grid padded with placeholders.

### Rental index

Use a rental-specific heading, a short explanation of what JWILLSOLDIT owns on the page, and one prominent property card. The card links to the JWILLSOLDIT detail page. It does not link the whole card to HAR.

### Tulip Oak detail

The detail page uses the property as the visual subject while staying compatible with the hub brand:

1. Breadcrumb and linked JWILLSOLDIT masthead.
2. Hero photo, active status, address, current advertised rent, and the core home stats.
3. Primary “Request a showing” / rental inquiry action to `https://move.jwillsoldit.com/?intent=rent`.
4. Secondary “View current MLS record” action to the verified HAR record.
5. A restrained property description based on the supplied photos and current listing facts.
6. Structured features/details with no unsupported neighborhood, school-quality, or protected-class language.
7. Curated photo gallery with a lightbox; the full supplied photo set is available in the page gallery with lazy loading.
8. Source/accuracy note explaining that price, availability, and terms should be verified before applying.
9. A final JWILLSOLDIT contact section that repeats the rental inquiry action and links the brand home.

The page should feel like a confident listing presentation, not a mirror of an MLS portal. The MLS link is visible and useful, but it is clearly a secondary verification path.

## Data model

Add a typed, data-driven listing record in `src/data/listings.ts` with:

- category: rental or sale
- status: active, pending, leased, or sold
- slug and canonical path
- address and location text
- price display and property statistics
- verified feature copy
- gallery image paths and alt text
- MLS label, MLS identifier, and external MLS URL
- primary inquiry URL

The Tulip Oak record uses the current advertised price supplied by the user (`$2,300/month`), the address and core details shown in the current listing results, and the supplied property photography. The detail page should avoid asserting a fixed availability date unless the listing data is refreshed.

## Routing and metadata

Keep the current Vite/React architecture and add a small pathname router in `App.tsx` rather than introducing a routing dependency for three static surfaces. Add route-specific titles and meta descriptions for the listing pages. Add the three public URLs to `public/sitemap.xml` and ensure Vercel serves the SPA entry point for `/listings/*` paths.

The Tulip Oak detail page should use a descriptive title, canonical path, Open Graph image, and `RealEstateListing` JSON-LD. The JSON-LD must reflect the same price, address, and core stats shown visibly on the page.

## Content and compliance boundaries

- Never imply that JWILLSOLDIT is providing a live MLS feed unless a feed exists.
- Never make HAR the automatic destination for the page or for the primary CTA.
- Keep the MLS link labeled as an external source/reference.
- Keep price, status, and availability easy to update in one data record.
- Describe the property, not the people who may live there; avoid school-quality and safety claims.
- Keep the rental inquiry path inside JWILLSOLDIT Smart Move.

## Verification

- TypeScript and production build pass.
- Direct navigation to `/listings`, `/listings/rentals`, and the detail path renders the expected page.
- The primary inquiry link points to Smart Move with `intent=rent`.
- The MLS link is the only external listing-reference action and opens HAR in a new tab.
- Gallery opens and closes with keyboard-accessible controls; reduced motion remains respected.
- Mobile layout does not overflow and the fixed action bar does not cover controls.
- Page title, canonical, social metadata, JSON-LD, and sitemap entries match the canonical detail URL.
