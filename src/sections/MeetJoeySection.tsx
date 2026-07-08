import { useReveal } from '../utils/motion';
import styles from './MeetJoeySection.module.css';

const PILLARS = [
  {
    number: '01',
    title: 'Texas-Wide Guidance',
    line: 'Houston rooted. Texas focused.',
  },
  {
    number: '02',
    title: 'Stays That Feel Like Home',
    line: 'Curated homes. Flexible terms.',
  },
  {
    number: '03',
    title: 'Rentals With Real Support',
    line: 'Fast response. Clear process.',
  },
  {
    number: '04',
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
              src="/assets/editorial/joey-williams-headshot.jpg"
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
              I built JWILLSOLDIT for people who do not want to be passed
              around, over-explained to, or left guessing. Whether you are
              moving across Houston, landing in Texas from another state,
              renting first, selling next, furnishing a stay, or figuring out
              what to do with a property you own — I want the first step to
              feel clear.
            </p>
            <p className={styles.body}>
              My style is simple: listen closely, move fast, tell the truth,
              and make the next step obvious.
            </p>
          </div>

          <div ref={pillarsRef} className={`${styles.pillars} reveal`}>
            <span className={`mono-label mono-label--red ${styles.pillarsHead}`}>
              BUILT AROUND HOW YOU MOVE
            </span>
            <ul className={styles.pillarList}>
              {PILLARS.map((pillar) => (
                <li key={pillar.number} className={styles.pillar}>
                  <span className={styles.pillarNum}>{pillar.number}</span>
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
