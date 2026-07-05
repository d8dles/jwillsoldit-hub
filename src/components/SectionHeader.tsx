import type { ReactNode } from 'react';
import { useReveal } from '../utils/motion';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  index: string; // mono section index, e.g. "SEC / 02"
  kicker: string; // mono kicker, e.g. "STAYS"
  title: ReactNode; // display heading — may include <em> for italic accent
  lede?: string;
  onDark?: boolean;
}

export function SectionHeader({ index, kicker, title, lede, onDark }: SectionHeaderProps) {
  const ref = useReveal<HTMLElement>();
  return (
    <header ref={ref} className={`${styles.header} reveal ${onDark ? styles.onDark : ''}`}>
      <div className={styles.meta}>
        <span className="mono-label">{index}</span>
        <span className={styles.rule} aria-hidden="true" />
        <span className="mono-label mono-label--red">{kicker}</span>
      </div>
      <h2 className="display-h2">{title}</h2>
      {lede && <p className={styles.lede}>{lede}</p>}
    </header>
  );
}
