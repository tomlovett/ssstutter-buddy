import React from 'react'
import { render, screen } from '@testing-library/react'

describe('Public Researchers Page', () => {
  test('renders without crashing', async () => {
    const { default: Researchers } = await import('@/pages/Public/researchers')

    render(<Researchers />)

    // Check that the main heading is rendered
    expect(screen.getByRole('heading', { name: 'For Researchers' })).toBeInTheDocument()

    // Check that key content is present
    expect(
      screen.getByText(/Connect directly with PWS who are interested in participating in studies/)
    ).toBeInTheDocument()
    expect(screen.getByText('How it works')).toBeInTheDocument()
  })
})
