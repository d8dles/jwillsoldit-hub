// Single source of truth for contact endpoints and prefilled subjects.

export const CONTACT = {
  name: 'Joey Williams',
  title: 'REALTOR®',
  brokerage: 'Christin Rachelle Group',
  market: 'Houston, TX',
  phoneE164: '+15616856566',
  phoneDisplay: '(561) 685-6566',
  email: 'jwillsoldit@icloud.com',
  smartMoveUrl: 'https://move.jwillsoldit.com',
} as const;

export const SUBJECTS = {
  stays: 'Short-Term Stay Inquiry',
  ownerIntro: 'Owner / Property Management Intro',
  rentalManagement: 'Rental Management Question',
  investor: 'Investor / Owner Question',
  general: 'Question for Joey — jwillsoldit.com',
} as const;

export interface ContactAction {
  id: string;
  label: string;
  detail: string;
  kind: 'call' | 'text' | 'email' | 'smart_move';
  subject?: string;
}

export const CONTACT_ACTIONS: ContactAction[] = [
  {
    id: 'smart-move',
    label: 'Start a Smart Move',
    detail: 'A guided way to plan renting, buying, selling, or relocating',
    kind: 'smart_move',
  },
  {
    id: 'call',
    label: 'Call',
    detail: CONTACT.phoneDisplay,
    kind: 'call',
  },
  {
    id: 'text',
    label: 'Text',
    detail: 'Fastest for stay availability',
    kind: 'text',
  },
  {
    id: 'email',
    label: 'Email',
    detail: CONTACT.email,
    kind: 'email',
    subject: SUBJECTS.general,
  },
];
