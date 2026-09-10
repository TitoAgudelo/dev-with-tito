import type { ReactNode } from "react";

interface MainContentProps {
  readonly children: ReactNode;
  readonly id?: string;
}

export default function MainContent({ children, id = "main-content" }: MainContentProps) {
  return (
    <main id={id} tabIndex={-1}>
      {children}
    </main>
  );
}
