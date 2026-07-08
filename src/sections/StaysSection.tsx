import { useRef } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { PropertyPreviewCard } from '../components/PropertyPreviewCard';
import { PUBLIC_STAYS, STAY_COUNT } from '../data/properties';
import { SUBJECTS } from '../data/contact';
import { smsLink, mailtoLink } from '../utils/links';
import styles from './StaysSection.module.css';

// Furnished stays as a swipeable carousel. Renders every public stay from
// properties.ts, so adding/removing a stay later is a data edit only.

export function StaysSection() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollByCards = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.firstElementChild as HTMLElement | null;
    const step = first ? first.getBoundingClientRect().width + 20 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

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

        <div className={styles.carousel}>
          <div
            className={styles.track}
            ref={trackRef}
            role="list"
            aria-label="Furnished stays"
            tabIndex={0}
          >
            {PUBLIC_STAYS.map((property, i) => (
              <div className={styles.slide} role="listitem" key={property.id}>
                <PropertyPreviewCard property={property} index={i} />
              </div>
            ))}
          </div>

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => scrollByCards(-1)}
              aria-label="Previous stays"
            >
              ←
            </button>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => scrollByCards(1)}
              aria-label="Next stays"
            >
              →
            </button>
          </div>
        </div>

        <div className={styles.footerRow}>
          <p className={`mono-label ${styles.indexNote}`}>
            {String(STAY_COUNT).padStart(2, '0')} STAYS · SHORT-TERM TO MONTHLY · SWIPE TO BROWSE
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
