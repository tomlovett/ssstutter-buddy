require('@testing-library/jest-dom')

// Polyfill fetch, Request, Response, Headers for Node.js using node-fetch
const nodeFetch = require('node-fetch')
global.fetch = nodeFetch
global.Request = nodeFetch.Request
global.Response = nodeFetch.Response
global.Headers = nodeFetch.Headers

// TextEncoder polyfill
global.TextEncoder = class TextEncoder {
  encode(text) {
    return Buffer.from(text, 'utf8')
  }
}

// TextDecoder polyfill
global.TextDecoder = class TextDecoder {
  decode(buffer) {
    return Buffer.from(buffer).toString('utf8')
  }
}

// TransformStream polyfill
global.TransformStream = class TransformStream {
  constructor() {
    this.readable = {
      getReader() {
        return {
          read() {
            return Promise.resolve({ done: true, value: undefined })
          },
        }
      },
    }
    this.writable = {
      getWriter() {
        return {
          write() {
            return Promise.resolve()
          },
        }
      },
    }
  }
}

// BroadcastChannel polyfill for Node.js
global.BroadcastChannel = class BroadcastChannel {
  constructor(name) {
    this.name = name
    this.onmessage = null
  }
  postMessage() {}
  close() {}
  addEventListener() {}
  removeEventListener() {}
}

// Mock toast for testing
global.toast = {
  success: jest.fn(),
  error: jest.fn(),
  warning: jest.fn(),
  info: jest.fn(),
}

// Automatically inject React globally for JSX
global.React = require('react')

// Mock Inertia Head component
jest.mock('@inertiajs/react', () => ({
  ...jest.requireActual('@inertiajs/react'),
  Head: ({ children }) => children,
}))

// MSW setup for API testing
const { server } = require('./app/frontend/__tests__/mocks/server')

// Establish API mocking before all tests
beforeAll(() => server.listen())

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished
afterAll(() => server.close())

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {
    return null
  }
  disconnect() {
    return null
  }
  unobserve() {
    return null
  }
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {
    return null
  }
  disconnect() {
    return null
  }
  unobserve() {
    return null
  }
}

// Mock scrollTo
global.scrollTo = jest.fn()
