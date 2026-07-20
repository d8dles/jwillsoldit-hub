import { useState } from 'react';
import { ListingMeta } from '../components/ListingMeta';
import { ListingShell } from '../components/ListingShell';
import { PhotoLightbox } from '../components/PhotoLightbox';
import type { Listing } from '../data/listings';
import { usePublicInventory } from '../hooks/usePublicInventory';
import { telLink, smartMoveLink } from '../utils/links';
import styles from './RentalListingDetailPage.module.css';

interface RentalListingDetailPageProps {
  listing: Listing;
}

export function RentalListingDetailPage({ listing }: RentalListingDetailPageProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const { listings: publicListings, remoteLoaded } = usePublicInventory([listing]);
  const publicListing = publicListings[0] || listing;
  const visiblePhotos = showAllPhotos ? publicListing.gallery : publicListing.gallery.slice(0, 12);

  if (remoteLoaded && publicListings.length === 0) {
    return (
      <ListingShell mobileIntent="rent">
        <section className={styles.unavailable}>
          <div className="container">
            <span className="mono-label mono-label--red">LISTING / NO LONGER PUBLIC</span>
            <h1>This property is no longer <em>on the board.</em></h1>
            <p>The home may be rented, pending, or being held off-market. Browse current JWILLSOLDIT inventory for the next available route.</p>
            <div className={styles.unavailableActions}>
              <a href="/listings" className="btn btn--primary"><span className="tick">▸</span> Browse listings</a>
              <a href="/listings/rentals" className="btn btn--on-dark">View rentals</a>
            </div>
          </div>
        </section>
      </ListingShell>
    );
  }

  return (
    <ListingShell mobileIntent="rent">
      <ListingMeta listing={publicListing} />

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
                src={publicListing.heroImage.src}
                srcSet={publicListing.heroImage.srcSet}
                alt={publicListing.heroImage.alt}
                className={styles.heroImage}
                sizes="(min-width: 860px) 62vw, 100vw"
              />
              <span className={styles.heroIndex}>PROPERTY / 01</span>
            </div>

            <div className={styles.factPanel}>
              <span className="mono-label mono-label--red">{publicListing.statusLabel}</span>
              <h1 className={styles.address}>{publicListing.addressLine}</h1>
              <p className={styles.location}>
                {publicListing.neighborhood} · {publicListing.city}, {publicListing.state} {publicListing.zip}
              </p>
              <p className={styles.price}>{publicListing.priceLabel}</p>

              <div className={styles.stats} aria-label="Home facts">
                <span><strong>{publicListing.bedrooms}</strong> beds</span>
                <span><strong>{publicListing.fullBathrooms} full + {publicListing.halfBathrooms} half</strong> baths</span>
                <span><strong>{publicListing.squareFeet.toLocaleString()}</strong> sq ft</span>
              </div>

              <div className={styles.actions}>
                <a href={publicListing.inquiryUrl} className="btn btn--primary" rel="noopener">
                  <span className="tick">▸</span> Request a showing
                </a>
                <a
                  href={publicListing.mlsUrl}
                  className="btn btn--on-dark"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View current MLS record <span aria-hidden="true">↗</span>
                </a>
              </div>

              <p className={styles.mlsLine}>{publicListing.mlsLabel} #{publicListing.mlsNumber}</p>
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
              <p>{publicListing.description}</p>
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
                {publicListing.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
            </div>
            <dl className={styles.details}>
              <div><dt>Property type</dt><dd>Single-family rental</dd></div>
              <div><dt>Lot size</dt><dd>{publicListing.lotSquareFeet.toLocaleString()} sq ft</dd></div>
              <div><dt>Year built</dt><dd>{publicListing.yearBuilt}</dd></div>
              <div><dt>Stories</dt><dd>{publicListing.stories}</dd></div>
              <div><dt>Garage</dt><dd>{publicListing.garage}</dd></div>
              <div><dt>Lease route</dt><dd>Long-term rental inquiry</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className={`section section--hairline-top ${styles.gallerySection}`}>
        <div className="container">
          <div className={styles.galleryHeader}>
            <div>
              <span className="mono-label mono-label--red">PHOTO SET / {publicListing.gallery.length}</span>
              <h2 className="display-h2">See the whole <em>shape of it.</em></h2>
            </div>
            <button
              type="button"
              className="text-link"
              aria-expanded={showAllPhotos}
              aria-controls="property-photo-grid"
              onClick={() => setShowAllPhotos((current) => !current)}
            >
              {showAllPhotos ? 'Show featured set' : `View all ${publicListing.gallery.length} photos`}
            </button>
          </div>

          <div id="property-photo-grid" className={styles.galleryGrid}>
            {visiblePhotos.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                className={styles.galleryButton}
                onClick={() => setOpenIndex(index)}
                aria-label={`Open photo ${index + 1} of ${publicListing.gallery.length}: ${photo.alt}`}
              >
                <img
                  src={photo.src}
                  srcSet={photo.srcSet}
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
        photos={publicListing.gallery}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onChange={setOpenIndex}
      />
    </ListingShell>
  );
}
