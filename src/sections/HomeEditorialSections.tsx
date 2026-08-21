import { smartMoveLink } from '../utils/links';
import styles from './HomeEditorialSections.module.css';

const base = '/listings/4231-tulip-oak-dr/optimized';

export function PropertyEditorialSection() {
  return <section className={styles.properties} aria-labelledby="property-heading">
    <div className={styles.intro}>
      <p className={styles.eyebrow}>HOUSTON REAL ESTATE · NOW</p>
      <h2 id="property-heading">See the home.<br/><em>Then see beyond it.</em></h2>
      <p>Good real estate guidance starts with the property—and keeps going. Tour the rooms, understand the numbers, then look at the address in context.</p>
      <a href="/listings" className={styles.textLink}>View current real estate →</a>
    </div>
    <a className={styles.feature} href="/listings/rentals/4231-tulip-oak-dr">
      <img src={`${base}/TP-008.jpg`} alt="Open kitchen and living area in a Houston-area home" width="1600" height="1066" loading="lazy" />
      <span className={styles.imageLabel}>Inside the home · space, light, function</span>
    </a>
    <div className={styles.detailGrid}>
      <figure><img src={`${base}/TP-026.jpg`} alt="Living area and staircase" width="1600" height="1066" loading="lazy"/><figcaption>How the rooms connect</figcaption></figure>
      <figure><img src={`${base}/TP-012.jpg`} alt="Open-plan living room" width="1600" height="1066" loading="lazy"/><figcaption>How the home lives</figcaption></figure>
    </div>
  </section>;
}

const lenses = [
  ['Inside the Loop','Closer-in rhythm','/houston/guides/traffic-and-commutes','TP-002.jpg'],
  ['West Houston','Space meets access','/houston/guides/muds-pids-and-utility-districts','TP-003.jpg'],
  ['Beyond the Beltway','More home, more tradeoffs','/houston/guides/property-taxes','TP-004.jpg'],
];

export function HoustonLensesSection() {
  return <section className={styles.lenses} aria-labelledby="lenses-heading">
    <header><p className={styles.eyebrow}>FIND YOUR HOUSTON</p><h2 id="lenses-heading">Not a “best” neighborhood.<br/><em>The right set of tradeoffs.</em></h2></header>
    <div className={styles.lensGrid}>{lenses.map(([name,line,href,image]) => <a href={href} key={name} className={styles.lens}>
      <img src={`${base}/${image}`} alt="Houston-area residential architecture" width="1600" height="1066" loading="lazy"/>
      <span><small>{line}</small><strong>{name}</strong><b>Explore the Houston guide →</b></span>
    </a>)}</div>
    <p className={styles.note}>The photographs show homes JWILLSOLDIT has represented and are visual context, not a claim that a pictured home is located in the named area.</p>
  </section>;
}

export function SmartMoveEditorialSection() {
  return <section className={styles.smart} aria-labelledby="smart-heading">
    <div className={styles.smartImage}><img src={`${base}/TP-018.jpg`} alt="Sunlit interior in a Houston-area home" width="1600" height="1066" loading="lazy"/></div>
    <div className={styles.smartCopy}>
      <p className={styles.eyebrow}>SMART MOVE · THE ENGINE UNDERNEATH</p>
      <h2 id="smart-heading">A beautiful home is the beginning.<br/><em>Clarity is the advantage.</em></h2>
      <p>Tell Smart Move what matters—budget, timing, commute, pets, space, and the life you want around the address. It turns that into a focused starting point Joey can work from.</p>
      <ul><li>Your priorities, captured once</li><li>Houston tradeoffs, made visible</li><li>A real person, carrying it forward</li></ul>
      <a href={smartMoveLink()} className={styles.smartButton} rel="noopener">Build my Smart Move →</a>
    </div>
  </section>;
}
