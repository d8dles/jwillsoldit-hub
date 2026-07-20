import { useState } from 'react';
import { ListingMeta } from '../components/ListingMeta';
import { ListingShell } from '../components/ListingShell';
import { PhotoLightbox } from '../components/PhotoLightbox';
import type { Listing } from '../data/listings';
import { telLink, smartMoveLink } from '../utils/links';
import styles from './RentalListingDetailPage.module.css';

interface RentalListingDetailPageProps {
  listing: Listing;
}

export function RentalListingDetailPage({ listing }: RentalListingDetailPageProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const visiblePhotos = showAllPhotos ? listing.gallery : listing.gallery.slice(0, 12);

  return (
    <ListingShell mobileIntent="rent">
      <ListingMeta listing={listing} />

      <section className={styles.hero}>
        <div className="container">
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <a href="/listings">Listings</a>
            <span aria-hidden="true">/</span>
            <a href="/listings/rentals">Rentals</a>
            <span aria-hidden="true">/</span>
            <span>4231 Tulip Oak</span>
          </nav>

          <div className={styles.heroGrid}>
            <div className={styles.heroImageFrame}>
              <img
                src={listing.heroImage.src}
                alt={listing.heroImage.alt}
                className={styles.heroImage}
                sizes="(min-width: 860px) 62vw, 100vw"
              />
              <span className={styles.heroIndex}>PROPERTY / 01</span>
            </div>

            <div className={styles.factPanel}>
              <span className="mono-label mono-label--red">{listing.statusLabel}</span>
              <h1 className={styles.address}>{listing.addressLine}</h1>
              <p className={styles.location}>
                {listing.neighborhood} · {listing.city}, {listing.state} {listing.zip}
              </p>
              <p className={styles.price}>{listing.priceLabel}</p>

              <div className={styles.stats} aria-label="Home facts">
                <span><strong>{listing.bedrooms}</strong> beds</span>
                <span><strong>{listing.fullBathrooms} full + {listing.halfBathrooms} half</strong> baths</span>
                <span><strong>{listing.squareFeet.toLocaleString()}</strong> sq ft</span>
              </div>

              <div className={styles.actions}>
                <a href={listing.inquiryUrl} className="btn btn--primary" rel="noopener">
                  <span className="tick">▸</span> Request a showing
                </a>
                <a
                  href={listing.mlsUrl}
                  className="btn btn--on-dark"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View current MLS record <span aria-hidden="true">↗</span>
                </a>
              </div>

              <p className={styles.mlsLine}>{listing.mlsLabel} #{listing.mlsNumber}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.overview}`}>
        <div className="container">
          <div className={styles.overviewGrid}>
            <div>
              <span className="mono-label mono-label--red">THE HOME / AT A GLANCE</span>
              <h2 className="display-h2">Room to land, <em>room to live.</em></h2>
            </div>
            <div className={styles.copy}>
              <p>{listing.description}</p>
              <p className={styles.sourceNote}>
                Listing facts are presented by JWILLSOLDIT from the current MLS record.
                Price, availability, and lease terms should be confirmed before applying.
              </p>
            </div>
          </div>

          <div className={styles.detailsGrid}>
            <div className={styles.featureBlock}>
              <span className="mono-label">FEATURES / 08</span>
              <ul className={styles.features}>
                {listing.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
            </div>
            <dl className={styles.details}>
              <div><dt>Property type</dt><dd>Single-family rental</dd></div>
              <div><dt>Lot size</dt><dd>{listing.lotSquareFeet.toLocaleString()} sq ft</dd></div>
              <div><dt>Year built</dt><dd>{listing.yearBuilt}</dd></div>
              <div><dt>Stories</dt><dd>{listing.stories}</dd></div>
              <div><dt>Garage</dt><dd>{listing.garage}</dd></div>
              <div><dt>Lease route</dt><dd>Long-term rental inquiry</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className={`section section--hairline-top ${styles.gallerySection}`}>
        <div className="container">
          <div className={styles.galleryHeader}>
            <div>
              <span className="mono-label mono-label--red">PHOTO SET / {listing.gallery.length}</span>
              <h2 className="display-h2">See the whole <em>shape of it.</em></h2>
            </div>
            <button
              type="button"
              className="text-link"
              aria-expanded={showAllPhotos}
              aria-controls="property-photo-grid"
              onClick={() => setShowAllPhotos((current) => !current)}
            >
              {showAllPhotos ? 'Show featured set' : `View all ${listing.gallery.length} photos`}
            </button>
          </div>

          <div id="property-photo-grid" className={styles.galleryGrid}>
            {visiblePhotos.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                className={styles.galleryButton}
                onClick={() => setOpenIndex(index)}
                aria-label={`Open photo ${index + 1} of ${listing.gallery.length}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  sizes="(min-width: 860px) 25vw, 50vw"
                  className={styles.galleryImage}
                />
                <span className={styles.galleryNumber}>{String(index + 1).padStart(2, '0')}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaInner}>
            <div>
              <span className="mono-label mono-label--red">NEXT STEP / RENTAL ROUTE</span>
              <h2>Want to <em>see it?</em></h2>
            </div>
            <div className={styles.ctaActions}>
              <a href={smartMoveLink('rent')} className="btn btn--primary" rel="noopener">
                <span className="tick">▸</span> Start the rental route
              </a>
              <a href={telLink()} className="btn btn--on-dark">Call Joey</a>
            </div>
          </div>
        </div>
      </section>

      <PhotoLightbox
        photos={listing.gallery}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onChange={setOpenIndex}
      />
    </ListingShell>
  );
}
