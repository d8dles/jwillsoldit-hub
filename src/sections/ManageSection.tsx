import { SectionHeader } from '../components/SectionHeader';
import { ServiceLedger } from '../components/ServiceLedger';
import { MANAGE_SERVICES } from '../data/services';
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
              Help with the work <em>that comes after.</em>
            </>
          }
          lede="Owning a rental comes with a long list: leasing, maintenance, guests, vendors, paperwork, and follow-up. I help keep those pieces moving while making sure you still know what is happening with your property."
        />

        <ServiceLedger services={MANAGE_SERVICES} onDark />

        <div className={styles.panelFooter}>
          <p className={styles.footerNote}>
            Let&rsquo;s start with the property, what it needs, and what you want
            off your plate.
          </p>
          <a href="/contact#owner-intro" className="btn btn--on-dark">
            <span className="tick">▸</span> Talk to me about your property
          </a>
        </div>
      </div>
    </section>
  );
}
