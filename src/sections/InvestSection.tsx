import { SectionHeader } from '../components/SectionHeader';
import { INVEST_SERVICES } from '../data/services';
import { useReveal } from '../utils/motion';
import { smartMoveLink } from '../utils/links';
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
          lede="Most investment advice stops at the closing table. Mine does not. I manage rentals and furnished stays every day, so I can show you what a property really takes to own before you own it."
        />

        <div ref={ref} className={`${styles.body} reveal`}>
          <div className={styles.points}>
            <p className={styles.point}>
              <span className={styles.pointIndex}>A</span>
              Acquisition guidance that comes from actually running rentals
              and short-term stays, not from a spreadsheet.
            </p>
            <p className={styles.point}>
              <span className={styles.pointIndex}>B</span>
              Straight answers on condition, turnover cost, and what
              management really takes, before you offer. No projections and no
              guarantees. We run the numbers on actual properties.
            </p>
            <p className={styles.point}>
              <span className={styles.pointIndex}>C</span>
              After closing, I can manage the property too, so you keep one
              relationship from purchase through performance.
            </p>
          </div>

          <div className={styles.ctas}>
            <a href={smartMoveLink('buy')} className="btn btn--primary" rel="noopener">
              <span className="tick">▸</span> Route an acquisition
            </a>
            <a href="/contact#investor" className="btn btn--ghost">
              {service ? service.ctaLabel : 'Ask an operations question'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
