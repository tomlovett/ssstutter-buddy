import React from 'react'
import { render, screen } from '@testing-library/react'

describe('Public Home Page', () => {
  test('renders without crashing', async () => {
    const { default: Home } = await import('@/pages/Public/home')

    render(<Home />)

    // Check that the main heading is rendered
    expect(screen.getByText('Welcome to SSStutterBuddy')).toBeInTheDocument()

    // Check that key content is present
    expect(screen.getByText(/SSStutterBuddy is a free, non-profit platform/)).toBeInTheDocument()
    expect(screen.getByText(/Sign up today!/)).toBeInTheDocument()
    expect(screen.getByText(/Login/)).toBeInTheDocument()
  })

  test('has proper navigation links', async () => {
    const { default: Home } = await import('@/pages/Public/home')

    render(<Home />)

    // Check that signup and login links are present
    const signupLink = screen.getByText('Sign up today!')
    const loginLink = screen.getByText('Login')

    expect(signupLink).toHaveAttribute('href', '/signup')
    expect(loginLink).toHaveAttribute('href', '/login')
  })
})
