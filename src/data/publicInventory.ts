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

interface PublicInventoryState {
  id: string;
  slug: string;
  publicPath: string;
  offeringType: OfferingType;
  rentalMode: RentalMode | null;
  publicStatus: PublicStatus;
  updatedAt: string;
}

interface ListingPhoto {
  src: string;
  alt: string;
  srcSet?: string;
}

const STATUS_LABELS: Record<PublicStatus, string> = {
  draft: 'Draft',
  coming_soon: 'Coming soon',
  available: 'Available',
  pending: 'Pending',
  rented: 'Rented',
  booked: 'Booked',
  sold: 'Sold',
  off_market: 'Off market',
};

export interface PublicInventoryImage {
  src: string;
  alt: string;
  srcSet?: string;
}

export interface PublicInventoryLink {
  label: string;
  url: string;
}

export interface PublicInventoryPropertyDetails {
  lotSquareFeet?: number;
  yearBuilt?: number;
  stories?: number;
  garage?: string;
  fullBathrooms?: number;
  halfBathrooms?: number;
  [key: string]: unknown;
}

export interface PublicInventoryRecord extends PublicInventoryState {
  title: string;
  addressLine: string;
  city: string;
  state: string;
  zip: string;
  neighborhood: string;
  price: number | null;
  priceLabel: string;
  pricePeriod: string;
  bedrooms: number | null;
  bathrooms: number | null;
  squareFeet: number | null;
  description: string;
  features: string[];
  heroImageUrl?: string;
  galleryUrls?: string[];
  heroImage?: PublicInventoryImage | null;
  gallery?: PublicInventoryImage[];
  propertyDetails?: PublicInventoryPropertyDetails;
  inquiryUrl: string;
  sourceLinks?: PublicInventoryLink[];
  stayDetails?: Record<string, unknown> | null;
}

export interface PropertyPageStat {
  value: string;
  label: string;
}

export interface PropertyPageDetail {
  label: string;
  value: string;
}

export interface PropertyPageModel {
  title: string;
  heading: string;
  addressLine: string;
  location: string;
  priceLabel: string;
  statusLabel: string;
  offeringLabel: string;
  stats: PropertyPageStat[];
  description: string;
  features: string[];
  details: PropertyPageDetail[];
  heroImage: ListingPhoto | null;
  gallery: ListingPhoto[];
  sourceLinks: PublicInventoryLink[];
  inquiryUrl: string;
  publicPath: string;
  offeringType: OfferingType;
  rentalMode: RentalMode | null;
}

function finiteNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function formatNumber(value: number | null): string {
  return value === null ? '—' : value.toLocaleString();
}

function formatBathrooms(record: PublicInventoryRecord): string {
  const details = record.propertyDetails || {};
  const full = finiteNumber(details.fullBathrooms);
  const half = finiteNumber(details.halfBathrooms);
  if (full !== null && half !== null) return `${full} full + ${half} half`;
  if (record.bathrooms !== null && Number.isFinite(record.bathrooms)) return String(record.bathrooms);
  return '—';
}

function imageFrom(value: PublicInventoryImage | null | undefined, fallbackAlt: string): ListingPhoto | null {
  if (!value?.src) return null;
  return { src: value.src, alt: value.alt || fallbackAlt, ...(value.srcSet ? { srcSet: value.srcSet } : {}) };
}

function offeringLabel(record: PublicInventoryRecord): string {
  if (record.offeringType === 'sale') return 'For sale';
  if (record.offeringType === 'stay') {
    return record.rentalMode === 'short_term' ? 'Short-term stay' : 'Stay';
  }
  if (record.rentalMode === 'mid_term') return 'Mid-term rental';
  if (record.rentalMode === 'short_term') return 'Short-term rental';
  return 'Long-term rental';
}

function detailRows(record: PublicInventoryRecord): PropertyPageDetail[] {
  const details = record.propertyDetails || {};
  const rows: PropertyPageDetail[] = [
    {
      label: 'Property type',
      value: record.offeringType === 'sale' ? 'Single-family home' : record.offeringType === 'stay' ? 'Furnished stay' : 'Single-family rental',
    },
  ];
  const lotSquareFeet = finiteNumber(details.lotSquareFeet);
  const yearBuilt = finiteNumber(details.yearBuilt);
  const stories = finiteNumber(details.stories);
  const garage = typeof details.garage === 'string' ? details.garage.trim() : '';
  if (lotSquareFeet !== null) rows.push({ label: 'Lot size', value: `${formatNumber(lotSquareFeet)} sq ft` });
  if (yearBuilt !== null) rows.push({ label: 'Year built', value: String(yearBuilt) });
  if (stories !== null) rows.push({ label: 'Stories', value: String(stories) });
  if (garage) rows.push({ label: 'Garage', value: garage });
  if (record.offeringType === 'rental') {
    rows.push({ label: 'Lease route', value: `${record.rentalMode === 'mid_term' ? 'Mid-term' : record.rentalMode === 'short_term' ? 'Short-term' : 'Long-term'} rental inquiry` });
  } else if (record.offeringType === 'stay') {
    rows.push({ label: 'Stay route', value: 'Direct stay inquiry' });
  } else {
    rows.push({ label: 'Purchase route', value: 'Direct purchase inquiry' });
  }
  return rows;
}

