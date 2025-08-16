# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Session do
  describe 'model creation' do
    context 'with valid attributes' do
      it 'creates a new model' do
        expect { create(:session) }.not_to raise_error
      end
    end
  end

  describe 'associations' do
    let(:session) { create(:session) }

    it 'belongs to user' do
      expect(session.user).to be_present
    end
  end

  describe 'scopes' do
    let(:user) { create(:user) }
    let!(:recent_session) { create(:session, user:, created_at: 1.day.ago) }
    let!(:old_session) { create(:session, user:, created_at: 31.days.ago) }

    describe '.expired' do
      it 'returns sessions older than 30 days' do
        expect(described_class.expired).to include(old_session)
        expect(described_class.expired).not_to include(recent_session)
      end
    end

    describe '.active' do
      it 'returns sessions newer than 30 days' do
        expect(described_class.active).to include(recent_session)
        expect(described_class.active).not_to include(old_session)
      end
    end
  end

  describe '#expired?' do
    let(:session) { create(:session, created_at: 1.day.ago) }

    context 'when session is less than 30 days old' do
      it 'returns false' do
        expect(session.expired?).to be false
      end
    end

    context 'when session is more than 30 days old' do
      before { session.update!(created_at: 31.days.ago) }

      it 'returns true' do
        expect(session.expired?).to be true
      end
    end
  end
end
