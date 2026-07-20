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
import { ListingsIndexPage } from './pages/ListingsIndexPage';
import { RentalListingsPage } from './pages/RentalListingsPage';

function HomePage() {
  return (
    <>
      <Masthead />
      <main>
        <HeroSection />
        <MeetJoeySection />
        <RouteBoardSection />
        <StaysSection />
        <RentalsSection />
        <ManageSection />
        <InvestSection />
        <GuidesSection />
      </main>
      <ContactSection />
      <MobileActionBar />
      <CursorTrail />
    </>
  );
}

export default function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';

  if (pathname === '/listings') return <ListingsIndexPage />;
  if (pathname === '/listings/rentals') return <RentalListingsPage />;

  return <HomePage />;
}
