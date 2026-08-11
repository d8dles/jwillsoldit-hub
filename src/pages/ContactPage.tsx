import { ListingShell } from '../components/ListingShell';
import { PageMeta } from '../components/PageMeta';
import { CONTACT, SUBJECTS } from '../data/contact';
import { CONTACT_SEO } from '../data/seo';
import { mailtoLink, smsLink, telLink } from '../utils/links';
import styles from './ContactPage.module.css';

const inquiries = [
  {
    id: 'management',
    label: 'PROPERTY MANAGEMENT',
    title: 'Ask a management question',
    copy: 'Tell Joey about the property, its current occupancy, and the kind of help you need.',
    subject: SUBJECTS.rentalManagement,
  },
  {
    id: 'owner-intro',
    label: 'OWNER INTRO',
    title: 'Request an owner introduction',
    copy: 'Start with a direct conversation about the property, the work involved, and whether the service is a fit.',
    subject: SUBJECTS.ownerIntro,
  },
  {
    id: 'investor',
    label: 'INVESTOR / OWNER',
    title: 'Ask an operations question',
    copy: 'Connect an acquisition question to the day-to-day reality of operating the property.',
    subject: SUBJECTS.investor,
  },
] as const;

export function ContactPage() {
  return (
    <ListingShell>
      <PageMeta seo={CONTACT_SEO} />

      <header className={styles.hero}>
        <div className="container">
          <p className="mono-label mono-label--red">CONTACT / JWILLSOLDIT</p>
          <h1>Start with the right conversation.</h1>
          <p>Choose why you are reaching out, then call, text, or email Joey directly.</p>
        </div>
      </header>

      <section className={`container ${styles.grid}`} aria-label="Contact routes">
        {inquiries.map((inquiry) => (
          <article className={styles.card} id={inquiry.id} key={inquiry.id}>
            <p className="mono-label mono-label--red">{inquiry.label}</p>
            <h2>{inquiry.title}</h2>
            <p>{inquiry.copy}</p>
            <div className={styles.actions}>
              <a className="btn btn--primary" href={smsLink(`${inquiry.subject}: `)}>Text Joey</a>
              <a className="btn btn--ghost" href={telLink()}>Call {CONTACT.phoneDisplay}</a>
              <a className={styles.email} href={mailtoLink(inquiry.subject)}>Email {CONTACT.email}</a>
            </div>
          </article>
        ))}
      </section>
    </ListingShell>
  );
}
