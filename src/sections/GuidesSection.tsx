import { SectionHeader } from '../components/SectionHeader';
import { useReveal } from '../utils/motion';
import { smartMoveLink } from '../utils/links';
import { CONTACT } from '../data/contact';
import styles from './GuidesSection.module.css';

const FIELD_NOTES = [
  {
    number: '01',
    title: 'Relocating to Texas',
    line: 'Areas, timing, and whether to rent first or buy now.',
    detail:
      'I would start with the places you need to reach, when you need to move, and whether renting first gives you time to learn Houston. I would rather help you land somewhere that works day to day than rush you into the first available place.',
    href: '/houston/guides/how-houston-is-organized',
    ctaLabel: 'Read how Houston is organized',
  },
  {
    number: '02',
    title: 'Getting ready to apply',
    line: 'Have the usual documents and move-in funds organized before you tour.',
    detail:
      'Have your ID, income documents, rental history, pet information, and move-in funds organized before you tour. A complete application can matter as much as speed.',
    href: '/houston/guides/houston-renter-checklist',
    ctaLabel: 'Open the Houston renter checklist',
  },
  {
    number: '03',
    title: 'Buyer prep',
    line: 'From first search to a serious offer, without the guesswork.',
    detail:
      'Know the monthly payment you are comfortable with, the loan and cash you may need, and how the commute, repairs, insurance, taxes, and future plans affect the decision.',
    href: '/houston/guides/first-time-homebuyer',
    ctaLabel: 'Open the first-time buyer guide',
  },
  {
    number: '04',
    title: 'Seller prep',
    line: 'The work worth doing before you list, and what may not pay you back.',
    detail:
      'Focus on pricing, condition, access, photos, repairs, and the questions buyers are likely to have. Not every upgrade pays you back, so compare the cost with the likely benefit before you approve the work.',
    checklist: [
      'Gather mortgage, survey, title, repair, permit, warranty, and insurance records.',
      'Walk the property for deferred maintenance, odors, lighting, clutter, and obvious buyer objections.',
      'Price repairs against the likely sale benefit before approving upgrades.',
      'Plan photography, showing access, pets, valuables, and the move-out timeline.',
    ],
    href: smartMoveLink('sell'),
    ctaLabel: 'Talk through selling the property',
  },
  {
    number: '05',
    title: 'Furnished stay expectations',
    line: 'What is included, how terms flex, and what to ask up front.',
    detail:
      'Confirm dates, utilities, deposits, parking, pets, guest rules, cleaning, work setup, renewal options, and monthly terms before assuming a stay works for your timeline.',
    checklist: [
      'Confirm the full price, deposit, cleaning charges, cancellation terms, and payment schedule.',
      'Ask which utilities, internet, furnishings, linens, parking, and household supplies are included.',
      'Check pet, guest, smoking, quiet-hour, maintenance, and extension rules before booking.',
      'Document the condition at arrival and know who to contact if something needs attention.',
    ],
    href: CONTACT.airbnbHostUrl,
    ctaLabel: 'See current furnished stays',
  },
];

export function GuidesSection() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="guides" className="section section--hairline-top" aria-label="Guides and field notes">
      <div className="container">
        <SectionHeader
          index="SEC / 06"
          kicker="GUIDES / FIELD NOTES"
          title={
            <>
              What I&rsquo;d tell <em>a friend.</em>
            </>
          }
          lede="Start with the question that brought you here. When you are ready to talk through your own move, send me the details and we will take it from there."
        />

        <div ref={ref} className={`${styles.list} reveal`}>
          {FIELD_NOTES.map((note) => (
            <details key={note.number} className={styles.row}>
              <summary className={styles.summary}>
                <span className={styles.num}>{note.number}</span>
                <span className={styles.main}>
                  <span className={styles.title}>{note.title}</span>
                  <span className={styles.line}>{note.line}</span>
                </span>
                <span className={`mono-label ${styles.status}`}>READ</span>
              </summary>
              <div className={styles.detailPanel}>
                <p className={styles.detail}>{note.detail}</p>
                {'checklist' in note && note.checklist ? (
                  <ul className={styles.checklist}>
                    {note.checklist.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                ) : null}
                {note.href && note.ctaLabel ? (
                  <a
                    href={note.href}
                    className={styles.detailLink}
                    {...(note.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {note.ctaLabel} →
                  </a>
                ) : null}
              </div>
            </details>
          ))}
        </div>

        <div className={styles.footerRow}>
          <p className={styles.footerNote}>
            Don&rsquo;t see your situation here? Tell me what is going on and I will help you make sense of it.
          </p>
          <a href={smartMoveLink()} className="btn btn--ghost" rel="noopener">
            Tell me what you are working on
          </a>
        </div>
      </div>
    </section>
  );
}
