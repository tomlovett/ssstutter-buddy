import React from 'react'
import { render, screen } from '@testing-library/react'
import { getSimpleMockUser } from '@tests/utils/mock-data'

describe('User Select Role Page', () => {
  test('renders without crashing', async () => {
    const { default: SelectRole } = await import('@/pages/u/select-role')

    // Mock user prop
    const mockUser = getSimpleMockUser()

    render(<SelectRole user={mockUser} />)

    // Check that the main heading is rendered
    expect(screen.getByText('Select The Role For This Account')).toBeInTheDocument()

    // Check that user email is displayed
    expect(screen.getByText('test@example.com')).toBeInTheDocument()

    // Check that role buttons are present
    expect(screen.getByText('Participant')).toBeInTheDocument()
    expect(screen.getByText('Researcher')).toBeInTheDocument()

    // Check that navigation buttons are present
    expect(screen.getByText('Back')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
  })
})
