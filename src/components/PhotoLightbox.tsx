import { useEffect } from 'react';
import type { ListingPhoto } from '../data/listings';
import styles from './PhotoLightbox.module.css';

interface PhotoLightboxProps {
  photos: ListingPhoto[];
  openIndex: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}

export function PhotoLightbox({ photos, openIndex, onClose, onChange }: PhotoLightboxProps) {
  useEffect(() => {
    if (openIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') {
        onChange((openIndex - 1 + photos.length) % photos.length);
      }
      if (event.key === 'ArrowRight') {
        onChange((openIndex + 1) % photos.length);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onChange, onClose, openIndex, photos.length]);

  if (openIndex === null) return null;

  const photo = photos[openIndex];
  const previousIndex = (openIndex - 1 + photos.length) % photos.length;
  const nextIndex = (openIndex + 1) % photos.length;

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label="Property photo viewer"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.viewer}>
        <div className={styles.toolbar}>
          <span className={styles.counter}>
            {String(openIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </span>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close photo viewer">
            Close <span aria-hidden="true">×</span>
          </button>
        </div>

        <figure className={styles.figure}>
          <img src={photo.src} alt={photo.alt} className={styles.image} />
          <figcaption className={styles.caption}>{photo.alt}</figcaption>
        </figure>

        <div className={styles.controls}>
          <button type="button" className={styles.navButton} onClick={() => onChange(previousIndex)} aria-label="Previous photo">
            <span aria-hidden="true">←</span> Previous
          </button>
          <button type="button" className={styles.navButton} onClick={() => onChange(nextIndex)} aria-label="Next photo">
            Next <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
