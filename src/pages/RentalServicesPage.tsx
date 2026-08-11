import { PageMeta } from '../components/PageMeta';
import { ListingShell } from '../components/ListingShell';
import { ManageSection } from '../sections/ManageSection';
import { RentalsSection } from '../sections/RentalsSection';
import { RENTAL_SERVICES_SEO } from '../data/seo';
import { smartMoveLink } from '../utils/links';
import styles from './RentalServicesPage.module.css';

export function RentalServicesPage() {
  return (
    <ListingShell mobileIntent="rent">
      <PageMeta seo={RENTAL_SERVICES_SEO} />

      <section className={`section ${styles.hero}`}>
        <div className="container">
          <span className="mono-label mono-label--red">RENTALS / SERVICES</span>
          <h1 className={styles.title}>Rentals, from <em>both sides of the lease.</em></h1>
          <p className={styles.lede}>
            Looking for a rental? I will help you narrow the search before
            you spend every weekend touring. Already own one? I can help with
            leasing, upkeep, turnovers, and the day-to-day follow-through.
          </p>
          <div className={styles.actions}>
            <a href={smartMoveLink('rent')} className="btn btn--primary" rel="noopener">
              <span className="tick">▸</span> Tell me what you need
            </a>
            <a href="/listings/rentals" className="btn btn--on-dark">See current rentals</a>
          </div>
        </div>
      </section>

      <RentalsSection />
      <ManageSection />
    </ListingShell>
  );
}
