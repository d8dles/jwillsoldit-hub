import { useReveal } from '../utils/motion';
import styles from './MeetJoeySection.module.css';

const PILLARS = [
  {
    title: 'Buying & Selling',
    line: 'A clear plan and an honest read.',
  },
  {
    title: 'Rentals',
    line: 'I will help you narrow the search.',
  },
  {
    title: 'Property Management',
    line: 'You will know what is happening.',
  },
  {
    title: 'Investing',
    line: 'The numbers have to work in real life.',
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
              Inside the Loop, out past the Grand Parkway, and everywhere in
              between. I help people rent, buy, sell, and hold property
              across Houston.
            </p>
            <p className={styles.body}>
              Most people have a feel for what they want&mdash;the commute,
              the pace, the kind of neighborhood, maybe a little more room
              to breathe. They just don&rsquo;t know where in Houston to find
              it yet. That&rsquo;s the part I&rsquo;m good at.
            </p>
            <p className={styles.body}>
              And there is plenty a listing will not explain. Taxes, flood
              history, utility districts, commute times&mdash;I write about
              it so you can understand what you are getting into before it
              becomes an expensive surprise.
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
