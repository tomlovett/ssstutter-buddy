import React from 'react'
import { render, screen } from '@testing-library/react'
import { getEmptyMockUser } from '@tests/utils/mock-data'

describe('User Signup Page', () => {
  test('renders without crashing', async () => {
    const { default: Signup } = await import('@/pages/u/signup')

    // Mock user prop
    const mockUser = getEmptyMockUser()

    render(<Signup user={mockUser} />)

    // Check that the main heading is rendered
    expect(screen.getByText('Create your account')).toBeInTheDocument()

    // Check that form elements are present
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument()

    // Check that links are present
    expect(screen.getByText('Sign in')).toBeInTheDocument()
  })
})
