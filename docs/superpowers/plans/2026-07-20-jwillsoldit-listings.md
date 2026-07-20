# JWILLSOLDIT Listings Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a JWILLSOLDIT-owned listings index, rental index, and Tulip Oak rental detail route that presents the property locally while linking to HAR only as a secondary MLS reference.

**Architecture:** Keep the existing Vite + React + TypeScript static-site architecture and add a small pathname switch instead of a routing dependency. Store the listing facts and photo manifest in one typed data module, render three focused page components inside the existing JWILLSOLDIT shell, and update sitemap/Vercel fallback rules for direct navigation.

**Tech Stack:** React 18, TypeScript, Vite 5, CSS Modules, existing JWILLSOLDIT design tokens, supplied JPEG property photography.

## Global Constraints

- No IDX feed, backend, API route, or automatic redirect to HAR.
- `/listings` is the inventory landing page; `/listings/rentals` is active rental inventory; `/listings/rentals/4231-tulip-oak-dr/` is the canonical Tulip Oak detail page.
- `/rentals` remains the broader renter/owner service and Smart Move entry point.
- Primary renter actions use `https://move.jwillsoldit.com/?intent=rent`.
- The only external listing-reference action is the labeled HAR MLS link, opened in a new tab.
- Use the user-supplied current advertised price of `$2,300/month`; do not add an unverified availability date.
- Describe the property only; do not add safety, school-quality, or protected-class language.
- Visible JWILLSOLDIT wordmarks link to `/`.
- Keep reduced-motion and keyboard-focus behavior consistent with the existing site.

---

### Task 1: Add the typed listing record and local photo assets

**Files:**
- Create: `src/data/listings.ts`
- Create: `public/listings/4231-tulip-oak-dr/TP-001.jpg` through `TP-041.jpg`

**Interfaces:**
- Produces `Listing`, `TULIP_OAK_LISTING`, `ACTIVE_LISTINGS`, and `ACTIVE_RENTALS` for the page and card components.

- [ ] **Step 1: Define the listing contract and source record**

Create `src/data/listings.ts` with this shape and values:

```ts
import { smartMoveLink } from '../utils/links';

export type ListingCategory = 'rental' | 'sale';
export type ListingStatus = 'active' | 'pending' | 'leased' | 'sold';

export interface ListingPhoto {
  src: string;
  alt: string;
}

export interface Listing {
  id: string;
  slug: string;
  path: string;
  category: ListingCategory;
  status: ListingStatus;
  statusLabel: string;
  addressLine: string;
  city: string;
  state: string;
  zip: string;
  neighborhood: string;
  price: number;
  priceLabel: string;
  bedrooms: number;
  fullBathrooms: number;
  halfBathrooms: number;
  squareFeet: number;
  lotSquareFeet: number;
  yearBuilt: number;
  stories: number;
  garage: string;
  description: string;
  features: string[];
  heroImage: ListingPhoto;
  gallery: ListingPhoto[];
  mlsLabel: string;
  mlsNumber: string;
  mlsUrl: string;
  inquiryUrl: string;
}

const photo = (number: number, alt: string): ListingPhoto => ({
  src: `/listings/4231-tulip-oak-dr/TP-${String(number).padStart(3, '0')}.jpg`,
  alt,
});

const gallery = Array.from({ length: 41 }, (_, index) =>
  photo(index + 1, `4231 Tulip Oak Dr rental listing photo ${index + 1}`)
);

export const TULIP_OAK_LISTING: Listing = {
  id: 'rental-4231-tulip-oak-dr',
  slug: '4231-tulip-oak-dr',
  path: '/listings/rentals/4231-tulip-oak-dr/',
  category: 'rental',
  status: 'active',
  statusLabel: 'For rent',
  addressLine: '4231 Tulip Oak Dr',
  city: 'Houston',
  state: 'TX',
  zip: '77068',
  neighborhood: 'Stuebner Hollow',
  price: 2300,
  priceLabel: '$2,300 / month',
  bedrooms: 4,
  fullBathrooms: 2,
  halfBathrooms: 1,
  squareFeet: 2362,
  lotSquareFeet: 5176,
  yearBuilt: 2022,
  stories: 2,
  garage: '2-car attached garage',
  description: 'A newer two-story home with an open kitchen, dining, and living area; a first-floor primary suite; a flex space for work or quiet use; three additional bedrooms upstairs; and a loft-style landing.',
  features: [
    'First-floor primary suite',
    'Open kitchen, dining, and living layout',
    'Flex / study space',
    'Upstairs loft area',
    'Stainless kitchen appliances',
    'Washer and dryer included',
    '2-car attached garage',
    'Private rear yard',
  ],
  heroImage: photo(1, 'Twilight exterior of 4231 Tulip Oak Dr'),
  gallery,
  mlsLabel: 'HAR MLS',
  mlsNumber: '7682952',
  mlsUrl: 'https://www.har.com/homedetail/4231-tulip-oak-dr-houston-tx-77068/15905311',
  inquiryUrl: smartMoveLink('rent'),
};

export const ACTIVE_LISTINGS = [TULIP_OAK_LISTING];
export const ACTIVE_RENTALS = ACTIVE_LISTINGS.filter(
  (listing) => listing.category === 'rental' && listing.status === 'active'
);
```

