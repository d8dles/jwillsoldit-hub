import { SectionHeader } from '../components/SectionHeader';
import { useReveal } from '../utils/motion';
import { smartMoveLink } from '../utils/links';
import styles from './GuidesSection.module.css';

const FIELD_NOTES = [
  {
    number: '01',
    title: 'Relocating to Texas',
    line: 'Areas, timing, and whether to rent first or buy now.',
    detail:
      'I would start with the places you need to reach, when you need to move, and whether renting first gives you time to learn Houston. I would rather help you land somewhere that works day to day than rush you into the first available place.',
    href: '/houston',
    ctaLabel: 'Explore Houston, Handled',
  },
  {
    number: '02',
    title: 'Rental application readiness',
    line: 'Walk in with everything a landlord actually asks for.',
    detail:
      'Have income documentation, rental history, ID, pet details, move-in funds, and honest context ready before touring. Clean paperwork can matter as much as speed.',
  },
  {
    number: '03',
    title: 'Buyer prep',
    line: 'From first search to a serious offer, without the guesswork.',
    detail:
      'Get clear on payment comfort, loan type, cash needed, commute, repairs, insurance, taxes, and resale logic before falling in love with a listing.',
  },
  {
    number: '04',
    title: 'Seller prep',
    line: 'The prep that moves your number, and the prep that wastes your money.',
    detail:
      'Focus on pricing, condition, access, photos, repair optics, and buyer objections. Not every upgrade pays you back, but every weak point affects confidence.',
  },
  {
    number: '05',
    title: 'Furnished stay expectations',
    line: 'What is included, how terms flex, and what to ask up front.',
    detail:
      'Confirm dates, utilities, deposits, parking, pets, guest rules, cleaning, work setup, renewal options, and monthly terms before assuming a stay works for your timeline.',
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
                {note.href && note.ctaLabel ? (
                  <a href={note.href} className={styles.detailLink}>
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
            Get a plan
          </a>
        </div>
      </div>
    </section>
  );
}
