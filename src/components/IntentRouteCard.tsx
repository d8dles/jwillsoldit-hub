import type { IntentRoute } from '../data/types';
import { useReveal } from '../utils/motion';
import styles from './IntentRouteCard.module.css';

// Rendered as an editorial index row — deliberately NOT a card-grid card.

interface IntentRouteCardProps {
  route: IntentRoute;
}

export function IntentRouteCard({ route }: IntentRouteCardProps) {
  const ref = useReveal<HTMLAnchorElement>();
  const external = route.actionType === 'smart_move';

  return (
    <a
      ref={ref}
      href={route.href}
      className={`${styles.row} reveal`}
      {...(external ? { rel: 'noopener' } : {})}
    >
      <span className={styles.number} aria-hidden="true">
        {route.number}
      </span>

      <span className={styles.main}>
        <span className={styles.label}>{route.label}</span>
        <span className={styles.shortTitle}>{route.shortTitle}</span>
      </span>

      <span className={styles.detail}>
        <span className={styles.description}>{route.description}</span>
        <span className={`mono-label ${styles.audience}`}>&ldquo;{route.audience}&rdquo;</span>
      </span>

      <span className={styles.action} aria-hidden="true">
        <span className={styles.destination}>{external ? 'START' : 'EXPLORE'}</span>
        <span className={styles.arrow}>→</span>
      </span>
    </a>
  );
}
