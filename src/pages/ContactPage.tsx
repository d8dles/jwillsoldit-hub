import { FormEvent, useEffect, useRef, useState } from 'react';
import { ListingShell } from '../components/ListingShell';
import { PageMeta } from '../components/PageMeta';
import { CONTACT } from '../data/contact';
import { CONTACT_SEO } from '../data/seo';
import { smsLink, telLink } from '../utils/links';
import styles from './ContactPage.module.css';

const inquiries = [
  {
    id: 'management',
    label: 'PROPERTY MANAGEMENT',
    title: 'Ask a management question',
    prompt: 'What would you like Joey to know about the property or the help you need?',
  },
  {
    id: 'owner-intro',
    label: 'PROPERTY OWNER',
    title: 'Talk about a property you own',
    prompt: 'Tell Joey about the property and what you would like help with.',
  },
  {
    id: 'investor',
    label: 'INVESTOR / OWNER',
    title: 'Ask about an investment property',
    prompt: 'What are you considering, and what would you like to understand before you buy?',
  },
] as const;

type InquiryId = (typeof inquiries)[number]['id'];
type SubmitState = 'idle' | 'sending' | 'sent' | 'error';

export function ContactPage() {
  const [selectedId, setSelectedId] = useState<InquiryId>('management');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const selected = inquiries.find((inquiry) => inquiry.id === selectedId) ?? inquiries[0];

  useEffect(() => {
    const hash = window.location.hash.slice(1) as InquiryId;
    if (inquiries.some((inquiry) => inquiry.id === hash)) setSelectedId(hash);
  }, []);

  function chooseInquiry(id: InquiryId) {
    setSelectedId(id);
    setSubmitState('idle');
    window.history.replaceState(null, '', `#${id}`);
    window.setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      formRef.current?.querySelector<HTMLInputElement>('input[name="name"]')?.focus({ preventScroll: true });
    }, 80);
  }

  async function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState('sending');
    const form = new FormData(event.currentTarget);
    const submittedAt = new Date().toISOString();
    const question = String(form.get('question') || '').trim();

    const payload = {
      honeypot: form.get('website') || '',
      path: 'hub-question',
      routeLabel: selected.title,
      criteriaLabel: question,
      selectedDetails: [
        { label: 'Question type', value: selected.title },
        { label: 'Question', value: question },
      ],
      fullPathData: { questionType: selectedId, question },
      contact: {
        name: String(form.get('name') || '').trim(),
        email: String(form.get('email') || '').trim(),
        phone: String(form.get('phone') || '').trim(),
        preferredContact: 'Reply to website question',
        contactConsent: form.get('consent') === 'on',
        marketingConsent: false,
        consentVersion: 'hub-contact-1.0',
        consentAt: submittedAt,
      },
      metadata: {
        submissionId: `HUB-${Date.now()}`,
        submittedAt,
        submissionType: 'hub_question',
        formVersion: 'hub-contact-1.0',
        sourceUrl: window.location.href,
      },
    };

    try {
      const response = await fetch(`${CONTACT.smartMoveUrl}/api/smart-move`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Question submission failed');
      setSubmitState('sent');
      event.currentTarget.reset();
    } catch {
      setSubmitState('error');
    }
  }

  return (
    <ListingShell>
      <PageMeta seo={CONTACT_SEO} />

      <header className={styles.hero}>
        <div className="container">
          <p className="mono-label mono-label--red">CONTACT / JWILLSOLDIT</p>
          <h1>Tell me what you are working on.</h1>
          <p>Choose what you want to talk about, leave the question, and Joey will follow up directly.</p>
          <div className={styles.directActions} aria-label="Direct contact">
            <a className="btn btn--ghost" href={telLink()}>Call {CONTACT.phoneDisplay}</a>
            <a className="btn btn--ghost" href={smsLink()}>Text Joey</a>
          </div>
        </div>
      </header>

      <main className={`container ${styles.contact}`}>
        <div className={styles.choices} aria-label="Choose a question type">
          {inquiries.map((inquiry) => (
            <button
              className={selectedId === inquiry.id ? styles.choiceActive : styles.choice}
              id={inquiry.id}
              key={inquiry.id}
              type="button"
              aria-pressed={selectedId === inquiry.id}
              onClick={() => chooseInquiry(inquiry.id)}
            >
              <span className="mono-label">{inquiry.label}</span>
              <strong>{inquiry.title}</strong>
            </button>
          ))}
        </div>

        <form className={styles.form} ref={formRef} onSubmit={submitQuestion}>
          <p className="mono-label mono-label--red">{selected.label}</p>
          <h2>{selected.title}</h2>
          <div className={styles.fields}>
            <label>
              Name
              <input name="name" autoComplete="name" required />
            </label>
            <label>
              Email
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              Phone <span>(optional)</span>
              <input name="phone" type="tel" autoComplete="tel" />
            </label>
            <label className={styles.question}>
              {selected.prompt}
              <textarea name="question" rows={5} required />
            </label>
            <label className={styles.consent}>
              <input name="consent" type="checkbox" required />
              <span>Joey Williams may contact me about this question. My information will be used to respond and will not be sold or rented.</span>
            </label>
            <label className={styles.honeypot} aria-hidden="true">
              Website
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <button className="btn btn--primary" type="submit" disabled={submitState === 'sending'}>
            {submitState === 'sending' ? 'Sending…' : 'Send my question'}
          </button>
          <p className={styles.status} role="status" aria-live="polite">
            {submitState === 'sent' && 'Thank you. Joey received your question and will follow up directly.'}
            {submitState === 'error' && 'That did not send. Please try again, or use the call or text links above.'}
          </p>
        </form>
      </main>
    </ListingShell>
  );
}
