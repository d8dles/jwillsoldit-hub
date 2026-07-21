# Inventory-Driven Property Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Smart Move inventory the content source for reusable JWILLSOLDIT rental, stay, and sale detail pages, including descriptions, facts, source links, and ordered photos.

**Architecture:** Extend the existing normalized inventory record with structured media and property details, expose one public record-by-slug projection, and render one shared hub detail shell with type-aware content and actions. Keep the existing 4231 page as a migration fixture and fallback until its backend record renders equivalently.

**Tech Stack:** Smart Move Node/Vercel handlers and JSON/Supabase/KV store; JWILLSOLDIT Vite + React + TypeScript; existing CSS modules; Node assertion tests; Vercel Git deployments.

## Global Constraints

- The Smart Move `inventory` record is the public content and lifecycle source of truth.
- Private listing-intake records remain separate from public inventory.
- The public API exposes only published, non-archived records and never exposes `internalNotes` or `auditLog`.
- The existing `/listings/rentals/4231-tulip-oak-dr/` URL and JWILLSOLDIT visual treatment must remain unchanged for the migrated record.
- Image URLs are the first media input mechanism; the media contract must support a later upload adapter without changing public rendering.
- Archive is reversible and never deletes content or media.
- All production code changes require a failing test before implementation and a fresh build/test verification before release.

---

### Task 1: Extend the inventory content and public-record contract

**Files:**
- Modify: `/Users/j0eschm0/Documents/Codex/2026-07-09/whe/work/jwillsoldit-smart-move/api/_lib/inventory.js`
- Modify: `/Users/j0eschm0/Documents/Codex/2026-07-09/whe/work/jwillsoldit-smart-move/api/inventory.js`
- Modify: `/Users/j0eschm0/Documents/Codex/2026-07-09/whe/work/jwillsoldit-smart-move/api/_lib/handlers/inventory-list.js`
- Modify: `/Users/j0eschm0/Documents/Codex/2026-07-09/whe/work/jwillsoldit-smart-move/api/_lib/handlers/inventory-detail.js`
- Modify: `/Users/j0eschm0/Documents/Codex/2026-07-09/whe/work/jwillsoldit-smart-move/tests/inventory.test.mjs`

**Interfaces:**
- `newInventory(fields)` accepts `gallery`, `heroImage`, `propertyDetails`, and `inquiryUrl` in addition to the existing fields.
- `validateInventoryPatch(body)` validates image objects as `{ src: string, alt: string, srcSet?: string }`, rejects blank image sources or missing alt text, and validates `propertyDetails` as a plain object.
- `toPublicInventory(record)` returns `heroImage`, `gallery`, `propertyDetails`, and `inquiryUrl` while omitting `internalNotes` and `auditLog`.
- `filterPublicInventory(db, query)` continues to support `slug`, `offeringType`, and `publicStatus`; a slug query returns exactly one normalized record or `404`.

- [ ] **Step 1: Write failing inventory contract tests**

Add assertions to `tests/inventory.test.mjs`:

```js
const record = newInventory({
  slug: '4231-tulip-oak-dr',
  title: '4231 Tulip Oak Dr',
  heroImage: { src: '/hero.jpg', alt: 'Front exterior' },
  gallery: [{ src: '/hero.jpg', alt: 'Front exterior' }],
  propertyDetails: { lotSquareFeet: 5176, yearBuilt: 2022 },
  inquiryUrl: 'https://move.jwillsoldit.com/forms/rental',
});
assert.deepEqual(record.gallery[0], { src: '/hero.jpg', alt: 'Front exterior' });
assert.equal(record.propertyDetails.yearBuilt, 2022);

const publicRecord = toPublicInventory(record);
assert.deepEqual(publicRecord.heroImage, { src: '/hero.jpg', alt: 'Front exterior' });
assert.deepEqual(publicRecord.gallery, [{ src: '/hero.jpg', alt: 'Front exterior' }]);
assert.equal('internalNotes' in publicRecord, false);
assert.equal('auditLog' in publicRecord, false);
assert.equal(validateInventoryPatch({ gallery: [{ src: '', alt: 'Missing source' }] }).ok, false);
assert.equal(validateInventoryPatch({ gallery: [{ src: '/photo.jpg', alt: '' }] }).ok, false);
```

- [ ] **Step 2: Run the focused test and verify the expected failure**

Run from the Smart Move checkout:

```bash
npm run test:inventory
```

Expected: FAIL because the new inventory fields are not normalized and the public projection does not contain them.

