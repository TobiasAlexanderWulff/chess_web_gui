export type MoveRecord = {
  ply: number;
  san: string;
  evaluation?: string;
};

export type BoardState = {
  fen: string;
  turn: "white" | "black";
  moves: MoveRecord[];
};
