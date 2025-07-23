import React from 'react'
import { render, screen } from '@testing-library/react'

describe('Researcher Studies Edit Page', () => {
  test('renders without crashing', async () => {
    const { default: Edit } = await import('@/pages/r/Studies/edit')

    // Mock props
    const mockProps = {
      study: {
        id: 1,
        title: 'Test Study',
        short_desc: 'Short description',
        long_desc: 'Long description',
        min_age: 18,
        max_age: 65,
        total_hours: 2,
        total_sessions: 1,
        duration: '1 week',
        remuneration: 50,
        methodologies: 'Survey',
        location_type: 'digital',
      },
    }

    render(<Edit {...mockProps} />)

    // Check that form elements are present
    expect(screen.getByPlaceholderText('Study Title')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Short Description')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Long Description')).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('Minimum allowable age of participants')
    ).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('Maximum allowable age of participants')
    ).toBeInTheDocument()
  })
})
