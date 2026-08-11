import { SectionHeader } from '../components/SectionHeader';
import { RouteBoard } from '../components/RouteBoard';

export function RouteBoardSection() {
  return (
    <section id="routes" className="section section--panel-ink" aria-label="Route board">
      <div className="container">
        <SectionHeader
          index="SEC / 01"
          kicker="ROUTE BOARD"
          onDark
          title={
            <>
              What are you <em>trying to do?</em>
            </>
          }
          lede="Tell me what you are working toward. I will ask the right questions, get the details in one place, and help you figure out what comes next."
        />
        <RouteBoard />
      </div>
    </section>
  );
}
