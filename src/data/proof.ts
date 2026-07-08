import type { ProofTile } from './types';

// Trust/status tiles. REAL FACTS ONLY — no invented stats, no fake reviews,
// no made-up transaction counts.

export const PROOF: ProofTile[] = [
  {
    id: 'market',
    label: 'HOME MARKET',
    value: 'Houston, TX',
    detail: 'Rooted here · serving Texas',
  },
  {
    id: 'brokerage',
    label: 'BROKERAGE',
    value: 'Christin Rachelle Group',
    detail: 'Joey Williams · REALTOR®',
  },
  {
    id: 'line',
    label: 'DIRECT CONTACT',
    value: 'Call or text',
    detail: 'Clear contact. Clear next steps.',
  },
];
