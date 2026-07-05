import { PROOF } from '../data/proof';
import { ROUTES } from '../data/routes';
import { smartMoveLink } from '../utils/links';
import { RouteLine } from './RouteLine';
import styles from './CommandHero.module.css';

export function CommandHero() {
  return (
    <div className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <p className={`mono-label ${styles.coords}`}>
          29.7604° N / 95.3698° W&ensp;·&ensp;HOUSTON, TX
          <span className={styles.coordsTail}>&ensp;·&ensp;REAL ESTATE &amp; PROPERTY SERVICES</span>
        </p>

        <div className={styles.grid}>
          <div className={styles.left}>
            <h1 className={styles.headline}>
              <span className={styles.line1}>Houston,</span>
              <span className={styles.line2}>
                handled<span className={styles.period}>.</span>
              </span>
            </h1>

            <p className={styles.thesis}>
              Real estate guidance, rental support, furnished stays, and
              property services — organized around the way people actually move
              through Houston. Led by Joey Williams, REALTOR®, with Christin
              Rachelle Group.
            </p>

            <div className={styles.ctas}>
              <a href={smartMoveLink()} className="btn btn--primary" rel="noopener">
                <span className="tick">▸</span> Let&rsquo;s Move
              </a>
              <a href="#routes" className="btn btn--ghost">
                Explore services
              </a>
            </div>
          </div>

          {/* Desktop-only system index — data-driven preview of the Route Board */}
          <aside className={styles.rail} aria-label="System index">
            <p className={`mono-label ${styles.railHead}`}>
              SERVICES · {String(ROUTES.length).padStart(2, '0')} WAYS TO START
            </p>
            <ul className={styles.railList}>
              {ROUTES.map((route) => (
                <li key={route.id}>
                  <a
                    href={route.href}
                    className={styles.railRow}
                    {...(route.actionType === 'smart_move' ? { rel: 'noopener' } : {})}
                  >
                    <span className={styles.railNum}>{route.number}</span>
                    <span className={styles.railLabel}>{route.label}</span>
                    <span className={styles.railDest}>
                      {route.actionType === 'smart_move' ? 'SMART MOVE' : 'ON THIS PAGE'}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className={styles.statusRow}>
          {PROOF.map((tile) => (
            <div key={tile.id} className={styles.status}>
              <span className={`mono-label ${styles.statusLabel}`}>{tile.label}</span>
              <span className={styles.statusValue}>{tile.value}</span>
              {tile.detail && <span className={styles.statusDetail}>{tile.detail}</span>}
            </div>
          ))}
        </div>
      </div>

      <RouteLine />
    </div>
  );
}
