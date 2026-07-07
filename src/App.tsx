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

export default function App() {
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
