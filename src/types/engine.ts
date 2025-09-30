import type { BoardState } from "./state";

export type StartSearchOptions = {
  depth?: number;
  movetime_ms?: number;
  wtime_ms?: number;
  btime_ms?: number;
};

export type EngineRequestContext = {
  gameId: string;
};

export type EngineConnector = {
  id: string;
  label: string;
  fetchState: (context: EngineRequestContext) => Promise<BoardState | null>;
  submitMove: (move: string, context: EngineRequestContext) => Promise<BoardState>;
  startSearch: (options: StartSearchOptions | undefined, context: EngineRequestContext) => Promise<void>;
  stopSearch: (context: EngineRequestContext) => Promise<void>;
};
