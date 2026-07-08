import styles from './EditorialCollage.module.css';

const TEXAS_PATH =
  'M66 10 H116 V41 L133 43 L153 49 L176 54 L218 58 L222 78 L230 92 L226 112 L211 123 L194 131 L181 140 L170 153 L169 177 L162 198 L145 190 L132 169 L119 153 L106 139 L94 130 L82 128 L72 137 L61 132 L53 121 L44 112 L31 104 L10 98 H66 Z';

const MAJOR_CITIES = [
  { name: 'El Paso', x: 20, y: 96 },
  { name: 'Amarillo', x: 82, y: 30 },
  { name: 'Dallas', x: 178, y: 75 },
  { name: 'Fort Worth', x: 156, y: 82 },
  { name: 'Austin', x: 158, y: 122 },
  { name: 'San Antonio', x: 138, y: 141 },
];

const SMALL_CITIES = [
  { name: 'Lubbock', x: 84, y: 58 },
  { name: 'Midland', x: 83, y: 91 },
  { name: 'Odessa', x: 74, y: 98 },
  { name: 'Waco', x: 166, y: 101 },
  { name: 'Killeen', x: 151, y: 111 },
  { name: 'College Station', x: 179, y: 116 },
  { name: 'Tyler', x: 205, y: 86 },
  { name: 'Beaumont', x: 214, y: 126 },
  { name: 'Corpus Christi', x: 164, y: 163 },
  { name: 'Laredo', x: 126, y: 169 },
  { name: 'McAllen', x: 150, y: 190 },
  { name: 'Brownsville', x: 166, y: 198 },
];

function TexasMapLayer() {
  return (
    <svg className={styles.map} viewBox="0 0 240 215" aria-hidden="true" focusable="false">
      <path className={styles.mapLift} d={TEXAS_PATH} />
      <path className={styles.mapPaper} d={TEXAS_PATH} />
      <path className={styles.mapOutline} d={TEXAS_PATH} />

      {SMALL_CITIES.map((city) => (
        <text key={city.name} className={styles.smallCity} x={city.x} y={city.y}>
          {city.name}
        </text>
      ))}

      {MAJOR_CITIES.map((city) => (
        <text key={city.name} className={styles.majorCity} x={city.x} y={city.y}>
          {city.name}
        </text>
      ))}

      <g className={styles.houstonGlow}>
        <circle cx="199" cy="126" r="29" />
        <circle cx="199" cy="126" r="8" />
        <text x="180" y="121">Houston</text>
      </g>
    </svg>
  );
}

export function EditorialCollage() {
  return (
    <div className={styles.collage} aria-hidden="true">
      <TexasMapLayer />
    </div>
  );
}
