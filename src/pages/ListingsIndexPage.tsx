import { ListingCard } from '../components/ListingCard';
import { ListingShell } from '../components/ListingShell';
import { ACTIVE_LISTINGS } from '../data/listings';
import { useReveal } from '../utils/motion';
import styles from './ListingsIndexPage.module.css';

export function ListingsIndexPage() {
  const heroRef = useReveal<HTMLDivElement>();

  return (
    <ListingShell>
      <section className={`section ${styles.hero}`}>
        <div className="container">
          <div ref={heroRef} className={`${styles.heroInner} reveal`}>
            <div className={styles.meta}>
              <span className="mono-label">LISTINGS / CURRENT INVENTORY</span>
              <span className={styles.rule} aria-hidden="true" />
              <span className="mono-label mono-label--red">JWILLSOLDIT</span>
            </div>
            <h1 className={styles.title}>
              Property pages built for <em>the next move.</em>
            </h1>
            <p className={styles.lede}>
              Real homes, presented here first. Browse the property details on
              JWILLSOLDIT, then choose the right next step.
            </p>
          </div>

          <div className={styles.lanes} aria-label="Listing categories">
            <a href="/listings/rentals" className={styles.lane}>
              <span className="mono-label mono-label--red">01 / RENTALS</span>
              <strong>Homes currently available to rent</strong>
              <span className={styles.laneArrow} aria-hidden="true">→</span>
            </a>
            <div className={`${styles.lane} ${styles.laneQuiet}`}>
              <span className="mono-label">02 / SALES</span>
              <strong>No active sale listings</strong>
              <span className={styles.laneNote}>Inventory will appear here when live.</span>
            </div>
          </div>
        </div>
      </section>

      <section className={`section section--hairline-top ${styles.inventory}`}>
        <div className="container">
          <div className={styles.sectionHeading}>
            <span className="mono-label">ACTIVE / 01</span>
            <h2 className="display-h2">On the board <em>now.</em></h2>
          </div>
          <div className={styles.grid}>
            {ACTIVE_LISTINGS.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>
    </ListingShell>
  );
}
