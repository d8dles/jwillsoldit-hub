import { SectionHeader } from '../components/SectionHeader';
import { PropertyPreviewCard } from '../components/PropertyPreviewCard';
import { FEATURED_STAYS, STAY_COUNT } from '../data/properties';
import { SUBJECTS } from '../data/contact';
import { smsLink, mailtoLink } from '../utils/links';
import styles from './StaysSection.module.css';

export function StaysSection() {
  return (
    <section id="stays" className="section section--hairline-top" aria-label="Furnished stays">
      <div className="container">
        <SectionHeader
          index="SEC / 02"
          kicker="STAYS"
          title={
            <>
              Furnished stays, <em>run like hospitality.</em>
            </>
          }
          lede="Short-term, corporate, and monthly furnished stays across the Houston area — professionally prepared and locally coordinated, not listed and forgotten. Terms flex to your timeline, and availability is confirmed quickly by a real person."
        />

        <div className={styles.grid}>
          {FEATURED_STAYS.map((property, i) => (
            <PropertyPreviewCard key={property.id} property={property} index={i} />
          ))}
        </div>

        <div className={styles.footerRow}>
          <p className={`mono-label ${styles.indexNote}`}>
            SHOWING {String(FEATURED_STAYS.length).padStart(2, '0')} OF{' '}
            {String(STAY_COUNT).padStart(2, '0')} STAYS · FULL COLLECTION COMING SOON
          </p>
          <div className={styles.ctas}>
            <a href={smsLink(`${SUBJECTS.stays} — dates and unit type?`)} className="btn btn--primary">
              <span className="tick">▸</span> Request availability
            </a>
            <a href={mailtoLink(SUBJECTS.stays)} className="btn btn--ghost">
              Email a stay inquiry
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