- [ ] **Step 3: Implement the minimal normalized media/detail fields**

Add these helpers and fields to `inventory.js`:

```js
function imageArray(value) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((image) => image && typeof image === 'object')
    .map((image) => ({
      src: valueOrEmpty(image.src),
      alt: valueOrEmpty(image.alt),
      ...(image.srcSet ? { srcSet: valueOrEmpty(image.srcSet) } : {}),
    }))
    .filter((image) => image.src && image.alt);
}
```

Add `gallery`, `heroImage`, `propertyDetails`, and `inquiryUrl` to `INVENTORY_EDITABLE_FIELDS`, normalize them in `newInventory` and `applyInventoryPatch`, validate them in `validateInventoryPatch`, and return them from `toPublicInventory`.

In `api/inventory.js`, keep the existing publication gate and make a slug query return the normalized record or `404`; do not change list filtering behavior.

- [ ] **Step 4: Run the focused test and verify it passes**

Run:

```bash
npm run test:inventory
```

Expected: `inventory domain tests passed`.

- [ ] **Step 5: Commit the backend contract**

```bash
git add api/_lib/inventory.js api/inventory.js api/_lib/handlers/inventory-list.js api/_lib/handlers/inventory-detail.js tests/inventory.test.mjs
git commit -m "Add inventory-driven property content"
```

---

### Task 2: Make the admin editor manage full property content and photos

**Files:**
- Modify: `/Users/j0eschm0/Documents/Codex/2026-07-09/whe/work/jwillsoldit-smart-move/admin/inventory-new.html`
- Modify: `/Users/j0eschm0/Documents/Codex/2026-07-09/whe/work/jwillsoldit-smart-move/admin/inventory-detail.html`
- Create: `/Users/j0eschm0/Documents/Codex/2026-07-09/whe/work/jwillsoldit-smart-move/assets/js/admin-inventory-form.js`
- Modify: `/Users/j0eschm0/Documents/Codex/2026-07-09/whe/work/jwillsoldit-smart-move/assets/js/admin-inventory-new.js`
- Modify: `/Users/j0eschm0/Documents/Codex/2026-07-09/whe/work/jwillsoldit-smart-move/assets/js/admin-inventory-detail.js`
- Modify: `/Users/j0eschm0/Documents/Codex/2026-07-09/whe/work/jwillsoldit-smart-move/assets/css/admin.css`
- Modify: `/Users/j0eschm0/Documents/Codex/2026-07-09/whe/work/jwillsoldit-smart-move/tests/inventory.test.mjs`

**Interfaces:**
- The form payload contains `heroImage`, `gallery`, `propertyDetails`, `inquiryUrl`, and existing lifecycle/content fields.
- Gallery editor rows contain `src`, `alt`, and optional `srcSet`; rows can be appended, removed, and reordered with explicit up/down controls.
- `AdminShell.api('/api/admin/inventory/:id', { method: 'PATCH', body })` persists the same normalized shape used by Task 1.

- [ ] **Step 1: Write a failing serialization test**

Extract a pure browser-safe serializer in `assets/js/admin-inventory-form.js` and add a Node-importable test fixture under `tests/inventory.test.mjs` that asserts:

```js
const payload = serializeInventoryForm({
  gallery: [{ src: '/one.jpg', alt: 'One' }, { src: '/two.jpg', alt: 'Two' }],
  heroImage: { src: '/one.jpg', alt: 'One' },
  propertyDetails: { lotSquareFeet: 5176 },
});
assert.equal(payload.gallery.length, 2);
assert.equal(payload.heroImage.src, '/one.jpg');
assert.equal(payload.propertyDetails.lotSquareFeet, 5176);
```

- [ ] **Step 2: Run the test and verify it fails**

Run:

```bash
npm run test:inventory
```

Expected: FAIL because the serializer and gallery form contract do not exist.

- [ ] **Step 3: Add the reusable admin media editor**

Implement `serializeInventoryForm`, `renderGalleryRows`, and `readGalleryRows` in `assets/js/admin-inventory-form.js`. Use DOM-created elements for user-entered values; never concatenate unescaped user values into `innerHTML`. Add a `data-gallery-list` container, `Add photo`, `Move up`, `Move down`, and `Remove` controls to both new and detail forms. Add fields for title, description, features, hero image, `src`, `alt`, `srcSet`, inquiry URL, and the existing property facts. Keep type-specific stay fields under the existing stay card. Add a `Preview public page` link that updates from `publicPath` and remains disabled when the path is blank.

