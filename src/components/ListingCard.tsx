import type { Listing } from '../data/listings';
import type { InventoryCardModel } from '../data/publicInventory';
import { useReveal } from '../utils/motion';
import styles from './ListingCard.module.css';

interface ListingCardProps {
  listing: Listing | InventoryCardModel;
}

export function ListingCard({ listing }: ListingCardProps) {
  const ref = useReveal<HTMLElement>();

  return (
    <article ref={ref} className={`${styles.card} reveal`}>
      <a href={listing.path} className={styles.imageLink} aria-label={`View ${listing.addressLine}`}>
        <img
          src={listing.heroImage.src}
          srcSet={listing.heroImage.srcSet}
          sizes="(min-width: 860px) 50vw, 100vw"
          alt={listing.heroImage.alt}
          className={styles.image}
          loading="lazy"
        />
      </a>

      <div className={styles.body}>
        <div className={styles.topRow}>
          <span className="mono-label mono-label--red">{listing.statusLabel}</span>
          <span className={styles.price}>{listing.priceLabel}</span>
        </div>

        <h3 className={styles.name}>{listing.addressLine}</h3>
        <p className={styles.location}>
          {listing.neighborhood} · {listing.city}, {listing.state} {listing.zip}
        </p>

        <div className={styles.stats} aria-label="Property facts">
          <span>{listing.bedrooms || '—'} beds</span>
          <span>
            {listing.fullBathrooms || '—'} full + {listing.halfBathrooms || '—'} half baths
          </span>
          <span>{listing.squareFeet ? listing.squareFeet.toLocaleString() : '—'} sq ft</span>
        </div>

        <a href={listing.path} className={styles.action}>
          View listing <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}
