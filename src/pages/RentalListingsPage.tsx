import { useMemo, useState } from 'react';
import { ListingCard } from '../components/ListingCard';
import { ListingShell } from '../components/ListingShell';
import { InventoryFilters, type InventoryFilter } from '../components/InventoryFilters';
import { ALL_LISTINGS } from '../data/listings';
import { usePublicInventory } from '../hooks/usePublicInventory';
import { smartMoveLink } from '../utils/links';
import styles from './RentalListingsPage.module.css';

export function RentalListingsPage() {
  const [filter, setFilter] = useState<InventoryFilter>('available');
  const { listings } = usePublicInventory(ALL_LISTINGS.filter((listing) => listing.category === 'rental'));
  const filteredRentals = useMemo(
    () => filter === 'all' ? listings : listings.filter((listing) => listing.status === filter),
    [filter, listings],
  );

  return (
    <ListingShell mobileIntent="rent">
      <section className={`section ${styles.hero}`}>
        <div className="container">
          <span className="mono-label mono-label--red">LISTINGS / RENTALS</span>
          <h1 className={styles.title}>Find a rental that <em>fits the route.</em></h1>
          <p className={styles.lede}>
            JWILLSOLDIT property pages show the home here first; verify current
            price and availability before applying.
          </p>
        </div>
      </section>

      <section className={`section section--hairline-top ${styles.inventory}`}>
        <div className="container">
          <div className={styles.headingRow}>
            <div>
              <span className="mono-label">RENTAL INVENTORY / {String(filteredRentals.length).padStart(2, '0')}</span>
              <h2 className="display-h2">Available <em>now.</em></h2>
            </div>
            <a href={smartMoveLink('rent')} className="btn btn--primary" rel="noopener">
              <span className="tick">▸</span> Start the rental route
            </a>
          </div>

          <InventoryFilters
            value={filter}
            onChange={setFilter}
            statuses={['available', 'coming_soon', 'pending', 'rented', 'booked']}
          />
          {filteredRentals.length ? (
            <div className={styles.grid}>
              {filteredRentals.map((listing) => <ListingCard key={listing.id} listing={listing} />)}
            </div>
          ) : (
            <p className={styles.empty}>No rental properties match this status right now.</p>
          )}
        </div>
      </section>
    </ListingShell>
  );
}
