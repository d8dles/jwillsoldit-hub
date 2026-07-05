import { SectionHeader } from '../components/SectionHeader';
import { INVEST_SERVICES } from '../data/services';
import { useReveal } from '../utils/motion';
import { smartMoveLink, mailtoLink } from '../utils/links';
import { SUBJECTS } from '../data/contact';
import styles from './InvestSection.module.css';

// Careful positioning: acquisition connected to real operating experience.
// No ROI calculators, no projections, no guarantees.

export function InvestSection() {
  const ref = useReveal<HTMLDivElement>();
  const service = INVEST_SERVICES[0];

  return (
    <section id="invest" className="section section--hairline-top" aria-label="Invest">
      <div className="container">
        <SectionHeader
          index="SEC / 05"
          kicker="INVEST"
          title={
            <>
              Buy what you can <em>actually operate.</em>
            </>
          }
          lede="Most investment advice stops at the closing table. This doesn't — because rentals and furnished stays are managed within this same service model, you get a realistic picture of what a property takes to own, before you own it."
        />

        <div ref={ref} className={`${styles.body} reveal`}>
          <div className={styles.points}>
            <p className={styles.point}>
              <span className={styles.pointIndex}>A</span>
              Acquisition guidance grounded in day-to-day rental and STR
              operations — not spreadsheet optimism.
            </p>
            <p className={styles.point}>
              <span className={styles.pointIndex}>B</span>
              Straight answers on condition, turnover cost, and management
              reality before you offer. No projections, no guarantees — the
              numbers conversation happens with real properties, not marketing.
            </p>
            <p className={styles.point}>
              <span className={styles.pointIndex}>C</span>
              After closing, the same service structure can coordinate the
              property&rsquo;s management — one relationship from purchase
              through performance.
            </p>
          </div>

          <div className={styles.ctas}>
            <a href={smartMoveLink('buy')} className="btn btn--primary" rel="noopener">
              <span className="tick">▸</span> Route an acquisition
            </a>
            <a href={mailtoLink(SUBJECTS.investor)} className="btn btn--ghost">
              {service ? service.ctaLabel : 'Ask an operations question'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
