import type { ProofTile } from './types';
import { STAY_COUNT } from './properties';

// Trust/status tiles. REAL FACTS ONLY — no invented stats, no fake reviews,
// no made-up transaction counts. Derived numbers come from data, so this
// never hardcodes "8 units forever".

export const PROOF: ProofTile[] = [
  {
    id: 'market',
    label: 'HOME MARKET',
    value: 'Houston, TX',
    detail: 'Greater Houston coverage',
  },
  {
    id: 'stays',
    label: 'FURNISHED STAYS',
    value: String(STAY_COUNT).padStart(2, '0'),
    detail: 'Short-term to monthly · growing',
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
