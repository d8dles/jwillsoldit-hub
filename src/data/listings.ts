import { smartMoveLink } from '../utils/links';

export type ListingCategory = 'rental' | 'sale';
export type ListingStatus = 'active' | 'pending' | 'leased' | 'sold';

export interface ListingPhoto {
  src: string;
  alt: string;
  srcSet?: string;
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

const photo = (number: number, alt: string): ListingPhoto => {
  const file = `TP-${String(number).padStart(3, '0')}.jpg`;
  const basePath = '/listings/4231-tulip-oak-dr/optimized';

  return {
    src: `${basePath}/${file}`,
    alt,
    srcSet: [800, 1200, 1600]
      .map((width) => `${width === 1600 ? `${basePath}/${file}` : `${basePath}/${width}/${file}`} ${width}w`)
      .join(', '),
  };
};

const PHOTO_ALTS = [
  'Twilight front exterior of 4231 Tulip Oak Dr',
  'Daylight front exterior of 4231 Tulip Oak Dr',
  'Angled view of the front exterior and entry',
  'Front exterior with driveway and neighboring homes',
  'Covered front entry with brick detail and landscaping',
  'Entry foyer looking toward the open living area',
  'Ground-floor room with wood-look flooring and a window',
  'Open kitchen and living area viewed from the entry',
  'Kitchen with island, granite counters, and stainless appliances',
  'Kitchen island and stainless range wall',
  'Open living and dining area beside the kitchen',
  'Living area with windows, blinds, and wood-look flooring',
  'Wide view of the open living area and kitchen',
  'Living room with ceiling fan, windows, and rear door',
  'Open living area with kitchen and staircase',
  'Half bathroom with pedestal sink and toilet',
  'Carpeted bedroom with two windows',
  'Carpeted bedroom with window and interior doors',
  'Carpeted bedroom with windows and wall-mounted TV bracket',
  'Carpeted bedroom with window and doorway',
  'Carpeted bedroom with closet doors',
  'Carpeted bedroom with windows and wall-mounted TV bracket',
  'Upstairs carpeted room with windows and half wall',
  'Carpeted bedroom with window and closet doors',
  'Upstairs bedroom with carpet and closet doors',
  'Upstairs carpeted room with wall-mounted TV bracket',
  'Upstairs room with window and open doorway',
  'Upstairs carpeted room with windows and hallway',
  'Upstairs carpeted room with windows and closet',
  'Upstairs carpeted room with open doorway and windows',
  'Upstairs hallway overlooking the stairwell',
  'Carpeted bedroom with window and two doors',
  'Carpeted upstairs room with window and closet',
  'Carpeted upstairs room with windows and hallway',
  'Carpeted upstairs room with half wall and storage door',
  'Fenced rear yard and back exterior of the home',
  'Rear side door opening to the fenced yard',
  'Laundry nook with washer and dryer',
  'Close view of the washer and dryer',
  'Bathroom with vanity, mirror, and shower',
  'Bathroom with tub, shower, and vanity',
] as const;

const gallery = Array.from({ length: 41 }, (_, index) =>
  photo(index + 1, PHOTO_ALTS[index])
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
