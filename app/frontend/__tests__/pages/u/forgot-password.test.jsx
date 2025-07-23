import React from 'react'
import { render, screen } from '@testing-library/react'

describe('User Forgot Password Page', () => {
  test('renders without crashing', async () => {
    const { default: ForgotPassword } = await import(
      '@/pages/u/forgot-password'
    )

    render(<ForgotPassword />)

    // Check that the main heading is rendered
    expect(screen.getByText('Reset your password')).toBeInTheDocument()

    // Check that form elements are present
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByText('Send Reset Email')).toBeInTheDocument()

    // Check that links are present
    expect(screen.getByText('Back to login')).toBeInTheDocument()
  })
})
