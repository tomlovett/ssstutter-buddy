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

    expect(screen.getByPlaceholderText('e.g. SLP, PhD, etc.')).toBeInTheDocument()
    expect(screen.getByText('Institutions')).toBeInTheDocument()
    expect(screen.getByText('Research Interests')).toBeInTheDocument()
    expect(screen.getByText('Professional Bio')).toBeInTheDocument()
    expect(screen.getByText('University URL')).toBeInTheDocument()
  })
})
