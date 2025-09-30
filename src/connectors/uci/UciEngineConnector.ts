import type {
  EngineConnector,
  EngineRequestContext,
  StartSearchOptions
} from "../../types/engine";
import type { BoardState } from "../../types/state";

export class UciEngineConnector implements EngineConnector {
  readonly id = "uci";

  readonly label = "Local UCI";

  async fetchState(_context: EngineRequestContext): Promise<BoardState | null> {
    return {
      fen: "startpos",
      turn: "white",
      moves: [],
      legalMoves: [],
      status: "in_progress",
      lastMove: null,
      clocks: null
    };
  }

  async submitMove(move: string, _context: EngineRequestContext): Promise<BoardState> {
    console.info("UCI connector received move", move);
    return {
      fen: "startpos",
      turn: "black",
      moves: [
        {
          ply: 1,
          san: move,
          uci: move,
          evaluation: undefined
        }
      ],
      legalMoves: [],
      status: "in_progress",
      lastMove: {
        ply: 1,
        san: move,
        uci: move,
        evaluation: undefined
      },
      clocks: null
    };
  }

  async startSearch(
    _options: StartSearchOptions | undefined,
    _context: EngineRequestContext
  ): Promise<void> {
    console.info("UCI connector startSearch placeholder");
  }

  async stopSearch(_context: EngineRequestContext): Promise<void> {
    console.info("UCI connector stopSearch placeholder");
  }
}
