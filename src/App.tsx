import { Masthead } from './components/Masthead';
import { MobileActionBar } from './components/MobileActionBar';
import { HeroSection } from './sections/HeroSection';
import { RouteBoardSection } from './sections/RouteBoardSection';
import { StaysSection } from './sections/StaysSection';
import { RentalsSection } from './sections/RentalsSection';
import { ManageSection } from './sections/ManageSection';
import { InvestSection } from './sections/InvestSection';
import { OperatorSection } from './sections/OperatorSection';
import { ContactSection } from './sections/ContactSection';

export default function App() {
  return (
    <>
      <Masthead />
      <main>
        <HeroSection />
        <RouteBoardSection />
        <StaysSection />
        <RentalsSection />
        <ManageSection />
        <InvestSection />
        <OperatorSection />
      </main>
      <ContactSection />
      <MobileActionBar />
    </>
  );
}
