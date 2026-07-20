import styles from './BrandLockup.module.css';

interface BrandLockupProps {
  onDark?: boolean;
  compact?: boolean;
  href?: string;
}

export function BrandLockup({
  onDark = false,
  compact = false,
  href = '#top',
}: BrandLockupProps) {
  return (
    <a
      href={href}
      className={`${styles.lockup} ${onDark ? styles.onDark : ''}`}
      aria-label="JWILLSOLDIT — home"
    >
      <span className={styles.wordmark}>
        JWILLSOLDIT<span className={styles.dot}>.</span>
      </span>
      {!compact && <span className={styles.sub}>TEXAS REAL ESTATE</span>}
    </a>
  );
}
