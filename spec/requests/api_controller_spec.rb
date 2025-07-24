# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'ApiController' do
  describe 'POST /api/location' do
    let(:valid_params) do
      {
        api: {
          country: 'US',
          state: 'CA',
          city: 'San Francisco'
        }
      }
    end

    it 'returns JSON response' do
      post '/api/location', params: valid_params

      expect(response).to have_http_status(:success)
      expect(response.content_type).to include('application/json')
    end

    context 'with invalid params' do
      it 'returns an error' do
        post '/api/location', params: { api: { country: '' } }

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
