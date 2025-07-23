import React from 'react'
import { render, screen } from '@testing-library/react'

describe('User Change Password Page', () => {
  test('renders without crashing', async () => {
    const { default: ChangePassword } = await import(
      '@/pages/u/change-password'
    )

    // Mock user prop
    const mockUser = { id: 1 }

    render(<ChangePassword user={mockUser} />)

    // Check that the main heading is rendered
    expect(
      screen.getByRole('heading', { name: 'Change Password' })
    ).toBeInTheDocument()

    // Check that form elements are present
    expect(screen.getByPlaceholderText('New Password')).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('Confirm New Password')
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Change Password' })
    ).toBeInTheDocument()

    // Check that links are present
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })
})
