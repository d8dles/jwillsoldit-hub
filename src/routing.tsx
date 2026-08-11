import { createContext, useContext, type ReactNode } from 'react';

const PathnameContext = createContext('/');

interface PathnameProviderProps {
  children: ReactNode;
  pathname: string;
}

export function PathnameProvider({ children, pathname }: PathnameProviderProps) {
  return <PathnameContext.Provider value={pathname}>{children}</PathnameContext.Provider>;
}

export function usePathname(): string {
  return useContext(PathnameContext);
}
