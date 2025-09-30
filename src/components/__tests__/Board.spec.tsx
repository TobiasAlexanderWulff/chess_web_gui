import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Board from "../../components/Board";
import { MatchProvider } from "../../state";
import type {
  EngineConnector,
  EngineRequestContext,
  StartSearchOptions
} from "../../types/engine";

const connector: EngineConnector = {
  id: "test",
  label: "Test Connector",
  async fetchState({ gameId }: EngineRequestContext) {
    if (gameId !== "test-game") {
      throw new Error(`Unexpected game id ${gameId}`);
    }
    return {
      fen: "rn1qkbnr/ppp2ppp/4p3/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq - 0 4",
      turn: "white",
      moves: [
        { ply: 1, san: "e4" },
        { ply: 1, san: "e5" }
      ],
      legalMoves: ["g1f3"],
      status: "in_progress",
      lastMove: {
        ply: 1,
        san: "e5"
      },
      clocks: {
        whiteMs: 300000,
        blackMs: 300000
      }
    };
  },
  async submitMove(move: string, _context: EngineRequestContext) {
    throw new Error(`Not implemented ${move}`);
  },
  async startSearch(
    _options: StartSearchOptions | undefined,
    _context: EngineRequestContext
  ) {
    return undefined;
  },
  async stopSearch(_context: EngineRequestContext) {
    return undefined;
  }
};

describe("Board", () => {
  it("renders FEN and move history", async () => {
    render(
      <MatchProvider initialGameId="test-game">
        <Board connector={connector} />
      </MatchProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("White to move")).toBeInTheDocument();
    });

    expect(screen.getByText(/rn1qkbnr/)).toBeInTheDocument();
    expect(screen.getByText(/e4/)).toBeInTheDocument();
    expect(screen.getByText(/e5/)).toBeInTheDocument();
  });
});
