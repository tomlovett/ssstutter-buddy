# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Participant do
  let(:participant) { create(:participant) }

  describe 'model creation' do
    context 'with valid attributes' do
      it 'creates a new model' do
        expect { create(:participant) }.not_to raise_error
      end
    end
  end

  describe 'associations' do
    it 'belongs to user' do
      expect(participant.user).to be_present
    end

    it 'has many connections' do
      expect(participant.connections).to be_empty

      connection = create(:connection, participant:)

      expect(participant.connections).to include(connection)
    end

    it 'has one location' do
      expect(participant.location).to be_present
    end

    it 'accepts nested attributes for location' do
      participant = build(:participant, location_attributes: { city: 'New York', state: 'NY', country: 'US' })
      expect(participant.location.city).to eq('New York')
    end
  end

  describe 'delegations' do
    it 'delegates first_name, last_name, and email to user' do
      expect(participant.first_name).to eq(participant.user.first_name)
      expect(participant.last_name).to eq(participant.user.last_name)
      expect(participant.email).to eq(participant.user.email)
    end
  end

  describe '#as_json' do
    it 'includes location' do
      expect(participant.as_json).to have_key('location')
    end

    it 'includes delegated methods' do
      json = participant.as_json

      expect(json['first_name']).to eq(participant.first_name)
      expect(json['last_name']).to eq(participant.last_name)
      expect(json['email']).to eq(participant.email)
    end
  end

  describe '#complete?' do
    context 'when all required fields are present' do
      it 'returns true' do
        expect(participant.complete?).to be true
      end
    end

    context 'when required fields are missing' do
      it 'returns false when location is missing' do
        participant.location = nil

        expect(participant.complete?).to be false
      end

      it 'returns false when location is incomplete' do
        participant.location.city = nil

        expect(participant.complete?).to be false
      end

      it 'returns false when codename is missing' do
        participant.codename = nil

        expect(participant.complete?).to be false
      end

      it 'returns false when birthdate is missing' do
        participant.birthdate = nil

        expect(participant.complete?).to be false
      end

      it 'returns false when gender is missing' do
        participant.gender = nil

        expect(participant.complete?).to be false
      end
    end
  end

  describe '#nearby_studies' do
    let(:new_york_location) { create(:location, latitude: 40.7128, longitude: -74.0060) }
    let(:study) { create(:study, :in_person, location: new_york_location) }

    before { participant.location.update!(latitude: 40.7128, longitude: -74.0060) }

    context 'when location is complete' do
      it 'returns nearby published studies' do
        study.update!(published_at: Time.current)

        expect(participant.nearby_studies).to include(study)
      end

      it 'returns empty array when no nearby published studies' do
        expect(participant.nearby_studies).to be_empty
      end
    end

    context 'when location is incomplete' do
      before { participant.location.update!(city: nil) }

      it 'returns empty array' do
        expect(participant.nearby_studies).to be_empty
      end
    end
  end

  # describe '#badges' do
  #   let(:participant) { create(:participant) }

  #   it 'returns badges hash' do
  #     expect(participant.badges).to be_a(Hash)
  #   end
  # end

  describe '#completed_studies' do
    let!(:completed_connection) { create(:connection, participant:, status: Connection::STUDY_COMPLETED) }
    let!(:in_progress_connection) { create(:connection, participant:, status: Connection::STUDY_BEGAN) }

    it 'returns completed connections' do
      expect(participant.completed_studies).to include(completed_connection)
      expect(participant.completed_studies).not_to include(in_progress_connection)
    end
  end

  describe '#potential_codenames' do
    it 'returns potential codenames' do
      expect(participant.potential_codenames).to be_an(Array)
    end
  end
end
