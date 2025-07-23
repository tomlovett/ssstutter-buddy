import React from 'react'
import { render, screen } from '@testing-library/react'

describe('Participant Home Page', () => {
  test('renders without crashing', async () => {
    const { default: Home } = await import('@/pages/p/Participants/home')

    // Mock props
    const mockProps = {
      participant: { first_name: 'John' },
      study_invitations: [],
      connections: [],
      nearby_studies: [],
    }

    render(<Home {...mockProps} />)

    // Check that the welcome message is rendered
    expect(screen.getByText('Welcome, John!')).toBeInTheDocument()

    // Check that section headings are present
    expect(screen.getByText('Your Invitations')).toBeInTheDocument()
    expect(screen.getByText('Your Connections')).toBeInTheDocument()
    expect(screen.getByText('Studies Near You')).toBeInTheDocument()

    // Check that link is present
    expect(screen.getByText('View Fully-Online Studies')).toBeInTheDocument()
  })
})
