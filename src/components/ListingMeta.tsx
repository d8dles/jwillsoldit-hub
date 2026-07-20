import { useEffect } from 'react';
import type { Listing } from '../data/listings';

const SITE_ORIGIN = 'https://www.jwillsoldit.com';

interface ListingMetaProps {
  listing: Listing;
}

function upsertMeta(
  attribute: 'name' | 'property',
  value: string,
  content: string,
  touched: Array<{ node: HTMLMetaElement; original: string | null }>
) {
  const selector = `meta[${attribute}="${value}"]`;
  let node = document.head.querySelector<HTMLMetaElement>(selector);
  if (!node) {
    node = document.createElement('meta');
    node.setAttribute(attribute, value);
    document.head.appendChild(node);
    touched.push({ node, original: null });
  } else {
    touched.push({ node, original: node.getAttribute('content') });
  }
  node.setAttribute('content', content);
}

export function ListingMeta({ listing }: ListingMetaProps) {
  useEffect(() => {
    const originalTitle = document.title;
    const canonical = `${SITE_ORIGIN}${listing.path}`;
    const description =
      '4231 Tulip Oak Dr in Houston, TX 77068 is a 4-bedroom, 2.5-bath rental with 2,362 square feet, a first-floor primary suite, open living spaces, and washer/dryer included.';
    const touched: Array<{ node: HTMLMetaElement; original: string | null }> = [];
    const originalCanonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    const originalCanonicalHref = originalCanonical?.getAttribute('href') ?? null;

    document.title =
      '4231 Tulip Oak Dr, Houston TX 77068 | For Rent $2,300/mo | JWILLSOLDIT';

    upsertMeta('name', 'description', description, touched);
    upsertMeta('property', 'og:type', 'website', touched);
    upsertMeta('property', 'og:title', document.title, touched);
    upsertMeta('property', 'og:description', description, touched);
    upsertMeta('property', 'og:url', canonical, touched);
    upsertMeta(
      'property',
      'og:image',
      `${SITE_ORIGIN}${listing.heroImage.src}`,
      touched
    );
    upsertMeta('name', 'twitter:card', 'summary_large_image', touched);
    upsertMeta('name', 'twitter:title', document.title, touched);
    upsertMeta('name', 'twitter:description', description, touched);
    upsertMeta(
      'name',
      'twitter:image',
      `${SITE_ORIGIN}${listing.heroImage.src}`,
      touched
    );

    const canonicalNode = originalCanonical ?? document.createElement('link');
    if (!originalCanonical) {
      canonicalNode.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalNode);
    }
    canonicalNode.setAttribute('href', canonical);

    const jsonLd = document.createElement('script');
    jsonLd.id = 'listing-jsonld';
    jsonLd.type = 'application/ld+json';
    jsonLd.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'RealEstateListing',
      name: `${listing.addressLine}, ${listing.city}, ${listing.state} ${listing.zip}`,
      url: canonical,
      image: [`${SITE_ORIGIN}${listing.heroImage.src}`],
      description,
      numberOfBedrooms: listing.bedrooms,
      numberOfBathroomsTotal: listing.fullBathrooms + listing.halfBathrooms,
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
    });

    document.head.querySelector('#listing-jsonld')?.remove();
    document.head.appendChild(jsonLd);

    return () => {
      document.title = originalTitle;
      touched.forEach(({ node, original }) => {
        if (original === null) node.remove();
        else node.setAttribute('content', original);
      });
      if (originalCanonical) {
        if (originalCanonicalHref === null) originalCanonical.removeAttribute('href');
        else originalCanonical.setAttribute('href', originalCanonicalHref);
      } else {
        canonicalNode.remove();
      }
      jsonLd.remove();
    };
  }, [listing]);

  return null;
}
