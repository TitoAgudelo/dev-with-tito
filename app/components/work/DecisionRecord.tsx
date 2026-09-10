import type { ProjectDecision } from "../../../content/projects";

export default function DecisionRecord({ decision }: { readonly decision: ProjectDecision }) {
  return (
    <article className="decision-record">
      <h3>{decision.title}</h3>
      <dl>
        <div><dt>Context</dt><dd>{decision.context}</dd></div>
        <div><dt>Decision</dt><dd>{decision.decision}</dd></div>
        <div><dt>Tradeoff</dt><dd>{decision.tradeoff}</dd></div>
      </dl>
    </article>
  );
}
