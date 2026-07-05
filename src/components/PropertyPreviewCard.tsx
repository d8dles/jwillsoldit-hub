import type { Property } from '../data/types';
import { useReveal } from '../utils/motion';
import { smsLink, mailtoLink } from '../utils/links';
import styles from './PropertyPreviewCard.module.css';

// Typographic property card. Works with zero images by design —
// no stock photos, no placeholder art. When real unit photos exist,
// set imageUrl/imageAlt in properties.ts and the card upgrades itself.

interface PropertyPreviewCardProps {
  property: Property;
  index: number;
}

export function PropertyPreviewCard({ property, index }: PropertyPreviewCardProps) {
  const ref = useReveal<HTMLElement>();
  const p = property;

  return (
    <article ref={ref} className={`${styles.card} reveal`}>
      {p.imageUrl ? (
        <img className={styles.image} src={p.imageUrl} alt={p.imageAlt ?? p.name} loading="lazy" />
      ) : (
        <div className={styles.plate} aria-hidden="true">
          <span className={styles.plateIndex}>
            {p.category.toUpperCase()} / {String(index + 1).padStart(2, '0')}
          </span>
          <span className={styles.plateMark}>■</span>
        </div>
      )}

      <div className={styles.body}>
        <div className={styles.topRow}>
          <h3 className={styles.name}>{p.name}</h3>
          <span className={styles.status}>{p.availabilityStatus}</span>
        </div>

        <p className={`mono-label ${styles.meta}`}>
          {p.propertyType} · {p.city}, {p.state}
          {p.sleeps ? ` · Sleeps ${p.sleeps}` : ''}
        </p>

        <p className={styles.notes}>{p.publicNotes}</p>

        {p.tags.length > 0 && (
          <ul className={styles.tags}>
            {p.tags.map((tag) => (
              <li key={tag} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
        )}

        <div className={styles.actions}>
          <a
            href={smsLink(`${p.inquirySubject} — current availability?`)}
            className={styles.actionPrimary}
          >
            Request availability
          </a>
          <a href={mailtoLink(p.inquirySubject)} className={styles.actionSecondary}>
            Email instead
          </a>
        </div>
      </div>
    </article>
  );
}
