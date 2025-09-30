import type { BoardState } from "../../src/types/state";

export function buildBoardState(partial?: Partial<BoardState>): BoardState {
  return {
    fen: "startpos",
    turn: "white",
    moves: [],
    ...partial
  };
}

export const sampleHttpState = {
  fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
  turn: "black" as const,
  move_history: [
    { ply: 1, san: "e4" }
  ]
};
