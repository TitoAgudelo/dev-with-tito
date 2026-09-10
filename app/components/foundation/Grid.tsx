import type { ReactNode } from "react";

interface GridProps {
  readonly children: ReactNode;
  readonly columns?: 1 | 2 | 3;
  readonly gap?: "4" | "6" | "8";
  readonly className?: string;
}

export default function Grid({ children, columns = 2, gap = "6", className }: GridProps) {
  return (
    <div className={["foundation-grid", `foundation-grid--${columns}`, `foundation-grid--gap-${gap}`, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
