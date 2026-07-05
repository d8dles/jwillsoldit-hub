import { CONTACT } from '../data/contact';

// Link builders. The hub LINKS to Smart Move — it never posts to its API.
// `intent` params are inert today (Smart Move ignores unknown query params);
// they exist for forward compatibility and must not require Smart Move changes.

export function smartMoveLink(intent?: string): string {
  return intent
    ? `${CONTACT.smartMoveUrl}/?intent=${encodeURIComponent(intent)}`
    : CONTACT.smartMoveUrl;
}

export function telLink(): string {
  return `tel:${CONTACT.phoneE164}`;
}

export function smsLink(body?: string): string {
  return body
    ? `sms:${CONTACT.phoneE164}?&body=${encodeURIComponent(body)}`
    : `sms:${CONTACT.phoneE164}`;
}

export function mailtoLink(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const qs = params.toString();
  return `mailto:${CONTACT.email}${qs ? `?${qs}` : ''}`;
}
