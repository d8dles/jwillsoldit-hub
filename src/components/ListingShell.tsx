import type { ReactNode } from 'react';
import { ContactFooter } from './ContactFooter';
import { Masthead } from './Masthead';
import { MobileActionBar } from './MobileActionBar';
import styles from './ListingShell.module.css';

interface ListingShellProps {
  children: ReactNode;
  mobileIntent?: string;
}

export function ListingShell({ children, mobileIntent }: ListingShellProps) {
  return (
    <>
      <Masthead />
      <main className={styles.main}>{children}</main>
      <ContactFooter />
      <MobileActionBar intent={mobileIntent} />
    </>
  );
}
