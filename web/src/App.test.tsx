import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders project headline', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /chess web gui/i })).toBeInTheDocument()
  })
})
