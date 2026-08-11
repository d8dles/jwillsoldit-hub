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
            <div className={styles.ownerGuides}>
              <details>
                <summary>Prepare a long-term rental</summary>
                <div className={styles.ownerGuideBody}>
                  <p>A year-long lease usually means fewer turnovers, but more responsibility tied to one resident and one lease.</p>
                  <ul>
                    <li>Confirm landlord coverage, liability limits, flood coverage where relevant, and any insurer requirements.</li>
                    <li>Make the home clean, secure, functional, and ready for required safety devices and repairs.</li>
                    <li>Decide who handles utilities, lawn care, pest service, filters, and routine maintenance.</li>
                    <li>Prepare written screening criteria, the lease, deposits, move-in condition records, and a repair process.</li>
                    <li>Set aside reserves and identify vendors before the first urgent call.</li>
                  </ul>
                  <a href="/contact#management">Ask about long-term preparation →</a>
                </div>
              </details>
              <details>
                <summary>Prepare a short-term or furnished rental</summary>
                <div className={styles.ownerGuideBody}>
                  <p>A furnished stay operates more like hospitality: shorter commitments, more frequent access, and more items under the owner&rsquo;s care.</p>
                  <ul>
                    <li>Verify city, HOA, deed, lease, lender, and insurance rules before advertising short stays.</li>
                    <li>Price commercial or short-term-rental coverage, taxes, platform fees, cleaning, and slower periods.</li>
                    <li>Plan durable furniture, linens, kitchen basics, locks, safety equipment, Wi-Fi, and a documented inventory.</li>
                    <li>Keep electricity, water, internet, and usually other utilities active in the owner&rsquo;s name.</li>
                    <li>Build cleaning, laundry, restocking, inspection, guest messaging, maintenance, and emergency plans.</li>
                  </ul>
                  <a href="/contact#management">Ask about furnished-rental preparation →</a>
                </div>
              </details>
            </div>
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
              I can help keep leasing, maintenance, turnovers, vendors, and
              owner updates moving, so you are not chasing every detail
              yourself. Read the details below or tell me about your property.
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
