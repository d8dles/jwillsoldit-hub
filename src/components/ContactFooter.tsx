import { CONTACT, CONTACT_ACTIONS } from '../data/contact';
import { smartMoveLink, telLink, smsLink, mailtoLink } from '../utils/links';
import styles from './ContactFooter.module.css';

function actionHref(kind: string, subject?: string): string {
  switch (kind) {
    case 'call':
      return telLink();
    case 'text':
      return smsLink();
    case 'email':
      return mailtoLink(subject);
    case 'smart_move':
    default:
      return smartMoveLink();
  }
}

export function ContactFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className={styles.footer}>
      <div className="container">
        <div className={styles.actionsGrid}>
          {CONTACT_ACTIONS.map((action) => (
            <a
              key={action.id}
              href={actionHref(action.kind, action.subject)}
              className={styles.action}
              {...(action.kind === 'smart_move' ? { rel: 'noopener' } : {})}
            >
              <span className={styles.actionLabel}>{action.label}</span>
              <span className={styles.actionDetail}>{action.detail}</span>
              <span className={styles.actionArrow} aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </div>

        <div className={styles.complianceRow}>
          <div className={styles.identity}>
            <a href="/" className={styles.wordmark} aria-label="JWILLSOLDIT home">
              JWILLSOLDIT<span className={styles.dot}>.</span>
            </a>
            <span className={styles.idLine}>
              {CONTACT.name} · {CONTACT.title} · {CONTACT.brokerage} · {CONTACT.market}
            </span>
          </div>

          <nav className={styles.legalLinks} aria-label="Compliance and legal">
            <a href="/assets/iabs.pdf" rel="noopener">
              IABS
            </a>
            <a href="/assets/cpn.pdf" rel="noopener">
              Consumer Protection Notice
            </a>
            <a href="/privacy.html">Privacy</a>
            <a href="/houston">Houston Guides</a>
            <a href={smartMoveLink()} rel="noopener">
              Smart Move
            </a>
          </nav>
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.crgLogoFrame}>
            <img
              className={styles.crgLogo}
              src="/assets/crg-logo-transparent.png"
              alt="Christin Rachelle Group"
              loading="lazy"
            />
          </div>
          <p className={styles.fineprint}>
            Equal Housing Opportunity. Texas Real Estate Commission notices linked
            above: Information About Brokerage Services &amp; Consumer Protection
            Notice. © {year} JWILLSOLDIT.
          </p>
        </div>
      </div>
    </footer>
  );
}
