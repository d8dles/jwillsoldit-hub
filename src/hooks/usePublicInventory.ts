import { useEffect, useMemo, useState } from 'react';
import type { Listing } from '../data/listings';
import { toListingCardModel } from '../data/publicInventory';
import { fetchPublicInventory } from '../utils/inventoryApi';
import type { PublicInventoryRecord } from '../data/publicInventory';

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
    return remoteRecords.inventory.map(toListingCardModel);
  }, [initialListings, remoteRecords]);

  return { listings, remoteLoaded: remoteRecords !== null };
}

export function usePublicInventoryRecord(slug: string) {
  const [state, setState] = useState<{
    loaded: boolean;
    backendConfigured: boolean;
    record: PublicInventoryRecord | null;
  }>({ loaded: false, backendConfigured: false, record: null });

  useEffect(() => {
    let active = true;
    fetchPublicInventory().then((data) => {
      if (!active) return;
      const backendConfigured = Boolean(data && (data.inventoryConfigured || data.inventory.length > 0));
      setState({
        loaded: true,
        backendConfigured,
        record: backendConfigured ? data?.inventory.find((record) => record.slug === slug) || null : null,
      });
    });
    return () => { active = false; };
  }, [slug]);

  return state;
}
