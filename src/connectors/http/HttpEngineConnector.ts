import type {
  EngineConnector,
  EngineRequestContext,
  StartSearchOptions
} from "../../types/engine";
import type {
  BoardState,
  MoveRecord
} from "../../types/state";

const defaultEndpoint = "/api";

type Fetcher = typeof fetch;

type StateMovePayload = {
  ply: number;
  san: string;
  uci?: string;
  evaluation?: string;
};

type StatePayload = {
  fen: string;
  turn: "white" | "black";
  move_history?: StateMovePayload[];
  legal_moves?: string[];
  status?: BoardState["status"];
  last_move?: StateMovePayload | null;
  clocks?: {
    white_ms?: number;
    black_ms?: number;
  } | null;
};

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

    const payload = (await response.json()) as StatePayload;

    return this.toBoardState(payload);
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

    const nextState = (await response.json()) as StatePayload;

    return this.toBoardState(nextState);
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

  private mapMoveRecord(record: StateMovePayload): MoveRecord {
    return {
      ply: record.ply,
      san: record.san,
      uci: record.uci,
      evaluation: record.evaluation
    };
  }

  private toBoardState(payload: StatePayload): BoardState {
    const legalMoves = payload.legal_moves ?? [];
    const status = payload.status ?? "in_progress";
    const lastMove = payload.last_move ? this.mapMoveRecord(payload.last_move) : null;
    const clocksPayload = payload.clocks;
    const clocks =
      clocksPayload &&
      typeof clocksPayload.white_ms === "number" &&
      typeof clocksPayload.black_ms === "number"
        ? {
            whiteMs: clocksPayload.white_ms,
            blackMs: clocksPayload.black_ms
          }
        : null;

    return {
      fen: payload.fen,
      turn: payload.turn,
      moves: (payload.move_history ?? []).map((entry) => this.mapMoveRecord(entry)),
      legalMoves,
      status,
      lastMove,
      clocks
    };
  }
}
