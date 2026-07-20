import type { Listing } from './listings';
import { TULIP_OAK_LISTING } from './listings';

export const SITE_ORIGIN = 'https://www.jwillsoldit.com';

export interface PageSeo {
  outputPath: string;
  title: string;
  description: string;
  canonical: string;
  image: string;
  jsonLd?: Record<string, unknown>;
  jsonLdId?: string;
}

export function getListingSeo(listing: Listing): PageSeo {
  const bathCount = listing.fullBathrooms + listing.halfBathrooms * 0.5;
  const description = `${listing.addressLine} in ${listing.city}, ${listing.state} ${listing.zip} is a ${listing.bedrooms}-bedroom, ${bathCount}-bath rental with ${listing.squareFeet.toLocaleString()} square feet, a first-floor primary suite, open living spaces, and washer/dryer included.`;
  const canonical = `${SITE_ORIGIN}${listing.path}`;
  const title = `${listing.addressLine}, ${listing.city} ${listing.state} ${listing.zip} | For Rent ${listing.priceLabel.replace(' / month', '/mo')} | JWILLSOLDIT`;
  const image = `${SITE_ORIGIN}${listing.heroImage.src}`;

  return {
    outputPath: `${listing.path.replace(/^\//, '')}index.html`,
    title,
    description,
    canonical,
    image,
    jsonLdId: 'listing-jsonld',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'RealEstateListing',
      name: `${listing.addressLine}, ${listing.city}, ${listing.state} ${listing.zip}`,
      url: canonical,
      image: [image],
      description,
      numberOfBedrooms: listing.bedrooms,
      numberOfBathroomsTotal: bathCount,
      floorSize: {
        '@type': 'QuantitativeValue',
        value: listing.squareFeet,
        unitCode: 'FTK',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: listing.addressLine,
        addressLocality: listing.city,
        addressRegion: listing.state,
        postalCode: listing.zip,
        addressCountry: 'US',
      },
      offers: {
        '@type': 'Offer',
        price: listing.price,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: canonical,
      },
    },
  };
}

export const LISTINGS_INDEX_SEO: PageSeo = {
  outputPath: 'listings/index.html',
  title: 'JWILLSOLDIT Listings | Texas, Handled',
  description: 'Current JWILLSOLDIT property listings, including rental homes presented locally with direct inquiry routes.',
  canonical: `${SITE_ORIGIN}/listings/`,
  image: `${SITE_ORIGIN}/assets/og-hub-v1.png`,
  jsonLdId: 'page-jsonld',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'JWILLSOLDIT Listings',
    url: `${SITE_ORIGIN}/listings/`,
    description: 'Current JWILLSOLDIT property listings, including rental homes presented locally with direct inquiry routes.',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: 1,
      itemListElement: [{
        '@type': 'ListItem',
        position: 1,
        url: `${SITE_ORIGIN}${TULIP_OAK_LISTING.path}`,
      }],
    },
  },
};

export const RENTAL_INDEX_SEO: PageSeo = {
  outputPath: 'listings/rentals/index.html',
  title: 'Houston Rental Listings | JWILLSOLDIT',
  description: 'Current JWILLSOLDIT rental listings in Houston, presented locally with verified property details and a direct rental inquiry route.',
  canonical: `${SITE_ORIGIN}/listings/rentals/`,
  image: `${SITE_ORIGIN}${TULIP_OAK_LISTING.heroImage.src}`,
  jsonLdId: 'page-jsonld',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Houston Rental Listings',
    url: `${SITE_ORIGIN}/listings/rentals/`,
    description: 'Current JWILLSOLDIT rental listings in Houston, presented locally with verified property details and a direct rental inquiry route.',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: 1,
      itemListElement: [{
        '@type': 'ListItem',
        position: 1,
        url: `${SITE_ORIGIN}${TULIP_OAK_LISTING.path}`,
      }],
    },
  },
};

export const RENTAL_SERVICES_SEO: PageSeo = {
  outputPath: 'rentals/index.html',
  title: 'Houston Rental Help for Renters and Owners | JWILLSOLDIT',
  description: 'JWILLSOLDIT helps Houston renters find the right lease and rental owners coordinate leasing, upkeep, turnovers, and follow-up.',
  canonical: `${SITE_ORIGIN}/rentals/`,
  image: `${SITE_ORIGIN}/assets/og-hub-v1.png`,
  jsonLdId: 'page-jsonld',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Houston Rental Help for Renters and Owners',
    url: `${SITE_ORIGIN}/rentals/`,
    description: 'JWILLSOLDIT helps Houston renters find the right lease and rental owners coordinate leasing, upkeep, turnovers, and follow-up.',
  },
};

export const LISTING_SEO_PAGES = [
  RENTAL_SERVICES_SEO,
  LISTINGS_INDEX_SEO,
  RENTAL_INDEX_SEO,
  getListingSeo(TULIP_OAK_LISTING),
];
