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
                Real estate, rentals, furnished stays, and property strategy
                across Texas — handled with taste, speed, and straight
                answers.
              </p>

              <p className={styles.body}>
                I&rsquo;m a Houston-rooted REALTOR® with Christin Rachelle
                Group, licensed by the Texas Real Estate Commission.
                JWILLSOLDIT is the practice I built around one idea: the
                process should feel handled from the first conversation, not
                passed around or left waiting on a &ldquo;circle back.&rdquo;
              </p>

              <ul className={styles.list}>
                <li>Buyers and sellers get a straight read on the market, not a pitch.</li>
                <li>Renters get a guided search, not a scroll through the same listings everyone else already saw.</li>
                <li>Owners get a property manager who actually answers the phone.</li>
                <li>Investors get someone who has run what they&rsquo;re buying, not just sold it.</li>
              </ul>

              <p className={styles.body}>
                I work across Greater Houston and Texas — buying, selling,
                renting, relocating, furnished stays, and the property
                management and investment work that starts after a sale
                closes.
              </p>

              <div className={styles.credentials}>
                <p className={styles.credentialRow}><strong>REALTOR®</strong> — Christin Rachelle Group</p>
                <p className={styles.credentialRow}>Texas Real Estate License #702090</p>
                <p className={styles.credentialRow}>Licensed by the Texas Real Estate Commission</p>
              </div>

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
