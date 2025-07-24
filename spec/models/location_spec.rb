# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Location do
  let(:location) { create(:location) }
  let(:participant) { create(:participant) }
  let(:study) { create(:study) }

  describe 'model creation' do
    context 'with valid attributes' do
      it 'creates a new model' do
        expect { described_class.create!(attributes_for(:location)) }.not_to raise_error
      end
    end
  end

  describe 'associations' do
    it 'belongs to participant optionally' do
      expect(location.participant).to be_nil
      participant = create(:participant)
      location.update!(participant:)
      expect(location.participant).to eq(participant)
    end

    it 'belongs to study optionally' do
      expect(location.study).to be_nil
      study = create(:study)
      location.update!(study:)
      expect(location.study).to eq(study)
    end
  end

  describe 'geocoding' do
    let(:is_production) { true }

    before do
      allow(location).to receive(:geocode)
      allow(Rails.env).to receive(:production?).and_return(is_production)

      location.city = 'New York'
    end

    context 'when city is present and in production' do
      it 'geocodes the address' do
        location.valid?
        expect(location).to have_received(:geocode)
      end
    end

    context 'when city is not present' do
      before { location.city = nil }

      it 'does not geocode' do
        location.valid?
        expect(location).not_to have_received(:geocode)
      end
    end

    context 'when not in production' do
      let(:is_production) { false }

      it 'does not geocode' do
        location.valid?
        expect(location).not_to have_received(:geocode)
      end
    end
  end

  describe 'scopes' do
    describe '.has_study' do
      let!(:location_with_study) { create(:location, study: create(:study)) }
      let!(:location_with_participant) { create(:location, study: nil, participant: create(:participant)) }

      it 'returns locations with study_id' do
        expect(described_class.has_study).to include(location_with_study)
        expect(described_class.has_study).not_to include(location_with_participant)
      end
    end
  end

  describe '#address' do
    context 'when all fields are present' do
      let(:location) { create(:location, city: 'New York', state: 'NY', country: 'US') }

      it 'returns formatted address' do
        expect(location.address).to eq('New York, NY, US')
      end
    end

    context 'when some fields are missing' do
      let(:location) { create(:location, city: 'New York', state: nil, country: 'US') }

      it 'returns address with only present fields' do
        expect(location.address).to eq('New York, US')
      end
    end

    context 'when only city is present' do
      let(:location) { create(:location, city: 'New York', state: nil, country: nil) }

      it 'returns just city' do
        expect(location.address).to eq('New York')
      end
    end
  end

  describe '#complete?' do
    let(:location) { create(:location, city:, state:, country:) }
    let(:city) { 'New York' }
    let(:state) { 'NY' }
    let(:country) { 'US' }

    context 'when all required fields are present' do
      it 'returns true' do
        expect(location.complete?).to be true
      end
    end

    context 'when city is missing' do
      let(:city) { nil }

      it 'returns false' do
        expect(location.complete?).to be false
      end
    end

    context 'when state is missing' do
      let(:state) { nil }

      it 'returns false' do
        expect(location.complete?).to be false
      end
    end

    context 'when country is missing' do
      let(:country) { nil }

      it 'returns false' do
        expect(location.complete?).to be false
      end
    end
  end
end
