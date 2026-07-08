import styles from './EditorialCollage.module.css';

const CITIES = [
  { name: 'Dallas / Fort Worth', x: 119, y: 74 },
  { name: 'Austin', x: 119, y: 121 },
  { name: 'San Antonio', x: 105, y: 139 },
  { name: 'El Paso', x: 20, y: 97 },
  { name: 'Amarillo', x: 82, y: 22 },
];

function TexasRouteMap() {
  return (
    <svg className={styles.map} viewBox="0 0 200 195" aria-hidden="true" focusable="false">
      <path
        className={styles.mapOutline}
        d="M53,2 L99,2 L99,35 L111,37 L146,46 L188,52 L188,78 L193,97 L190,117 L169,131 L153,139 L141,153 L142,180 L138,183 L113,173 L107,155 L89,128 L78,116 L65,114 L56,126 L44,124 L32,119 L26,102 L6,88 L2,82 L53,78 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      {CITIES.map((city) => (
        <g key={city.name} className={styles.cityLabel}>
          <path
            className={styles.mapRoute}
            d={`M166,113 C146,106 124,94 ${city.x},${city.y}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2 6"
            vectorEffect="non-scaling-stroke"
          />
          <text x={city.x + 4} y={city.y + 2}>{city.name.toUpperCase()}</text>
        </g>
      ))}
      <g className={styles.houstonDot}>
        <circle cx="166" cy="113" r="13" />
        <circle cx="166" cy="113" r="5" />
        <text x="150" y="132">HOUSTON</text>
      </g>
    </svg>
  );
}

export function EditorialCollage() {
  return (
    <div className={styles.collage} aria-hidden="true">
      <TexasRouteMap />
    </div>
  );
}