The detail editor must populate these fields from the GET response and PATCH only the changed normalized object. The new form must send the same object to POST.

- [ ] **Step 4: Run syntax and focused tests**

Run:

```bash
node --check assets/js/admin-inventory-form.js
node --check assets/js/admin-inventory-new.js
node --check assets/js/admin-inventory-detail.js
npm run test:inventory
```

Expected: all commands exit `0` and the inventory test reports `inventory domain tests passed`.

- [ ] **Step 5: Commit the admin editor**

```bash
git add admin/inventory-new.html admin/inventory-detail.html assets/js/admin-inventory-form.js assets/js/admin-inventory-new.js assets/js/admin-inventory-detail.js assets/css/admin.css tests/inventory.test.mjs
git commit -m "Add inventory property content editor"
```

---

### Task 3: Render a reusable hub detail page from public inventory

**Files:**
- Create: `/Users/j0eschm0/Documents/Codex/2026-07-18/files-mentioned-by-the-user-houston/work/jwillsoldit-hub-houston-launch/src/data/publicInventory.ts`
- Create: `/Users/j0eschm0/Documents/Codex/2026-07-18/files-mentioned-by-the-user-houston/work/jwillsoldit-hub-houston-launch/src/hooks/usePublicInventoryRecord.ts`
- Create: `/Users/j0eschm0/Documents/Codex/2026-07-18/files-mentioned-by-the-user-houston/work/jwillsoldit-hub-houston-launch/src/pages/PropertyListingDetailPage.tsx`
- Create: `/Users/j0eschm0/Documents/Codex/2026-07-18/files-mentioned-by-the-user-houston/work/jwillsoldit-hub-houston-launch/src/pages/PropertyListingDetailPage.module.css`
- Modify: `/Users/j0eschm0/Documents/Codex/2026-07-18/files-mentioned-by-the-user-houston/work/jwillsoldit-hub-houston-launch/src/data/inventory.ts`
- Modify: `/Users/j0eschm0/Documents/Codex/2026-07-18/files-mentioned-by-the-user-houston/work/jwillsoldit-hub-houston-launch/src/utils/inventoryApi.ts`
- Modify: `/Users/j0eschm0/Documents/Codex/2026-07-18/files-mentioned-by-the-user-houston/work/jwillsoldit-hub-houston-launch/src/App.tsx`
- Modify: `/Users/j0eschm0/Documents/Codex/2026-07-18/files-mentioned-by-the-user-houston/work/jwillsoldit-hub-houston-launch/src/pages/RentalListingDetailPage.tsx`
- Modify: `/Users/j0eschm0/Documents/Codex/2026-07-18/files-mentioned-by-the-user-houston/work/jwillsoldit-hub-houston-launch/src/pages/RentalListingDetailPage.module.css`

The shared `propertyDetails` object uses these keys for the current home template: `propertyType`, `lotSquareFeet`, `yearBuilt`, `stories`, `garage`, `fullBathrooms`, and `halfBathrooms`.

**Interfaces:**
- `PublicInventoryRecord` includes `slug`, `publicPath`, `offeringType`, `rentalMode`, `publicStatus`, address fields, `priceLabel`, `bedrooms`, `bathrooms`, `squareFeet`, `description`, `features`, `heroImage`, `gallery`, `propertyDetails`, `sourceLinks`, `inquiryUrl`, and `stayDetails`.
- `fetchPublicInventoryRecord(slug): Promise<PublicInventoryRecord | null>` calls `GET /api/inventory?slug=<slug>` and treats `404` as not public.
- `PropertyListingDetailPage({ record, fallbackListing? })` renders the shared shell and chooses rental, stay, and sale labels/actions from `record.offeringType`.

- [ ] **Step 1: Write failing hub contract tests**

Add a Node contract test under `tests/public-inventory.test.mjs` that exercises the pure record-to-view-model mapper:

```js
const model = toPropertyPageModel({
  slug: 'demo-rental', offeringType: 'rental', publicStatus: 'available',
  title: 'Demo Rental', description: 'A clear description.',
  heroImage: { src: '/hero.jpg', alt: 'Exterior' },
  gallery: [{ src: '/hero.jpg', alt: 'Exterior' }],
});
assert.equal(model.heading, 'Demo Rental');
assert.equal(model.actions.primaryLabel, 'Request a showing');
assert.equal(model.gallery.length, 1);
```

- [ ] **Step 2: Run the test and verify it fails**

Run from the hub checkout:

```bash
node --test tests/public-inventory.test.mjs
```

