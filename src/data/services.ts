import type { Service } from './types';
import { smartMoveLink } from '../utils/links';
import { CONTACT } from './contact';

// Service ledger. Deliverables must stay concrete and TRUE — if a deliverable
// changes operationally, change it here. Fair housing: audiences are defined
// by their housing situation, never by protected class.

export const SERVICES: Service[] = [
  // ── MANAGE ────────────────────────────────────────────────────────────────
  {
    id: 'ltr-management',
    category: 'manage',
    serviceName: 'Long-term rental management',
    audience: 'Owners of rental homes in Greater Houston',
    problem: "You own the home but do not want every detail landing on you.",
    deliverable:
      'I help market the home, coordinate screening and lease paperwork, keep up with rent collection, and make sure maintenance questions do not sit unanswered.',
    outcome: 'You stay informed without running every detail.',
    ctaLabel: 'Talk about your rental',
    href: '/contact#owner-intro',
    featured: true,
    status: 'active',
  },
  {
    id: 'str-operations',
    category: 'manage',
    serviceName: 'Short-term rental & furnished-stay coordination',
    audience: 'Short-term rental owners',
    problem: 'Listings, guests, cleaning schedules, and pricing decisions never stop.',
    deliverable:
      'I help keep the listing, guest messages, cleaning, and restocking organized with trusted local service partners.',
    outcome: 'The stay is prepared, looked after, and ready for the next guest.',
    ctaLabel: 'View on Airbnb',
    href: CONTACT.airbnbHostUrl,
    featured: true,
    status: 'active',
  },
  {
    id: 'maintenance-vendors',
    category: 'manage',
    serviceName: 'Maintenance & vendor coordination',
    audience: 'Owners with occupied or listed properties',
    problem: 'Small issues become expensive when nobody owns the follow-up.',
    deliverable:
      'Vendor coordination and property follow-up. Quotes, scheduling, completion checks, and documentation, so nothing is left hanging.',
    outcome: 'Problems get fixed once, on record.',
    ctaLabel: 'Ask about coverage',
    href: '/contact#management',
    featured: true,
    status: 'active',
    starterChecklist: [
      'Property address, occupancy, and the issue you need handled',
      'Photos, access instructions, warranty information, and any vendor history',
      'Your approval limit and whether you want estimates before work begins',
      'The person responsible for tenant or guest scheduling',
      'How you want completion photos, receipts, and follow-up documented',
    ],
  },
  {
    id: 'turnovers',
    category: 'manage',
    serviceName: 'Turnovers & make-ready',
    audience: 'Owners between tenants or guests',
    problem: 'An empty home costs money, and the work between occupants adds up quickly.',
    deliverable:
      'I coordinate the walk-through, cleaning, repairs, and final check so the property is ready for the next resident or guest.',
    outcome: 'A cleaner handoff and less time sitting empty.',
    ctaLabel: 'Plan a turnover',
    href: '/contact#management',
    featured: true,
    status: 'active',
    starterChecklist: [
      'Move-out or checkout date and the next target move-in date',
      'A condition walk-through with photos and a written punch list',
      'Cleaning, paint, repairs, locks, landscaping, utilities, and safety checks',
      'Furniture, linen, supply, or appliance replacements when applicable',
      'Final inspection, listing photos, keys, and readiness to show or host',
    ],
  },
  {
    id: 'owner-reporting',
    category: 'manage',
    serviceName: 'Owner updates & reporting',
    audience: 'Owners who want visibility without micromanaging',
    problem: "You shouldn't have to ask how your property is doing.",
    deliverable:
      'Clear updates on income, expenses, open issues, and what happens next.',
    outcome: 'You always know where your property stands.',
    ctaLabel: 'See what reporting covers',
    href: '/contact#owner-intro',
    featured: true,
    status: 'active',
  },

  // ── STAY ──────────────────────────────────────────────────────────────────
  {
    id: 'furnished-stays',
    category: 'stay',
    serviceName: 'Furnished / corporate / monthly stays',
    audience: 'Guests who need weeks or months, not a lease',
    problem: 'Hotels are burnout; twelve-month leases are overkill.',
    deliverable:
      'Operated furnished units with flexible terms. Ask and I will confirm what is available.',
    outcome: 'A real place to live, on your timeline.',
    ctaLabel: 'View furnished stays',
    href: CONTACT.airbnbHostUrl,
    featured: true,
    status: 'active',
  },

  // ── RENTAL ────────────────────────────────────────────────────────────────
  {
    id: 'rental-help',
    category: 'rental',
    serviceName: 'Rental search help',
    audience: 'Renters in Greater Houston',
    problem: 'Rental searching alone means guessing at areas, terms, and timing.',
    deliverable:
      'Tell me your budget, timing, preferred areas, and must-haves. I will help narrow the search before you tour.',
    outcome: 'You spend your time on rentals that make sense for you.',
    ctaLabel: 'Tell me what you need',
    href: smartMoveLink('rent'),
    featured: true,
    status: 'active',
  },

  // ── MOVE ──────────────────────────────────────────────────────────────────
  {
    id: 'buyer-guidance',
    category: 'move',
    serviceName: 'Buyer guidance',
    audience: 'First-time and repeat buyers',
    problem: 'Buying without a strategy costs money at every step.',
    deliverable:
      'I help you compare areas and homes, prepare the offer, track inspections and deadlines, and stay on top of the details through closing.',
    outcome: 'You buy with a plan, not on impulse.',
    ctaLabel: 'Tell me what you want to buy',
    href: smartMoveLink('buy'),
    featured: true,
    status: 'active',
  },
  {
    id: 'seller-strategy',
    category: 'move',
    serviceName: 'Seller / listing strategy',
    audience: 'Owners ready to sell, or sell and buy',
    problem: 'Mispriced or under-prepped listings leave money on the table.',
    deliverable:
      'I help you decide what to fix, what to leave alone, how to price the home, and how to prepare it for buyers.',
    outcome: 'You list with a clear plan and know what happens next.',
    ctaLabel: 'Talk through selling your home',
    href: smartMoveLink('sell'),
    featured: true,
    status: 'active',
  },
  {
    id: 'relocation',
    category: 'move',
    serviceName: 'Relocation guidance',
    audience: 'People moving to Houston from another city or country',
    problem: "You can't learn a 600-square-mile metro from listing photos.",
    deliverable:
      'We compare the places that fit your commute and daily life, then decide whether renting first or buying now makes more sense.',
    outcome: 'You choose an area with a clearer picture of how it will work day to day.',
    ctaLabel: 'Tell me about your move',
    href: smartMoveLink('relocate'),
    featured: true,
    status: 'active',
  },

  // ── INVEST ────────────────────────────────────────────────────────────────
  {
    id: 'investor-support',
    category: 'invest',
    serviceName: 'Investor & owner support',
    audience: 'Current and future rental / STR owners',
    problem: 'Buying and managing are often handled by different people, and important details can get missed between them.',
    deliverable:
      'Because I work with rentals after closing too, I can help you understand what a property may really require before you buy.',
    outcome: 'You make the decision with a clearer view of the ongoing work and cost.',
    ctaLabel: 'Ask about a property',
    href: '/contact#investor',
    featured: true,
    status: 'active',
  },
];

export const MANAGE_SERVICES = SERVICES.filter((s) => s.category === 'manage');
export const INVEST_SERVICES = SERVICES.filter((s) => s.category === 'invest');
