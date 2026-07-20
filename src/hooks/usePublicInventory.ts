import { useEffect, useMemo, useState } from 'react';
import type { Listing } from '../data/listings';
import { STATUS_LABELS } from '../data/inventory';
import { fetchPublicInventory } from '../utils/inventoryApi';

export function usePublicInventory(initialListings: Listing[]) {
  const [remoteRecords, setRemoteRecords] = useState<Awaited<ReturnType<typeof fetchPublicInventory>>>(null);

  useEffect(() => {
    let active = true;
    fetchPublicInventory().then((data) => {
      if (active && data && (data.inventoryConfigured || data.inventory.length > 0)) setRemoteRecords(data);
    });
    return () => { active = false; };
  }, []);

  const listings = useMemo(() => {
    if (!remoteRecords) return initialListings;
    const recordsBySlug = new Map(remoteRecords.inventory.map((record) => [record.slug, record]));
    return initialListings
      .filter((listing) => recordsBySlug.has(listing.inventorySlug))
      .map((listing) => {
        const record = recordsBySlug.get(listing.inventorySlug);
        if (!record) return listing;
        return { ...listing, status: record.publicStatus, statusLabel: STATUS_LABELS[record.publicStatus] };
      });
  }, [initialListings, remoteRecords]);

  return { listings, remoteLoaded: remoteRecords !== null };
}
