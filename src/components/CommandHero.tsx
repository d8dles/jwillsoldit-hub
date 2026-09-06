import { smartMoveLink } from '../utils/links';
import styles from './CommandHero.module.css';

export function CommandHero() {
  return (
    <div className={styles.hero}>
      <img className={styles.image} src="/listings/4231-tulip-oak-dr/optimized/TP-001.jpg" alt="Houston-area home at dusk" width={1600} height={1066} />
      <div className={styles.scrim} aria-hidden="true" />
      <div className={styles.content}>
        <p className={styles.location}>29.7604° N · 95.3698° W · HOUSTON, TEXAS</p>
        <h1 className={styles.headline}>Texas, <em>handled.</em></h1>
        <p className={styles.thesis}>Houston real estate, seen clearly—from the home itself to the street, the commute, the flood history, and the details that change by address.</p>
        <div className={styles.actions}>
          <a href={smartMoveLink()} className={styles.primary} rel="noopener">Start your Smart Move</a>
          <a href="/listings" className={styles.secondary}>Explore real estate</a>
        </div>
      </div>
      <div className={styles.rail} aria-label="Services">
        <a href="/listings">Buy</a><a href="#rentals">Rent</a><a href="#manage">Sell &amp; manage</a><a href="#joey">Relocate</a>
      </div>
      <p className={styles.caption}>A Houston move is more than a listing. Let&rsquo;s read the whole picture.</p>
    </div>
  );
}
