import styles from './BrandLockup.module.css';

interface BrandLockupProps {
  onDark?: boolean;
  compact?: boolean;
}

export function BrandLockup({ onDark = false, compact = false }: BrandLockupProps) {
  return (
    <a
      href="#top"
      className={`${styles.lockup} ${onDark ? styles.onDark : ''}`}
      aria-label="JWILLSOLDIT — back to top"
    >
      <span className={styles.wordmark}>
        JWILLSOLDIT<span className={styles.dot}>.</span>
      </span>
      {!compact && <span className={styles.sub}>HOUSTON REAL ESTATE</span>}
    </a>
  );
}
