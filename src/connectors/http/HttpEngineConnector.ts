import type { EngineConnector } from "../../types/engine";
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

  async fetchState(): Promise<BoardState | null> {
    const response = await this.fetcher(`${this.baseUrl}/games/current/state`);

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

  async submitMove(move: string): Promise<BoardState> {
    const response = await this.fetcher(`${this.baseUrl}/games/current/move`, {
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

  async startSearch(options?: { depth?: number; movetimeMs?: number }): Promise<void> {
    const response = await this.fetcher(`${this.baseUrl}/games/current/search`, {
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

  async stopSearch(): Promise<void> {
    await Promise.resolve();
  }
}
