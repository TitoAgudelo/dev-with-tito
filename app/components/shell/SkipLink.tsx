interface SkipLinkProps {
  readonly targetId?: string;
  readonly label?: string;
}

export default function SkipLink({
  targetId = "main-content",
  label = "Skip to main content",
}: SkipLinkProps) {
  return (
    <a className="skip-link" href={`#${targetId}`}>
      {label}
    </a>
  );
}
