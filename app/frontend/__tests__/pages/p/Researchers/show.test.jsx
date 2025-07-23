import React from 'react'
import { render, screen } from '@testing-library/react'

describe('Participant Researchers Show Page', () => {
  test('renders without crashing', async () => {
    const { default: Show } = await import('@/pages/p/Researchers/show')

    // Mock props
    const mockProps = {
      researcher: {
        professional_name: 'Dr. John Doe',
        institution: 'University of Example',
        university_profile_url: 'https://example.edu/profile',
        research_interests: 'Stuttering research',
        bio: 'Research biography',
        headshot_url: '/path/to/headshot.jpg',
      },
      studies: [],
    }

    render(<Show {...mockProps} />)

    // Check that the main heading is rendered
    expect(screen.getByText('Dr. John Doe')).toBeInTheDocument()

    // Check that key content is present
    expect(screen.getByText('University of Example')).toBeInTheDocument()
    expect(screen.getByText('Research interests')).toBeInTheDocument()
    expect(screen.getByText('Stuttering research')).toBeInTheDocument()
    expect(screen.getByText('Biography')).toBeInTheDocument()
    expect(screen.getByText('Research biography')).toBeInTheDocument()

    // Check that section heading is present
    expect(screen.getByText('Studies from this Researcher')).toBeInTheDocument()
  })
})
