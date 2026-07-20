export type OfferingType = 'sale' | 'rental' | 'stay';

export type PublicStatus =
  | 'draft'
  | 'coming_soon'
  | 'available'
  | 'pending'
  | 'rented'
  | 'booked'
  | 'sold'
  | 'off_market';

export type RentalMode = 'long_term' | 'mid_term' | 'short_term';

export interface PublicInventoryState {
  id: string;
  slug: string;
  publicPath: string;
  offeringType: OfferingType;
  rentalMode: RentalMode | null;
  publicStatus: PublicStatus;
  updatedAt: string;
}

export interface PublicInventoryResponse {
  success: boolean;
  inventoryConfigured: boolean;
  inventory: PublicInventoryState[];
}

export const STATUS_LABELS: Record<PublicStatus, string> = {
  draft: 'Draft',
  coming_soon: 'Coming soon',
  available: 'Available',
  pending: 'Pending',
  rented: 'Rented',
  booked: 'Booked',
  sold: 'Sold',
  off_market: 'Off market',
};

export const PUBLIC_STATUS_FILTERS: PublicStatus[] = [
  'available',
  'coming_soon',
  'pending',
  'rented',
  'booked',
  'sold',
];
