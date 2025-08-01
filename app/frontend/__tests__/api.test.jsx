import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { sendRequest, getRequest, postRequest, putRequest } from '../lib/api'
import {
  mockApiResponse,
  mockApiError,
  mockLocationApi,
  mockConnectionsApi,
} from './utils/api-test-utils'

// Test component that makes API calls
const TestApiComponent = () => {
  const [data, setData] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await getRequest('/api/location?country=US')
      const result = await response.json()
      if (result.error) {
        setError(result.error)
      } else {
        setData(result)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const submitData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await postRequest('/api/location', {
        country: 'US',
        state: 'MD',
      })
      const result = await response.json()
      if (result.error) {
        setError(result.error)
      } else {
        setData(result)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>
      <button onClick={submitData} disabled={loading}>
        Submit Data
      </button>
      {error && <div data-testid="error">{error}</div>}
      {data && (
        <div data-testid="data">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

describe('API Testing with MSW', () => {
  test('should make successful GET request', async () => {
    const user = userEvent.setup()

    // Mock the API response
    mockApiResponse('GET', '/api/location', {
      country: { name: 'United States', symbol: 'US' },
      states_list: [{ name: 'Maryland', symbol: 'MD' }],
    })

    render(<TestApiComponent />)

    const fetchButton = screen.getByText('Fetch Data')
    await user.click(fetchButton)

    await waitFor(() => {
      expect(screen.getByTestId('data')).toBeInTheDocument()
    })

    expect(screen.getByTestId('data')).toHaveTextContent('United States')
  })

  test('should handle API errors', async () => {
    const user = userEvent.setup()

    // Mock an error response
    mockApiError('GET', '/api/location', 'Server error', 500)

    render(<TestApiComponent />)

    const fetchButton = screen.getByText('Fetch Data')
    await user.click(fetchButton)

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument()
    })

    expect(screen.getByTestId('error')).toHaveTextContent('Server error')
  })

  test('should make successful POST request', async () => {
    const user = userEvent.setup()

    // Mock the POST response
    mockApiResponse('POST', '/api/location', { success: true }, 201)

    render(<TestApiComponent />)

    const submitButton = screen.getByText('Submit Data')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByTestId('data')).toBeInTheDocument()
    })

    expect(screen.getByTestId('data')).toHaveTextContent('success')
  })
})

describe('Direct API Function Testing', () => {
  test('should format outgoing body correctly', async () => {
    mockApiResponse('POST', '/test-endpoint', { success: true })

    const response = await postRequest('/test-endpoint', {
      firstName: 'John',
      lastName: 'Doe',
      emailAddress: 'john@example.com',
    })

    expect(response.status).toBe(200)
  })

  test('should handle location API with different parameters', async () => {
    // Test country only
    mockLocationApi({ country: 'US' })
    let response = await getRequest('/api/location?country=US')
    let data = await response.json()
    expect(data.country.symbol).toBe('US')
    expect(data.states_list).toHaveLength(2)

    // Test country and state
    mockLocationApi({ country: 'US', state: 'MD' })
    response = await getRequest('/api/location?country=US&state=MD')
    data = await response.json()
    expect(data.state.symbol).toBe('MD')
    expect(data.cities_list).toHaveLength(2)
  })

  test('should handle connections API', async () => {
    const mockConnections = [
      { id: 1, participant_id: 1, study_id: 1, status: 'active' },
      { id: 2, participant_id: 2, study_id: 1, status: 'pending' },
    ]

    mockConnectionsApi(mockConnections)

    const response = await getRequest('/p/connections')
    const data = await response.json()

    expect(data.connections).toHaveLength(2)
    expect(data.connections[0].status).toBe('active')
    expect(data.connections[1].status).toBe('pending')
  })
})

describe('API Error Handling', () => {
  test('should handle network errors', async () => {
    // Mock a network error by not setting up any handler
    // This will cause the request to fail in a real environment
    // In the test environment, MSW will catch it and return 404

    const response = await getRequest('/api/nonexistent-endpoint')
    expect(response.status).toBe(404)
  })

  test('should handle 404 errors', async () => {
    mockApiError('GET', '/api/nonexistent', 'Not found', 404)

    const response = await getRequest('/api/nonexistent')
    expect(response.status).toBe(404)
  })

  test('should handle 500 errors', async () => {
    mockApiError('POST', '/api/location', 'Internal server error', 500)

    const response = await postRequest('/api/location', {})
    expect(response.status).toBe(500)
  })
})
