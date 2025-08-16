import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import InvitePage from '../../pages/invite'

// Mock the dependencies
jest.mock('react-hook-form', () => ({
  useForm: () => ({
    handleSubmit: fn => fn,
    reset: jest.fn(),
  }),
}))

const mockPostRequest = jest.fn()
jest.mock('@/lib/api', () => ({
  postRequest: mockPostRequest,
}))

const mockToast = {
  success: jest.fn(),
  error: jest.fn(),
}
jest.mock('sonner', () => ({
  toast: mockToast,
}))

jest.mock('@/components/ui/form', () => ({
  Form: ({ children }) => <div>{children}</div>,
}))

jest.mock('@/components/ui/custom/formInput', () => {
  return function FormInput({ placeholder }) {
    return <input placeholder={placeholder} />
  }
})

describe('InvitePage', () => {
  const mockUser = {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    researcher: false,
  }

  it('renders the invite page with correct content', () => {
    render(<InvitePage user={mockUser} />)

    expect(screen.getByText('Invite a Friend')).toBeInTheDocument()
    expect(screen.getByText(/Help us advance the pace of stuttering research!/)).toBeInTheDocument()
    expect(screen.getByText(/Enter a friend's email/)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument()
    expect(screen.getByText('Send')).toBeInTheDocument()
  })

  it('shows "colleague" text for researchers', () => {
    const researcherUser = { ...mockUser, researcher: true }
    render(<InvitePage user={researcherUser} />)

    expect(screen.getByText(/Enter a colleague's email/)).toBeInTheDocument()
  })

  it('shows "friend" text for non-researchers', () => {
    render(<InvitePage user={mockUser} />)

    expect(screen.getByText(/Enter a friend's email/)).toBeInTheDocument()
  })

  it('renders form with email input and submit button', () => {
    render(<InvitePage user={mockUser} />)

    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument()
    expect(screen.getByText('Send')).toBeInTheDocument()
  })

  it('has the correct form structure', () => {
    render(<InvitePage user={mockUser} />)

    const form = screen.getByDisplayValue('')
    expect(form.closest('form')).toBeInTheDocument()
    expect(form.closest('form')).toHaveAttribute('class', expect.stringContaining('space-y-6'))
  })
})
