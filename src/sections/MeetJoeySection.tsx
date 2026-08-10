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
              Real estate, rentals, stays, and property strategy in the
              city I actually grew up in.
            </p>
            <p className={styles.body}>
              I grew up in north Houston, so I am not studying this market.
              I know it.
            </p>
            <p className={styles.body}>
              Everyone knows Space City for NASA. Houston actually runs on
              oil, the Port, and the bayou that cuts all the way out to
              Galveston. That is the city underneath the skyline.
            </p>
            <p className={styles.body}>
              I still eat at House of Pies at midnight and send people to
              Ninfa&rsquo;s on Navigation for the real fajitas, not the mall
              version.
            </p>
            <p className={styles.body}>
              JWILLSOLDIT works the same way. You get a straight answer from
              the first conversation, not a script.
            </p>
            <a href="/about" className="text-link">More about me and my license</a>
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
