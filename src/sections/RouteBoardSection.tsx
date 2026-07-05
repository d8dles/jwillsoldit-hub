import { SectionHeader } from '../components/SectionHeader';
import { RouteBoard } from '../components/RouteBoard';

export function RouteBoardSection() {
  return (
    <section id="routes" className="section" aria-label="Route board">
      <div className="container">
        <SectionHeader
          index="SEC / 01"
          kicker="ROUTE BOARD"
          title={
            <>
              What are you <em>trying to do?</em>
            </>
          }
          lede="Seven ways to start, depending on where you are. Each one ends with a clear plan and a real conversation — not a form that goes nowhere."
        />
        <RouteBoard />
      </div>
    </section>
  );
}
