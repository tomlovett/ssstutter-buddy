# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SessionCleanupJob do
  let(:user) { create(:user) }

  before { allow(Rails.logger).to receive(:info) }

  describe '#perform' do
    context 'when expired sessions exist' do
      let!(:active_session) { create(:session, user:, created_at: 1.day.ago) }
      let!(:expired_session) { create(:session, user:, created_at: 31.days.ago) }
      let!(:another_expired_session) { create(:session, user:, created_at: 35.days.ago) }

      it 'removes expired sessions and logs the cleanup process' do
        expect { described_class.perform_now }.to change(Session, :count).by(-2)

        expect(Session.all).to include(active_session)
        expect(Session.all).not_to include(expired_session, another_expired_session)

        expect(Rails.logger).to have_received(:info).with('Starting session cleanup job')
        expect(Rails.logger).to have_received(:info).with('Session cleanup completed. Removed 2 expired sessions')
      end
    end

    context 'when no expired sessions exist' do
      before { create(:session, user:, created_at: 1.day.ago) }

      it 'does not remove any sessions and logs zero expired sessions' do
        expect { described_class.perform_now }.not_to(change(Session, :count))

        expect(Rails.logger).to have_received(:info).with('Starting session cleanup job')
        expect(Rails.logger).to have_received(:info).with('Session cleanup completed. Removed 0 expired sessions')
      end
    end
  end
end
