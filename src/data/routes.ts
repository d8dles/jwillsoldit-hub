import type { IntentRoute } from './types';
import { smartMoveLink } from '../utils/links';

// The Route Board. Consumer move intents route to Smart Move
// (the existing intake engine at move.jwillsoldit.com).
// Guest/owner intents anchor to sections on this page.
// `?intent=` params are inert today — forward compatibility only.

export const ROUTES: IntentRoute[] = [
  {
    id: 'rent',
    number: '01',
    label: 'Rent',
    shortTitle: 'Find the right lease',
    description:
      'Apartments, townhomes, and rental houses across Greater Houston — matched to your timeline and budget, not a listing dump.',
    audience: 'I need a place to rent',
    href: smartMoveLink('rent'),
    actionType: 'smart_move',
    intentParam: 'rent',
    featured: true,
  },
  {
    id: 'buy',
    number: '02',
    label: 'Buy',
    shortTitle: 'Own your next place',
    description:
      'From first search to keys — strategy, neighborhoods, offers, and closing, run with a plan.',
    audience: 'I want to buy',
    href: smartMoveLink('buy'),
    actionType: 'smart_move',
    intentParam: 'buy',
    featured: true,
  },
  {
    id: 'sell',
    number: '03',
    label: 'Sell',
    shortTitle: 'Exit on your terms',
    description:
      'Pricing, prep, and listing strategy built around your timeline — including sell-and-buy coordination.',
    audience: 'I own and want out (or up)',
    href: smartMoveLink('sell'),
    actionType: 'smart_move',
    intentParam: 'sell',
    featured: true,
  },
  {
    id: 'relocate',
    number: '04',
    label: 'Relocate',
    shortTitle: 'Land in Texas right',
    description:
      'Moving to Texas from anywhere — area orientation, timing, and a landing plan before you commit.',
    audience: "I'm new to Texas",
    href: smartMoveLink('relocate'),
    actionType: 'smart_move',
    intentParam: 'relocate',
    featured: true,
  },
  {
    id: 'stay',
    number: '05',
    label: 'Stay',
    shortTitle: 'Furnished, flexible, ready',
    description:
      'Short-term, corporate, and monthly furnished stays — professionally prepared, availability by inquiry.',
    audience: 'I need weeks or months, not a lease',
    href: '#stays',
    actionType: 'anchor',
    featured: true,
  },
  {
    id: 'own-manage',
    number: '06',
    label: 'Own & Manage',
    shortTitle: 'Property, run properly',
    description:
      'Long-term rental management, short-term rental coordination, turnovers, vendor follow-up, and owner updates — organized through JWILLSOLDIT.',
    audience: 'I own property',
    href: '#manage',
    actionType: 'anchor',
    featured: true,
  },
  {
    id: 'invest',
    number: '07',
    label: 'Invest',
    shortTitle: 'Buy what you can operate',
    description:
      'Acquisition guidance connected to real operating experience — what a property takes to run, before you buy it.',
    audience: 'I want property that performs',
    href: '#invest',
    actionType: 'anchor',
    featured: true,
  },
  {
    id: 'not-sure',
    number: '08',
    label: 'Not Sure',
    shortTitle: 'Start here, sort it out',
    description:
      'Not ready to pick a lane? Start anyway — a few questions and the right direction gets obvious.',
    audience: "I don't know yet",
    href: smartMoveLink('not-sure'),
    actionType: 'smart_move',
    intentParam: 'not-sure',
    featured: false,
  },
];
