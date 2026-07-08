import styles from './EditorialCollage.module.css';

const EDITORIAL = '/assets/editorial';

const MAJOR_CITIES = [
  { name: 'El Paso', x: 18, y: 99 },
  { name: 'Amarillo', x: 82, y: 22 },
  { name: 'Fort Worth', x: 116, y: 75 },
  { name: 'Dallas', x: 134, y: 72 },
  { name: 'Austin', x: 119, y: 121 },
  { name: 'San Antonio', x: 104, y: 139 },
];

const SMALL_CITIES = [
  { name: 'Lubbock', x: 81, y: 48 },
  { name: 'Midland', x: 80, y: 99 },
  { name: 'Waco', x: 132, y: 94 },
  { name: 'College Station', x: 145, y: 115 },
  { name: 'Corpus Christi', x: 139, y: 153 },
  { name: 'Laredo', x: 104, y: 161 },
  { name: 'McAllen', x: 121, y: 181 },
  { name: 'Beaumont', x: 183, y: 126 },
];

function TexasMapLayer() {
  return (
    <svg className={styles.map} viewBox="0 0 200 195" aria-hidden="true" focusable="false">
      <path
        className={styles.mapShadow}
        d="M53,2 L99,2 L99,35 L111,37 L146,46 L188,52 L188,78 L193,97 L190,117 L169,131 L153,139 L141,153 L142,180 L138,183 L113,173 L107,155 L89,128 L78,116 L65,114 L56,126 L44,124 L32,119 L26,102 L6,88 L2,82 L53,78 Z"
      />
      <path
        className={styles.mapOutline}
        d="M53,2 L99,2 L99,35 L111,37 L146,46 L188,52 L188,78 L193,97 L190,117 L169,131 L153,139 L141,153 L142,180 L138,183 L113,173 L107,155 L89,128 L78,116 L65,114 L56,126 L44,124 L32,119 L26,102 L6,88 L2,82 L53,78 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      {MAJOR_CITIES.map((city) => (
        <text key={city.name} className={styles.majorCity} x={city.x} y={city.y}>
          {city.name}
        </text>
      ))}
      {SMALL_CITIES.map((city) => (
        <text key={city.name} className={styles.smallCity} x={city.x} y={city.y}>
          {city.name}
        </text>
      ))}
      <g className={styles.houstonGlow}>
        <circle cx="166" cy="125" r="28" />
        <circle cx="166" cy="125" r="8" />
        <text x="151" y="121">Houston</text>
      </g>
    </svg>
  );
}

export function EditorialCollage() {
  return (
    <div className={styles.collage} aria-hidden="true">
      <TexasMapLayer />

      <div className={styles.imageLayer}>
        <img
          className={`${styles.image} ${styles.cityImage}`}
          src={`${EDITORIAL}/houston-architecture.jpg`}
          alt=""
          loading="eager"
        />
        <img
          className={`${styles.image} ${styles.landImage}`}
          src={`${EDITORIAL}/texas-land-acreage.jpg`}
          alt=""
          loading="eager"
        />
        <img
          className={`${styles.image} ${styles.interiorImage}`}
          src={`${EDITORIAL}/interior-editorial.jpg`}
          alt=""
          loading="eager"
        />
        <img
          className={`${styles.image} ${styles.homeImage}`}
          src={`${EDITORIAL}/warm-residential.jpg`}
          alt=""
          loading="eager"
        />
      </div>
    </div>
  );
}
