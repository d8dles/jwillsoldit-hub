# Public Inventory and Manual Listing Controls Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a manually controlled, backend-backed public inventory system for JWILLSOLDIT that supports rentals, short-term stays, sales, status changes, and reversible property archiving without coupling the public site to an MLS or booking API.

**Architecture:** Keep the existing Smart Move `db.listings` collection as private listing-intake files. Add a separate `db.inventory` collection with a protected admin API and a public read-only API. The Vite hub merges backend inventory state into existing static listing content with a failure-safe fallback, so 4231 Tulip Oak continues to work while backend records are introduced.

**Tech Stack:** Node.js ES modules, Vercel Serverless Functions, Supabase/KV-backed JSON store, vanilla HTML/JavaScript admin pages, React/TypeScript/Vite public hub, Playwright verification harness, Node `assert` tests.

## Global Constraints

- Manual admin is the only inventory writer in this slice; no MLS/HAR, Airbnb, or Vrbo synchronization.
- Private intake workflow and public inventory workflow remain separate.
- Archived properties are excluded server-side from public responses, filters, search, counts, and direct slug lookups.
- The public endpoint exposes only published, non-sensitive inventory fields.
- A backend outage must not erase the current 4231 Tulip Oak public page.
- Status choices are type-aware: `Rented` is for rental offerings, `Booked` is for stays, and `Sold` is for sales.
- Existing unrelated untracked Smart Move files must remain untouched: `api/_lib/handlers/invoice-pdf 2.js`, `api/_lib/handlers/listing-token 2.js`, and `assets/js/brand-footer 2.js`.

---

## File map

Smart Move backend:

- Create `api/_lib/inventory.js` for record shape, validation, projections, and archive transitions.
- Modify `api/_lib/store.js` to add the `inventory` namespace to new stores.
- Create `api/_lib/handlers/inventory-list.js` and `api/_lib/handlers/inventory-detail.js` for protected CRUD.
- Create `api/inventory.js` for the public read-only endpoint.
- Modify `api/admin/[...route].js` and `api/_lib/http.js` for routing and explicit public CORS origins.
- Create `tests/inventory.test.mjs`; modify `package.json` with `test:inventory`.
- Create `admin/inventory-list.html`, `admin/inventory-new.html`, `admin/inventory-detail.html` and matching `assets/js/admin-inventory-*.js` files.
- Modify `assets/css/admin.css` and existing admin topbars for inventory controls and navigation.

JWILLSOLDIT hub:

- Create `src/data/inventory.ts`, `src/utils/inventoryApi.ts`, `src/hooks/usePublicInventory.ts`, and the shared `InventoryFilters` component/CSS.
- Modify `src/data/listings.ts`, `src/pages/ListingsIndexPage.tsx`, `src/pages/RentalListingsPage.tsx`, and `src/pages/RentalListingDetailPage.tsx`.

---

## Task 1: Build and test the inventory domain model

**Files:**

- Create `/Users/j0eschm0/Documents/Codex/2026-07-09/whe/work/jwillsoldit-smart-move/api/_lib/inventory.js`.
- Modify `/Users/j0eschm0/Documents/Codex/2026-07-09/whe/work/jwillsoldit-smart-move/api/_lib/store.js`.
- Create `/Users/j0eschm0/Documents/Codex/2026-07-09/whe/work/jwillsoldit-smart-move/tests/inventory.test.mjs`.
- Modify `/Users/j0eschm0/Documents/Codex/2026-07-09/whe/work/jwillsoldit-smart-move/package.json`.

**Interfaces:** Export `INVENTORY_TYPES`, `RENTAL_MODES`, `PUBLIC_STATUSES`, `newInventory(fields)`, `ensureInventory(db)`, `validateInventoryPatch(body)`, `toInventorySummary(record)`, `toPublicInventory(record)`, `isPublicInventory(record)`, `archiveInventory(record, actor)`, and `restoreInventory(record, actor)`.

- [ ] **Step 1: Write the failing model test.** Assert that a published available rental is public, a projection omits `auditLog` and internal fields, archive sets `published=false` and `archivedAt`, restore sets `publicStatus='draft'`, and `booked` is rejected for `rental` but accepted for `stay`.
- [ ] **Step 2: Run `npm run test:inventory`.** Expected: FAIL because the model and script do not exist.
- [ ] **Step 3: Implement the model.** Use these exact constants:

```js
export const INVENTORY_TYPES = Object.freeze(['sale', 'rental', 'stay']);
export const RENTAL_MODES = Object.freeze(['long_term', 'mid_term', 'short_term']);
export const PUBLIC_STATUSES = Object.freeze([
  'draft', 'coming_soon', 'available', 'pending',
  'rented', 'booked', 'sold', 'off_market',
]);
```

