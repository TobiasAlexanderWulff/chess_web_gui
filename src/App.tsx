import { useMemo, useState } from "react";

import Board from "./components/Board";
import { HttpEngineConnector } from "./connectors/http";
import { UciEngineConnector } from "./connectors/uci";
import type { EngineConnector } from "./types/engine";

const defaultHttpConnector = new HttpEngineConnector();
const defaultUciConnector = new UciEngineConnector();

function App() {
  const [activeConnector, setActiveConnector] = useState<EngineConnector>(
    defaultHttpConnector
  );

  const connectors = useMemo(
    () => [
      { id: "http", label: "Hosted Engine", connector: defaultHttpConnector },
      { id: "uci", label: "Local UCI", connector: defaultUciConnector }
    ],
    []
  );

  return (
    <div className="app-shell">
      <aside className="connector-picker">
        <h1>Chess Web GUI</h1>
        <p>Select an engine connector to start a match.</p>
        <ul>
          {connectors.map((entry) => (
            <li key={entry.id}>
              <button
                type="button"
                className={
                  activeConnector === entry.connector ? "connector selected" : "connector"
                }
                onClick={() => setActiveConnector(entry.connector)}
              >
                {entry.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <main className="board-container">
        <Board connector={activeConnector} />
      </main>
    </div>
  );
}

export default App;
