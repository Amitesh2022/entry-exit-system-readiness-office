// @vitest-environment jsdom
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from './App'

describe('entry exit system readiness office', () => {
  it('loads readiness cases from the Java API', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, title: 'External border biometric capacity review', owner: 'European Border Operations Team', status: 'Review', priority: 'High' }],
    }))
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    render(<QueryClientProvider client={client}><App /></QueryClientProvider>)
    expect(await screen.findByText('External border biometric capacity review')).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Entry Exit System Readiness Office' })).toBeTruthy()
  })
})
