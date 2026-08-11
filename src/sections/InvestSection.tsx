import { SectionHeader } from '../components/SectionHeader';
import { INVEST_SERVICES } from '../data/services';
import { useReveal } from '../utils/motion';
import { smartMoveLink } from '../utils/links';
import { CONTACT } from '../data/contact';
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
              Buy a property that <em>works in real life.</em>
            </>
          }
          lede="A property can look good on paper and still be difficult or expensive to run. Because I manage rentals and furnished stays, I can help you look past the purchase price and understand what ownership may actually involve."
        />

        <div ref={ref} className={`${styles.body} reveal`}>
          <div className={styles.comparison} aria-label="Long-term and furnished rental comparison">
            <article>
              <p className="mono-label mono-label--red">LONG-TERM RENTAL</p>
              <h3>Fewer turnovers, a longer relationship.</h3>
              <p>
                The work centers on screening, the lease, rent collection,
                maintenance, renewals, and the condition of the home when the
                resident moves out. Income may be steadier than a furnished
                stay, but the lease and landlord responsibilities last much
                longer than a weekend booking.
              </p>
              <a href="/contact#management">Ask about long-term management</a>
            </article>
            <article>
              <p className="mono-label mono-label--red">FURNISHED / VACATION RENTAL</p>
              <h3>More moving parts, more often.</h3>
              <p>
                Short stays can mean active pricing, guest messages, cleaning,
                restocking, utilities, furnishings, platform fees, and frequent
                inspections. Before buying, we also need to verify local rules,
                deed or HOA restrictions, insurance, taxes, and whether the
                property works during slower seasons.
              </p>
              <a href={CONTACT.airbnbHostUrl} target="_blank" rel="noopener noreferrer">
                See Joey&rsquo;s furnished stays
              </a>
            </article>
          </div>

          <div className={styles.points}>
            <p className={styles.point}>
              <span className={styles.pointIndex}>A</span>
              I look at the property as both an agent and someone who
              understands what managing it takes.
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
              {service ? service.ctaLabel : 'Ask about an investment property'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
