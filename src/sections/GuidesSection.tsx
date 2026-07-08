import { SectionHeader } from '../components/SectionHeader';
import { useReveal } from '../utils/motion';
import { smartMoveLink } from '../utils/links';
import styles from './GuidesSection.module.css';

const FIELD_NOTES = [
  {
    number: '01',
    title: 'Relocating to Texas',
    line: 'What to know before the move — areas, timing, rent-first vs. buy-now.',
    detail: 'Start with commute patterns, lease timing, neighborhood rhythm, and whether renting first protects you from buying before you understand the city. The goal is not just finding a place — it is landing well.',
  },
  {
    number: '02',
    title: 'Rental application readiness',
    line: 'Walk in with everything a landlord actually asks for.',
    detail: 'Have income documentation, rental history, ID, pet details, move-in funds, and honest context ready before touring. Clean paperwork can matter as much as speed.',
  },
  {
    number: '03',
    title: 'Buyer prep',
    line: 'From first search to a serious offer, without the guesswork.',
    detail: 'Get clear on payment comfort, loan type, cash needed, commute, repairs, insurance, taxes, and resale logic before falling in love with a listing.',
  },
  {
    number: '04',
    title: 'Seller prep',
    line: 'The prep that moves the number — and the prep that does not.',
    detail: 'Focus on pricing, condition, access, photos, repair optics, and buyer objections. Not every upgrade pays you back, but every weak point affects confidence.',
  },
  {
    number: '05',
    title: 'Furnished stay expectations',
    line: 'What is included, how terms flex, and what to ask up front.',
    detail: 'Confirm dates, utilities, deposits, parking, pets, guest rules, cleaning, work setup, and renewal options before assuming a stay works for your timeline.',
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
          lede="Quick, plain-English guidance on common move questions. Open the topic that fits, then start Smart Move when you are ready for a real plan."
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
              <p className={styles.detail}>{note.detail}</p>
            </details>
          ))}
        </div>

        <div className={styles.footerRow}>
          <p className={styles.footerNote}>
            Have a situation that does not fit neatly into a guide? Start with the intake and I will point it the right way.
          </p>
          <a href={smartMoveLink()} className="btn btn--ghost" rel="noopener">
            Start Smart Move
          </a>
        </div>
      </div>
    </section>
  );
}