Expected: FAIL because the public record mapper and reusable page do not exist.

- [ ] **Step 3: Implement the public record client and shared page**

Extend `inventory.ts` with the exact `PublicInventoryRecord` fields from the interface above. Add `fetchPublicInventoryRecord` to `inventoryApi.ts` with the existing four-second timeout and `404` handling. Implement a pure `toPropertyPageModel` mapper in `publicInventory.ts` and use it from `PropertyListingDetailPage`.

Move the 4231 page's existing hero, fact panel, description, feature list, detail list, gallery/lightbox, source link, and CTA treatment into the shared page. Keep the current CSS values and visual copy for rental records. For stays, render rate period, minimum stay, max guests, amenities, house rules, and a booking/inquiry CTA when present. For sales, render a buyer CTA and sale source links. Do not render empty sections.

In `App.tsx`, resolve known public paths through a generic route parser rather than matching only `4231-tulip-oak-dr`. Until backend migration is complete, pass the static 4231 listing as a fallback only when the requested slug is 4231.

- [ ] **Step 4: Run focused tests and the Vite build**

Run:

```bash
node --test tests/public-inventory.test.mjs
npm run build
git diff --check
```

Expected: the contract test passes, Vite reports a successful production build, and `git diff --check` is clean.

- [ ] **Step 5: Commit the shared public renderer**

```bash
git add src/data/publicInventory.ts src/hooks/usePublicInventoryRecord.ts src/pages/PropertyListingDetailPage.tsx src/pages/PropertyListingDetailPage.module.css src/data/inventory.ts src/utils/inventoryApi.ts src/App.tsx src/pages/RentalListingDetailPage.tsx src/pages/RentalListingDetailPage.module.css tests/public-inventory.test.mjs
git commit -m "Render property pages from public inventory"
```

---

### Task 4: Migrate 4231 and connect index cards to backend paths

**Files:**
- Modify: `/Users/j0eschm0/Documents/Codex/2026-07-18/files-mentioned-by-the-user-houston/work/jwillsoldit-hub-houston-launch/src/data/listings.ts`
- Modify: `/Users/j0eschm0/Documents/Codex/2026-07-18/files-mentioned-by-the-user-houston/work/jwillsoldit-hub-houston-launch/src/hooks/usePublicInventory.ts`
- Modify: `/Users/j0eschm0/Documents/Codex/2026-07-18/files-mentioned-by-the-user-houston/work/jwillsoldit-hub-houston-launch/src/components/ListingCard.tsx`
- Modify: `/Users/j0eschm0/Documents/Codex/2026-07-18/files-mentioned-by-the-user-houston/work/jwillsoldit-hub-houston-launch/src/pages/ListingsIndexPage.tsx`
- Modify: `/Users/j0eschm0/Documents/Codex/2026-07-18/files-mentioned-by-the-user-houston/work/jwillsoldit-hub-houston-launch/src/pages/RentalListingsPage.tsx`
- Modify: `/Users/j0eschm0/Documents/Codex/2026-07-18/files-mentioned-by-the-user-houston/work/jwillsoldit-hub-houston-launch/src/data/publicInventory.ts`
- Modify: `/Users/j0eschm0/Documents/Codex/2026-07-09/whe/work/jwillsoldit-smart-move/README.md`

**Interfaces:**
- `usePublicInventory(initialListings)` returns cards derived from public records when the API is configured and retains the static 4231 fallback only while the API reports `inventoryConfigured: false`.
- `ListingCard` uses `listing.path` or a backend `publicPath` and never constructs a HAR URL as the primary detail link.
- The 4231 migration payload contains the existing 41 images as ordered `{ src, alt }` records and the existing home facts in `propertyDetails`.

- [ ] **Step 1: Write the failing migration/list-index assertions**

Add assertions to the hub contract test:

```js
assert.equal(TULIP_OAK_LISTING.gallery.length, 41);
assert.equal(TULIP_OAK_LISTING.path, '/listings/rentals/4231-tulip-oak-dr/');
const public4231 = listingToInventoryRecord(TULIP_OAK_LISTING);
assert.equal(toPropertyPageModel(public4231).gallery.length, 41);
assert.equal(toPropertyPageModel(public4231).sourceLinks[0].url.includes('har.com'), true);
```

- [ ] **Step 2: Run the assertions and verify the backend-shaped path fails**

Run:

```bash
node --test tests/public-inventory.test.mjs
```

Expected: FAIL because the static listing and backend projection are not yet bridged as one page model.

