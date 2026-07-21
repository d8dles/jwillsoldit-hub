import type { PublicInventoryRecord } from '../data/publicInventory';
import type { PublicInventoryResponse } from '../data/inventory';

const API_ORIGIN = import.meta.env.VITE_INVENTORY_API_ORIGIN || 'https://move.jwillsoldit.com';
const REQUEST_TIMEOUT_MS = 4000;

export async function fetchPublicInventory(): Promise<PublicInventoryResponse | null> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_ORIGIN.replace(/\/$/, '')}/api/inventory`, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    if (!response.ok) return null;
    const data = await response.json() as PublicInventoryResponse;
    if (!data || data.success !== true || !Array.isArray(data.inventory)) return null;
    return data;
  } catch {
    return null;
  } finally {
    window.clearTimeout(timeout);
  }
}

export async function fetchPublicInventoryRecord(slug: string): Promise<PublicInventoryRecord | null> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const query = new URLSearchParams({ slug });

  try {
    const response = await fetch(`${API_ORIGIN.replace(/\/$/, '')}/api/inventory?${query.toString()}`, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    if (!response.ok) return null;
    const data = await response.json() as PublicInventoryResponse;
    if (!data || data.success !== true || !Array.isArray(data.inventory)) return null;
    return data.inventory.find((record) => record.slug === slug) || null;
  } catch {
    return null;
  } finally {
    window.clearTimeout(timeout);
  }
}
