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
                across Texas, run by someone who is actually from here.
              </p>

              <p className={styles.body}>
                I grew up in north Houston. This is not a market I studied
                for a test. It is the one I grew up driving, eating in, and
                watching change.
              </p>

              <p className={styles.body}>
                People call it Space City because of NASA, and that is true,
                but the city actually runs on oil, the Port of Houston, and
                the bayou that winds out past the refineries and east toward
                Galveston Bay. That mix, energy money, shipping, and water,
                is the real backbone of this place. It is also why one
                address can look nothing like the one three miles over.
              </p>

              <p className={styles.body}>
                I still stop at House of Pies at 1am out of habit, not for a
                photo. If you want to know where real fajitas started, that
                is Ninfa&rsquo;s on Navigation, not a chain menu. Prince&rsquo;s
                has been flipping burgers since 1929 and it is still
                standing while plenty of newer places have come and gone.
                None of that makes me special. It just means I actually know
                this city instead of looking it up before a showing.
              </p>

              <p className={styles.body}>
                That is the same approach I bring to real estate.
                JWILLSOLDIT is the practice I built around one idea: you get
                a straight answer from the first conversation, not a script
                and a follow-up call three days later.
              </p>

              <ul className={styles.list}>
                <li>Buyers and sellers get an honest read on the market, not a pitch.</li>
                <li>Renters get someone who actually knows the inventory.</li>
                <li>Owners get a property manager who picks up the phone.</li>
                <li>Investors get someone who has run the numbers on what they are buying.</li>
              </ul>

              <p className={styles.body}>
                I work across Greater Houston and Texas: buying, selling,
                renting, relocating, furnished stays, and the property
                management and investment work that starts after a sale
                closes.
              </p>

              <div className={styles.credentials}>
                <span className="mono-label">LICENSE</span>
                <p className={styles.credentialRow}><strong>REALTOR®</strong>, Christin Rachelle Group</p>
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
