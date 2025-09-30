import { useMemo, useState } from "react";
import type { ReactNode } from "react";

import { MatchContext, defaultState } from "./matchContext";
import type { MatchContextValue } from "./matchContext";

type MatchProviderProps = {
  children: ReactNode;
  initialGameId?: string | null;
};

export function MatchProvider({ children, initialGameId = null }: MatchProviderProps) {
  const [board, setBoard] = useState(defaultState);
  const [gameId, setGameId] = useState<string | null>(initialGameId);

  const value = useMemo<MatchContextValue>(
    () => ({ board, setBoard, gameId, setGameId }),
    [board, gameId]
  );

  return <MatchContext.Provider value={value}>{children}</MatchContext.Provider>;
}
