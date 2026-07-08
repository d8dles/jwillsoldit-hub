import styles from './TexasHeroMap.module.css';

// Texas hero map. One SVG coordinate system for the outline and labels.
// This is not a technical locator map — Houston is the emphasis, and the
// other major markets are quiet geographic context.

const TX_PATH =
  'M29.8,5.4 L50.6,5.4 L50.6,20.9 L54.6,22.4 L57.8,23 L63.6,24.4 L68.6,26.2 ' +
  'L75.3,27.2 L81,26.4 L87.3,28.1 L91.4,29 L91.4,43 L93,49.4 L93.4,56.6 ' +
  'L92.9,59 L86.6,62.6 L82.8,66.6 L75.3,70.2 L70.8,73.4 L68.8,79 L68.4,86.2 ' +
  'L70.1,89.8 L62.2,86.6 L56.8,86.2 L54,77.4 L50.6,71 L46.1,64.6 L40,59.2 ' +
  'L34.3,59.1 L31.2,63.2 L28.1,65.4 L22.1,62.2 L18.5,56 L13.6,51 L8.1,45.7 ' +
  'L5.8,43.2 L5.2,41.4 L29.8,41.4 Z';

interface City {
  id: string;
  name: string;
  x: number;
  y: number;
  anchor: 'start' | 'middle' | 'end';
}

const CITIES: City[] = [
  { id: 'elpaso', name: 'El Paso', x: 12, y: 44.6, anchor: 'start' },
  { id: 'dfw', name: 'Dallas / Fort Worth', x: 71.4, y: 32.4, anchor: 'middle' },
  { id: 'austin', name: 'Austin', x: 64.4, y: 54.9, anchor: 'end' },
  { id: 'sanantonio', name: 'San Antonio', x: 61.1, y: 66.1, anchor: 'middle' },
];

export function TexasHeroMap() {
  return (
    <div className={styles.wrap}>
      <svg
        className={styles.map}
        viewBox="0 0 116 96"
        role="img"
        aria-label="Texas — Houston-rooted, serving Austin, Dallas–Fort Worth, San Antonio, and El Paso"
      >
        <title>Texas — Houston-rooted, serving statewide</title>

        <path className={styles.paper} d={TX_PATH} />
        <path className={styles.outline} d={TX_PATH} />

        {CITIES.map((city) => (
          <text key={city.id} className={styles.label} x={city.x} y={city.y} textAnchor={city.anchor}>
            {city.name}
          </text>
        ))}

        <g className={styles.houston}>
          <circle className={styles.houstonGlow} cx="82.3" cy="59.3" r="5.8" />
          <circle className={styles.houstonDot} cx="82.3" cy="59.3" r="1.9" />
          <text className={styles.houstonLabel} x="79.1" y="60.2" textAnchor="end">
            Houston
          </text>
        </g>
      </svg>
    </div>
  );
}
