import { useEffect, useRef } from 'react';
import type { ListingPhoto } from '../data/listings';
import styles from './PhotoLightbox.module.css';

interface PhotoLightboxProps {
  photos: ListingPhoto[];
  openIndex: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}

export function PhotoLightbox({ photos, openIndex, onClose, onChange }: PhotoLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const currentIndexRef = useRef<number | null>(openIndex);
  const onCloseRef = useRef(onClose);
  const onChangeRef = useRef(onChange);
  const isOpen = openIndex !== null;

  currentIndexRef.current = openIndex;
  onCloseRef.current = onClose;
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      const index = currentIndexRef.current;
      if (index === null) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onChangeRef.current((index - 1 + photos.length) % photos.length);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        onChangeRef.current((index + 1) % photos.length);
      }
      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [isOpen, photos.length]);

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
      <div ref={dialogRef} className={styles.viewer}>
        <div className={styles.toolbar}>
          <span className={styles.counter}>
            {String(openIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </span>
          <button ref={closeButtonRef} type="button" className={styles.close} onClick={onClose} aria-label="Close photo viewer">
            Close <span aria-hidden="true">×</span>
          </button>
        </div>

        <figure className={styles.figure}>
          <img src={photo.src} srcSet={photo.srcSet} sizes="100vw" alt={photo.alt} className={styles.image} />
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
