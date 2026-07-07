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
    </div>
  );
}
