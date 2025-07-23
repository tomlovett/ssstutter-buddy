import React from 'react'
import { render, screen } from '@testing-library/react'

describe('Researcher Studies Show Page', () => {
  test('renders without crashing', async () => {
    const { default: Show } = await import('@/pages/r/Studies/show')

    // Mock props
    const mockProps = {
      study: {
        id: 1,
        title: 'Test Study',
        short_desc: 'Short description',
        long_desc: 'Long description',
        methodologies: 'Survey',
        location_type: 'digital',
        min_age: 18,
        max_age: 65,
        total_hours: 2,
        total_sessions: 1,
        duration: '1 week',
        remuneration: 50,
      },
      active_connections: [],
      invitations: [],
      completed_connections: [],
      declined_count: 0,
    }

    render(<Show {...mockProps} />)

    // Check that the main heading is rendered
    expect(screen.getByText('Test Study')).toBeInTheDocument()

    // Check that key content is present
    expect(screen.getByText('Short description:')).toBeInTheDocument()
    expect(screen.getByText('Long description:')).toBeInTheDocument()
    expect(screen.getByText('Methodologies:')).toBeInTheDocument()
    expect(screen.getByText('Location:')).toBeInTheDocument()
    expect(screen.getByText('Timeline:')).toBeInTheDocument()
    expect(screen.getByText('Age range:')).toBeInTheDocument()
    expect(screen.getByText('Est. remuneration:')).toBeInTheDocument()

    // Check that section headings are present
    expect(screen.getByText('Active Connections')).toBeInTheDocument()

    // Check that edit button is present
    expect(screen.getByText('Edit')).toBeInTheDocument()
  })
})
