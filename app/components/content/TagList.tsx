export default function TagList({
  label,
  items,
}: {
  readonly label: string;
  readonly items: readonly string[];
}) {
  return (
    <div className="tag-group">
      <span className="visually-hidden">{label}: </span>
      <ul className="tag-list" aria-label={label}>
        {items.map((item) => <li key={item} className="tag">{item}</li>)}
      </ul>
    </div>
  );
}
