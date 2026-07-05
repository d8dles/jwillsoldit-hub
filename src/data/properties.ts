import type { Property } from './types';
import { SUBJECTS } from './contact';

// ─────────────────────────────────────────────────────────────────────────────
// PROPERTY PREVIEWS — placeholder-safe until real unit basics are provided.
//
// RULES (do not break):
// 1. Never invent neighborhoods, pricing, sleeps counts, features, or live
//    availability. Placeholder entries stay neutral until real details exist.
// 2. Statuses limited to the AvailabilityStatus union in types.ts.
// 3. Fair housing: describe the PROPERTY, never people or protected classes.
//    No "great for families", no school-quality claims, no "safe area" talk.
// 4. This file ships in the public bundle — flyer-safe info only.
//
// TO ADD A REAL UNIT: copy an entry, fill in real basics, set
// featured/publicVisible as desired. The homepage renders whatever is
// `publicVisible && featured` — unit #9, #10, or #50 needs no code changes.
// ─────────────────────────────────────────────────────────────────────────────

const STAY_DEFAULTS = {
  category: 'stay' as const,
  propertyType: 'Furnished stay',
  neighborhood: 'Details being finalized',
  city: 'Houston area',
  state: 'TX',
  bestUseCase: 'Furnished short-term or monthly stay',
  publicNotes: 'Houston-area furnished stay. Details being finalized — ask for current specifics.',
  tags: ['Furnished', 'Flexible-term'],
};

export const PROPERTIES: Property[] = [
  {
    ...STAY_DEFAULTS,
    id: 'stay-01',
    slug: 'stay-unit-01',
    name: 'Stay Unit 01',
    availabilityStatus: 'Available by inquiry',
    inquirySubject: `${SUBJECTS.stays} — Stay Unit 01`,
    featured: true,
    publicVisible: true,
  },
  {
    ...STAY_DEFAULTS,
    id: 'stay-02',
    slug: 'furnished-stay-02',
    name: 'Furnished Stay 02',
    availabilityStatus: 'Available by inquiry',
    inquirySubject: `${SUBJECTS.stays} — Furnished Stay 02`,
    featured: true,
    publicVisible: true,
  },
  {
    ...STAY_DEFAULTS,
    id: 'stay-03',
    slug: 'stay-unit-03',
    name: 'Stay Unit 03',
    availabilityStatus: 'Available by inquiry',
    inquirySubject: `${SUBJECTS.stays} — Stay Unit 03`,
    featured: true,
    publicVisible: true,
    tags: ['Furnished', 'Monthly-friendly'],
  },
  {
    ...STAY_DEFAULTS,
    id: 'stay-04',
    slug: 'furnished-stay-04',
    name: 'Furnished Stay 04',
    availabilityStatus: 'Available by inquiry',
    inquirySubject: `${SUBJECTS.stays} — Furnished Stay 04`,
    featured: true,
    publicVisible: true,
    tags: ['Furnished', 'Corporate-ready'],
  },
  {
    ...STAY_DEFAULTS,
    id: 'stay-05',
    slug: 'stay-unit-05',
    name: 'Stay Unit 05',
    availabilityStatus: 'Details being finalized',
    inquirySubject: `${SUBJECTS.stays} — Stay Unit 05`,
    featured: false,
    publicVisible: true,
  },
  {
    ...STAY_DEFAULTS,
    id: 'stay-06',
    slug: 'stay-unit-06',
    name: 'Stay Unit 06',
    availabilityStatus: 'Details being finalized',
    inquirySubject: `${SUBJECTS.stays} — Stay Unit 06`,
    featured: false,
    publicVisible: true,
  },
  {
    ...STAY_DEFAULTS,
    id: 'stay-07',
    slug: 'stay-unit-07',
    name: 'Stay Unit 07',
    availabilityStatus: 'Details being finalized',
    inquirySubject: `${SUBJECTS.stays} — Stay Unit 07`,
    featured: false,
    publicVisible: true,
  },
  {
    ...STAY_DEFAULTS,
    id: 'stay-08',
    slug: 'stay-unit-08',
    name: 'Stay Unit 08',
    availabilityStatus: 'Details being finalized',
    inquirySubject: `${SUBJECTS.stays} — Stay Unit 08`,
    featured: false,
    publicVisible: true,
  },

  // Non-stay categories exist in the model from day one so the future
  // /rentals and /manage inventory pages are a data change, not a redesign.
  // Kept private in Phase 1 — no fake public listings.
  {
    id: 'rental-example-01',
    slug: 'rental-home-example',
    name: 'Rental Home — Private Inventory',
    category: 'rental',
    propertyType: 'Single-family rental',
    neighborhood: 'Details being finalized',
    city: 'Houston area',
    state: 'TX',
    availabilityStatus: 'Private inventory',
    managementStatus: 'Managed',
    bestUseCase: 'Long-term rental home',
    featured: false,
    publicVisible: false,
    inquirySubject: SUBJECTS.rentalManagement,
    tags: ['Long-term'],
    publicNotes: 'Placeholder shape for future public rental previews.',
  },
  {
    id: 'managed-example-01',
    slug: 'managed-home-example',
    name: 'Managed Home — Private Inventory',
    category: 'managed',
    propertyType: 'Managed property',
    neighborhood: 'Details being finalized',
    city: 'Houston area',
    state: 'TX',
    availabilityStatus: 'Owner-managed',
    managementStatus: 'Under management',
    bestUseCase: 'Owner-client managed property',
    featured: false,
    publicVisible: false,
    inquirySubject: SUBJECTS.ownerIntro,
    tags: ['Management'],
    publicNotes: 'Placeholder shape for future managed-property records.',
  },
];

// Derived views — components consume these, never the raw array shape.
export const FEATURED_STAYS = PROPERTIES.filter(
  (p) => p.category === 'stay' && p.publicVisible && p.featured
);

export const STAY_COUNT = PROPERTIES.filter(
  (p) => p.category === 'stay' && p.publicVisible
).length;
