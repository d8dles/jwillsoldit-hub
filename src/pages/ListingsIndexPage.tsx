import { useMemo, useState } from 'react';
import { ListingCard } from '../components/ListingCard';
import { ListingShell } from '../components/ListingShell';
import { InventoryFilters, type InventoryFilter } from '../components/InventoryFilters';
import { ALL_LISTINGS } from '../data/listings';
import { usePublicInventory } from '../hooks/usePublicInventory';
import { useReveal } from '../utils/motion';
import styles from './ListingsIndexPage.module.css';

export function ListingsIndexPage() {
  const heroRef = useReveal<HTMLDivElement>();
  const [filter, setFilter] = useState<InventoryFilter>('available');
  const { listings } = usePublicInventory(ALL_LISTINGS);
  const filteredListings = useMemo(
    () => filter === 'all' ? listings : listings.filter((listing) => listing.status === filter),
    [filter, listings],
  );

  return (
    <ListingShell>
      <section className={`section ${styles.hero}`}>
        <div className="container">
          <div ref={heroRef} className={`${styles.heroInner} reveal`}>
            <div className={styles.meta}>
              <span className="mono-label">LISTINGS / CURRENT INVENTORY</span>
              <span className={styles.rule} aria-hidden="true" />
              <a href="/" className="mono-label mono-label--red" aria-label="JWILLSOLDIT home">
                JWILLSOLDIT
              </a>
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
            </div>
          </div>
        </div>
      </section>

      <section className={`section section--hairline-top ${styles.inventory}`}>
        <div className="container">
          <div className={styles.sectionHeading}>
            <div>
              <span className="mono-label">PUBLIC INVENTORY / {String(filteredListings.length).padStart(2, '0')}</span>
              <h2 className="display-h2">On the board <em>now.</em></h2>
            </div>
          </div>
          <InventoryFilters value={filter} onChange={setFilter} />
          {filteredListings.length ? (
            <div className={styles.grid}>
              {filteredListings.map((listing) => <ListingCard key={listing.id} listing={listing} />)}
            </div>
          ) : (
            <p className={styles.empty}>No public properties match this status right now.</p>
          )}
        </div>
      </section>
    </ListingShell>
  );
}
