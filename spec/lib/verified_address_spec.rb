# frozen_string_literal: true

require 'rails_helper'

RSpec.describe VerifiedAddress do
  subject(:as_json) { described_class.new(location_hash).as_json }

  let(:country) { nil }
  let(:state) { nil }
  let(:city) { nil }
  let(:location_hash) { { country:, state:, city: }.symbolize_keys }

  describe '#as_json' do
    context 'when passed no values' do
      it 'returns an empty hash' do
        expect(as_json).to eq({ country: {}, state: {}, city: {}, states_list: [], cities_list: [] })
      end
    end

    context 'when passed only a country value' do
      let(:country) { 'US' }

      it 'returns the formatted country with an array of states' do
        expect(as_json[:country]).to eq({ name: 'United States of America', symbol: 'US' })
        expect(as_json[:states_list]).not_to be_empty
        expect(as_json[:states_list]).to include({ name: 'Maryland', symbol: 'MD' })
        expect(as_json[:state]).to eq({})
        expect(as_json[:city]).to eq({})
      end
    end

    context 'when passed a country and state' do
      let(:country) { 'US' }
      let(:state) { 'MD' }

      it 'returns the formmatted country and city with an array of city names' do
        expect(as_json[:country]).to eq({ name: 'United States of America', symbol: 'US' })
        expect(as_json[:state]).to eq({ name: 'Maryland', symbol: 'MD' })
        expect(as_json[:cities_list]).to include({ name: 'Bel Air', symbol: 'Bel Air' })
      end
    end

    context 'when passed a country, state and city' do
      let(:country) { 'US' }
      let(:state) { 'MD' }
      let(:city) { 'Bel Air' }

      it 'returns a completely formatted hash' do
        expect(as_json[:country]).to eq({ name: 'United States of America', symbol: 'US' })
        expect(as_json[:state]).to eq({ name: 'Maryland', symbol: 'MD' })
        expect(as_json[:city]).to eq({ name: 'Bel Air', symbol: 'Bel Air' })
        expect(as_json[:cities_list]).to include({ name: 'Bel Air', symbol: 'Bel Air' })
      end
    end

    context 'with a town outside the US' do
      let(:country) { 'AR' } # Argentina
      let(:state) { 'M' } # Mendoza
      let(:city) { 'Lujan de Cuyo' }

      it 'returns a completely formatted hash' do
        expect(as_json[:country]).to eq({ name: 'Argentina', symbol: 'AR' })
        expect(as_json[:state]).to eq({ name: 'Mendoza', symbol: 'M' })
        expect(as_json[:city]).to eq({ name: 'Lujan de Cuyo', symbol: 'Lujan de Cuyo' })
        expect(as_json[:states_list]).not_to be_empty
        expect(as_json[:cities_list]).not_to be_empty
      end
    end
  end
end
