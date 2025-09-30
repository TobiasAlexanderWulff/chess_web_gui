import { useMemo, useState } from "react";
import type { ReactNode } from "react";

import { MatchContext, defaultState } from "./matchContext";
import type { MatchContextValue } from "./matchContext";

export function MatchProvider({ children }: { children: ReactNode }) {
  const [board, setBoard] = useState(defaultState);

  const value = useMemo<MatchContextValue>(() => ({ board, setBoard }), [board]);

  return <MatchContext.Provider value={value}>{children}</MatchContext.Provider>;
}
