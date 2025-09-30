import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Board from "../../components/Board";
import { MatchProvider } from "../../state";
import type { EngineConnector } from "../../types/engine";

const connector: EngineConnector = {
  id: "test",
  label: "Test Connector",
  async fetchState() {
    return {
      fen: "rn1qkbnr/ppp2ppp/4p3/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq - 0 4",
      turn: "white",
      moves: [
        { ply: 1, san: "e4" },
        { ply: 1, san: "e5" }
      ]
    };
  },
  async submitMove(move) {
    throw new Error(`Not implemented ${move}`);
  },
  async startSearch() {
    return undefined;
  },
  async stopSearch() {
    return undefined;
  }
};

describe("Board", () => {
  it("renders FEN and move history", async () => {
    render(
      <MatchProvider>
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
