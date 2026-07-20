# Public Inventory and Manual Listing Controls

**Date:** 2026-07-20

## Problem

JWILLSOLDIT currently has two different listing concepts:

- The Smart Move backend has private listing-intake files with workflow states such as New, Approved, and Live.
- The public hub has a compile-time listing model in `src/data/listings.ts` with a small rental/sale status set.

Those concepts should not be merged. A client intake file is an internal operating record; a public listing is an inventory record that controls what the public site displays. Short-term stays will make that distinction more important because a property may be offered as a lease, furnished monthly stay, or short-term booking at different times.

## Goals

1. Give Joey a protected backend control for public inventory without requiring an MLS, Airbnb, or Vrbo API.
2. Support long-term rentals, mid-term/furnished stays, short-term stays, and sales without creating separate page systems.
3. Keep public status changes independent from private intake approval and checklist state.
4. Preserve the current 4231 Tulip Oak public page while the backend connection is introduced.
5. Leave stable channel and availability fields for later MLS, calendar, or booking integrations.

## Non-goals for this slice

- Scraping or importing MLS/HAR data.
- Airbnb/Vrbo booking or calendar synchronization.
- Payments, applications, screening, or lease execution.
- Replacing the existing private listing-intake workflow.
- Automatically deciding whether a property is available.

## Proposed model

The backend will maintain a public inventory collection separate from `db.listings`, which remains the private listing-intake collection.

Each public inventory record contains:

```text
id
propertyId / slug
offeringType: sale | rental | stay
rentalMode: long_term | mid_term | short_term | null
publicStatus: draft | coming_soon | available | pending | rented | booked | sold | off_market | archived
published: boolean
archivedAt / archivedBy: nullable archive audit fields
title and public description fields
property facts and media references
pricing fields with a rate period
source/channel links: direct, MLS/HAR, Airbnb, Vrbo, other
availability notes and date window
createdAt / updatedAt
```

The public UI will translate status choices by offering type. For example, a long-term rental can be `Rented`, a sale can be `Sold`, and a short-term stay can be `Booked`; the underlying inventory layer remains one system.

## Admin experience

The existing private admin listing detail will gain a separate **Public Inventory** panel. The panel will allow:

- Create or attach a public inventory record.
- Choose offering type and rental mode.
- Set public status.
- Toggle public visibility.
- Edit the public slug, summary, price, and channel links.
- Add short-term-specific details without requiring those fields for leases or sales.
- Preview the public URL.

The current intake buttons—Approve Listing and Mark Live—will continue to describe intake workflow and will not silently change public inventory status.

The admin will also have an explicit **Archive Property** action. Archiving is a reversible record-retention action, not another availability state:

- Archived properties are excluded from all public responses, filters, search, and counts.
- Their photos, public copy, channel links, and historical status remain stored.
- Joey can restore an archived property from an admin archive view and choose its next public status before republishing.
- The archive action records who archived it and when.

## Public experience

The hub listings index and category pages will read backend inventory status through a public, read-only endpoint. The UI will retain a static content fallback during rollout so a backend outage does not erase the existing 4231 page.

The listings index will have a single inventory system with filters for:

- All
- Available
- Coming Soon
- Pending
- Rented / Leased
- Sold / Booked, when relevant to the selected category

The default view will prioritize currently available inventory. Historical statuses remain controllable and can be shown without being mixed into the active default.

## Integration boundary

The public endpoint will expose only published, non-sensitive inventory fields. It will never expose client names, intake notes, checklist documents, session data, or service-role credentials.

The endpoint will enforce both visibility gates server-side: an inventory record must be published and not archived before it can be returned. Hiding an item only in the browser is not sufficient.

The endpoint is intentionally channel-neutral. Later integrations can update inventory records through adapters rather than changing the public page contract:

```text
MLS/HAR adapter  ─┐
Airbnb adapter    ├─> public inventory record ─> JWILLSOLDIT listings UI
Vrbo adapter      ┘
Manual admin      ─┘
```

For the first release, Manual admin is the only writer.

## Rollout sequence

1. Add inventory data helpers and status validation to the Smart Move backend.
2. Add protected admin read/create/update controls.
3. Add a public read-only inventory endpoint with CORS limited to JWILLSOLDIT public origins.
4. Connect the hub listings pages with a safe fallback to current static content.
5. Bootstrap 4231 Tulip Oak as a long-term rental inventory record.
6. Add short-term stay fields and a short-term presentation path using the same record shape.
7. Add channel adapters only when a real MLS or booking API is selected.

## Acceptance criteria

- Joey can change a public listing from Available to Coming Soon, Pending, Rented, or another valid type-appropriate state in the private admin.
- Joey can archive a property, confirm that it disappears from public pages, and restore it later without recreating its content.
- A public page reflects the change without a source-code edit.
- Intake approval and public status are visibly separate controls.
- A short-term stay can be created with nightly/monthly rate, minimum stay, availability window, amenities, house rules, and a booking/inquiry link.
- Public responses contain no private intake data.
- Archived properties are omitted from public API responses, including direct slug lookups.
- Existing 4231 content remains usable if the inventory endpoint is unavailable.
- Hub and backend builds pass, and status transitions are tested.
