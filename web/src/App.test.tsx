import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import App from './App'

describe('App', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders project headline and healthy status', async () => {
    const mockResponse = new Response(JSON.stringify({ status: 'ok' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResponse))

    render(<App />)

    expect(screen.getByRole('heading', { name: /chess web gui/i })).toBeInTheDocument()
    expect(await screen.findByText(/Gateway erreichbar/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Schachbrett Platzhalter/i)).toBeInTheDocument()
  })

  it('shows error feedback when fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Service offline')))

    render(<App />)

    expect(await screen.findByText(/Gateway aktuell nicht erreichbar/i)).toBeInTheDocument()
    expect(screen.getByText(/Service offline/i)).toBeInTheDocument()
  })
})
