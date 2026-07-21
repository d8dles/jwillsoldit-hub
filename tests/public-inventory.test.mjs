import assert from 'node:assert/strict';
import test from 'node:test';
import { listingToInventoryRecord, toPropertyPageModel } from '../src/data/publicInventory.ts';

test('maps a public inventory record into the shared property page model', () => {
  const model = toPropertyPageModel({
    id: 'rental-4231-tulip-oak-dr',
    slug: '4231-tulip-oak-dr',
    publicPath: '/listings/rentals/4231-tulip-oak-dr/',
    offeringType: 'rental',
    rentalMode: 'long_term',
    publicStatus: 'available',
    updatedAt: '2026-07-20T12:00:00.000Z',
    title: 'Room to land, room to live.',
    addressLine: '4231 Tulip Oak Dr',
    city: 'Houston',
    state: 'TX',
    zip: '77068',
    neighborhood: 'Stuebner Hollow',
    price: 2300,
    priceLabel: '$2,300 / month',
    pricePeriod: 'month',
    bedrooms: 4,
    bathrooms: 2.5,
    squareFeet: 2362,
    description: 'A newer two-story home with open living spaces.',
    features: ['First-floor primary suite', 'Private rear yard'],
    heroImage: { src: '/hero.jpg', alt: 'Front exterior' },
    gallery: [{ src: '/hero.jpg', alt: 'Front exterior' }, { src: '/kitchen.jpg', alt: 'Kitchen' }],
    propertyDetails: {
      lotSquareFeet: 5176,
      yearBuilt: 2022,
      stories: 2,
      garage: '2-car attached garage',
      fullBathrooms: 2,
      halfBathrooms: 1,
    },
    sourceLinks: [{ label: 'Current MLS record', url: 'https://example.com/mls' }],
    inquiryUrl: 'https://move.jwillsoldit.com/forms/rent',
  });

  assert.equal(model.heading, 'Room to land, room to live.');
  assert.equal(model.location, 'Stuebner Hollow · Houston, TX 77068');
  assert.equal(model.statusLabel, 'Available');
  assert.deepEqual(model.stats, [
    { value: '4', label: 'beds' },
    { value: '2 full + 1 half', label: 'baths' },
    { value: '2,362', label: 'sq ft' },
  ]);
  assert.equal(model.heroImage.src, '/hero.jpg');
  assert.equal(model.gallery.length, 2);
  assert.deepEqual(model.details, [
    { label: 'Property type', value: 'Single-family rental' },
    { label: 'Lot size', value: '5,176 sq ft' },
    { label: 'Year built', value: '2022' },
    { label: 'Stories', value: '2' },
    { label: 'Garage', value: '2-car attached garage' },
    { label: 'Lease route', value: 'Long-term rental inquiry' },
  ]);
});

test('bridges a static listing into the same backend-shaped detail contract', () => {
  const listing = {
    id: 'rental-4231-tulip-oak-dr',
    inventorySlug: '4231-tulip-oak-dr',
    path: '/listings/rentals/4231-tulip-oak-dr/',
    category: 'rental',
    status: 'available',
    statusLabel: 'Available',
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
    description: 'A newer two-story home.',
    features: ['Open living area'],
    heroImage: { src: '/hero.jpg', alt: 'Front exterior' },
    gallery: Array.from({ length: 41 }, (_, index) => ({ src: `/photo-${index + 1}.jpg`, alt: `Photo ${index + 1}` })),
    mlsLabel: 'HAR MLS',
    mlsNumber: '7682952',
    mlsUrl: 'https://www.har.com/homedetail/4231-tulip-oak-dr-houston-tx-77068/15905311',
    inquiryUrl: 'https://move.jwillsoldit.com/?intent=rent',
  };

  const record = listingToInventoryRecord(listing);
  const model = toPropertyPageModel(record);
  assert.equal(record.publicPath, '/listings/rentals/4231-tulip-oak-dr/');
  assert.equal(model.gallery.length, 41);
  assert.equal(model.sourceLinks[0].url.includes('har.com'), true);
});
