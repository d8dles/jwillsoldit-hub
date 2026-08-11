import { useReveal } from '../utils/motion';
import { smartMoveLink } from '../utils/links';
import styles from './MeetJoeySection.module.css';

const PILLARS = [
  {
    title: 'Buying & Selling',
    line: 'A clear plan and an honest read.',
  },
  {
    title: 'Rentals',
    line: 'Help narrowing the search.',
  },
  {
    title: 'Property Management',
    line: 'Clear updates and real follow-through.',
  },
  {
    title: 'Investing',
    line: 'Numbers that work beyond the spreadsheet.',
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
              I&rsquo;m a Texas REALTOR® based in Houston. I can help with moves
              across the state, but Houston is the market I know from the
              inside&mdash;Inside the Loop, beyond the Grand Parkway, and all
              the very different places in between.
            </p>
            <p className={styles.body}>
              Most people can describe how they want life to feel, even if
              they cannot name the neighborhood yet. Maybe it is a shorter
              commute, somewhere they can walk to dinner, more room outside,
              or a rental that gives them time to learn the city. I help turn
              those preferences into actual places and honest options.
            </p>
            <p className={styles.body}>
              That also means talking about what listing photos leave out:
              flood history, property taxes, utility districts, insurance,
              and what the drive really feels like on a weekday. I explain
              those details plainly, put the useful parts in writing, and
              make sure you understand the tradeoffs before you commit to an
              address.
            </p>
            <div className={styles.guideLinks}>
              <a href="/houston/guides/flood-risk-and-insurance">Flood history</a>
              <a href="/houston/guides/property-taxes">Property taxes</a>
              <a href="/houston/guides/muds-pids-and-utility-districts">
                Utility districts
              </a>
              <a href="/houston/guides/traffic-and-commutes">Houston commutes</a>
              <a href="/houston/guides/first-time-homebuyer">First-time buying</a>
            </div>
            <div className={styles.actions}>
              <a href={smartMoveLink()} className="btn btn--primary" rel="noopener">
                <span className="tick">▸</span> Tell me about your move
              </a>
              <a href="/houston/guides" className="text-link">
                Explore the Houston guides
              </a>
              <a href="/about" className="text-link">Get to know me</a>
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
