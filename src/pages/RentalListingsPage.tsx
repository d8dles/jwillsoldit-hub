import { ListingCard } from '../components/ListingCard';
import { ListingShell } from '../components/ListingShell';
import { ACTIVE_RENTALS } from '../data/listings';
import { smartMoveLink } from '../utils/links';
import styles from './RentalListingsPage.module.css';

export function RentalListingsPage() {
  return (
    <ListingShell>
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
              <span className="mono-label">ACTIVE RENTALS / {String(ACTIVE_RENTALS.length).padStart(2, '0')}</span>
              <h2 className="display-h2">Available <em>now.</em></h2>
            </div>
            <a href={smartMoveLink('rent')} className="btn btn--primary" rel="noopener">
              <span className="tick">▸</span> Start the rental route
            </a>
          </div>

          <div className={styles.grid}>
            {ACTIVE_RENTALS.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>
    </ListingShell>
  );
}
