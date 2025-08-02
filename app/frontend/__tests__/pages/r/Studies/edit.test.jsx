import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { mockApiResponse } from '@tests/utils/api-test-utils'

describe('Researcher Studies Edit Page', () => {
  test('renders without crashing', async () => {
    const { default: Edit } = await import('@/pages/r/Studies/edit')

    // Mock the location API call that LocationTool makes
    mockApiResponse('POST', '/api/location', {
      states_list: [
        { name: 'California', symbol: 'CA' },
        { name: 'Maryland', symbol: 'MD' },
      ],
      cities_list: [
        { name: 'San Francisco', symbol: 'SF' },
        { name: 'Los Angeles', symbol: 'LA' },
      ],
    })

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

    // Wait for async operations to complete
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Study Title')).toBeInTheDocument()
    })

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
