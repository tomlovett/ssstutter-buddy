# frozen_string_literal: true

Geocoder.configure(
  lookup: :location_iq,
  ip_lookup: :location_iq,
  api_key: ENV.fetch('LOCATION_IQ_API_KEY', nil),
  http_headers: { 'User-Agent' => 'SSStutterBuddy' }
)
