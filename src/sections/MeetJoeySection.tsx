import { useReveal } from '../utils/motion';
import styles from './MeetJoeySection.module.css';

const PILLARS = [
  {
    title: 'Texas-Wide Guidance',
    line: 'Houston rooted. Texas focused.',
  },
  {
    title: 'Stays That Feel Like Home',
    line: 'Curated homes. Flexible terms.',
  },
  {
    title: 'Rentals With Real Support',
    line: 'Fast response. Clear process.',
  },
  {
    title: 'Smarter Moves. Stronger Returns.',
    line: 'Buy, sell, invest with confidence.',
  },
];

export function MeetJoeySection() {
  const copyRef = useReveal<HTMLDivElement>();
  const pillarsRef = useReveal<HTMLDivElement>();

  return (
    <section id="joey" className="section section--hairline-top" aria-label="Meet Joey">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.portraitWrap}>
            <img
              className={styles.portrait}
              src="/assets/editorial/joey-williams-headshot.png"
              alt="Joey Williams, REALTOR®"
              width={1122}
              height={1402}
              loading="lazy"
            />
          </div>

          <div ref={copyRef} className={`${styles.copy} reveal`}>
            <span className="mono-label mono-label--red">MEET JOEY</span>
            <h2 className={styles.name}>
              Joey Williams<span className={styles.period}>.</span>
            </h2>
            <p className={styles.lede}>
              Real estate, rentals, stays, and property strategy — handled with
              taste, speed, and straight answers.
            </p>
            <p className={styles.body}>
              Real estate does not need more noise.
            </p>
            <p className={styles.body}>
              It needs better direction.
            </p>
            <p className={styles.body}>
              JWILLSOLDIT was built for people who want the process to feel
              handled from the first move — not passed around, over-talked, or
              left sitting in the dark waiting for someone to “circle back.”
            </p>
            <p className={styles.body}>
              Renting, buying, selling, relocating, furnishing a stay, or sorting
              out a property you already own—the job is the same: give you a
              straight answer and a next step that makes sense.
            </p>
            <p className={styles.body}>
              I listen closely. I move fast. I tell the truth.
            </p>
            <p className={styles.body}>
              Then we get it done.
            </p>
            <a href="/about" className="text-link">Full bio, license, and credentials</a>
          </div>

          <div ref={pillarsRef} className={`${styles.pillars} reveal`}>
            <span className={`mono-label mono-label--red ${styles.pillarsHead}`}>
              BUILT AROUND HOW YOU MOVE
            </span>
            <ul className={styles.pillarList}>
              {PILLARS.map((pillar) => (
                <li key={pillar.title} className={styles.pillar}>
                  <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                  <p className={`mono-label ${styles.pillarLine}`}>{pillar.line}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
