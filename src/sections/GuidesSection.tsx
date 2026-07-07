import { SectionHeader } from '../components/SectionHeader';
import { useReveal } from '../utils/motion';
import { mailtoLink } from '../utils/links';
import styles from './GuidesSection.module.css';

// Guides / Field Notes — homepage teaser only. Useful, not blog fluff.
// No fake published posts: topics are listed honestly as in-the-works,
// with a direct ask path until they ship.

const FIELD_NOTES = [
  {
    number: '01',
    title: 'Relocating to Texas',
    line: 'What to know before the move — areas, timing, rent-first vs. buy-now.',
  },
  {
    number: '02',
    title: 'Rental application readiness',
    line: 'Walk in with everything a landlord actually asks for.',
  },
  {
    number: '03',
    title: 'Buyer prep',
    line: 'From first search to a serious offer, without the guesswork.',
  },
  {
    number: '04',
    title: 'Seller prep',
    line: 'The prep that moves the number — and the prep that doesn’t.',
  },
  {
    number: '05',
    title: 'Furnished stay expectations',
    line: 'What’s included, how terms flex, and what to ask up front.',
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
          lede="Straight, useful notes on renting, buying, selling, relocating, and staying — the questions people actually ask before they start. The first set is being written now."
        />

        <div ref={ref} className={`${styles.list} reveal`}>
          {FIELD_NOTES.map((note) => (
            <div key={note.number} className={styles.row}>
              <span className={styles.num}>{note.number}</span>
              <div className={styles.main}>
                <h3 className={styles.title}>{note.title}</h3>
                <p className={styles.line}>{note.line}</p>
              </div>
              <span className={`mono-label ${styles.status}`}>IN THE WORKS</span>
            </div>
          ))}
        </div>

        <div className={styles.footerRow}>
          <p className={styles.footerNote}>
            Need one of these answered before it&rsquo;s published? Ask — you&rsquo;ll
            get the straight version.
          </p>
          <a href={mailtoLink('Field note request — jwillsoldit.com')} className="btn btn--ghost">
            Ask for a field note
          </a>
        </div>
      </div>
    </section>
  );
}
