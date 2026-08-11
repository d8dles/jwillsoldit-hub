import { useReveal } from '../utils/motion';
import styles from './MeetJoeySection.module.css';

const PILLARS = [
  {
    title: 'Buying & Selling',
    line: 'Straight read. No pitch.',
  },
  {
    title: 'Rentals',
    line: 'I know the inventory.',
  },
  {
    title: 'Property Management',
    line: 'I answer the phone.',
  },
  {
    title: 'Investing',
    line: 'I run them. I know the numbers.',
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
              Inside the Loop, out past the Grand Parkway, and everything in
              between. Rent it, buy it, sell it, or hold it. I work all of
              it.
            </p>
            <p className={styles.body}>
              I started as a broker&rsquo;s assistant and learned this
              business from the paperwork up. That is why I catch what other
              agents miss, and why your deal never goes quiet on you.
            </p>
            <p className={styles.body}>
              Most people already know what they are drawn to. They just do
              not know where in Houston it lives yet. Finding that is the
              part I am good at.
            </p>
            <p className={styles.body}>
              Nobody hands you any of this. You find out at closing, when
              it is expensive to care. So I put it in writing.
            </p>
            <div className={styles.guideLinks}>
              <a href="/houston/guides/no-zoning-explained">No zoning</a>
              <a href="/houston/guides/property-taxes">Property taxes</a>
              <a href="/houston/guides/muds-pids-and-utility-districts">
                Utility districts
              </a>
              <a href="/houston/guides/flood-risk-and-insurance">
                Flood maps
              </a>
              <a href="/houston/guides/traffic-and-commutes">Commutes</a>
            </div>
            <div className={styles.actions}>
              <a href="/houston/guides" className="text-link">
                Read Houston, Handled
              </a>
              <a href="/about" className="text-link">More about me</a>
            </div>
          </div>

          <div ref={pillarsRef} className={`${styles.pillars} reveal`}>
            <span className={`mono-label mono-label--red ${styles.pillarsHead}`}>
              WHAT I HANDLE
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
