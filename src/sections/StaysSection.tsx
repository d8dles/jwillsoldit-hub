import { SectionHeader } from '../components/SectionHeader';
import { PropertyPreviewCard } from '../components/PropertyPreviewCard';
import { PROPERTIES } from '../data/properties';
import { SUBJECTS } from '../data/contact';
import { smsLink, mailtoLink } from '../utils/links';
import styles from './StaysSection.module.css';

export function StaysSection() {
  const stays = PROPERTIES.filter((property) => property.category === 'stay' && property.publicVisible);

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
          lede="Short-term, corporate, and monthly furnished stays across the Houston area — professionally prepared and locally coordinated, not listed and forgotten. This carousel is data-driven, so cards can be added or removed from the property file without redesigning the section."
        />

        <div className={styles.carousel} aria-label="Furnished stay cards">
          {stays.map((property, i) => (
            <div className={styles.slide} key={property.id}>
              <PropertyPreviewCard property={property} index={i} />
            </div>
          ))}
        </div>

        <div className={styles.footerRow}>
          <p className={`mono-label ${styles.indexNote}`}>
            SHOWING {String(stays.length).padStart(2, '0')} STAYS · AVAILABILITY BY REQUEST
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
