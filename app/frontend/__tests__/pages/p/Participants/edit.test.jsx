import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { mockApiResponse } from '@tests/utils/api-test-utils'

describe('Participant Edit Page', () => {
  test('renders without crashing', async () => {
    const { default: Edit } = await import('@/pages/p/Participants/edit')

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
      participant: {
        id: 1,
        user_id: 1,
        codename: 'TestUser',
        birthdate: '1990-01-01',
        default_distance: 100,
        gender: 'f',
        weekly_digest_opt_out: false,
        location: {
          id: 1,
          country: 'United States',
          state: 'California',
          city: 'San Francisco',
        },
      },
      is_complete: true,
    }

    render(<Edit {...mockProps} />)

    // Wait for async operations to complete
    await waitFor(() => {
      expect(screen.getByText('Edit Participant Profile')).toBeInTheDocument()
    })

    // Check that the main heading is rendered
    expect(screen.getByText('Edit Participant Profile')).toBeInTheDocument()

    // Check that key content is present
    expect(screen.getByText(/To edit your name or email, go to your/)).toBeInTheDocument()
    expect(screen.getByText('user profile')).toBeInTheDocument()
  })
})
