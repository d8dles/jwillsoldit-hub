// Shared content types for the JWILLSOLDIT hub.
// These shapes are intentionally close to a future Supabase schema —
// keep fields flat and typed so migration is a mapping, not a redesign.

export type RouteActionType = 'smart_move' | 'anchor' | 'contact';

export interface IntentRoute {
  id: string;
  number: string; // "01".."07" — mono display index
  label: string;
  shortTitle: string;
  description: string;
  audience: string; // who this lane is for, in their words
  href: string;
  actionType: RouteActionType;
  intentParam?: string;
  featured: boolean;
}

export type PropertyCategory = 'stay' | 'rental' | 'managed' | 'owner-lead';

export type AvailabilityStatus =
  | 'Available by inquiry'
  | 'Coming soon'
  | 'Managed stay'
  | 'Owner-managed'
  | 'Private inventory'
  | 'Details being finalized';

export interface Property {
  id: string;
  slug: string;
  name: string;
  category: PropertyCategory;
  propertyType: string;
  neighborhood: string;
  city: string;
  state: string;
  bedrooms?: number;
  bathrooms?: number;
  sleeps?: number;
  rentRange?: string; // never invented — only set from a real quote path
  availabilityStatus: AvailabilityStatus;
  managementStatus?: string;
  bestUseCase: string; // describes the PROPERTY, never the people (fair housing)
  featured: boolean;
  publicVisible: boolean;
  imageUrl?: string;
  imageAlt?: string;
  inquirySubject: string;
  tags: string[];
  publicNotes: string;
  // NOTE: this file ships in the public JS bundle. Nothing sensitive here —
  // only what you'd print on a flyer. Real internal ops data belongs in the
  // future private backend, never in src/data/.
  internalFutureNotes?: string;
}

export type ServiceCategory = 'move' | 'stay' | 'manage' | 'invest' | 'rental';

export interface Service {
  id: string;
  category: ServiceCategory;
  serviceName: string;
  audience: string;
  problem: string;
  deliverable: string;
  outcome: string;
  ctaLabel: string;
  href: string;
  featured: boolean;
  status: 'active' | 'expanding';
}

export interface ProofTile {
  id: string;
  label: string; // mono micro-label
  value: string; // real facts only — no invented stats
  detail?: string;
}
