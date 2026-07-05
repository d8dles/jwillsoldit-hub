import type { Service } from './types';
import { smartMoveLink, mailtoLink } from '../utils/links';
import { SUBJECTS } from './contact';

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
    problem: "You own the home but don't want to run the tenancy.",
    deliverable:
      'Full-service management coordination: marketing, tenant screening coordination, lease handling, rent collection, and responsive issue follow-up.',
    outcome: 'Your rental performs without living in your inbox.',
    ctaLabel: 'Request an owner intro',
    href: mailtoLink(SUBJECTS.ownerIntro),
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
      'End-to-end coordination: listing oversight, guest communication, and scheduled cleaning and restocking through trusted service partners.',
    outcome: 'A rental that runs like hospitality — consistent, prepared, and looked after.',
    ctaLabel: 'Talk short-term rentals',
    href: mailtoLink(SUBJECTS.ownerIntro),
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
      'Vendor coordination and property follow-up — quotes, scheduling, completion checks, and documentation, so nothing is left as a loose end.',
    outcome: 'Problems get fixed once, on record.',
    ctaLabel: 'Ask about coverage',
    href: mailtoLink(SUBJECTS.rentalManagement),
    featured: true,
    status: 'active',
  },
  {
    id: 'turnovers',
    category: 'manage',
    serviceName: 'Turnovers & make-ready',
    audience: 'Owners between tenants or guests',
    problem: 'Every vacant day is unrecoverable revenue.',
    deliverable:
      'Move-out to move-in execution: punch list, cleaning, repairs, staging-level reset, and re-list readiness.',
    outcome: 'Shorter vacancy, better first impression.',
    ctaLabel: 'Plan a turnover',
    href: mailtoLink(SUBJECTS.rentalManagement),
    featured: true,
    status: 'active',
  },
  {
    id: 'owner-reporting',
    category: 'manage',
    serviceName: 'Owner updates & reporting',
    audience: 'Owners who want visibility without micromanaging',
    problem: "You shouldn't have to ask how your property is doing.",
    deliverable:
      'Clear owner updates that keep performance, expenses, and next steps easy to understand.',
    outcome: 'You always know where your property stands.',
    ctaLabel: 'See what reporting covers',
    href: mailtoLink(SUBJECTS.ownerIntro),
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
      'Operated furnished units with flexible terms — availability confirmed directly by inquiry.',
    outcome: 'A real place to live, on your timeline.',
    ctaLabel: 'Request availability',
    href: mailtoLink(SUBJECTS.stays),
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
      'A guided rental search through Smart Move — areas, budget, timeline, and criteria mapped before you tour.',
    outcome: 'The right lease, faster.',
    ctaLabel: 'Start with Smart Move',
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
      'Search strategy, neighborhood mapping, offer positioning, and contract-to-close coordination.',
    outcome: 'You buy with a plan, not on impulse.',
    ctaLabel: 'Route through Smart Move',
    href: smartMoveLink('buy'),
    featured: true,
    status: 'active',
  },
  {
    id: 'seller-strategy',
    category: 'move',
    serviceName: 'Seller / listing strategy',
    audience: 'Owners ready to sell — or sell and buy',
    problem: 'Mispriced or under-prepped listings leave money on the table.',
    deliverable:
      'Pricing analysis, prep and presentation plan, listing execution, and negotiation through closing.',
    outcome: 'An exit on your terms and your timeline.',
    ctaLabel: 'Route through Smart Move',
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
      'Area orientation, rent-first vs. buy-now framing, timing plan, and a landing path built around your move date.',
    outcome: 'You land in the right part of Houston the first time.',
    ctaLabel: 'Route through Smart Move',
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
    problem: 'Acquisition and operations usually live with different people — details fall in the gap.',
    deliverable:
      'Acquisition guidance connected to real operating experience: what a property takes to run, before you buy it.',
    outcome: 'You buy what you can actually operate.',
    ctaLabel: 'Ask an operations question',
    href: mailtoLink(SUBJECTS.investor),
    featured: true,
    status: 'active',
  },
];

export const MANAGE_SERVICES = SERVICES.filter((s) => s.category === 'manage');
export const INVEST_SERVICES = SERVICES.filter((s) => s.category === 'invest');
