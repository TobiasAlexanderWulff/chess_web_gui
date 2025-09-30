import type { BoardState } from "./state";

export type StartSearchOptions = {
  depth?: number;
  movetimeMs?: number;
  wtimeMs?: number;
  btimeMs?: number;
};

export type EngineConnector = {
  id: string;
  label: string;
  fetchState: () => Promise<BoardState | null>;
  submitMove: (move: string) => Promise<BoardState>;
  startSearch: (options?: StartSearchOptions) => Promise<void>;
  stopSearch: () => Promise<void>;
};
