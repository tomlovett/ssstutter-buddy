import { http, HttpResponse } from 'msw'

// Base URL for API calls - match the actual requests
const API_BASE = 'http://localhost'

export const handlers = [
  // GET /api/location
  http.get(`${API_BASE}/api/location`, ({ request }) => {
    const url = new URL(request.url)
    const country = url.searchParams.get('country')
    const state = url.searchParams.get('state')
    const city = url.searchParams.get('city')

    if (country === 'US' && !state && !city) {
      return HttpResponse.json({
        country: { name: 'United States', symbol: 'US' },
        state: {},
        states_list: [
          { name: 'Maryland', symbol: 'MD' },
          { name: 'California', symbol: 'CA' },
          { name: 'New York', symbol: 'NY' },
        ],
        city: {},
        cities_list: [],
      })
    }

    if (country === 'US' && state === 'MD' && !city) {
      return HttpResponse.json({
        country: { name: 'United States', symbol: 'US' },
        state: { name: 'Maryland', symbol: 'MD' },
        cities_list: [
          { name: 'Baltimore', symbol: 'BAL' },
          { name: 'Annapolis', symbol: 'ANA' },
        ],
        city: {},
      })
    }

    if (country === 'US' && state === 'MD' && city === 'Baltimore') {
      return HttpResponse.json({
        country: { name: 'United States', symbol: 'US' },
        state: { name: 'Maryland', symbol: 'MD' },
        city: { name: 'Baltimore', symbol: 'BAL' },
      })
    }

    return HttpResponse.json({
      country: {},
      state: {},
      city: {},
      states_list: [],
      cities_list: [],
    })
  }),

  // POST /api/location
  http.post(`${API_BASE}/api/location`, async ({ request }) => {
    const body = await request.json()

    // Mock successful location submission
    return HttpResponse.json({ success: true }, { status: 200 })
  }),

  // GET /p/connections
  http.get(`${API_BASE}/p/connections`, () => {
    return HttpResponse.json({
      connections: [
        {
          id: 1,
          participant_id: 1,
          study_id: 1,
          status: 'active',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ],
    })
  }),

  // POST /p/connections
  http.post(`${API_BASE}/p/connections`, async ({ request }) => {
    const body = await request.json()

    return HttpResponse.json(
      {
        connection: {
          id: 2,
          participant_id: body.participant_id,
          study_id: body.study_id,
          status: 'pending',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      },
      { status: 201 }
    )
  }),

  // GET /r/studies
  http.get(`${API_BASE}/r/studies`, () => {
    return HttpResponse.json({
      studies: [
        {
          id: 1,
          title: 'Test Study',
          description: 'A test study for API testing',
          status: 'active',
          created_at: '2024-01-01T00:00:00Z',
        },
      ],
    })
  }),

  // Error handler for unmatched requests
  http.all('*', ({ request }) => {
    console.warn(`Unhandled ${request.method} request to ${request.url}`)
    return HttpResponse.json({ error: 'Not found' }, { status: 404 })
  }),
]
