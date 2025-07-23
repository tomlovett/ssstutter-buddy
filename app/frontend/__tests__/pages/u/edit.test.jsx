import React from 'react'
import { render, screen } from '@testing-library/react'

describe('User Edit Page', () => {
  test('renders without crashing', async () => {
    const { default: Edit } = await import('@/pages/u/edit')

    // Mock user prop
    const mockUser = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
    }

    render(<Edit user={mockUser} />)

    // Check that the main heading is rendered
    expect(screen.getByText('Edit Profile')).toBeInTheDocument()

    // Check that form elements are present
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Save Changes' })
    ).toBeInTheDocument()

    // Check that links are present
    expect(
      screen.getByText('To change your password, click this link')
    ).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })
})
