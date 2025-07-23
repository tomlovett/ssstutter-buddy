import React from 'react'
import { render, screen } from '@testing-library/react'

describe('Participant Connections Index Page', () => {
  test('renders without crashing', async () => {
    const { default: Index } = await import('@/pages/p/Connections/index')

    // Mock props
    const mockProps = {
      connections: [
        {
          id: 1,
          study: {
            id: 1,
            title: 'Test Study 1',
          },
        },
        {
          id: 2,
          study: {
            id: 2,
            title: 'Test Study 2',
          },
        },
      ],
    }

    render(<Index {...mockProps} />)

    // Check that the main heading is rendered
    expect(screen.getByText('My Study Connections')).toBeInTheDocument()

    // Check that study titles are present
    expect(screen.getByText('Test Study 1')).toBeInTheDocument()
    expect(screen.getByText('Test Study 2')).toBeInTheDocument()
  })
})
