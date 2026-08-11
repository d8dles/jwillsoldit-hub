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
          lede="A property can look good on paper and still be difficult or expensive to run. Because I manage rentals and furnished stays, I can help you look past the purchase price and understand what ownership may actually involve."
        />

        <div ref={ref} className={`${styles.body} reveal`}>
          <div className={styles.points}>
            <p className={styles.point}>
              <span className={styles.pointIndex}>A</span>
              I help you look at a property through the eyes of someone who
              may have to run it, not just buy it.
            </p>
            <p className={styles.point}>
              <span className={styles.pointIndex}>B</span>
              We will talk through condition, likely turnover work,
              management needs, and the real numbers before you make an
              offer. No promises or projections&mdash;just a careful look at
              the property in front of us.
            </p>
            <p className={styles.point}>
              <span className={styles.pointIndex}>C</span>
              If you want help after closing, I can manage it too, so you do
              not have to start over with someone new.
            </p>
          </div>

          <div className={styles.ctas}>
            <a href={smartMoveLink('buy')} className="btn btn--primary" rel="noopener">
              <span className="tick">▸</span> Talk through a property
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
