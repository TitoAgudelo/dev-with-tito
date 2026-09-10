import type { ReactNode } from "react";

interface StackProps {
  readonly children: ReactNode;
  readonly gap?: "2" | "3" | "4" | "6" | "8" | "12";
  readonly align?: "start" | "center" | "stretch";
  readonly className?: string;
}

export default function Stack({ children, gap = "4", align = "stretch", className }: StackProps) {
  return (
    <div className={["foundation-stack", `foundation-stack--gap-${gap}`, `foundation-stack--${align}`, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