- [ ] **Step 2: Copy the supplied photos into the public listing directory**

Run from the repository root:

```bash
mkdir -p public/listings/4231-tulip-oak-dr
for number in $(seq -w 1 41); do
  cp "/Users/j0eschm0/Downloads/4321_tulip_oak_dr pics/TP-${number}.jpg" \
    "public/listings/4231-tulip-oak-dr/TP-${number}.jpg"
done
```

Expected: 41 JPEG files exist under `public/listings/4231-tulip-oak-dr/` and are served at `/listings/4231-tulip-oak-dr/TP-001.jpg` through `TP-041.jpg`.

- [ ] **Step 3: Verify the data module before pages depend on it**

Run:

```bash
npm run build
```

Expected: the existing app still type-checks and builds with the new data module and copied assets.

### Task 2: Add listing routing, metadata, and shared shell behavior

**Files:**
- Modify: `src/App.tsx` (extract homepage component only; route switch lands in Task 3)
- Modify: `src/components/BrandLockup.tsx`
- Modify: `src/components/Masthead.tsx`
- Create: `src/components/ListingMeta.tsx`
- Create: `src/components/ListingShell.tsx`
- Create: `src/components/ListingShell.module.css`

**Interfaces:**
- `ListingMeta` consumes a `Listing` and updates title, description, canonical, Open Graph/Twitter tags, and one `RealEstateListing` JSON-LD script.
- `ListingShell` consumes `children: React.ReactNode` and renders the existing masthead, page content, contact footer, and mobile action bar.

- [ ] **Step 1: Make visible wordmarks home links**

Add an optional `href` prop to `BrandLockup` with `'#top'` as its default, then render `<BrandLockup href="/" />` from `Masthead`. This preserves the home-page anchor fallback while making the listing pages return to JWILLSOLDIT home.

- [ ] **Step 2: Extract the homepage without changing route selection**

Move the existing returned homepage JSX into a local `HomePage` component and keep `App` rendering `<HomePage />` for this task. Do not import the future listing pages or add pathname branches until Task 3 creates those modules:

```tsx
export default function App() {
  return <HomePage />;
}
```

- [ ] **Step 3: Add route-specific head metadata**

`ListingMeta` should use `useEffect` to upsert these exact values for Tulip Oak:

```text
title: 4231 Tulip Oak Dr, Houston TX 77068 | For Rent $2,300/mo | JWILLSOLDIT
description: 4231 Tulip Oak Dr in Houston, TX 77068 is a 4-bedroom, 2.5-bath rental with 2,362 square feet, a first-floor primary suite, open living spaces, and washer/dryer included.
canonical: https://www.jwillsoldit.com/listings/rentals/4231-tulip-oak-dr/
og:image: https://www.jwillsoldit.com/listings/4231-tulip-oak-dr/TP-001.jpg
```

The JSON-LD should use `@type: RealEstateListing`, the same address, `2300` USD monthly price, `4` bedrooms, `2.5` bathrooms, `2362` square feet, and the canonical URL. Replace the existing listing JSON-LD script by id on cleanup so Strict Mode does not duplicate it.

