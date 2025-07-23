import React from 'react'
import { render, screen } from '@testing-library/react'

describe('User Show Page', () => {
  test('renders without crashing', async () => {
    const { default: Show } = await import('@/pages/u/show')

    // Mock user prop
    const mockUser = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
    }

    render(<Show user={mockUser} />)

    // Check that the main heading is rendered
    expect(screen.getByText('Hola Muchacho')).toBeInTheDocument()

    // Check that form elements are present
    expect(screen.getByDisplayValue('John')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Doe')).toBeInTheDocument()
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument()

    // Check that labels are present
    expect(screen.getByText('First name')).toBeInTheDocument()
    expect(screen.getByText('Last name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
  })
})
