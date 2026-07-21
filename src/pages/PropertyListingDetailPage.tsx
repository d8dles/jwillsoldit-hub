import { useMemo, useState } from 'react';
import { PageMeta } from '../components/PageMeta';
import { ListingShell } from '../components/ListingShell';
import { PhotoLightbox } from '../components/PhotoLightbox';
import type { Listing } from '../data/listings';
import { listingToInventoryRecord, toPropertyPageModel, type PublicInventoryRecord } from '../data/publicInventory';
import { SITE_ORIGIN } from '../data/seo';
import { usePublicInventoryRecord } from '../hooks/usePublicInventory';
import { smartMoveLink, telLink } from '../utils/links';
import styles from './RentalListingDetailPage.module.css';

interface PropertyListingDetailPageProps {
  record: PublicInventoryRecord;
}

export function PropertyListingDetailPage({ record }: PropertyListingDetailPageProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const model = useMemo(() => toPropertyPageModel(record), [record]);
  const visiblePhotos = showAllPhotos ? model.gallery : model.gallery.slice(0, 12);
  const sourceLink = model.sourceLinks[0];
  const inquiryIntent = model.offeringType === 'sale' ? 'buy' : model.offeringType === 'stay' ? 'stay' : 'rent';
  const inquiryUrl = model.inquiryUrl || smartMoveLink(inquiryIntent);
  const nextStepLabel = model.offeringType === 'sale' ? 'Start the purchase route' : model.offeringType === 'stay' ? 'Start the stay route' : 'Start the rental route';
  const ctaQuestion = model.offeringType === 'sale' ? 'Want to take the next step?' : 'Want to see it?';
  const seo = useMemo(() => ({
    outputPath: `${model.publicPath.replace(/^\//, '')}index.html`,
    title: `${model.title} | ${model.offeringLabel} | JWILLSOLDIT`,
    description: `${model.title} is presented by JWILLSOLDIT with current property details, photos, and a direct inquiry route.`,
    canonical: `${SITE_ORIGIN}${model.publicPath}`,
    image: model.heroImage ? `${SITE_ORIGIN}${model.heroImage.src}` : `${SITE_ORIGIN}/assets/og-hub-v1.png`,
    jsonLdId: 'listing-jsonld',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'RealEstateListing',
      name: model.title,
      url: `${SITE_ORIGIN}${model.publicPath}`,
      image: model.gallery.map((photo) => `${SITE_ORIGIN}${photo.src}`),
      description: model.description,
      numberOfBedrooms: record.bedrooms,
      numberOfBathroomsTotal: record.bathrooms,
      address: {
        '@type': 'PostalAddress',
        streetAddress: record.addressLine,
        addressLocality: record.city,
        addressRegion: record.state,
        postalCode: record.zip,
        addressCountry: 'US',
      },
    },
  }), [model, record]);

  return (
    <ListingShell mobileIntent={inquiryIntent}>
      <PageMeta seo={seo} jsonLdId="listing-jsonld" />

      <section className={styles.hero}>
        <div className="container">
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <a href="/listings">Listings</a>
            <span aria-hidden="true">/</span>
            <a href={record.offeringType === 'rental' ? '/listings/rentals' : '/listings'}>{model.offeringLabel}</a>
            <span aria-hidden="true">/</span>
            <span>{model.addressLine}</span>
          </nav>

          <div className={styles.heroGrid}>
            <div className={styles.heroImageFrame}>
              {model.heroImage ? (
                <img
                  src={model.heroImage.src}
                  srcSet={model.heroImage.srcSet}
                  alt={model.heroImage.alt}
                  className={styles.heroImage}
                  sizes="(min-width: 860px) 62vw, 100vw"
                />
              ) : <span className="mono-label">PHOTO SET / COMING SOON</span>}
              <span className={styles.heroIndex}>PROPERTY / 01</span>
            </div>

            <div className={styles.factPanel}>
              <span className="mono-label mono-label--red">{model.statusLabel}</span>
              <h1 className={styles.address}>{model.addressLine}</h1>
              <p className={styles.location}>{model.location}</p>
              <p className={styles.price}>{model.priceLabel}</p>

              <div className={styles.stats} aria-label="Property facts">
                {model.stats.map((stat) => (
                  <span key={stat.label}><strong>{stat.value}</strong> {stat.label}</span>
                ))}
              </div>

              <div className={styles.actions}>
                <a href={inquiryUrl} className="btn btn--primary" rel="noopener">
                  <span className="tick">▸</span> Send an inquiry
                </a>
                {sourceLink && (
                  <a href={sourceLink.url} className="btn btn--on-dark" target="_blank" rel="noopener noreferrer">
                    View current record <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>

              {sourceLink && <p className={styles.mlsLine}>{sourceLink.label}</p>}
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.overview}`}>
        <div className="container">
          <div className={styles.overviewGrid}>
            <div>
              <span className="mono-label mono-label--red">THE PROPERTY / AT A GLANCE</span>
              <h2 className="display-h2">{model.heading}</h2>
            </div>
            <div className={styles.copy}>
              <p>{model.description}</p>
              <p className={styles.sourceNote}>
                Facts, availability, and terms are presented by JWILLSOLDIT from the current property record. Confirm details before applying, booking, or making an offer.
              </p>
            </div>
          </div>

          <div className={styles.detailsGrid}>
            <div className={styles.featureBlock}>
              <span className="mono-label">FEATURES / {String(model.features.length).padStart(2, '0')}</span>
              {model.features.length > 0 ? (
                <ul className={styles.features}>
                  {model.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
              ) : <p className={styles.copy}>Property features will be added as the record is completed.</p>}
            </div>
            <dl className={styles.details}>
              {model.details.map((detail) => (
                <div key={detail.label}><dt>{detail.label}</dt><dd>{detail.value}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className={`section section--hairline-top ${styles.gallerySection}`}>
        <div className="container">
          <div className={styles.galleryHeader}>
            <div>
              <span className="mono-label mono-label--red">PHOTO SET / {model.gallery.length}</span>
              <h2 className="display-h2">See the whole <em>shape of it.</em></h2>
            </div>
            {model.gallery.length > 12 && (
              <button
                type="button"
                className="text-link"
                aria-expanded={showAllPhotos}
                aria-controls="property-photo-grid"
                onClick={() => setShowAllPhotos((current) => !current)}
              >
                {showAllPhotos ? 'Show featured set' : `View all ${model.gallery.length} photos`}
              </button>
            )}
          </div>

          <div id="property-photo-grid" className={styles.galleryGrid}>
            {visiblePhotos.map((photo, index) => (
              <button
                key={`${photo.src}-${index}`}
                type="button"
                className={styles.galleryButton}
                onClick={() => setOpenIndex(index)}
                aria-label={`Open photo ${index + 1} of ${model.gallery.length}: ${photo.alt}`}
              >
                <img src={photo.src} srcSet={photo.srcSet} alt={photo.alt} loading="lazy" sizes="(min-width: 860px) 25vw, 50vw" className={styles.galleryImage} />
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
              <span className="mono-label mono-label--red">NEXT STEP / {model.offeringLabel.toUpperCase()}</span>
              <h2>{ctaQuestion}</h2>
            </div>
            <div className={styles.ctaActions}>
              <a href={inquiryUrl} className="btn btn--primary" rel="noopener">
                <span className="tick">▸</span> {nextStepLabel}
              </a>
              <a href={telLink()} className="btn btn--on-dark">Call Joey</a>
            </div>
          </div>
        </div>
      </section>

      <PhotoLightbox photos={model.gallery} openIndex={openIndex} onClose={() => setOpenIndex(null)} onChange={setOpenIndex} />
    </ListingShell>
  );
}

interface PropertyListingRoutePageProps {
  slug: string;
  fallbackListing?: Listing;
}

export function PropertyListingRoutePage({ slug, fallbackListing }: PropertyListingRoutePageProps) {
  const { loaded, backendConfigured, record } = usePublicInventoryRecord(slug);
  const fallbackRecord = fallbackListing ? listingToInventoryRecord(fallbackListing) : null;

  if (loaded && backendConfigured && !record) {
    return (
      <ListingShell mobileIntent="rent">
        <section className={styles.unavailable}>
          <div className="container">
            <span className="mono-label mono-label--red">LISTING / NO LONGER PUBLIC</span>
            <h1>This property is no longer <em>on the board.</em></h1>
            <p>The property may be rented, pending, booked, sold, or being held off-market. Browse current JWILLSOLDIT inventory for the next available route.</p>
            <div className={styles.unavailableActions}>
              <a href="/listings" className="btn btn--primary"><span className="tick">▸</span> Browse listings</a>
              <a href="/listings/rentals" className="btn btn--on-dark">View rentals</a>
            </div>
          </div>
        </section>
      </ListingShell>
    );
  }

  if (record) return <PropertyListingDetailPage record={record} />;
  if (!loaded && fallbackRecord) return <PropertyListingDetailPage record={fallbackRecord} />;
  if (!backendConfigured && fallbackRecord) return <PropertyListingDetailPage record={fallbackRecord} />;

  return (
    <ListingShell mobileIntent="rent">
      <section className={styles.unavailable}>
        <div className="container">
          <span className="mono-label mono-label--red">LISTING / LOADING</span>
          <h1>Property details are <em>on the way.</em></h1>
          <p>JWILLSOLDIT is preparing the public property record. Please check back shortly.</p>
        </div>
      </section>
    </ListingShell>
  );
}
