import React from 'react'
import { render, screen } from '@testing-library/react'

describe('Researcher Show Page', () => {
  test('renders without crashing', async () => {
    const { default: Show } = await import('@/pages/r/Researchers/show')

    // Mock props
    const mockProps = {
      user: { researcher: { id: 1 } },
      researcher: {
        id: 1,
        professional_name: 'Dr. John Doe',
        institution: 'University of Example',
        university_profile_url: 'https://example.edu/profile',
        research_interests: 'Stuttering research',
        bio: 'Research biography',
        headshot_url: '/path/to/headshot.jpg',
      },
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

    // Check that edit link is present for own profile
    expect(screen.getByText('Edit my Researcher Profile')).toBeInTheDocument()
  })
})