- [ ] **Step 4: Create the shared listing shell**

`ListingShell` should render:

```tsx
<>
  <Masthead />
  <main className={styles.main}>{children}</main>
  <ContactFooter />
  <MobileActionBar />
</>
```

Use the existing `container`, `section`, `btn`, `mono-label`, and design-token classes; add only listing-specific spacing needed by the new pages.

- [ ] **Step 5: Build to catch shell/type errors**

Run `npm run build` and expect a successful Vite build before adding page-specific layout.

### Task 3: Build the listings index, rental index, and property card

**Files:**
- Create: `src/components/ListingCard.tsx`
- Create: `src/components/ListingCard.module.css`
- Create: `src/pages/ListingsIndexPage.tsx`
- Create: `src/pages/ListingsIndexPage.module.css`
- Create: `src/pages/RentalListingsPage.tsx`
- Create: `src/pages/RentalListingsPage.module.css`
- Modify: `src/components/Masthead.tsx`
- Modify: `src/App.tsx` (add the listing pathname switch after the page modules exist)

**Interfaces:**
- `ListingCard` consumes `listing: Listing` and renders a local-image card linking to `listing.path`.
- Both index pages consume the derived arrays from `src/data/listings.ts` and contain no hard-coded property facts.

- [ ] **Step 1: Add the reusable property card**

Render the hero image, status label, address, price, core stats, neighborhood, and a local “View listing” link. Add a separate, visually quieter “MLS reference” link only on the detail page, not the card, so the card does not accidentally become a HAR gateway.

- [ ] **Step 2: Build `/listings`**

Use a compact editorial hero with:

```text
LISTINGS / CURRENT INVENTORY
Property pages built for the next move.
```

Show two category lanes: “Rentals” linking to `/listings/rentals` and “Sales” labeled “No active listings” without a fake property card. Below them, render the real active listing card.

- [ ] **Step 3: Build `/listings/rentals`**

Use the same hub shell and present Tulip Oak as the active rental. The page copy must make the ownership boundary clear: “JWILLSOLDIT property pages show the home here first; verify current price and availability before applying.” Link the card to `/listings/rentals/4231-tulip-oak-dr/` and provide a Smart Move rental CTA.

- [ ] **Step 4: Add a Listings nav entry without breaking the existing Rent section**

Add `{ label: 'Listings', href: '/listings', external: false }` to the existing masthead navigation, retain the existing `Rent` anchor to `#rentals`, and keep all external Smart Move links marked with `rel="noopener"`.

- [ ] **Step 5: Add the index pathname switch**

Now that the two index page modules exist, update `App.tsx` so the current homepage remains the default and the two index paths render the new pages. Leave the detail branch for Task 4 after its module exists:

```tsx
const pathname = window.location.pathname.replace(/\/+$/, '') || '/';

export default function App() {
  if (pathname === '/listings') return <ListingsIndexPage />;
  if (pathname === '/listings/rentals') return <RentalListingsPage />;

  return <HomePage />;
}
```

- [ ] **Step 6: Verify index-page routes**

Run `npm run build`; then serve the build and request `/listings` and `/listings/rentals`. Expect each path to return the SPA document and render the correct heading after JavaScript loads.

### Task 4: Build the Tulip Oak detail page and accessible gallery

**Files:**
- Create: `src/pages/RentalListingDetailPage.tsx`
- Create: `src/pages/RentalListingDetailPage.module.css`
- Create: `src/components/PhotoLightbox.tsx`
- Create: `src/components/PhotoLightbox.module.css`

**Interfaces:**
- `RentalListingDetailPage` consumes `listing: Listing`.
- `PhotoLightbox` consumes `photos: ListingPhoto[]`, `openIndex: number | null`, `onClose: () => void`, and `onChange: (index: number) => void`.

- [ ] **Step 1: Implement the property hero and facts**

Place the hero image opposite a structured fact panel. The fact panel must show `$2,300 / month`, `4 beds`, `2 full + 1 half baths`, `2,362 sq ft`, `Stuebner Hollow · Houston, TX 77068`, and `For rent`. The primary button uses `listing.inquiryUrl`; the secondary button uses `listing.mlsUrl` with `target="_blank"` and `rel="noopener noreferrer"`.

