import { SectionHeader } from '../components/SectionHeader';
import { ServiceLedger } from '../components/ServiceLedger';
import { MANAGE_SERVICES } from '../data/services';
import { mailtoLink } from '../utils/links';
import { SUBJECTS } from '../data/contact';
import styles from './ManageSection.module.css';

// The single dark command panel on the page. Dark is an accent, not a theme.

export function ManageSection() {
  return (
    <section id="manage" className="section section--panel" aria-label="Own and manage">
      <div className="container">
        <SectionHeader
          index="SEC / 04"
          kicker="OWN & MANAGE"
          onDark
          title={
            <>
              The part most agents <em>don&rsquo;t do.</em>
            </>
          }
          lede="Owning property comes with real work — leasing, upkeep, guests, paperwork. These services exist so owners get organized support and clear communication, without running it all themselves."
        />

        <ServiceLedger services={MANAGE_SERVICES} onDark />

        <div className={styles.panelFooter}>
          <p className={styles.footerNote}>
            Every engagement starts with a straight conversation about the
            property, the numbers, and whether we&rsquo;re a fit.
          </p>
          <a href={mailtoLink(SUBJECTS.ownerIntro)} className="btn btn--on-dark">
            <span className="tick">▸</span> Request an owner intro
          </a>
        </div>
      </div>
    </section>
  );
}
