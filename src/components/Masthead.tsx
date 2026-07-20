import { BrandLockup } from './BrandLockup';
import { smartMoveLink, telLink, smsLink } from '../utils/links';
import styles from './Masthead.module.css';

const NAV = [
  { label: 'Move', href: smartMoveLink(), external: true },
  { label: 'Stay', href: '#stays', external: false },
  { label: 'Rent', href: '#rentals', external: false },
  { label: 'Listings', href: '/listings', external: false },
  { label: 'Sell', href: smartMoveLink('sell'), external: true },
  { label: 'Own', href: '#manage', external: false },
  { label: 'Invest', href: '#invest', external: false },
  { label: 'Guides', href: '#guides', external: false },
  { label: 'Houston, Handled.', href: '/houston', external: false },
  { label: 'Joey', href: '#joey', external: false },
  { label: 'Contact', href: '#contact', external: false },
];

function sectionHref(href: string): string {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  if (href === '#rentals' && pathname !== '/') return '/rentals';
  return pathname === '/' ? href : `/${href}`;
}

export function Masthead() {
  return (
    <header className={styles.masthead}>
      <div className={styles.inner}>
        <BrandLockup href="/" />

        {/* Desktop nav */}
        <nav className={styles.nav} aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href.startsWith('#') ? sectionHref(item.href) : item.href}
              className={styles.navLink}
              {...(item.external ? { rel: 'noopener' } : {})}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          {/* Mobile-only quick actions (no dropdowns, no hamburger in Phase 1) */}
          <a href={telLink()} className={styles.quick} aria-label="Call Joey">
            Call
          </a>
          <a href={smsLink()} className={styles.quick} aria-label="Text Joey">
            Text
          </a>
          <a href={smartMoveLink()} className={styles.cta} rel="noopener">
            Start Move
          </a>
        </div>
      </div>
    </header>
  );
}
