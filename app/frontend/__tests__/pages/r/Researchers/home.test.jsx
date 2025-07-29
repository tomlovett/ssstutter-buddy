import React from 'react'
import { render, screen } from '@testing-library/react'

describe('Researcher Home Page', () => {
  test('renders without crashing', async () => {
    const { default: Home } = await import('@/pages/r/Researchers/home')

    // Mock props
    const mockProps = {
      researcher: { first_name: 'John' },
      studies: [],
      in_progress_connections: [],
    }

    render(<Home {...mockProps} />)

    // Check that the welcome message is rendered
    expect(screen.getByText('Welcome, John')).toBeInTheDocument()

    // Check that section headings are present
    expect(screen.getByText('Active Studies')).toBeInTheDocument()
    expect(screen.getByText('In-Progress Connections')).toBeInTheDocument()
  })
})
