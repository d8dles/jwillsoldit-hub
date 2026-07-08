import styles from './EditorialCollage.module.css';

const TEXAS_SVG = 'https://upload.wikimedia.org/wikipedia/commons/3/37/Map_of_Texas_%28blank%29.svg';

export function EditorialCollage() {
  return (
    <div className={styles.collage} aria-hidden="true">
      <div className={styles.mapWrap}>
        <img className={styles.texasMap} src={TEXAS_SVG} alt="" loading="eager" />
        <div className={styles.houstonMarker}>
          <span className={styles.houstonDot} />
          <span className={styles.houstonLabel}>Houston</span>
        </div>
      </div>
    </div>
  );
}
