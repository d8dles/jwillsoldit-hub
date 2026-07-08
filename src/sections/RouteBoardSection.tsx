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
          lede="Pick the lane closest to your move. Each route points you to the right intake, section, or next conversation — so the site works like a concierge desk instead of a brochure."
        />
        <RouteBoard />
      </div>
    </section>
  );
}
