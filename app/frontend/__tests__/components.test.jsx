import React from 'react'
import { render, screen } from '@testing-library/react'

// Simple test component
const TestComponent = ({ title, children }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{children}</p>
    </div>
  )
}

describe('React Component Testing', () => {
  test('should render component with props', () => {
    render(<TestComponent title="Test Title">Test content</TestComponent>)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  test('should render heading element', () => {
    render(<TestComponent title="Another Title">More content</TestComponent>)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Another Title')
  })
})
