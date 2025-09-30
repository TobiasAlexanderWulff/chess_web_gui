import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { MatchProvider } from "./state";
import "./styles/reset.css";
import "./styles/global.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <MatchProvider>
      <App />
    </MatchProvider>
  </React.StrictMode>
);
