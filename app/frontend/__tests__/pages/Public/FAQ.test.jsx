import React from 'react'
import { render, screen } from '@testing-library/react'

describe('Public FAQ Page', () => {
  test('renders without crashing', async () => {
    const { default: FAQ } = await import('@/pages/Public/FAQ')

    render(<FAQ />)

    // Check that the main heading is rendered
    expect(screen.getByRole('heading', { name: 'FAQ' })).toBeInTheDocument()

    // Check that key FAQ items are present
    expect(
      screen.getByText(/Will people know that I am on SSStutterBuddy/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/What will researchers be able to see about me/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/How does SSStutterBuddy make money/)
    ).toBeInTheDocument()
  })
})
