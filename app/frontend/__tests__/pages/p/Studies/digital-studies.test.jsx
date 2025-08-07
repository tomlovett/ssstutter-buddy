import React from 'react'
import { render, screen } from '@testing-library/react'

describe('Participant Studies Digital Studies Page', () => {
  test('renders without crashing', async () => {
    const { default: DigitalStudies } = await import('@/pages/p/Studies/digital-studies')

    // Mock props
    const mockProps = {
      studies: [],
      pagination: {
        current_page: 1,
        total_pages: 1,
        total_count: 0,
      },
    }

    render(<DigitalStudies {...mockProps} />)

    // Check that the main heading is rendered
    expect(screen.getByText('Digital-Friendly Studies')).toBeInTheDocument()
  })
})
