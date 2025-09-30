import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

import type { BoardState } from "../types/state";

export type MatchContextValue = {
  board: BoardState;
  setBoard: Dispatch<SetStateAction<BoardState>>;
  gameId: string | null;
  setGameId: Dispatch<SetStateAction<string | null>>;
};

export const defaultState: BoardState = {
  fen: "startpos",
  turn: "white",
  moves: [],
  legalMoves: [],
  status: "in_progress",
  lastMove: null,
  clocks: null
};

export const MatchContext = createContext<MatchContextValue | undefined>(undefined);