- [ ] **Step 2: Implement property sections**

Render the description, a feature list, and a detail grid using the typed record. Include a quiet source note: “Listing facts are presented by JWILLSOLDIT from the current MLS record. Price, availability, and lease terms should be confirmed before applying.”

- [ ] **Step 3: Implement the gallery**

Render the first 12 photos in the visible grid with `loading="lazy"` except the hero. Include a “View all 41 photos” control that expands the remaining photos in the same page. Clicking any photo opens `PhotoLightbox`.

- [ ] **Step 4: Make the lightbox keyboard accessible**

Use a `role="dialog"`, `aria-modal="true"`, labeled close button, previous/next buttons, `Escape` to close, and arrow keys to move. Add an effect that temporarily sets `document.body.style.overflow = 'hidden'` while open and restores the previous value on cleanup. Do not use autoplay or motion that ignores `prefers-reduced-motion`.

- [ ] **Step 5: Add final conversion panel**

End the page with “Want to see it?” and two actions: “Start the rental route” to Smart Move with `intent=rent`, and “Call Joey” using the existing `telLink()` helper. The MLS reference remains secondary and is not repeated as the final CTA.

- [ ] **Step 6: Build and inspect the detail route**

Add the detail pathname branch to `App.tsx` after the detail module exists:

```tsx
if (pathname === '/listings/rentals/4231-tulip-oak-dr') {
  return <RentalListingDetailPage listing={TULIP_OAK_LISTING} />;
}
```

Then run `npm run build` and use a local browser or `curl` plus DOM inspection to confirm the detail path loads, contains the Smart Move URL, contains the HAR URL only in the reference link, and contains 41 local image paths.

### Task 5: Add direct-navigation fallback and search metadata

**Files:**
- Modify: `vercel.json`
- Modify: `public/sitemap.xml`

**Interfaces:**
- Vercel serves `index.html` for `/listings`, `/listings/rentals`, and `/listings/rentals/*` without changing the existing `/houston` or transaction rewrites.

- [ ] **Step 1: Add the listing SPA fallback**

Add these rewrites before the existing external `/houston` rewrites:

```json
{
  "source": "/listings",
  "destination": "/index.html"
},
{
  "source": "/listings/:path*",
  "destination": "/index.html"
}
```

- [ ] **Step 2: Add canonical listing URLs to the sitemap**

Add `https://www.jwillsoldit.com/listings/`, `https://www.jwillsoldit.com/listings/rentals/`, and `https://www.jwillsoldit.com/listings/rentals/4231-tulip-oak-dr/` with the current date `2026-07-20`; use monthly change frequency and priorities `0.7`, `0.8`, and `0.9` respectively.

- [ ] **Step 3: Verify metadata and configuration**

Run:

```bash
git diff --check
npm run build
```

Expected: no whitespace errors and a successful production build. Search the built output for the canonical path, HAR URL, Smart Move URL, and `RealEstateListing`.

### Task 6: Final route and responsive verification

**Files:**
- Modify only files required by verification fixes.

- [ ] **Step 1: Run a production preview**

Run `npm run preview -- --host 127.0.0.1`, then request all three paths directly. Each response must be the app document and the browser-rendered page must have the expected page heading.

- [ ] **Step 2: Verify external-link behavior**

Confirm:

```text
primary rental CTA -> https://move.jwillsoldit.com/?intent=rent
MLS reference -> https://www.har.com/homedetail/4231-tulip-oak-dr-houston-tx-77068/15905311
brand wordmark -> /
```

The page must not set `window.location` to HAR and must not use HAR as a primary button.

- [ ] **Step 3: Verify mobile and keyboard behavior**

Check a 390px viewport for horizontal overflow, hero readability, gallery tap targets, and mobile action-bar clearance. Open and close the lightbox with the keyboard and verify focus-visible outlines remain present.

- [ ] **Step 4: Record the final diff and status**

Run:

```bash
git status --short
git diff --stat
```

Report the changed files, build result, route checks, and any deployment step that still requires the user’s Vercel access.
