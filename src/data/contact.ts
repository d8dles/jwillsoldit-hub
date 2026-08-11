// Single source of truth for contact endpoints and prefilled subjects.

export const CONTACT = {
  name: 'Joey Williams',
  title: 'REALTOR®',
  brokerage: 'Christin Rachelle Group',
  market: 'Houston, TX',
  phoneE164: '+15616856566',
  phoneDisplay: '(561) 685-6566',
  email: 'joey@jwillsoldit.com',
  smartMoveUrl: 'https://move.jwillsoldit.com',
  airbnbHostUrl: 'https://www.airbnb.com/users/profile/about?context=host',
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
    label: 'Tell me about your move',
    detail: 'Share the details of your rental, purchase, sale, or move',
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
    detail: 'Text Joey directly',
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
