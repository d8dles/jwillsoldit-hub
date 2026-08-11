import { SectionHeader } from '../components/SectionHeader';
import { CONTACT } from '../data/contact';
import styles from './StaysSection.module.css';

export function StaysSection() {
  return (
    <section id="stays" className="section section--hairline-top" aria-label="Furnished stays">
      <div className="container">
        <SectionHeader
          index="SEC / 02"
          kicker="STAYS"
          title={
            <>
              Furnished stays that feel <em>looked after.</em>
            </>
          }
          lede="I offer short-term, corporate, and monthly furnished stays around Houston. Tell me the dates you need, and I will confirm what is available, what is included, and whether the terms fit your stay."
        />

        <div className={styles.intro}>
          <p>
            The available homes and their current details live on my Airbnb
            profile. That is the best place to see what is open now and ask
            about dates before making plans.
          </p>
          <a href={CONTACT.airbnbHostUrl} className="btn btn--primary" target="_blank" rel="noopener noreferrer">
            <span className="tick">▸</span> See furnished stays on Airbnb
          </a>
        </div>
      </div>
    </section>
  );
}
