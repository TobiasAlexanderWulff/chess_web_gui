import type {
  EngineConnector,
  EngineRequestContext,
  StartSearchOptions
} from "../../types/engine";
import type { BoardState } from "../../types/state";

const defaultEndpoint = "/api";

type Fetcher = typeof fetch;

export class HttpEngineConnector implements EngineConnector {
  readonly id = "http";

  readonly label = "Hosted Engine";

  constructor(
    private readonly baseUrl: string = defaultEndpoint,
    private readonly fetcher: Fetcher = globalThis.fetch
  ) {}

  private buildGameUrl(gameId: string, suffix: string) {
    if (!gameId) {
      throw new Error("HttpEngineConnector requires a gameId for HTTP calls.");
    }

    return `${this.baseUrl}/games/${gameId}/${suffix}`;
  }

  async fetchState({ gameId }: EngineRequestContext): Promise<BoardState | null> {
    const response = await this.fetcher(this.buildGameUrl(gameId, "state"));

    if (!response.ok) {
      console.warn("HTTP connector returned", response.status);
      return null;
    }

    const payload = (await response.json()) as {
      fen: string;
      turn: "white" | "black";
      move_history: Array<{ san: string; ply: number; evaluation?: string }>;
    };

    return {
      fen: payload.fen,
      turn: payload.turn,
      moves: payload.move_history.map((move) => ({
        ply: move.ply,
        san: move.san,
        evaluation: move.evaluation
      }))
    };
  }

  async submitMove(move: string, { gameId }: EngineRequestContext): Promise<BoardState> {
    const response = await this.fetcher(this.buildGameUrl(gameId, "move"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ move })
    });

    if (!response.ok) {
      throw new Error(`Move rejected: ${response.status}`);
    }

    const nextState = (await response.json()) as {
      fen: string;
      turn: "white" | "black";
      move_history: Array<{ san: string; ply: number; evaluation?: string }>;
    };

    return {
      fen: nextState.fen,
      turn: nextState.turn,
      moves: nextState.move_history.map((moveRecord) => ({
        ply: moveRecord.ply,
        san: moveRecord.san,
        evaluation: moveRecord.evaluation
      }))
    };
  }

  async startSearch(
    options: StartSearchOptions | undefined,
    { gameId }: EngineRequestContext
  ): Promise<void> {
    const response = await this.fetcher(this.buildGameUrl(gameId, "search"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(options ?? {})
    });

    if (!response.ok) {
      throw new Error(`Search request failed: ${response.status}`);
    }
  }

  async stopSearch(_context: EngineRequestContext): Promise<void> {
    await Promise.resolve();
  }
}
