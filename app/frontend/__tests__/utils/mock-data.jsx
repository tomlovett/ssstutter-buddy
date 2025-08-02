// Mock data functions for components
export const getMockUser = (opts = {}) => ({
  id: opts.id || 1,
  email: opts.email || 'test@example.com',
  first_name: opts.first_name || 'John',
  last_name: opts.last_name || 'Doe',
  participant: opts.participant || {
    id: opts.participant_id || 1,
    codename: opts.codename || 'TestParticipant',
    birthdate: opts.birthdate || '1990-01-01',
    gender: opts.gender || 'm',
    location: opts.participant?.location || {
      id: opts.location_id || 1,
      country: opts.country || 'US',
      state: opts.state || 'MD',
      city: opts.city || 'Baltimore',
    },
  },
})

// Simple mock user for basic tests
export const getSimpleMockUser = (opts = {}) => ({
  id: opts.id || 1,
  email: opts.email || 'test@example.com',
  first_name: opts.first_name || 'John',
  last_name: opts.last_name || 'Doe',
})

// Empty mock user for signup tests
export const getEmptyMockUser = (opts = {}) => ({
  first_name: opts.first_name || '',
  last_name: opts.last_name || '',
  email: opts.email || '',
})

export const getMockLocation = (opts = {}) => ({
  id: opts.id || 1,
  country: opts.country || 'US',
  state: opts.state || 'MD',
  city: opts.city || 'Baltimore',
})

export const getMockStudy = (opts = {}) => ({
  id: opts.id || 1,
  title: opts.title || 'Test Study',
  short_desc: opts.short_desc || 'A test study',
  long_desc: opts.long_desc || 'This is a test study description',
  published_at: opts.published_at || '2024-01-01T00:00:00Z',
  methodologies: opts.methodologies || 'online,in_person',
  min_age: opts.min_age || 18,
  max_age: opts.max_age || 65,
  total_hours: opts.total_hours || 2,
  total_sessions: opts.total_sessions || 1,
  duration: opts.duration || '2 hours',
  follow_up: opts.follow_up || '1 week',
  remuneration: opts.remuneration || '$50',
  location_type: opts.location_type || 'in_person',
  location: opts.location || {
    country: opts.location_country || 'US',
    state: opts.location_state || 'MD',
    city: opts.location_city || 'Baltimore',
  },
})

export const getMockResearcher = (opts = {}) => ({
  id: opts.id || 1,
  professional_name: opts.professional_name || 'Dr. Jane Smith',
  institution: opts.institution || 'Test University',
})

export const getMockInvitation = (opts = {}) => ({
  id: opts.id || 1,
  participant_id: opts.participant_id || 1,
  study_id: opts.study_id || 1,
  status: opts.status || 'pending',
  status_explanation: opts.status_explanation || '',
})

export const getMockConnection = (opts = {}) => ({
  id: opts.id || 1,
  participant_id: opts.participant_id || 1,
  study_id: opts.study_id || 1,
  status: opts.status || 'active',
  participant: opts.participant || {
    id: opts.participant_id || 1,
    codename: opts.participant_codename || 'TestParticipant',
  },
})
