import React from 'react'
import { render, screen } from '@testing-library/react'

describe('Admin Stats Page', () => {
  test('renders without crashing', async () => {
    const { default: Stats } = await import('@/pages/admin/stats')

    // Mock props
    const mockProps = {
      users_count: 100,
      participants_count: 50,
      researchers_count: 25,
      published_studies_count: 10,
      total_connections: 15,
      completed_connections_count: 5,
      digital_completed_connections_count: 3,
      digital_only_studies_count: 8,
      participants_by_country: { 'United States': 30, Canada: 20 },
      studies_by_country: { 'United States': 8, Canada: 2 },
    }

    render(<Stats {...mockProps} />)

    // Check that the main heading is rendered
    expect(screen.getByText('SSStutterBuddy Statistics')).toBeInTheDocument()

    // Check that key stats are present
    expect(screen.getByText('Users')).toBeInTheDocument()
    expect(screen.getByText('Participants')).toBeInTheDocument()
    expect(screen.getByText('Researchers')).toBeInTheDocument()
    expect(screen.getByText('Published Studies')).toBeInTheDocument()

    // Check that section headings are present
    expect(screen.getByText('Studies by Country')).toBeInTheDocument()
    expect(screen.getByText('Participants by Country')).toBeInTheDocument()
  })
})
