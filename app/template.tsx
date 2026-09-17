import type { ReactNode } from "react";

// Next remounts the template on navigation, including browser back/forward.
// The shared header and footer remain still; links keep their native behavior.
export default function Template({ children }: { children: ReactNode }) {
  return <div className="route-enter">{children}</div>;
}
