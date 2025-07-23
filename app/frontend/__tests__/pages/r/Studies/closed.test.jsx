import React from 'react'
import { render, screen } from '@testing-library/react'

describe('Researcher Studies Closed Page', () => {
  test('renders without crashing', async () => {
    const { default: Closed } = await import('@/pages/r/Studies/closed')

    // Mock props
    const mockProps = {
      studies: [],
    }

    render(<Closed {...mockProps} />)

    // Check that the main heading is rendered
    expect(screen.getByText('Closed Studies')).toBeInTheDocument()

    // Check that link is present
    expect(screen.getByText('← Back to My Studies')).toBeInTheDocument()
  })
})
