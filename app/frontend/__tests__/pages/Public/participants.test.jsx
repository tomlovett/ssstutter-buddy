import React from 'react'
import { render, screen } from '@testing-library/react'

describe('Public Participants Page', () => {
  test('renders without crashing', async () => {
    const { default: Participants } = await import(
      '@/pages/Public/participants'
    )

    render(<Participants />)

    // Check that the main heading is rendered
    expect(screen.getByText('For People Who Stutter (PWS)')).toBeInTheDocument()

    // Check that key content is present
    expect(
      screen.getByText(
        /Participate in studies and contribute to meaningful research/
      )
    ).toBeInTheDocument()
    expect(screen.getByText('How does it work?')).toBeInTheDocument()
    expect(
      screen.getByText('Why should I participate in studies?')
    ).toBeInTheDocument()
  })
})
