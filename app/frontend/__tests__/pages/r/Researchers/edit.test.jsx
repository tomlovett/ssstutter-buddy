import React from 'react'
import { render, screen } from '@testing-library/react'

describe('Researcher Edit Page', () => {
  test('renders without crashing', async () => {
    const { default: Edit } = await import('@/pages/r/Researchers/edit')

    // Mock props
    const mockProps = {
      researcher: {
        titles: 'Dr.',
        institution: 'University of Example',
        research_interests: 'Stuttering research',
        university_profile_url: 'https://example.edu/profile',
        bio: 'Research bio',
      },
      is_complete: false,
    }

    render(<Edit {...mockProps} />)

    // Check that form elements are present
    expect(
      screen.getByPlaceholderText('Professional titles')
    ).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Institutions')).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('Research Interests')
    ).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Professional Bio')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('University URL')).toBeInTheDocument()
  })
})
