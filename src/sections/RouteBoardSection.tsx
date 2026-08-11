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
          lede="Pick the lane closest to your move. Each one takes you straight to the right intake or the right conversation, so you are not hunting through a menu to find help."
        />
        <RouteBoard />
      </div>
    </section>
  );
}