`isPublicInventory(record)` returns true only when `published === true`, `!archivedAt`, and `publicStatus !== 'draft'`. `archiveInventory()` records `archivedAt`, `archivedBy`, sets `published=false`, and updates `updatedAt`. `restoreInventory()` clears archive fields, sets `publicStatus='draft'`, sets `published=false`, and updates `updatedAt`. Add `inventory: {}` only to `emptyDB()`.
- [ ] **Step 4: Run `npm run test:inventory`.** Expected: PASS.
- [ ] **Step 5: Commit with `git add api/_lib/inventory.js api/_lib/store.js tests/inventory.test.mjs package.json && git commit -m "Add public inventory domain model"`.**

## Task 2: Add protected inventory API routes

**Files:**

- Create `api/_lib/handlers/inventory-list.js` and `api/_lib/handlers/inventory-detail.js` in the Smart Move checkout.
- Modify `api/admin/[...route].js` in the Smart Move checkout.

**Interfaces:**

- `GET /api/admin/inventory` returns `{ success: true, inventory: InventorySummary[] }` and accepts `includeArchived=true`.
- `POST /api/admin/inventory` requires `slug`, `offeringType`, and `publicPath`; it creates a draft, unpublished record.
- `GET /api/admin/inventory/:id` returns the private detail projection.
- `PATCH /api/admin/inventory/:id` updates whitelisted public fields and accepts `{ archived: true }` or `{ archived: false }` for archive/restore.

- [ ] **Step 1: Extend the model test with invalid slug, invalid type/mode, and valid short-term stay patches.** Run the test and confirm the new assertions fail before the handler uses the validator.
- [ ] **Step 2: Implement list/create and detail/update handlers.** Use `requireAdmin`, `withDB`, `readDB`, and `parseJsonBody`; never accept arbitrary fields or expose client intake data.
- [ ] **Step 3: Register the routes inside the existing catch-all function.** Add imports and route branches for `inventory` without adding another admin function.
- [ ] **Step 4: Run the local server and request `GET /api/admin/inventory` without a session.** Expected: `401 Not authenticated`.
- [ ] **Step 5: Run `npm run test:inventory` and commit with `git add api/_lib/handlers/inventory-list.js api/_lib/handlers/inventory-detail.js api/admin/[...route].js tests/inventory.test.mjs && git commit -m "Add protected public inventory API"`.

## Task 3: Add the public endpoint and CORS boundary

**Files:**

- Create `api/inventory.js` in the Smart Move checkout.
- Modify `api/_lib/http.js` and `tests/inventory.test.mjs` in the Smart Move checkout.

**Interfaces:** `GET /api/inventory` returns `{ success: true, inventory: PublicInventory[] }`; supports `slug`, `offeringType`, and `publicStatus`; never returns unpublished or archived records. A missing public slug returns no private record body.

- [ ] **Step 1: Write the public filtering test.** Create live, unpublished, and archived records and assert only the live record is projected.
- [ ] **Step 2: Implement `api/inventory.js`.** Use `applyCors`, `handlePreflight`, `readDB`, `isPublicInventory`, and `toPublicInventory`. A collection request with no records returns `200` and an empty array.
- [ ] **Step 3: Update `applyCors()`.** Add a comma-separated `PUBLIC_ALLOWED_ORIGINS` allowlist and select the request origin only when it is explicitly listed. Do not use `*`; preserve current Smart Move origin behavior.
- [ ] **Step 4: Test with `curl -i http://localhost:3000/api/inventory` and `curl -i 'http://localhost:3000/api/inventory?slug=archived'`.** Expected: public records only; no private record body for archived slug.
- [ ] **Step 5: Commit with `git add api/inventory.js api/_lib/http.js tests/inventory.test.mjs && git commit -m "Expose published inventory safely"`.

## Task 4: Build protected admin inventory screens

**Files:** Create `admin/inventory-list.html`, `admin/inventory-new.html`, `admin/inventory-detail.html`, `assets/js/admin-inventory-list.js`, `assets/js/admin-inventory-new.js`, and `assets/js/admin-inventory-detail.js` in Smart Move. Modify `assets/css/admin.css` and every existing `/admin/*.html` topbar that has the shared admin navigation.

**Interfaces:** All pages use `AdminShell.requireSession()` and `AdminShell.api()`. New records start as draft/unpublished. Detail controls include status, publish toggle, save, archive, and restore. Short-term fields appear for `stay` or `short_term`: rate period, minimum stay, max guests, availability window, amenities, house rules, and booking/inquiry URL.

- [ ] **Step 1: Create the list page.** Show property, offering, status, published state, updated time, and archive state; add `Include archived` and `New Public Inventory` controls.
- [ ] **Step 2: Create the new page.** Require slug, public path, and offering type; include long-term/mid-term/short-term mode and the short-term fields without requiring them for sale.
- [ ] **Step 3: Create the detail page.** Save only whitelisted fields. Archive requires confirmation, calls `{ archived: true }`, and refreshes. Restore calls `{ archived: false }` and visibly leaves the record draft/unpublished.
- [ ] **Step 4: Add `Public Inventory` to each shared admin topbar.** Use `/admin/inventory` everywhere so the feature is discoverable from listings, verifications, and invoices.
- [ ] **Step 5: Run `npm run verify` and manually test signed-out redirect, create, publish, archive, archive-filter, restore, and republish.**
- [ ] **Step 6: Commit with `git add admin assets/js assets/css/admin.css && git commit -m "Add public inventory admin controls"`.

