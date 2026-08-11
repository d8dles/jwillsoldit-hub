import type { IntentRoute } from './types';
import { smartMoveLink } from '../utils/links';

// The Route Board. Consumer move intents route to Smart Move
// (the existing intake engine at move.jwillsoldit.com).
// Guest/owner intents anchor to sections on this page.
// `?intent=` params preselect the matching Smart Move route.

export const ROUTES: IntentRoute[] = [
  {
    id: 'rent',
    number: '01',
    label: 'Rent',
    shortTitle: 'Find the right lease',
    description:
      'Apartments, townhomes, and rental houses across Greater Houston. I help narrow them by budget, timing, and what you actually need before you spend a weekend touring.',
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
      'From the first search to the day you get the keys, I help you compare the areas and homes, write the offer, and stay ahead of inspections and closing.',
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
    shortTitle: 'Sell with a clear plan',
    description:
      'I help you decide what to prepare, how to price the home, and what to expect from listing through closing. If you are also buying, I help keep both timelines together.',
    audience: 'I am ready to sell or make a change',
    href: smartMoveLink('sell'),
    actionType: 'smart_move',
    intentParam: 'sell',
    featured: true,
  },
  {
    id: 'relocate',
    number: '04',
    label: 'Relocate',
    shortTitle: 'Find your place in Texas',
    description:
      'Moving to Texas from anywhere. We will compare the places that fit your work, routine, budget, and timing before you commit to an address.',
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
      'Furnished stays for weeks or months. Ask me what is currently available and whether the terms fit your stay.',
    audience: 'I need weeks or months, not a lease',
    href: '#stays',
    actionType: 'anchor',
    featured: true,
  },
  {
    id: 'own-manage',
    number: '06',
    label: 'Own & Manage',
    shortTitle: 'Help managing what you own',
    description:
      'Help with long-term rentals, furnished stays, turnovers, vendors, and clear owner updates.',
    audience: 'I own property',
    href: '#manage',
    actionType: 'anchor',
    featured: true,
  },
  {
    id: 'invest',
    number: '07',
    label: 'Invest',
    shortTitle: 'Understand what ownership takes',
    description:
      'I work with rentals after closing too, so I can help you understand what a property may really cost to own and maintain before you buy it.',
    audience: 'I am considering a rental property',
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
      'You do not need to have it all figured out. Tell me what is changing, and we will work out the next step together.',
    audience: "I don't know yet",
    href: smartMoveLink('not-sure'),
    actionType: 'smart_move',
    intentParam: 'not-sure',
    featured: false,
  },
];