- [ ] **Step 3: Add the migration adapter and backend-aware index cards**

Create a pure `listingToInventoryRecord` migration adapter that maps the current 4231 `Listing` to the public record shape, including `heroImage`, all 41 gallery photos, `propertyDetails`, and a source link. Use the backend record's `publicPath` for listing-card links. Keep the static listing only as a fallback while `inventoryConfigured` is false; once the backend record exists, a missing/unpublished slug must remove the card and make the detail route unavailable.

Add the one-time migration instructions and exact 4231 payload shape to the Smart Move README. Do not insert a live property record into production from code; the record is created once through `/admin/inventory/new` so content remains editable.

- [ ] **Step 4: Run the migration and route checks**

Run:

```bash
node --test tests/public-inventory.test.mjs
npm run build
```

Expected: the 41-photo mapping passes and all generated listing routes build successfully.

- [ ] **Step 5: Commit the migration bridge**

```bash
git add src/data/listings.ts src/hooks/usePublicInventory.ts src/components/ListingCard.tsx src/pages/ListingsIndexPage.tsx src/pages/RentalListingsPage.tsx src/data/publicInventory.ts README.md
git commit -m "Connect listing cards to inventory detail records"
```

---

### Task 5: Verify end-to-end and release both repositories

**Files:**
- Test: `/Users/j0eschm0/Documents/Codex/2026-07-09/whe/work/jwillsoldit-smart-move/tests/inventory.test.mjs`
- Test: `/Users/j0eschm0/Documents/Codex/2026-07-18/files-mentioned-by-the-user-houston/work/jwillsoldit-hub-houston-launch/tests/public-inventory.test.mjs`

**Interfaces:**
- Public flow: hub index → `publicPath` → `GET /api/inventory?slug=...` → shared detail renderer.
- Admin flow: admin editor → protected `POST/PATCH /api/admin/inventory` → durable store → public projection after publish.

- [ ] **Step 1: Run the complete local verification set**

Run in Smart Move:

```bash
npm run test:inventory
find api assets/js -name '*.js' -print0 | xargs -0 -n1 node --check
```

Run in the hub:

```bash
node --test tests/public-inventory.test.mjs
npm run build
git diff --check
```

Expected: all tests and syntax checks exit `0`; the existing Playwright harness may remain unavailable if its configured Chromium executable is missing, and that limitation must be reported rather than hidden.

- [ ] **Step 2: Run local HTTP smoke checks**

Start the backend and hub previews, then verify:

```bash
curl -i http://127.0.0.1:4173/listings/
curl -i http://127.0.0.1:4173/listings/rentals/4231-tulip-oak-dr/
curl -i http://127.0.0.1:3000/api/inventory
curl -i http://127.0.0.1:3000/api/inventory?slug=missing-property
```

Expected: public hub routes return `200`, the API list returns JSON, and a missing slug returns `404`.

- [ ] **Step 3: Push branches and wait for Vercel previews**

Push only the intentional commits from each repository. Confirm each preview is `READY`, inspect build logs if not, and verify the preview detail page uses the public record shape.

- [ ] **Step 4: Create and publish the 4231 inventory record through admin**

In `/admin/inventory/new`, create:

```json
{
  "slug": "4231-tulip-oak-dr",
  "publicPath": "/listings/rentals/4231-tulip-oak-dr/",
  "offeringType": "rental",
  "rentalMode": "long_term",
  "publicStatus": "available",
  "published": true
}
```

Populate the existing 4231 title, description, facts, MLS source link, inquiry link, hero image, and 41 gallery images before publishing. Verify that the public API returns `inventoryConfigured: true` and the hub detail page renders from that record.

- [ ] **Step 5: Production smoke test and release summary**

Verify:

```bash
curl -i https://move.jwillsoldit.com/api/inventory?slug=4231-tulip-oak-dr
curl -i https://move.jwillsoldit.com/api/inventory?slug=missing-property
curl -i https://move.jwillsoldit.com/api/admin/inventory
curl -i https://www.jwillsoldit.com/listings/
curl -i https://www.jwillsoldit.com/listings/rentals/4231-tulip-oak-dr/
```

Expected: published 4231 record `200`, missing slug `404`, unauthenticated admin API `401`, and both public hub routes `200`. Report deployment URLs, commit SHAs, test results, and any non-blocking platform warnings.

- [ ] **Step 6: Commit release documentation**

```bash
git add docs/superpowers/specs/2026-07-20-inventory-driven-property-pages-design.md
git commit -m "Document inventory-driven property page release"
```
