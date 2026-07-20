# Inventory-Driven Property Pages Design

## Goal

Make public inventory the source of truth for JWILLSOLDIT property pages so a property can be created, described, photographed, published, updated, archived, or restored from the protected Smart Move admin without hand-authoring a new React page for every address.

## Product decision

Use one shared JWILLSOLDIT property-page shell with type-aware sections. Rentals, furnished/short-term stays, and sales share the same visual language, navigation, gallery, fact panel, source links, and inquiry structure, while each offering type supplies the fields and calls to action that make sense for it.

This preserves the visual quality of the current 4231 Tulip Oak page while converting that page from a hard-coded one-off into the first record rendered by the shared system.

## Architecture

### Source of truth

The Smart Move `inventory` record is the public content and lifecycle record. It owns:

- identity and routing: `slug`, `publicPath`, `offeringType`, `rentalMode`
- publication lifecycle: `publicStatus`, `published`, `archivedAt`
- property content: title, address, neighborhood, price, facts, description, and features
- media: one hero image plus an ordered gallery of image records with `src`, `alt`, and optional responsive sources
- external and conversion links: MLS/channel source links, inquiry route, and stay booking URL where applicable
- type-specific data: lease, stay, and sale details without forcing irrelevant fields onto other offerings

Private listing-intake records remain separate. MLS, HAR, Airbnb, Vrbo, or another future integration may update inventory through an adapter, but the public page reads the normalized inventory projection.

### Public API

Keep the public API read-only. It must support:

- list published, non-archived inventory for index pages
- fetch one published, non-archived record by slug for a detail page
- return only the normalized public projection, never internal notes, audit history, or private intake data
- return `404` for an unpublished, archived, draft, or missing slug

The hub keeps a static fallback only for local development and for the current 4231 migration window. Once the backend contains the 4231 record, the backend record controls the page.

### Public routes

The hub uses the inventory record's `publicPath` and dispatches by offering type:

- `/listings/rentals/:slug/`
- `/listings/stays/:slug/`
- `/listings/sales/:slug/`

The detail renderer is shared; the route and record determine the type-specific content and action labels. No new source file is required for each address.

## Admin experience

The admin inventory editor must support:

- create and edit title, description, address, price, facts, features, and source links
- add, reorder, replace, and remove gallery photos
- set meaningful alt text per photo
- choose hero image from the gallery or provide a separate hero image
- preview the public path before publishing
- set offering type and rental mode so the correct type-specific fields appear
- publish, unpublish, archive, restore, and change lifecycle status

The first version may use image URLs because that matches the existing storage model. The media contract must be isolated so a later upload adapter can replace URL entry without changing public rendering.

## 4231 migration

Migrate the existing 4231 content into inventory without changing its public URL or design:

- slug: `4231-tulip-oak-dr`
- public path: `/listings/rentals/4231-tulip-oak-dr/`
- offering: long-term rental
- retain the existing description, facts, source link, inquiry route, hero image, and all 41 gallery images
- publish only after the migrated record renders equivalently to the current page

The static 4231 listing data remains available as a temporary fallback during migration and is removed only after the backend-driven route is verified in production.

## Lifecycle behavior

- `draft`: detail route is not public and index pages omit it
- `coming_soon`: detail route and index card may be public with a coming-soon label
- `available`: default index state and active inquiry actions
- `pending`, `rented`, `booked`, `sold`, `off_market`: visible only when the selected index filter includes that status; inquiry actions change or are suppressed according to type
- archived: omitted from all public responses and pages, reversible from admin

Changing a status must not delete property content or media. Restoring an archived record returns it to an unpublished draft state for deliberate review.

## Testing and release gates

- inventory domain tests cover normalized public projections, slug lookup, publication gates, archive/restore, media validation, and type-specific validation
- hub tests cover list rendering from public records, detail rendering from a slug, missing/unpublished record handling, gallery rendering, and type-specific sections
- build checks run for both repositories
- production smoke checks confirm the public list, a published detail slug, an unpublished slug returning `404`, the protected admin API returning `401` without a session, and archive removal from the public projection

## Non-goals for this slice

- live MLS/HAR synchronization
- direct Airbnb or Vrbo channel management
- automatic image ingestion from MLS feeds
- replacing the existing Smart Move authentication or durable-store provider
- redesigning the 4231 page's visual language
