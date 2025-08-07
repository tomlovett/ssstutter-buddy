# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Researcher do
  let(:researcher) { create(:researcher) }

  describe 'model creation' do
    context 'with valid attributes' do
      it 'creates a new model' do
        expect { create(:researcher) }.not_to raise_error
      end
    end
  end

  describe 'associations' do
    it 'belongs to user' do
      expect(researcher.user).to be_present
    end

    it 'has many studies' do
      expect(researcher.studies).to be_empty

      study = create(:study, researcher:)

      expect(researcher.studies).to include(study)
    end

    it 'has many connections through studies' do
      study = create(:study, researcher:)
      connection = create(:connection, study:)

      expect(researcher.connections).to include(connection)
    end

    it 'has one attached headshot' do
      expect(researcher.headshot).not_to be_attached
      # Headshot is optional and not attached by default
    end
  end

  describe 'delegations' do
    it 'delegates first_name, last_name, full_name, and email to user' do
      expect(researcher.first_name).to eq(researcher.user.first_name)
      expect(researcher.last_name).to eq(researcher.user.last_name)
      expect(researcher.full_name).to eq(researcher.user.full_name)
      expect(researcher.email).to eq(researcher.user.email)
    end
  end

  describe '#as_json' do
    it 'includes delegated attributes' do
      json = researcher.as_json

      expect(json[:first_name]).to eq(researcher.first_name)
      expect(json[:last_name]).to eq(researcher.last_name)
      expect(json[:email]).to eq(researcher.email)
    end

    it 'includes professional_name' do
      json = researcher.as_json
      expect(json[:professional_name]).to eq(researcher.professional_name)
    end

    it 'includes headshot_url key' do
      json = researcher.as_json

      expect(json).to have_key(:headshot_url)
      expect(json[:headshot_url]).to be_nil # headshot_url is nil when headshot is not attached
    end

    context 'when headshot is attached' do
      before do
        researcher.headshot.attach(
          io: Rails.root.join('spec/fixtures/files/test_image.jpg').open,
          filename: 'test_image.jpg',
          content_type: 'image/jpeg'
        )
      end

      it 'includes headshot_url with direct URL' do
        # Set host for URL generation
        Rails.application.routes.default_url_options = { host: 'example.com' }

        json = researcher.as_json

        expect(json[:headshot_url]).to be_present
        expect(json[:headshot_url]).to start_with('http')
        expect(json[:headshot_url]).to include('rails/active_storage/blobs')
      end
    end
  end

  describe '#complete?' do
    context 'when all required fields are present' do
      it 'returns true' do
        expect(researcher.complete?).to be true
      end
    end

    context 'when required fields are missing' do
      it 'returns false when institution is missing' do
        researcher.institution = nil
        expect(researcher.complete?).to be false
      end

      it 'returns false when bio is missing' do
        researcher.bio = nil
        expect(researcher.complete?).to be false
      end

      it 'returns false when research_interests is missing' do
        researcher.research_interests = nil
        expect(researcher.complete?).to be false
      end

      it 'returns false when university_profile_url is missing' do
        researcher.university_profile_url = nil
        expect(researcher.complete?).to be false
      end
    end
  end

  describe '#professional_name' do
    let(:researcher) { create(:researcher, titles: titles) }
    let(:titles) { 'PhD, CCC, SLP' }

    context 'when titles are present' do
      it 'includes titles' do
        expect(researcher.professional_name).to eq("#{researcher.full_name}, PhD, CCC, SLP")
      end
    end

    context 'when titles are not present' do
      let(:titles) { nil }

      it 'returns just full name' do
        expect(researcher.professional_name).to eq(researcher.full_name)
      end
    end
  end

  describe '#connected_participant_ids' do
    let(:study) { create(:study, researcher:) }
    let(:connected_participant) { create(:participant) }
    let(:second_connected_participant) { create(:participant) }
    let(:not_connected_participant) { create(:participant) }

    before do
      create(:connection, study:, participant: connected_participant, status: Connection::CONNECTED)
      create(:connection, study:, participant: second_connected_participant, status: Connection::CONNECTED)
    end

    it 'returns unique participant ids for accepted invitations' do
      connected_ids = researcher.connected_participant_ids

      expect(connected_ids).to contain_exactly(connected_participant.id, second_connected_participant.id)
    end
  end
end
