import { CONTACT } from '../data/contact';
import { telLink, smsLink, mailtoLink } from '../utils/links';
import { SUBJECTS } from '../data/contact';
import { useReveal } from '../utils/motion';
import styles from './OperatorCredo.module.css';

export function OperatorCredo() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`${styles.credo} reveal`}>
      <blockquote className={styles.statement}>
        I&rsquo;m Joey Williams. I help people move in, out, and around Houston —
        and I help owners take better care of their properties once the moving
        is done. Rentals, purchases, sales, furnished stays, managed homes: one
        clear place to start, one standard, coordinated with trusted service
        partners and backed by Christin Rachelle Group. If it touches a Houston
        address, I&rsquo;ll either take it on or tell you straight who should.
      </blockquote>

      <div className={styles.idRow}>
        <div className={styles.identity}>
          <span className={styles.name}>{CONTACT.name}</span>
          <span className={`mono-label ${styles.title}`}>
            {CONTACT.title} · {CONTACT.brokerage} · {CONTACT.market}
          </span>
        </div>

        <div className={styles.links}>
          <a href={telLink()} className="text-link">
            Call
          </a>
          <a href={smsLink()} className="text-link">
            Text
          </a>
          <a href={mailtoLink(SUBJECTS.general)} className="text-link">
            Email
          </a>
        </div>
      </div>
    </div>
  );
}
