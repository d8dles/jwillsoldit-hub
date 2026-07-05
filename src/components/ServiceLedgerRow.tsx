import type { Service } from '../data/types';
import { useReveal } from '../utils/motion';
import styles from './ServiceLedgerRow.module.css';

interface ServiceLedgerRowProps {
  service: Service;
  index: number;
  onDark?: boolean;
}

export function ServiceLedgerRow({ service, index, onDark = false }: ServiceLedgerRowProps) {
  const ref = useReveal<HTMLElement>();
  const s = service;

  return (
    <article ref={ref} className={`${styles.row} reveal ${onDark ? styles.onDark : ''}`}>
      <span className={styles.index} aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className={styles.head}>
        <h3 className={styles.name}>{s.serviceName}</h3>
        <p className={styles.audience}>For: {s.audience}</p>
      </div>

      <div className={styles.detail}>
        <p className={styles.problem}>{s.problem}</p>
        <p className={styles.deliverable}>{s.deliverable}</p>
        <p className={styles.outcome}>
          <span className={styles.outcomeMark} aria-hidden="true">
            ▸
          </span>
          {s.outcome}
        </p>
      </div>

      <div className={styles.ctaWrap}>
        <a
          href={s.href}
          className={styles.cta}
          {...(s.href.startsWith('http') ? { rel: 'noopener' } : {})}
        >
          {s.ctaLabel} <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}
