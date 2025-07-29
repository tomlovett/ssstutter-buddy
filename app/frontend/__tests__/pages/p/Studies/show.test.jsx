import React from 'react'
import { render, screen } from '@testing-library/react'

describe('Participant Studies Show Page', () => {
  test('renders without crashing', async () => {
    const { default: Show } = await import('@/pages/p/Studies/show')

    // Mock props
    const mockProps = {
      user: {
        participant: {
          id: 1,
        },
      },
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
        published_at: '2024-01-01',
      },
      researcher: {
        professional_name: 'Dr. John Doe',
        institution: 'University of Example',
      },
      invitation: null,
    }

    render(<Show {...mockProps} />)

    // Check that key content is present
    expect(screen.getByText('Test Study')).toBeInTheDocument()
    expect(screen.getByText('Express Interest')).toBeInTheDocument()
    expect(screen.getByText('Not Interested')).toBeInTheDocument()
  })
})
