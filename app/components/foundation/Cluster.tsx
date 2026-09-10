import type { ReactNode } from "react";

interface ClusterProps {
  readonly children: ReactNode;
  readonly gap?: "2" | "3" | "4" | "6";
  readonly justify?: "start" | "center" | "between";
  readonly className?: string;
}

export default function Cluster({ children, gap = "3", justify = "start", className }: ClusterProps) {
  return (
    <div className={["foundation-cluster", `foundation-cluster--gap-${gap}`, `foundation-cluster--${justify}`, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
