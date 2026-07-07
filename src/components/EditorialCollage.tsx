import styles from './EditorialCollage.module.css';

// Texas editorial collage — the hero's atmospheric layer.
// Selected real assets only (public/assets/editorial/), treated like a
// magazine spread: warm desaturation, hairline borders, ghosted landscape,
// faint Texas route motif. Decorative — the headline carries the message.

const EDITORIAL = '/assets/editorial';

/* Simplified Texas outline + route trace. Faint by design — a map motif,
   not a travel app. Coordinates hand-plotted from state boundary landmarks. */
function TexasRouteMap() {
  return (
    <svg
      className={styles.map}
      viewBox="0 0 200 195"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className={styles.mapOutline}
        d="M53,2 L99,2 L99,35 L111,37 L146,46 L188,52 L188,78 L193,97 L190,117
           L169,131 L153,139 L141,153 L142,180 L138,183 L113,173 L107,155
           L89,128 L78,116 L65,114 L56,126 L44,124 L32,119 L26,102 L6,88
           L2,82 L53,78 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <path
        className={styles.mapRoute}
        d="M76,30 C95,55 120,75 148,100 C156,106 162,110 166,113"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3 4"
        vectorEffect="non-scaling-stroke"
      />
      <path
        className={styles.mapStar}
        d="M167,109.5 L168.1,112.1 L170.8,112.3 L168.7,114 L169.4,116.7 L167,115.2 L164.6,116.7 L165.3,114 L163.2,112.3 L165.9,112.1 Z"
      />
      <text className={styles.mapLabel} x="160" y="124">
        HOUSTON
      </text>
    </svg>
  );
}

export function EditorialCollage() {
  return (
    <div className={styles.collage} aria-label="Texas editorial collage" role="img">
      {/* Ghosted Houston-scale anchor — Memorial Park routes toward downtown */}
      <img
        className={styles.ghost}
        src={`${EDITORIAL}/memorial-park-routes.jpg`}
        alt=""
        loading="eager"
        aria-hidden="true"
      />

      <TexasRouteMap />

      <figure className={`${styles.tile} ${styles.tileCity}`}>
        <img
          src={`${EDITORIAL}/houston-architecture.jpg`}
          alt="Downtown Houston architecture along the bayou"
          loading="eager"
        />
      </figure>

      <figure className={`${styles.tile} ${styles.tileLand}`}>
        <img
          src={`${EDITORIAL}/texas-land-acreage.jpg`}
          alt="Texas farm and acreage from above"
          loading="lazy"
        />
      </figure>

      <figure className={`${styles.tile} ${styles.tileInterior}`}>
        <img
          src={`${EDITORIAL}/interior-editorial.jpg`}
          alt="Light architectural interior with a curved staircase"
          loading="lazy"
        />
      </figure>

      <figure className={`${styles.tile} ${styles.tileHome}`}>
        <img
          src={`${EDITORIAL}/warm-residential.jpg`}
          alt="Warm modern living room"
          loading="lazy"
        />
      </figure>
    </div>
  );
}
