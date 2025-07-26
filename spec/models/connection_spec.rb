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

    describe 'study status scopes' do
      let!(:completed_connection) { create(:connection, participant:, study:, status: Connection::STUDY_COMPLETED) }
      let!(:dropped_out_connection) { create(:connection, participant:, study:, status: Connection::DROPPED_OUT) }

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

  describe '#as_json' do
    let(:connection) { create(:connection) }

    it 'includes participant name and email for participants' do
      allow(Current).to receive(:user).and_return(instance_double(User, participant?: true))

      json = connection.as_json
      expect(json['name']).to eq("#{connection.participant.first_name} #{connection.participant.last_name}")
      expect(json['email']).to eq(connection.participant.email)
    end

    it 'includes participant codename for non-participants' do
      allow(Current).to receive(:user).and_return(instance_double(User, participant?: false))

      json = connection.as_json
      expect(json['name']).to eq(connection.participant.codename)
    end
  end
end
