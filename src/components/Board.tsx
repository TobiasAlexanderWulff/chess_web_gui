import type { FC } from "react";
import { useEffect } from "react";

import { useMatch } from "../state";
import type { EngineConnector } from "../types/engine";

const initialFen = "startpos";

type BoardProps = {
  connector: EngineConnector;
};

const Board: FC<BoardProps> = ({ connector }) => {
  const { board, setBoard, gameId } = useMatch();

  useEffect(() => {
    let isCurrent = true;

    async function hydrate() {
      try {
        if (!gameId) {
          console.warn("No active game id available; skipping fetchState call.");
          return;
        }

        const state = await connector.fetchState({ gameId });
        if (isCurrent && state) {
          setBoard(state);
        } else if (isCurrent && !state) {
          setBoard({
            fen: initialFen,
            turn: "white",
            moves: []
          });
        }
      } catch (error) {
        console.error("Failed to hydrate board", error);
      }
    }

    hydrate();

    return () => {
      isCurrent = false;
    };
  }, [connector, gameId, setBoard]);

  return (
    <section className="board">
      <header className="board__header">
        <h2>Active Game</h2>
        <span>{board.turn === "white" ? "White" : "Black"} to move</span>
      </header>
      <article className="board__fen">
        <strong>FEN</strong>
        <code>{board.fen}</code>
      </article>
      <article className="board__history">
        <strong>Move History</strong>
        {board.moves.length === 0 ? (
          <p>No moves yet.</p>
        ) : (
          <ol>
            {board.moves.map((move) => (
              <li key={`${move.ply}-${move.san}`}>
                {move.ply}. {move.san} ({move.evaluation ?? "…"})
              </li>
            ))}
          </ol>
        )}
      </article>
    </section>
  );
};

export default Board;
