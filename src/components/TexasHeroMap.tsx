import styles from './TexasHeroMap.module.css';

// Texas hero map. The outline path is the same vector committed at
// public/assets/editorial/texas-outline.svg, inlined here so the city
// labels share ONE SVG coordinate system (viewBox 0 0 116 96) — positioned
// in real projected geography, never with arbitrary CSS left/top percentages.
// Houston is the emphasis; the other cities are quiet. Every label sits
// INSIDE the state and none cross the border. No route lines, no blob.

const TX_PATH =
  'M29.8,5.4 L50.6,5.4 L50.6,20.9 L54.6,22.4 L57.8,23 L63.6,24.4 L68.6,26.2 ' +
  'L75.3,27.2 L81,26.4 L87.3,28.1 L91.4,29 L91.4,43 L93,49.4 L93.4,56.6 ' +
  'L92.9,59 L86.6,62.6 L82.8,66.6 L75.3,70.2 L70.8,73.4 L68.8,79 L68.4,86.2 ' +
  'L70.1,89.8 L62.2,86.6 L56.8,86.2 L54,77.4 L50.6,71 L46.1,64.6 L40,59.2 ' +
  'L34.3,59.1 L31.2,63.2 L28.1,65.4 L22.1,62.2 L18.5,56 L13.6,51 L8.1,45.7 ' +
  'L5.8,43.2 L5.2,41.4 L29.8,41.4 Z';

// Minor cities — subtle, but legible. Coordinates share the outline's
// 116×96 projected space; each label is placed to sit inside Texas.
interface City {
  id: string;
  name: string;
  x: number; // dot
  y: number;
  lx: number; // label anchor point
  ly: number;
  anchor: 'start' | 'middle' | 'end';
}

const CITIES: City[] = [
  { id: 'elpaso', name: 'El Paso', x: 8.5, y: 43.6, lx: 11.5, ly: 44.3, anchor: 'start' },
  { id: 'austin', name: 'Austin', x: 66.1, y: 55.2, lx: 63.4, ly: 54.9, anchor: 'end' },
  { id: 'sanantonio', name: 'San Antonio', x: 60.9, y: 62, lx: 60.9, ly: 66.1, anchor: 'middle' },
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

        <path className={styles.outline} d={TX_PATH} />

        {CITIES.map((c) => (
          <g key={c.id} className={styles.city}>
            <circle className={styles.dot} cx={c.x} cy={c.y} r="0.9" />
            <text className={styles.label} x={c.lx} y={c.ly} textAnchor={c.anchor}>
              {c.name}
            </text>
          </g>
        ))}

        {/* Dallas / Fort Worth — two lines so the long name stays inside the state */}
        <g className={styles.city}>
          <circle className={styles.dot} cx="71.2" cy="35.3" r="0.9" />
          <text className={styles.label} x="71.2" y="30.9" textAnchor="middle">
            Dallas /
          </text>
          <text className={styles.label} x="71.2" y="33.7" textAnchor="middle">
            Fort Worth
          </text>
        </g>

        {/* Houston — the emphasis: highlighted dot, copper glow, bold label */}
        <g className={styles.houston}>
          <circle className={styles.houstonGlow} cx="82.3" cy="59.3" r="4.6" />
          <circle className={styles.houstonDot} cx="82.3" cy="59.3" r="1.8" />
          <text className={styles.houstonLabel} x="79.4" y="60.4" textAnchor="end">
            Houston
          </text>
        </g>
      </svg>
    </div>
  );
}
