import type { ReactNode } from "react";

export default function VisuallyHidden({ children }: { readonly children: ReactNode }) {
  return <span className="visually-hidden">{children}</span>;
}
