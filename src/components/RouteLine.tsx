import styles from './RouteLine.module.css';

// 2D route-line motif — the flat descendant of the Smart Move plotline.
// Pure SVG + CSS stroke animation. Decorative only (aria-hidden).
// This is the ONLY "graphic" device on the page. No 3D. Ever.

export function RouteLine() {
  return (
    <svg
      className={styles.routeLine}
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className={styles.path}
        d="M0,90 L180,90 L230,40 L470,40 L520,90 L760,90 L810,40 L1050,40 L1100,90 L1200,90"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle className={styles.node} cx="230" cy="40" r="3.5" />
      <circle className={styles.node} cx="520" cy="90" r="3.5" />
      <circle className={styles.node} cx="810" cy="40" r="3.5" />
      <circle className={styles.node} cx="1100" cy="90" r="3.5" />
    </svg>
  );
}
