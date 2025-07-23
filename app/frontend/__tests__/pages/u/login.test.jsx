import React from 'react'
import { render, screen } from '@testing-library/react'

describe('User Login Page', () => {
  test('renders without crashing', async () => {
    const { default: Login } = await import('@/pages/u/login')

    render(<Login />)

    // Check that the main heading is rendered
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument()

    // Check that form elements are present
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByText('Sign in')).toBeInTheDocument()

    // Check that links are present
    expect(screen.getByText('create a new account')).toBeInTheDocument()
    expect(screen.getByText('Forgot your password?')).toBeInTheDocument()
  })
})
