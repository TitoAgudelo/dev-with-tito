import type { MetricData } from "../../../content/profile";

export default function MetricGroup({
  label,
  metrics,
}: {
  readonly label: string;
  readonly metrics: readonly MetricData[];
}) {
  return (
    <section className="metric-group" aria-labelledby="impact-heading">
      <h2 id="impact-heading" className="visually-hidden">{label}</h2>
      <ul className="metric-grid">
        {metrics.map((metric) => (
          <li key={metric.id} className="metric-item">
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
            {metric.qualification ? <small>{metric.qualification}</small> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
