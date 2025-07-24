# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Connection do
  describe 'model creation' do
    context 'with valid attributes' do
      it 'creates a new model' do
        expect { create(:connection) }.not_to raise_error
      end
    end

    context 'with invalid attributes' do
      it 'requires pin to be 6 characters' do
        connection = build(:connection, pin: '12345')

        expect(connection).not_to be_valid
        expect(connection.errors[:pin]).to include('is the wrong length (should be 6 characters)')
      end

      it 'validates invitation_status inclusion' do
        connection = build(:connection, invitation_status: 'invalid_status')
        expect(connection).not_to be_valid
        expect(connection.errors[:invitation_status]).to include('is not included in the list')
      end
    end
  end

  describe 'associations' do
    let(:connection) { create(:connection) }

    it 'belongs to participant and researcher through study' do
      expect(connection.participant).to be_present
      expect(connection.study).to be_present
      expect(connection.researcher).to eq(connection.study.researcher)
    end
  end

  describe 'constants' do
    it 'defines invitation statuses' do
      expect(Connection::INVITED).to eq('invited')
      expect(Connection::ACCEPTED).to eq('accepted')
      expect(Connection::DECLINED).to eq('declined')
      expect(Connection::INTERESTED).to eq('interested')
      expect(Connection::NOT_INTERESTED).to eq('not interested')
    end

    it 'defines basic study statuses' do
      expect(Connection::CONNECTED).to eq('connected')
      expect(Connection::STUDY_BEGAN).to eq('study began')
      expect(Connection::STUDY_COMPLETED).to eq('study completed')
    end

    it 'defines additional study statuses' do
      expect(Connection::ON_HOLD).to eq('on hold')
      expect(Connection::DROPPED_OUT).to eq('dropped out')
      expect(Connection::FOLLOWUP_COMPLETED).to eq('followup completed')
    end

    it 'defines completed statuses' do
      expect(Connection::STATUSES_COMPLETED).to contain_exactly(
        Connection::STUDY_COMPLETED,
        Connection::DROPPED_OUT,
        Connection::FOLLOWUP_COMPLETED
      )
    end
  end

  describe 'scopes' do
    let(:participant) { create(:participant) }
    let(:study) { create(:study) }

    describe 'invitation status scopes' do
      let!(:accepted_connection) { create(:connection, participant:, study:, invitation_status: Connection::ACCEPTED) }
      let!(:declined_connection) { create(:connection, participant:, study:, invitation_status: Connection::DECLINED) }

      describe '.invited' do
        let!(:invited_connection) { create(:connection, participant:, study:, invitation_status: Connection::INVITED) }

        it 'returns connections with invited status' do
          expect(described_class.invited).to include(invited_connection)
          expect(described_class.invited).not_to include(accepted_connection)
        end
      end

      describe '.accepted' do
        let!(:interested_connection) { create(:connection, participant:, study:, invitation_status: Connection::INTERESTED) }

        it 'returns connections with accepted or interested status' do
          expect(described_class.accepted).to include(accepted_connection, interested_connection)
          expect(described_class.accepted).not_to include(declined_connection)
        end
      end

      describe '.declined' do
        let!(:not_interested_connection) { create(:connection, participant:, study:, invitation_status: Connection::NOT_INTERESTED) }

        it 'returns connections with declined or not interested status' do
          expect(described_class.declined).to include(declined_connection, not_interested_connection)
          expect(described_class.declined).not_to include(accepted_connection)
        end
      end
    end

    describe 'study status scopes' do
      let!(:completed_connection) { create(:connection, participant:, study:, study_status: Connection::STUDY_COMPLETED) }
      let!(:dropped_out_connection) { create(:connection, participant:, study:, study_status: Connection::DROPPED_OUT) }

      describe '.completed' do
        it 'returns connections with completed study statuses' do
          expect(described_class.completed).to include(completed_connection, dropped_out_connection)
        end
      end
    end
  end

  describe 'callbacks' do
    it 'assigns pin before validation if blank' do
      connection = build(:connection, pin: nil)
      connection.valid?

      expect(connection.pin).to be_present
      expect(connection.pin.length).to eq(6)
    end
  end

  describe '#display_participant_name?' do
    context 'when invitation_status is accepted' do
      let(:connection) { create(:connection, invitation_status: Connection::ACCEPTED) }

      it 'returns true' do
        expect(connection.display_participant_name?).to be true
      end
    end

    context 'when invitation_status is interested' do
      let(:connection) { create(:connection, invitation_status: Connection::INTERESTED) }

      it 'returns true' do
        expect(connection.display_participant_name?).to be true
      end
    end

    context 'when invitation_status is invited' do
      let(:connection) { create(:connection, invitation_status: Connection::INVITED) }

      it 'returns false' do
        expect(connection.display_participant_name?).to be false
      end
    end

    context 'when invitation_status is declined' do
      let(:connection) { create(:connection, invitation_status: Connection::DECLINED) }

      it 'returns false' do
        expect(connection.display_participant_name?).to be false
      end
    end
  end

  describe '#as_json' do
    context 'when display_participant_name? is true' do
      let(:connection) { create(:connection, invitation_status: Connection::ACCEPTED) }

      it 'includes participant name and email' do
        json = connection.as_json
        expect(json['name']).to eq("#{connection.participant.first_name} #{connection.participant.last_name}")
        expect(json['email']).to eq(connection.participant.email)
      end
    end

    context 'when display_participant_name? is false' do
      let(:connection) { create(:connection, invitation_status: Connection::INVITED) }

      it 'includes participant codename' do
        json = connection.as_json
        expect(json['name']).to eq(connection.participant.codename)
      end
    end
  end
end