export function toPropertyPageModel(record: PublicInventoryRecord): PropertyPageModel {
  const fallbackAlt = record.title || record.addressLine || 'JWILLSOLDIT property';
  const heroImage = imageFrom(record.heroImage, fallbackAlt)
    || (record.heroImageUrl ? { src: record.heroImageUrl, alt: fallbackAlt } : null);
  const gallery = (record.gallery || []).map((image) => imageFrom(image, fallbackAlt)).filter((image): image is ListingPhoto => image !== null);
  const completeGallery = gallery.length > 0 ? gallery : heroImage ? [heroImage] : [];
  const label = offeringLabel(record);
  const title = record.addressLine ? `${record.addressLine}, ${record.city} ${record.state} ${record.zip}` : fallbackAlt;

  return {
    title,
    heading: record.title || record.addressLine || 'Property details',
    addressLine: record.addressLine || record.title || 'Property details',
    location: [record.neighborhood, record.city ? `${record.city}, ${[record.state, record.zip].filter(Boolean).join(' ')}` : [record.state, record.zip].filter(Boolean).join(' ')].filter(Boolean).join(' · '),
    priceLabel: record.priceLabel || (record.price === null ? 'Contact for pricing' : `$${record.price.toLocaleString()}`),
    statusLabel: STATUS_LABELS[record.publicStatus as PublicStatus] || record.publicStatus,
    offeringLabel: label,
    stats: [
      { value: formatNumber(record.bedrooms), label: 'beds' },
      { value: formatBathrooms(record), label: 'baths' },
      { value: formatNumber(record.squareFeet), label: 'sq ft' },
    ],
    description: record.description || 'Property details are being prepared by JWILLSOLDIT.',
    features: record.features || [],
    details: detailRows(record),
    heroImage,
    gallery: completeGallery,
    sourceLinks: record.sourceLinks || [],
    inquiryUrl: record.inquiryUrl || '#contact',
    publicPath: record.publicPath,
    offeringType: record.offeringType,
    rentalMode: record.rentalMode,
  };
}

export interface ListingInventorySource {
  id: string;
  inventorySlug: string;
  path: string;
  category: 'rental' | 'sale' | 'stay';
  status: PublicStatus;
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
  heroImage: PublicInventoryImage;
  gallery: PublicInventoryImage[];
  mlsLabel: string;
  mlsNumber: string;
  mlsUrl: string;
  inquiryUrl: string;
}

export function listingToInventoryRecord(listing: ListingInventorySource): PublicInventoryRecord {
  return {
    id: listing.id,
    slug: listing.inventorySlug,
    publicPath: listing.path,
    offeringType: listing.category,
    rentalMode: listing.category === 'rental' ? 'long_term' : null,
    publicStatus: listing.status,
    updatedAt: new Date(0).toISOString(),
    title: listing.category === 'rental' ? 'Room to land, room to live.' : listing.addressLine,
    addressLine: listing.addressLine,
    city: listing.city,
    state: listing.state,
    zip: listing.zip,
    neighborhood: listing.neighborhood,
    price: listing.price,
    priceLabel: listing.priceLabel,
    pricePeriod: listing.category === 'rental' ? 'month' : '',
    bedrooms: listing.bedrooms,
    bathrooms: listing.fullBathrooms + listing.halfBathrooms * 0.5,
    squareFeet: listing.squareFeet,
    description: listing.description,
    features: listing.features,
    heroImage: listing.heroImage,
    gallery: listing.gallery,
    propertyDetails: {
      lotSquareFeet: listing.lotSquareFeet,
      yearBuilt: listing.yearBuilt,
      stories: listing.stories,
      garage: listing.garage,
      fullBathrooms: listing.fullBathrooms,
      halfBathrooms: listing.halfBathrooms,
    },
    inquiryUrl: listing.inquiryUrl,
    sourceLinks: listing.mlsUrl ? [{ label: `${listing.mlsLabel} #${listing.mlsNumber}`, url: listing.mlsUrl }] : [],
  };
}

export interface InventoryCardModel {
  id: string;
  slug: string;
  inventorySlug: string;
  path: string;
  category: 'rental' | 'sale' | 'stay';
  status: PublicStatus;
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
  heroImage: ListingPhoto;
}

export function toListingCardModel(record: PublicInventoryRecord): InventoryCardModel {
  const fallbackAlt = record.title || record.addressLine || 'JWILLSOLDIT property';
  const heroImage = imageFrom(record.heroImage, fallbackAlt)
    || (record.heroImageUrl ? { src: record.heroImageUrl, alt: fallbackAlt } : null)
    || imageFrom(record.gallery?.[0], fallbackAlt)
    || { src: '/assets/og-hub-v1.png', alt: fallbackAlt };
  const details = record.propertyDetails || {};
  const fullBathrooms = finiteNumber(details.fullBathrooms);
  const halfBathrooms = finiteNumber(details.halfBathrooms);
  const bathrooms = finiteNumber(record.bathrooms);
  const wholeBathrooms = fullBathrooms ?? (bathrooms === null ? 0 : Math.floor(bathrooms));
  const fractionalBathrooms = halfBathrooms ?? (bathrooms !== null && bathrooms % 1 ? 1 : 0);

  return {
    id: record.id,
    slug: record.slug,
    inventorySlug: record.slug,
    path: record.publicPath,
    category: record.offeringType,
    status: record.publicStatus,
    statusLabel: STATUS_LABELS[record.publicStatus] || record.publicStatus,
    addressLine: record.addressLine,
    city: record.city,
    state: record.state,
    zip: record.zip,
    neighborhood: record.neighborhood,
    price: record.price || 0,
    priceLabel: record.priceLabel || 'Contact for pricing',
    bedrooms: record.bedrooms || 0,
    fullBathrooms: wholeBathrooms,
    halfBathrooms: fractionalBathrooms,
    squareFeet: record.squareFeet || 0,
    heroImage,
  };
}
