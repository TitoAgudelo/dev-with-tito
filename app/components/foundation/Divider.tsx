interface DividerProps {
  readonly orientation?: "horizontal" | "vertical";
  readonly semantic?: boolean;
}

export default function Divider({ orientation = "horizontal", semantic = false }: DividerProps) {
  return semantic ? (
    <hr className={`foundation-divider foundation-divider--${orientation}`} />
  ) : (
    <span aria-hidden="true" className={`foundation-divider foundation-divider--${orientation}`} />
  );
}
