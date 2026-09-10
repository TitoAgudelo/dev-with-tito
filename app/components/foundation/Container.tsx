import type { ElementType, ReactNode } from "react";

type ContainerSize = "reading" | "content" | "wide";

interface ContainerProps {
  readonly as?: ElementType;
  readonly size?: ContainerSize;
  readonly children: ReactNode;
  readonly className?: string;
}

export default function Container({
  as: Component = "div",
  size = "content",
  children,
  className,
}: ContainerProps) {
  const classes = ["foundation-container", `foundation-container--${size}`, className]
    .filter(Boolean)
    .join(" ");

  return <Component className={classes}>{children}</Component>;
}
