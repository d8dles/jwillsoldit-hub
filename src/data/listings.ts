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
  src: `/listings/4231-tulip-oak-dr/optimized/TP-${String(number).padStart(3, '0')}.jpg`,
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