## Task 5: Connect the hub to backend-controlled state

**Files:**

- Create `src/data/inventory.ts`, `src/utils/inventoryApi.ts`, `src/hooks/usePublicInventory.ts`, `src/components/InventoryFilters.tsx`, and `src/components/InventoryFilters.module.css` in the hub checkout.
- Modify `src/data/listings.ts`, `src/pages/ListingsIndexPage.tsx`, `src/pages/RentalListingsPage.tsx`, and their CSS modules.

**Interfaces:** `fetchPublicInventory(signal?: AbortSignal): Promise<PublicInventoryResponse | null>` returns `null` on timeout/network failure. `usePublicInventory()` returns `{ records, remoteLoaded }`. A matching successful backend record with `published=false` or archive state hides the matching static listing; a failed request leaves static content visible.

- [ ] **Step 1: Define `PublicStatus`, `OfferingType`, and `PublicInventoryState` contracts.** Include `slug`, `offeringType`, `rentalMode`, `publicStatus`, and `publicPath`.
- [ ] **Step 2: Implement the fetch adapter.** Read `VITE_INVENTORY_API_ORIGIN`, default to `https://move.jwillsoldit.com`, use a four-second timeout, and never throw into page rendering.
- [ ] **Step 3: Add `inventorySlug: '4231-tulip-oak-dr'` and change the fallback status to `available`.** Keep current photos, MLS link, description, and inquiry link local for this rollout.
- [ ] **Step 4: Add shared filters.** Show Available, Coming Soon, Pending, Rented, Booked, and Sold only when relevant; never show Archived publicly. Default to active/available inventory.
- [ ] **Step 5: Connect index and rental pages.** Filter merged listings, update counts, and render a useful empty state while keeping the rental CTA visible.
- [ ] **Step 6: Run `npm run build` with the API origin unset and then unreachable.** Expected: strict TypeScript/Vite build passes and 4231 remains visible.
- [ ] **Step 7: Commit with `git add src && git commit -m "Connect listings pages to public inventory state"`.

## Task 6: Gate detail pages and bootstrap 4231

**Files:** Modify `src/pages/RentalListingDetailPage.tsx` and `.module.css` in the hub checkout.

- [ ] **Step 1: Add a detail visibility gate.** After a successful public response, an archived/unpublished matching record renders an unavailable state linking to `/listings` and `/listings/rentals`; during network failure, retain the current static detail page.
- [ ] **Step 2: Create the initial backend record through `/admin/inventory/new`:** slug `4231-tulip-oak-dr`, offering `rental`, mode `long_term`, status `available`, published `true`, path `/listings/rentals/4231-tulip-oak-dr/`.
- [ ] **Step 3: Test Available → Coming Soon → Pending → Rented → Archived → Restored.** Confirm archive removes the item from public results and restore requires explicit republish.
- [ ] **Step 4: Commit with `git add src/pages/RentalListingDetailPage.tsx src/pages/RentalListingDetailPage.module.css && git commit -m "Hide archived listings from public detail pages"`.

## Task 7: Full verification and release handoff

- [ ] **Step 1: In Smart Move, run `npm run test:inventory` and `npm run verify`.** Expected: both pass.
- [ ] **Step 2: In the hub, run `npm run build`.** Expected: strict typecheck and production build pass.
- [ ] **Step 3: Verify routes:** public collection returns only published/non-archived records; archived slug has no private body; admin API returns `401` signed out; `/admin/inventory` redirects signed out.
- [ ] **Step 4: Run `git status --short --branch` and `git diff --check` in both worktrees.** Confirm only intentional files changed and the three pre-existing Smart Move files with ` 2` remain untouched.
- [ ] **Step 5: Set deployment variable `PUBLIC_ALLOWED_ORIGINS=https://www.jwillsoldit.com,http://127.0.0.1:4173`; do not merge or deploy automatically. Hand off the verified local URLs and one-time 4231 setup step for review.

## Self-review against the design spec

- Separate public inventory from private intake: Tasks 1–2.
- Manual controls and short-term fields: Task 4.
- Public read-only bridge and safe fallback: Tasks 3 and 5.
- Reversible archive and server-side exclusion: Tasks 1, 3, 4, and 6.
- Type-aware statuses and filters: Tasks 1, 4, and 5.
- 4231 bootstrap and end-to-end transitions: Task 6.
- Future MLS/calendar/channel boundary: Tasks 1 and 3.
- Build and regression verification: Task 7.
