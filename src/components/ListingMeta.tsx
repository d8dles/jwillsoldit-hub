import { useMemo } from 'react';
import type { Listing } from '../data/listings';
import { getListingSeo } from '../data/seo';
import { PageMeta } from './PageMeta';

interface ListingMetaProps {
  listing: Listing;
}

export function ListingMeta({ listing }: ListingMetaProps) {
  const seo = useMemo(() => getListingSeo(listing), [listing]);
  return <PageMeta seo={seo} jsonLdId="listing-jsonld" />;
}
