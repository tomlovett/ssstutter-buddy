# Testing Setup

This project uses Jest for testing React components and JavaScript utilities.

## Setup

The testing environment is configured with:

- **Jest** - Test runner
- **@testing-library/react** - React component testing utilities
- **@testing-library/jest-dom** - Custom Jest matchers for DOM elements
- **@testing-library/user-event** - User interaction simulation
- **jest-environment-jsdom** - DOM environment for testing

## Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode (re-runs on file changes)
yarn test:watch

# Run tests with coverage report
yarn test:coverage
```

## Test File Structure

Tests should be placed in:

- `app/frontend/__tests__/` directory
- Files should be named with `.test.js` or `.test.jsx` extension
- Or use `.spec.js` or `.spec.jsx` extension

## Writing Tests

### Basic Component Test

```jsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import MyComponent from '../MyComponent'

describe('MyComponent', () => {
  test('renders correctly', () => {
    render(<MyComponent title="Test" />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
```

### Testing User Interactions

```jsx
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('handles button click', async () => {
  const user = userEvent.setup()
  render(<MyComponent />)

  const button = screen.getByRole('button')
  await user.click(button)

  expect(screen.getByText('Clicked!')).toBeInTheDocument()
})
```

### Testing API Calls

```jsx
import { render, screen, waitFor } from '@testing-library/react'

test('loads and displays data', async () => {
  render(<DataComponent />)

  await waitFor(() => {
    expect(screen.getByText('Data loaded')).toBeInTheDocument()
  })
})
```

## Available Matchers

The setup includes custom matchers from `@testing-library/jest-dom`:

- `toBeInTheDocument()` - Check if element is in DOM
- `toHaveTextContent()` - Check element text content
- `toHaveClass()` - Check element CSS classes
- `toBeVisible()` - Check if element is visible
- `toHaveValue()` - Check input value
- `toBeChecked()` - Check checkbox/radio state

## Configuration Files

- `jest.config.cjs` - Jest configuration
- `jest.setup.cjs` - Test environment setup
- `__mocks__/fileMock.js` - Mock for static assets

## Notes

- TypeScript UI components are currently excluded from coverage collection due to parsing issues
- The setup includes mocks for browser APIs like `matchMedia`, `IntersectionObserver`, and `ResizeObserver`
- Static assets (images, CSS, etc.) are mocked to prevent import errors
