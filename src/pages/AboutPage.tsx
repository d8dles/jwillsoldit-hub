import { PageMeta } from '../components/PageMeta';
import { ListingShell } from '../components/ListingShell';
import { ABOUT_SEO } from '../data/seo';
import { smartMoveLink, telLink, smsLink, mailtoLink } from '../utils/links';
import styles from './AboutPage.module.css';

export function AboutPage() {
  return (
    <ListingShell>
      <PageMeta seo={ABOUT_SEO} />

      <section className={`section ${styles.hero}`}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.portraitWrap}>
              <img
                className={styles.portrait}
                src="/assets/editorial/joey-williams-headshot.png"
                alt="Joey Williams, REALTOR®"
                width={1122}
                height={1402}
                loading="lazy"
              />
            </div>

            <div>
              <span className="mono-label mono-label--red">ABOUT</span>
              <h1 className={styles.name}>
                Joey Williams<span className={styles.period}>.</span>
              </h1>
              <p className={styles.role}>REALTOR® · Christin Rachelle Group · Houston, Texas</p>

              <p className={styles.lede}>
                I started as a broker&rsquo;s assistant and learned the business
                from the paperwork up. That background still shapes how I
                work now: I pay attention early, communicate clearly, and do
                not wait until closing to explain something important.
              </p>

              <p className={styles.body}>
                Contracts, deadlines, inspection reports, last-minute
                problems&mdash;I saw what kept a deal together and what
                caused one to fall apart. I was handling those details long
                before I had a client of my own.
              </p>

              <p className={styles.body}>
                You should not have to chase your agent for an update or
                find out about a problem after it is too late to do much
                about it. I keep people informed, return the call, and tell
                them where things actually stand&mdash;even when the answer
                is not the easy one.
              </p>

              <p className={styles.body}>
                I am from Houston. Taconazo when I want tacos, Astros all
                summer, NRG on Sundays in the fall. This is not a market I
                study from a distance. It is home.
              </p>

              <p className={styles.body}>
                And I work all of it, not one pocket. Somebody taking a job
                at the{' '}
                <a href="/houston/regions/central-houston">Medical Center</a>{' '}
                needs something different than a family looking at{' '}
                <a href="/houston/areas/katy">Katy</a> for the schools, or a
                couple who wants to walk to dinner in{' '}
                <a href="/houston/areas/the-heights">the Heights</a>, or an
                engineer who would rather be near{' '}
                <a href="/houston/areas/clear-lake">NASA out in Clear Lake</a>.
                Same city, four completely different answers. Sorting out
                which one is yours is the whole job.
              </p>

              <p className={styles.body}>
                Houston also has a way of hiding important details until
                they cost you something. That is why I started putting them
                in writing, with sources you can check for yourself.
              </p>

              <div className={styles.guideLinks}>
                <a href="/houston/guides/no-zoning-explained">No zoning</a>
                <a href="/houston/guides/property-taxes">Property taxes</a>
                <a href="/houston/guides/muds-pids-and-utility-districts">
                  Utility districts
                </a>
                <a href="/houston/guides/flood-risk-and-insurance">
                  Flood maps
                </a>
                <a href="/houston/guides/traffic-and-commutes">Commutes</a>
                <a href="/houston/guides/first-time-homebuyer">
                  First-time buyers
                </a>
              </div>

              <p className={styles.body}>
                <a href="/houston/guides" className="text-link">
                  Read Houston, Handled
                </a>
              </p>

              <div className={styles.elsewhere}>
                <span className="mono-label">ELSEWHERE</span>
                <div className={styles.elsewhereLinks}>
                  <a
                    href="https://www.har.com/joey-williams/agent_jtwill"
                    className="text-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    HAR Profile
                  </a>
                  <a
                    href="https://www.facebook.com/jwillsoldit"
                    className="text-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                  <a
                    href="https://www.instagram.com/jwillsoldit"
                    className="text-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </div>
              </div>

              <div className={styles.actions}>
                <a href={smartMoveLink()} className="btn btn--primary" rel="noopener">
                  <span className="tick">▸</span> Tell me about your move
                </a>
                <a href={telLink()} className="btn btn--ghost">Call</a>
                <a href={smsLink()} className="btn btn--ghost">Text</a>
                <a href={mailtoLink('Question for Joey — jwillsoldit.com')} className="btn btn--ghost">Email</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ListingShell>
  );
}
