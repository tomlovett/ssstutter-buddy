# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'ApiController' do
  describe 'POST /api/location' do
    let(:country) { 'US' }
    let(:state) { 'MD' }
    let(:city) { 'Baltimore' }
    let(:params) { { api: { country:, state:, city: } } }

    context 'when passed only a country' do
      let(:state) { nil }
      let(:city) { nil }

      it 'returns a list of states and provinces for that country' do
        post '/api/location', params: params

        expect(response).to have_http_status(:success)
        expect(response.content_type).to include('application/json')
        expect(json['country']).to eq({ 'name' => 'United States', 'symbol' => 'US' })
        expect(json['state']).to be_empty
        expect(json['states_list']).not_to be_empty
        expect(json['city']).to be_empty
      end
    end

    context 'when passed a country and state' do
      let(:city) { nil }

      it 'returns a list of cities' do
        post '/api/location', params: params

        expect(response).to have_http_status(:success)
        expect(response.content_type).to include('application/json')
        expect(json['country']).to eq({ 'name' => 'United States', 'symbol' => 'US' })
        expect(json['state']).to eq({ 'name' => 'Maryland', 'symbol' => 'MD' })
        expect(json['cities_list']).not_to be_empty
        expect(json['city']).to be_empty
      end
    end

    context 'when passed a complete list' do
      it 'returns success status' do
        post '/api/location', params: params

        expect(response).to have_http_status(:success)
        expect(response.content_type).to include('application/json')
      end
    end

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
