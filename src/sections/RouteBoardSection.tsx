import { SectionHeader } from '../components/SectionHeader';
import { RouteBoard } from '../components/RouteBoard';

export function RouteBoardSection() {
  return (
    <section id="routes" className="section section--panel-ink" aria-label="How I can help">
      <div className="container">
        <SectionHeader
          index="SEC / 01"
          kicker="START HERE"
          onDark
          title={
            <>
              What are you <em>trying to do?</em>
            </>
          }
          lede="Tell me what you are working toward, and I will help you figure out what comes next."
        />
        <RouteBoard />
      </div>
    </section>
  );
}
