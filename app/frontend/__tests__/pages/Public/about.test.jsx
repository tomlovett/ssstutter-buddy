import React from 'react'
import { render, screen } from '@testing-library/react'

describe('Public About Page', () => {
  test('renders without crashing', async () => {
    const { default: About } = await import('@/pages/Public/about')

    render(<About />)

    // Check that the main heading is rendered
    expect(screen.getByText('About Us')).toBeInTheDocument()

    // Check that key content is present
    expect(screen.getByText(/We are dedicated to facilitating meaningful research/)).toBeInTheDocument()
    expect(screen.getByText(/Our platform serves as a bridge/)).toBeInTheDocument()
  })
})
