import { PROOF } from '../data/proof';
import { smartMoveLink } from '../utils/links';
import { RouteLine } from './RouteLine';
import { EditorialCollage } from './EditorialCollage';
import styles from './CommandHero.module.css';

export function CommandHero() {
  return (
    <div className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <p className={`mono-label ${styles.coords}`}>
          29.7604° N / 95.3698° W&ensp;·&ensp;HOUSTON, TX
          <span className={styles.coordsTail}>&ensp;·&ensp;SERVING TEXAS</span>
        </p>

        <div className={styles.grid}>
          <div className={styles.left}>
            <h1 className={styles.headline}>
              <span className={styles.line1}>Texas,</span>
              <span className={styles.line2}>
                handled<span className={styles.period}>.</span>
              </span>
            </h1>

            <p className={styles.thesis}>
              Houston-rooted real estate guidance, furnished stays, rental
              support, and property strategy across Texas — built around the
              way people actually move.
            </p>

            <div className={styles.ctas}>
              <a href={smartMoveLink()} className="btn btn--primary" rel="noopener">
                <span className="tick">▸</span> Start Smart Move
              </a>
              <a href="#routes" className="btn btn--ghost">
                Explore Services
              </a>
            </div>
          </div>

          <div className={styles.right}>
            <EditorialCollage />
          </div>
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
