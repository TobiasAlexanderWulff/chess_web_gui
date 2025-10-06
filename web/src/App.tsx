import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="app">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Chess Web GUI</h1>
      <p className="description">
        Dieses Frontend dient als Ausgangspunkt für die Web-Oberfläche. Erweiterungen können hier aufgebaut und mit dem Gateway verbunden werden.
      </p>
      <div className="card">
        <button type="button" onClick={() => setCount((current) => current + 1)}>
          Klicks: {count}
        </button>
        <p>Nutze diesen Zähler als Platzhalter für interaktive Komponenten und ersetze ihn, sobald echte Features entstehen.</p>
      </div>
      <p className="read-the-docs">Weitere Infos findest du in der Projekt-Dokumentation unter docs/.</p>
    </main>
  )
}

export default App
