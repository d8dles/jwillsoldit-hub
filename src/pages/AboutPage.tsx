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
                I started as a broker&rsquo;s assistant. I learned this
                business from the paperwork up, and that is still why I
                catch things other agents miss.
              </p>

              <p className={styles.body}>
                That seat shows you everything. Contracts, deadlines,
                inspection reports, the deals that come apart three days
                before closing and the exact reason why. I was handling all
                of it long before I had a client of my own.
              </p>

              <p className={styles.body}>
                Ask people what they cannot stand about working with an
                agent and you get the same answer every time. They go quiet.
                Calls stop coming back, nobody tells you where your deal
                stands, and you hear about the problem once it is too late
                to do anything about it. That is the biggest complaint in
                this industry and the easiest one to fix. I am better than
                that.
              </p>

              <p className={styles.body}>
                I am from Houston. Taconazo when I want real tacos, Astros
                all summer, NRG on Sundays in the fall. I am not reading
                about this city. I live in it.
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
                The other half of this job is the stuff nobody explains
                until it costs you something. So I started writing it down,
                sourced, so you can check my work instead of taking my word
                for it.
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
                  <span className="tick">▸</span> Start a Smart Move
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
