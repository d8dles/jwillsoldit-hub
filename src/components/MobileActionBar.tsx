import { useState, useCallback } from 'react';
import { smartMoveLink, telLink, smsLink } from '../utils/links';
import { useOnScreen } from '../utils/motion';
import styles from './MobileActionBar.module.css';

interface MobileActionBarProps {
  intent?: string;
}

// Fixed bottom action bar — mobile only (hidden ≥768px via CSS).
// Steps aside when the footer is on screen so compliance links stay reachable.

export function MobileActionBar({ intent }: MobileActionBarProps) {
  const [footerVisible, setFooterVisible] = useState(false);
  const onChange = useCallback((visible: boolean) => setFooterVisible(visible), []);
  useOnScreen('footer', onChange);

  return (
    <nav
      className={`${styles.bar} ${footerVisible ? styles.hidden : ''}`}
      aria-label="Quick actions"
    >
      <a href={telLink()} className={styles.item}>
        Call
      </a>
      <a href={smsLink()} className={styles.item}>
        Text
      </a>
      <a href={smartMoveLink(intent)} className={`${styles.item} ${styles.primary}`} rel="noopener">
        Smart Move <span aria-hidden="true">→</span>
      </a>
    </nav>
  );
}
