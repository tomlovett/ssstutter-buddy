import React from 'react'
import { render, screen } from '@testing-library/react'

describe('Researcher Studies Index Page', () => {
  test('renders without crashing', async () => {
    const { default: Index } = await import('@/pages/r/Studies/index')

    // Mock props
    const mockProps = {
      active_studies: [],
      draft_studies: [],
      paused_studies: [],
      closed_count: 5,
    }

    render(<Index {...mockProps} />)

    // Check that the main heading is rendered
    expect(screen.getByText('Your Studies')).toBeInTheDocument()

    // Check that section headings are present
    expect(screen.getByText('Active Studies')).toBeInTheDocument()
    expect(screen.getByText('Draft Studies')).toBeInTheDocument()
    expect(screen.getByText('Paused Studies')).toBeInTheDocument()

    // Check that link is present
    expect(screen.getByText(/View Closed Studies \(5\)/)).toBeInTheDocument()
  })
})
