import React from 'react'
import { render, screen } from '@testing-library/react'

describe('User Await Confirmation Page', () => {
  test('renders without crashing', async () => {
    const { default: AwaitConfirmation } = await import('@/pages/u/await-confirmation')

    render(<AwaitConfirmation />)

    // Check that the main heading is rendered
    expect(screen.getByText('Account created!')).toBeInTheDocument()

    // Check that key content is present
    expect(screen.getByText(/Please check your email to complete your registration/)).toBeInTheDocument()
    expect(screen.getByText("Didn't receive the email?")).toBeInTheDocument()

    // Check that form elements are present
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByText('Resend confirmation email')).toBeInTheDocument()
  })
})
