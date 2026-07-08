import styles from './TexasHeroMap.module.css';

// Texas hero map. The outline path is the same vector committed at
// public/assets/editorial/texas-outline.svg, inlined here so the city
// labels share ONE SVG coordinate system (viewBox 0 0 116 96) — positioned
// in real projected geography, never with arbitrary CSS left/top percentages.
// Houston is the emphasis; the other cities are quiet. No route lines, no
// warped blob, no cartoon map.

const TX_PATH =
  'M29.8,5.4 L50.6,5.4 L50.6,20.9 L54.6,22.4 L57.8,23 L63.6,24.4 L68.6,26.2 ' +
  'L75.3,27.2 L81,26.4 L87.3,28.1 L91.4,29 L91.4,43 L93,49.4 L93.4,56.6 ' +
  'L92.9,59 L86.6,62.6 L82.8,66.6 L75.3,70.2 L70.8,73.4 L68.8,79 L68.4,86.2 ' +
  'L70.1,89.8 L62.2,86.6 L56.8,86.2 L54,77.4 L50.6,71 L46.1,64.6 L40,59.2 ' +
  'L34.3,59.1 L31.2,63.2 L28.1,65.4 L22.1,62.2 L18.5,56 L13.6,51 L8.1,45.7 ' +
  'L5.8,43.2 L5.2,41.4 L29.8,41.4 Z';

// Minor cities — subtle. Coordinates are in the same 116×96 projected space
// as the outline, so each label sits inside Texas at its true location.
interface City {
  id: string;
  name: string;
  x: number;
  y: number;
  lx: number;
  ly: number;
  anchor: 'start' | 'middle' | 'end';
}

const CITIES: City[] = [
  { id: 'elpaso', name: 'El Paso', x: 7.4, y: 43.4, lx: 10.6, ly: 44.2, anchor: 'start' },
  { id: 'dfw', name: 'Dallas / Fort Worth', x: 71.2, y: 35.3, lx: 71.2, ly: 31.4, anchor: 'middle' },
  { id: 'austin', name: 'Austin', x: 66.1, y: 55.2, lx: 63.4, ly: 55.9, anchor: 'end' },
  { id: 'sanantonio', name: 'San Antonio', x: 60.9, y: 62, lx: 58.2, ly: 62.7, anchor: 'end' },
];

export function TexasHeroMap() {
  return (
    <div className={styles.wrap}>
      <svg
        className={styles.map}
        viewBox="0 0 116 96"
        role="img"
        aria-label="Texas — Houston-rooted, serving statewide"
      >
        <title>Texas — Houston-rooted, serving statewide</title>

        <path className={styles.outline} d={TX_PATH} />

        {CITIES.map((c) => (
          <g key={c.id} className={styles.city}>
            <circle className={styles.dot} cx={c.x} cy={c.y} r="0.85" />
            <text className={styles.label} x={c.lx} y={c.ly} textAnchor={c.anchor}>
              {c.name}
            </text>
          </g>
        ))}

        {/* Houston — the emphasis: highlighted dot, copper glow, bold label */}
        <g className={styles.houston}>
          <circle className={styles.houstonGlow} cx="82.3" cy="59.3" r="4.6" />
          <circle className={styles.houstonDot} cx="82.3" cy="59.3" r="1.7" />
          <text className={styles.houstonLabel} x="85.4" y="60.4" textAnchor="start">
            Houston
          </text>
        </g>
      </svg>
    </div>
  );
}
