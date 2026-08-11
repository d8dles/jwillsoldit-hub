import { SectionHeader } from '../components/SectionHeader';
import { useReveal } from '../utils/motion';
import { smartMoveLink } from '../utils/links';
import styles from './RentalsSection.module.css';

// Two lanes, one section: renters route to Smart Move,
// rental OWNERS route to the Manage vertical. No fake listings, no IDX.

export function RentalsSection() {
  const laneA = useReveal<HTMLDivElement>();
  const laneB = useReveal<HTMLDivElement>();

  return (
    <section id="rentals" className="section section--hairline-top" aria-label="Rentals">
      <div className="container">
        <SectionHeader
          index="SEC / 03"
          kicker="RENTALS"
          title={
            <>
              Rentals, from <em>both sides of the lease.</em>
            </>
          }
          lede="Whether you are looking for a place to rent or need help caring for one you own, you can start here. Browse what is available, tell me what you need, or ask me about management."
        />

        <div className={styles.lanes}>
          <div ref={laneA} className={`${styles.lane} reveal`}>
            <span className="mono-label mono-label--red">FOR RENTERS</span>
            <h3 className={styles.laneTitle}>Looking for a rental</h3>
            <p className={styles.laneBody}>
              Tell me your budget, timing, preferred areas, and what the home
              needs to have. I will help narrow the search before you spend
              every weekend touring the wrong places.
            </p>
            <div className={styles.laneCtas}>
              <a href={smartMoveLink('rent')} className="btn btn--primary" rel="noopener">
                <span className="tick">▸</span> Tell me what you need
              </a>
              <a href="/listings/rentals" className="btn btn--ghost">See current rentals</a>
            </div>
          </div>

          <div ref={laneB} className={`${styles.lane} reveal`}>
            <span className="mono-label mono-label--red">FOR OWNERS</span>
            <h3 className={styles.laneTitle}>Own a rental (or about to)</h3>
            <p className={styles.laneBody}>
              Leasing, management, maintenance follow-up, turnovers, and owner
              updates, coordinated with trusted service partners behind the
              work. Full details are below, or skip straight to a
              conversation.
            </p>
            <div className={styles.laneCtas}>
              <a href="/contact#management" className="btn btn--ghost">
                Ask a management question
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
