export type MoveRecord = {
  ply: number;
  san: string;
  uci?: string;
  evaluation?: string;
};

export type GameStatus = "in_progress" | "checkmate" | "stalemate" | "draw";

export type ClockState = {
  whiteMs: number;
  blackMs: number;
};

export type BoardState = {
  fen: string;
  turn: "white" | "black";
  moves: MoveRecord[];
  legalMoves: string[];
  status: GameStatus;
  lastMove: MoveRecord | null;
  clocks?: ClockState | null;
};
