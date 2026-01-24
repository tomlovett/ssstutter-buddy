# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Study do
  let(:study) { create(:study) }

  describe 'model creation' do
    context 'with valid attributes' do
      it 'creates a new model' do
        expect { create(:study) }.not_to raise_error
      end
    end
  end

  describe 'associations' do
    it 'belongs to researcher' do
      expect(study.researcher).to be_present
    end

    it 'has many connections' do
      expect(study.connections).to be_empty

      connection = create(:connection, study:)

      expect(study.connections).to include(connection)
    end

    context 'with a hybrid study' do
      let(:study) { create(:study, :hybrid) }

      it 'has a location' do
        expect(study.location).to be_present
      end
    end

    context 'with a digital study' do
      let(:study) { create(:study, :digital) }

      it 'does not have a location' do
        expect(study.location).to be_nil
      end
    end

    context 'with an in-person study' do
      let(:study) { create(:study, :in_person) }

      it 'has a location' do
        expect(study.location).to be_present
      end
    end

    it 'accepts nested attributes for location' do
      study = build(:study, location_attributes: { city: 'New York', state: 'NY', country: 'US' })
      expect(study.location.city).to eq('New York')
    end
  end

  describe 'scopes' do
    describe 'for status-related functionality' do
      # For the study types below, look at factory to understand the logic
      let!(:draft_study) { create(:study, :draft) }
      let!(:active_study) { create(:study, :active) }
      let!(:paused_study) { create(:study, :paused) }
      let!(:closed_study) { create(:study, :closed) }

      describe '.draft' do
        it 'returns studies with no published_at and no closed_at' do
          expect(described_class.draft).to contain_exactly(draft_study)
        end
      end

      describe '.active' do
        it 'returns published studies that are not closed or paused' do
          expect(described_class.active).to contain_exactly(active_study)
        end
      end

      describe '.paused' do
        it 'returns studies with paused_at set' do
          expect(described_class.paused).to contain_exactly(paused_study)
        end
      end

      describe '.published' do
        it 'returns studies with published_at set' do
          # Maybe should not include closed study?
          expect(described_class.published).to contain_exactly(active_study, paused_study, closed_study)
          expect(described_class.published).not_to include(draft_study)
        end
      end

      describe '.closed' do
        it 'returns studies with closed_at set' do
          expect(described_class.closed).to contain_exactly(closed_study)
        end
      end
    end
  end

  describe 'for location-related functionality' do
    describe '.digital_friendly' do
      let!(:digital_study) { create(:study, location_type: Study::DIGITAL) }
      let!(:hybrid_study) { create(:study, location_type: Study::HYBRID) }
      let!(:in_person_study) { create(:study, location_type: Study::IN_PERSON) }

      it 'returns studies with digital or hybrid location type' do
        expect(described_class.digital_friendly.pluck(:id)).to contain_exactly(digital_study.id, hybrid_study.id)
        expect(described_class.digital_friendly.pluck(:id)).not_to include(in_person_study.id)
      end
    end
  end

  describe 'constants' do
    it 'defines location type constants' do
      expect(Study::DIGITAL).to eq('digital')
      expect(Study::HYBRID).to eq('hybrid')
      expect(Study::IN_PERSON).to eq('in_person')
    end
  end

  describe '#as_json' do
    context 'when location is present' do
      before { create(:location, study:) }

      it 'includes location when present' do
        expect(study.as_json).to have_key('location')
        expect(study.as_json['location']['city']).to be_present
      end
    end

    context 'when location is nil' do
      it 'does not include a location key' do
        expect(study.as_json).not_to have_key(:location)
      end
    end
  end

  describe '#address' do
    context 'when location_type is digital' do
      let(:study) { create(:study, location_type: Study::DIGITAL) }

      it 'returns empty string' do
        expect(study.address).to eq('')
      end
    end

    context 'when location is nil' do
      let(:study) { create(:study, location: nil) }

      it 'returns empty string' do
        expect(study.address).to eq('')
      end
    end

    context 'when location exists' do
      let(:study) { create(:study, :in_person) }

      it 'returns formatted address' do
        expect(study.address).to eq("#{study.location.city}, #{study.location.state}, #{study.location.country}")
      end
    end
  end

  describe '#short_addr' do
    context 'when location_type is digital' do
      let(:study) { create(:study, location_type: Study::DIGITAL) }

      it 'returns "Online"' do
        expect(study.short_addr).to eq('Online')
      end
    end

    context 'when location is nil' do
      let(:study) { create(:study, location: nil, location_type: Study::IN_PERSON) }

      it 'returns "To be assigned"' do
        expect(study.short_addr).to eq('To be assigned')
      end
    end

    context 'when location_type is hybrid' do
      let(:study) { create(:study, :hybrid) }

      it 'returns hybrid format' do
        expected = "Online / #{study.location.city}, #{study.location.state}"
        expect(study.short_addr).to eq(expected)
      end
    end

    context 'when location_type is in_person' do
      let(:study) { create(:study, :in_person) }

      it 'returns in-person format' do
        expected = "#{study.location.city}, #{study.location.state}, #{study.location.country}"
        expect(study.short_addr).to eq(expected)
      end
    end
  end

  describe '#status' do
    let(:study) { create(:study, published_at:, closed_at:, paused_at:) }
    let(:published_at) { nil }
    let(:paused_at) { nil }
    let(:closed_at) { nil }

    context 'with no values for published_at, paused_at, or closed_at' do
      it 'returns "draft"' do
        expect(study.status).to eq('draft')
      end
    end

    context 'when published_at and paused_at are set' do
      let(:published_at) { 3.days.ago }
      let(:paused_at) { 1.day.ago }

      it 'returns "paused"' do
        expect(study.status).to eq('paused')
      end
    end

    context 'when published_at and closed_at are set' do
      let(:published_at) { 3.days.ago }
      let(:closed_at) { 1.day.ago }

      it 'returns "closed"' do
        expect(study.status).to eq('closed')
      end
    end

    context 'when published and active' do
      let(:published_at) { 3.days.ago }

      it 'returns "active"' do
        expect(study.status).to eq('active')
      end
    end
  end

  describe '#timeline' do
    context 'with single session' do
      let(:study) { create(:study, total_sessions: 1, total_hours: 2.5) }

      it 'returns single session format' do
        expect(study.timeline).to eq('2.5 hours in one session')
      end
    end

    context 'with multiple sessions' do
      let(:study) { create(:study, total_sessions: 3, total_hours: 6, duration: '2 weeks') }

      it 'returns multiple session format' do
        expect(study.timeline).to eq('6.0 total hours in 3 sessions over the course of 2 weeks')
      end
    end
  end

  describe '#age_range' do
    context 'when no age restrictions' do
      let(:study) { create(:study, min_age: nil, max_age: nil) }

      it 'returns "All ages"' do
        expect(study.age_range).to eq('All ages')
      end
    end

    context 'when only min_age is set' do
      let(:study) { create(:study, min_age: 18, max_age: nil) }

      it 'returns min_age and up format' do
        expect(study.age_range).to eq('18 and up')
      end
    end

    context 'when only max_age is set' do
      let(:study) { create(:study, min_age: nil, max_age: 65) }

      it 'returns max_age and under format' do
        expect(study.age_range).to eq('65 and under')
      end
    end

    context 'when both min_age and max_age are set' do
      let(:study) { create(:study, min_age: 18, max_age: 65) }

      it 'returns range format' do
        expect(study.age_range).to eq('18-65')
      end
    end
  end
end
