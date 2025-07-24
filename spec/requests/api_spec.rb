# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api' do
  describe 'POST /location' do
    let(:country) { nil }
    let(:state) { nil }
    let(:city) { nil }
    let(:params) { { api: { country:, state:, city: } } }

    before { post '/api/location', params: params }

    context 'when passed only a country' do
      let(:country) { 'US' }

      it 'returns a list of states and provinces for that country' do
        expect(json['country']).to eq({ 'name' => 'United States', 'symbol' => 'US' })
        expect(json['state']).to be_empty
        expect(json['states_list']).not_to be_empty
        expect(json['city']).to be_empty
      end
    end

    context 'when passed a country and city' do
      let(:country) { 'US' }
      let(:state) { 'MD' }

      it 'returns a list of cities' do
        expect(json['country']).to eq({ 'name' => 'United States', 'symbol' => 'US' })
        expect(json['state']).to eq({ 'name' => 'Maryland', 'symbol' => 'MD' })
        expect(json['cities_list']).not_to be_empty
        expect(json['city']).to be_empty
      end
    end

    context 'when passed a complete list' do
      let(:country) { 'US' }
      let(:state) { 'MD' }
      let(:city) { 'Bel Air' }

      it 'returns 204 no_content' do
        expect(response).to have_http_status(:ok)
      end
    end
  end
end
