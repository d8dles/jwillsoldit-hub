import { SectionHeader } from '../components/SectionHeader';
import { OperatorCredo } from '../components/OperatorCredo';

export function OperatorSection() {
  return (
    <section id="operator" className="section section--hairline-top" aria-label="About Joey">
      <div className="container">
        <SectionHeader
          index="SEC / 06"
          kicker="ABOUT JOEY"
          title={
            <>
              One point of contact. <em>Real support behind it.</em>
            </>
          }
        />
        <OperatorCredo />
      </div>
    </section>
  );
}
