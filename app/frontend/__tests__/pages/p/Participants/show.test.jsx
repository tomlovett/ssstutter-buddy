import React from 'react'
import { render, screen } from '@testing-library/react'

describe('Participant Show Page', () => {
  test('renders without crashing', async () => {
    const { default: Show } = await import('@/pages/p/Participants/show')

    // Mock props
    const mockProps = {
      participant: {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        codename: 'TestUser',
        birthdate: '1990-01-01',
        gender: 'm',
        location: {
          country: 'United States',
          state: 'California',
          city: 'San Francisco',
        },
      },
    }

    render(<Show {...mockProps} />)

    // Check that the main heading is rendered
    expect(screen.getByText('Your Participant Profile')).toBeInTheDocument()

    // Check that key content is present
    expect(screen.getByText('Account Details')).toBeInTheDocument()
    expect(screen.getByText('Location:')).toBeInTheDocument()
    expect(screen.getByText('Birthday:')).toBeInTheDocument()

    // Check that edit button is present
    expect(screen.getByText('Edit Profile')).toBeInTheDocument()
  })
})
