import { ROUTES } from '../data/routes';
import { IntentRouteCard } from './IntentRouteCard';
import styles from './RouteBoard.module.css';

export function RouteBoard() {
  return (
    <div className={styles.board}>
      <div className={styles.list} role="list">
        {ROUTES.map((route) => (
          <IntentRouteCard key={route.id} route={route} />
        ))}
      </div>
      <p className={`mono-label ${styles.note}`}>
        Renting, buying, selling, and relocating start with Smart Move — a short
        guided planning experience at move.jwillsoldit.com. Stays and owner
        services are arranged directly on this page.
      </p>
    </div>
  );
}
