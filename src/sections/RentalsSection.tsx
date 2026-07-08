import { SectionHeader } from '../components/SectionHeader';
import { useReveal } from '../utils/motion';
import { smartMoveLink, mailtoLink } from '../utils/links';
import { SUBJECTS } from '../data/contact';
import styles from './RentalsSection.module.css';

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
          lede="Rental housing works better with support on both sides: renters finding the right lease, and owners keeping their rental homes running smoothly."
        />

        <div className={styles.lanes}>
          <div ref={laneA} className={`${styles.lane} reveal`}>
            <span className="mono-label mono-label--red">LANE A</span>
            <h3 className={styles.laneTitle}>Looking for a rental</h3>
            <p className={styles.laneBody}>
              Areas, budget, timeline, and criteria — mapped through Smart Move
              before you spend weekends touring the wrong places. Apartments,
              townhomes, and rental houses across Greater Houston.
            </p>
            <a href={smartMoveLink('rent')} className="btn btn--primary" rel="noopener">
              <span className="tick">▸</span> Start the rental route
            </a>
          </div>

          <div ref={laneB} className={`${styles.lane} reveal`}>
            <span className="mono-label mono-label--red">LANE B</span>
            <h3 className={styles.laneTitle}>Own a rental (or about to)</h3>
            <p className={styles.laneBody}>
              Leasing, management, maintenance follow-up, turnovers, and owner
              updates — coordinated with trusted service partners behind the
              work. Full service details are below, or skip straight to a
              conversation.
            </p>
            <div className={styles.laneCtas}>
              <a href="#manage" className="btn btn--ghost">
                Owner services
              </a>
              <a href={mailtoLink(SUBJECTS.rentalManagement)} className="text-link">
                Ask a management question
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
