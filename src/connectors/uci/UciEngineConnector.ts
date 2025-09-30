import type { EngineConnector } from "../../types/engine";
import type { BoardState } from "../../types/state";

export class UciEngineConnector implements EngineConnector {
  readonly id = "uci";

  readonly label = "Local UCI";

  async fetchState(): Promise<BoardState | null> {
    return {
      fen: "startpos",
      turn: "white",
      moves: []
    };
  }

  async submitMove(move: string): Promise<BoardState> {
    console.info("UCI connector received move", move);
    return {
      fen: "startpos",
      turn: "black",
      moves: [
        {
          ply: 1,
          san: move,
          evaluation: undefined
        }
      ]
    };
  }

  async startSearch(): Promise<void> {
    console.info("UCI connector startSearch placeholder");
  }

  async stopSearch(): Promise<void> {
    console.info("UCI connector stopSearch placeholder");
  }
}
