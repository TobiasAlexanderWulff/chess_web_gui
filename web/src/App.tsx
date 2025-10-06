import { useEffect, useState } from 'react'
import './App.css'
import { fetchGatewayHealth } from './api/client'

type GatewayState =
  | { status: 'loading' }
  | { status: 'healthy' }
  | { status: 'unexpected'; detail: string }
  | { status: 'unreachable'; detail: string }

const squareIndexes = Array.from({ length: 64 }, (_, index) => index)

function App() {
  const [gatewayState, setGatewayState] = useState<GatewayState>({ status: 'loading' })

  useEffect(() => {
    let isMounted = true

    const run = async () => {
      try {
        const response = await fetchGatewayHealth()
        if (!isMounted) {
          return
        }

        if (response.status.toLowerCase() === 'ok') {
          setGatewayState({ status: 'healthy' })
          return
        }

        setGatewayState({
          status: 'unexpected',
          detail: `Gateway returned status "${response.status}"`,
        })
      } catch (error) {
        if (!isMounted) {
          return
        }
        const message = error instanceof Error ? error.message : 'Unbekannter Fehler'
        setGatewayState({ status: 'unreachable', detail: message })
      }
    }

    void run()

    return () => {
      isMounted = false
    }
  }, [])

  const statusMessage = (() => {
    switch (gatewayState.status) {
      case 'loading':
        return 'Prüfe Gateway...'
      case 'healthy':
        return 'Gateway erreichbar'
      case 'unexpected':
        return 'Gateway antwortet unerwartet'
      case 'unreachable':
        return 'Gateway aktuell nicht erreichbar'
      default:
        return 'Gateway-Status unbekannt'
    }
  })()

  return (
    <main className="app">
      <h1>Chess Web GUI</h1>
      <p className="description">
        Dieses Frontend dient als Ausgangspunkt für die Web-Oberfläche. Erweiterungen können hier
        aufgebaut und mit dem Gateway verbunden werden.
      </p>
      <section className="status-panel">
        <h2>Gateway Status</h2>
        <p role="status" aria-live="polite" className={`status status-${gatewayState.status}`}>
          {statusMessage}
        </p>
        {gatewayState.status !== 'healthy' &&
        gatewayState.status !== 'loading' &&
        'detail' in gatewayState ? (
          <p className="status-detail">{gatewayState.detail}</p>
        ) : null}
      </section>
      <section className="board-section">
        <h2>Board Preview</h2>
        <div className="board-placeholder" aria-label="Schachbrett Platzhalter">
          {squareIndexes.map((square) => (
            <div
              key={square}
              className={`square ${
                (Math.floor(square / 8) + square) % 2 === 0 ? 'light' : 'dark'
              }`}
            />
          ))}
        </div>
        <p className="board-hint">
          Dieses Board dient als Platzhalter. Ersetze es durch eine interaktive Komponente, sobald die
          API-Anbindung steht.
        </p>
      </section>
      <p className="read-the-docs">Weitere Infos findest du in der Projekt-Dokumentation unter docs/.</p>
    </main>
  )
}

export default App
