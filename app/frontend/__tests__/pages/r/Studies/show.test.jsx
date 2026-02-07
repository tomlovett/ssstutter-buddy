import React from 'react'
import { render, screen } from '@testing-library/react'

describe('Researcher Studies Show Page', () => {
  test('renders without crashing', async () => {
    const { default: Show } = await import('@/pages/r/Studies/show')

    const mockProps = {
      study: {
        id: 1,
        title: 'Test Study',
        short_desc: 'Short description',
        long_desc: 'Long description',
        location_type: 'digital',
        min_age: 18,
        max_age: 65,
        total_hours: 2,
        total_sessions: 1,
        duration: '1 week',
        remuneration: 50,
        published_at: '2024-01-01',
      },
      connections: [],
    }

    render(<Show {...mockProps} />)

    expect(screen.getByText('Test Study')).toBeInTheDocument()
    expect(screen.getByText('Edit Study')).toBeInTheDocument()
    expect(screen.getByText('Study Configuration')).toBeInTheDocument()
    expect(screen.getByText('Connections')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Search by name or email')).toBeInTheDocument()
  })
})
