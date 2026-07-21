import type { Listing } from '../data/listings';
import { listingToInventoryRecord } from '../data/publicInventory';
import { PropertyListingDetailPage } from './PropertyListingDetailPage';

interface RentalListingDetailPageProps {
  listing: Listing;
}

// Compatibility wrapper for any existing imports while all routes use the shared property renderer.
export function RentalListingDetailPage({ listing }: RentalListingDetailPageProps) {
  return <PropertyListingDetailPage record={listingToInventoryRecord(listing)} />;
}
