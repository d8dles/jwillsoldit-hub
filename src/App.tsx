import { Masthead } from './components/Masthead';
import { MobileActionBar } from './components/MobileActionBar';
import { CursorTrail } from './components/CursorTrail';
import { HeroSection } from './sections/HeroSection';
import { MeetJoeySection } from './sections/MeetJoeySection';
import { RouteBoardSection } from './sections/RouteBoardSection';
import { StaysSection } from './sections/StaysSection';
import { RentalsSection } from './sections/RentalsSection';
import { ManageSection } from './sections/ManageSection';
import { InvestSection } from './sections/InvestSection';
import { GuidesSection } from './sections/GuidesSection';
import { ContactSection } from './sections/ContactSection';
import { HoustonLensesSection, PropertyEditorialSection, SmartMoveEditorialSection } from './sections/HomeEditorialSections';
import { AboutPage } from './pages/AboutPage';
import { ListingsIndexPage } from './pages/ListingsIndexPage';
import { RentalListingsPage } from './pages/RentalListingsPage';
import { RentalListingDetailPage } from './pages/RentalListingDetailPage';
import { RentalServicesPage } from './pages/RentalServicesPage';
import { ContactPage } from './pages/ContactPage';
import { TULIP_OAK_LISTING } from './data/listings';
import { PathnameProvider } from './routing';

function HomePage() {
  return (
    <>
      <Masthead />
      <main>
        <HeroSection />
        <PropertyEditorialSection />
        <HoustonLensesSection />
        <RouteBoardSection />
        <SmartMoveEditorialSection />
        <StaysSection />
        <RentalsSection />
        <ManageSection />
        <InvestSection />
        <MeetJoeySection />
        <GuidesSection />
      </main>
      <ContactSection />
      <MobileActionBar />
      <CursorTrail />
    </>
  );
}

interface AppProps {
  pathname?: string;
}

export default function App({ pathname: requestedPathname }: AppProps) {
  const browserPathname = typeof window === 'undefined' ? '/' : window.location.pathname;
  const pathname = (requestedPathname ?? browserPathname).replace(/\/+$/, '') || '/';

  let page = <HomePage />;
  if (pathname === '/about') page = <AboutPage />;
  else if (pathname === '/contact') page = <ContactPage />;
  else if (pathname === '/listings') page = <ListingsIndexPage />;
  else if (pathname === '/listings/rentals') page = <RentalListingsPage />;
  else if (pathname === '/rentals') page = <RentalServicesPage />;
  if (pathname === '/listings/rentals/4231-tulip-oak-dr') {
    page = <RentalListingDetailPage listing={TULIP_OAK_LISTING} />;
  }

  return <PathnameProvider pathname={pathname}>{page}</PathnameProvider>;
}
