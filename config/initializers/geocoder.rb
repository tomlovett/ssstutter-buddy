# frozen_string_literal: true

Geocoder.configure(
  lookup: :nominatim,
  http_headers: { 'User-Agent' => 'Tom Lovett' }
)
