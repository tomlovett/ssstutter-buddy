# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Authentication do
  let(:user) { create(:user) }
  let(:controller) { ApplicationController.new }

  before do
    # Mock the controller methods that the concern depends on
    allow(controller).to receive_messages(
      cookies: instance_double(
        ActionDispatch::Cookies::CookieJar,
        signed: instance_double(
          ActionDispatch::Cookies::SignedKeyRotatingCookieJar,
          '[]': nil,
          '[]=': nil
        ),
        delete: nil
      ),
      request: instance_double(
        ActionDispatch::Request,
        user_agent: 'Test User Agent',
        remote_ip: '127.0.0.1'
      )
    )
  end

  describe '#find_session_by_cookie' do
    let!(:active_session) { create(:session, user:, created_at: 1.day.ago) }
    let!(:expired_session) { create(:session, user:, created_at: 31.days.ago) }
    let(:current_session) { active_session }
    let(:cookie_double) do
      instance_double(
        ActionDispatch::Cookies::CookieJar,
        signed: instance_double(
          ActionDispatch::Cookies::SignedKeyRotatingCookieJar,
          '[]': current_session.id
        )
      )
    end

    before do
      allow(Session).to receive(:find_by).and_return(current_session)
      allow(controller).to receive(:cookies).and_return(cookie_double)
    end

    context 'when cookie contains valid session id' do
      it 'returns the active session' do
        result = controller.send(:find_session_by_cookie)

        expect(result).to eq(active_session)
      end
    end

    context 'when cookie contains expired session id' do
      let(:current_session) { expired_session }

      it 'returns nil for expired session' do
        expect(controller.send(:find_session_by_cookie)).to be_nil
      end
    end

    context 'when cookie contains invalid session id' do
      let(:current_session) { nil }
      let(:cookie_double) do
        instance_double(
          ActionDispatch::Cookies::CookieJar,
          signed: instance_double(
            ActionDispatch::Cookies::SignedKeyRotatingCookieJar,
            '[]': 'invalid_id'
          )
        )
      end

      it 'returns nil' do
        result = controller.send(:find_session_by_cookie)
        expect(result).to be_nil
      end
    end
  end

  describe '#start_new_session_for' do
    let(:user) { create(:user) }
    let(:mock_cookies) do
      instance_double(
        ActionDispatch::Cookies::CookieJar,
        signed: instance_double(
          ActionDispatch::Cookies::SignedKeyRotatingCookieJar,
          '[]=': nil
        )
      )
    end

    before do
      allow(controller).to receive(:cookies).and_return(mock_cookies)
      allow(Current).to receive(:session=)
    end

    context 'when user has less than 5 active sessions' do
      before { create_list(:session, 3, user:, created_at: 1.day.ago) }

      it 'creates a new session' do
        expect { controller.send(:start_new_session_for, user) }.to change { user.sessions.count }.by(1)
      end

      it 'sets the session cookie' do
        allow(mock_cookies.signed).to receive('[]=')
        controller.send(:start_new_session_for, user)

        expect(mock_cookies.signed).to have_received('[]=').with(
          :session_id, hash_including(
                         :value,
                         httponly: true,
                         same_site: :lax,
                         expires: kind_of(ActiveSupport::TimeWithZone)
                       )
        )
      end
    end

    context 'when user has 5 or more active sessions' do
      let!(:oldest_session) { create(:session, user:, created_at: 2.days.ago) }

      before { create_list(:session, 4, user:, created_at: 1.day.ago) }

      it 'removes the oldest session and creates a new one' do
        # +1 new, -1 old = 0 change
        expect { controller.send(:start_new_session_for, user) }.not_to(change { user.sessions.count })
        expect(user.sessions.reload).not_to include(oldest_session)
      end
    end

    context 'when user has expired sessions' do
      before do
        create(:session, user:, created_at: 31.days.ago)
        create(:session, user:, created_at: 1.day.ago)
      end

      it 'creates a new session without removing expired ones (they are handled by scope)' do
        expect { controller.send(:start_new_session_for, user) }.to change { user.sessions.count }.by(1)
      end
    end
  end

  describe '#terminate_session' do
    let(:session) { create(:session, user:) }
    let(:mock_cookies) { instance_double(ActionDispatch::Cookies::CookieJar, delete: nil) }

    before do
      allow(Current).to receive(:session).and_return(session)
      allow(controller).to receive(:cookies).and_return(mock_cookies)
    end

    it 'destroys the current session' do
      allow(session).to receive(:destroy)
      controller.send(:terminate_session)

      expect(session).to have_received(:destroy)
    end

    it 'deletes the session cookie' do
      allow(mock_cookies).to receive(:delete)
      controller.send(:terminate_session)

      expect(mock_cookies).to have_received(:delete).with(:session_id)
    end

    context 'when no current session exists' do
      before { allow(Current).to receive(:session).and_return(nil) }

      it 'does not raise an error' do
        expect { controller.send(:terminate_session) }.not_to raise_error
      end
    end
  end
end
