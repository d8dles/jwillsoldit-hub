import styles from './EditorialCollage.module.css';

const TEXAS_SVG = 'https://upload.wikimedia.org/wikipedia/commons/3/37/Map_of_Texas_%28blank%29.svg';

const CITIES = [
  { name: 'El Paso', className: styles.elPaso },
  { name: 'Dallas / Fort Worth', className: styles.dfw },
  { name: 'Austin', className: styles.austin },
  { name: 'San Antonio', className: styles.sanAntonio },
];

export function EditorialCollage() {
  return (
    <div className={styles.collage} aria-hidden="true">
      <div className={styles.mapWrap}>
        <img className={styles.texasMap} src={TEXAS_SVG} alt="" loading="eager" />

        {CITIES.map((city) => (
          <span key={city.name} className={`${styles.cityMarker} ${city.className}`}>
            {city.name}
          </span>
        ))}

        <div className={styles.houstonMarker}>
          <span className={styles.houstonDot} />
          <span className={styles.houstonLabel}>Houston</span>
        </div>
      </div>
    </div>
  );
}
