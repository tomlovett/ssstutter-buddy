# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'ApiController' do
  describe 'POST /api/location' do
    let(:country) { 'US' }
    let(:state) { 'CA' }
    let(:city) { 'San Francisco' }

    let(:params) { { api: { country:, state:, city: } } }

    context 'with values for all three fields' do
      it 'returns JSON response' do
        post '/api/location', params: params

        expect(response).to have_http_status(:success)
        expect(response.content_type).to include('application/json')
      end
    end

    context 'with values for only country' do
      let(:state) { nil }
      let(:city) { nil }

      it 'returns JSON response' do
        post '/api/location', params: params

        expect(response).to have_http_status(:success)
        expect(response.content_type).to include('application/json')
      end
    end

    context 'with values for only country and state' do
      let(:city) { nil }

      it 'returns JSON response' do
        post '/api/location', params: params

        expect(response).to have_http_status(:success)
        expect(response.content_type).to include('application/json')
      end
    end
  end
end
