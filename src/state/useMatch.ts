import { useContext } from "react";

import { MatchContext } from "./matchContext";

export function useMatch() {
  const ctx = useContext(MatchContext);

  if (!ctx) {
    throw new Error("useMatch must be used within MatchProvider");
  }

  return ctx;
}
