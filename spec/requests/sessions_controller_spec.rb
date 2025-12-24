# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'SessionsController' do
  let(:user) { create(:user) }

  describe 'GET /login' do
    it 'renders the login page' do
      get '/login'

      expect(response).to have_http_status(:success)
      expect(response.body).to include('u/login')
    end
  end

  describe 'POST /login' do
    let(:params) { { email: user.email, password: user.password } }

    context 'with valid credentials' do
      it 'logs in the user successfully' do
        expect { post '/login', params: }.to change { user.sessions.count }.by(1)

        expect(response).to have_http_status(:redirect)
        expect(response).to redirect_to(user.home_page)
      end

      context 'when user has 5 active sessions' do
        let!(:oldest_session) { create(:session, user:, created_at: 2.days.ago) }

        before { create_list(:session, 4, user:, created_at: 1.day.ago) }

        it 'removes oldest session and creates new one' do
          # +1 new, -1 old = 0 change
          expect { post '/login', params: }.not_to(change { user.sessions.count })
          expect(user.sessions.reload).not_to include(oldest_session)
        end
      end

      context 'when return_to_after_authenticating is set' do
        let(:user) { create(:user, :participant) }
        let(:path) { "/p/participants/#{user.participant.id}/edit" }

        context 'when the return_to_after_authenticating url is valid' do
          it 'redirects to the return_to_after_authenticating url' do
            # First, trigger the authentication requirement to set the session
            get path

            # Now login with the session already set
            post '/login', params: params

            expect(response).to redirect_to(path)
          end
        end

        context 'when the return_to_after_authenticating url is to logout' do
          it 'redirects to the home page' do
            get '/logout'

            post '/login', params: params

            expect(response).to redirect_to(user.home_page)
          end
        end
      end
    end

    context 'when submitting an email that belongs to a provisional user' do
      let!(:provisional_user) { create(:user, :provisional, email: 'provisional@example.com') }
      let(:params) { { email: 'provisional@example.com', password: 'any_password' } }

      it 'does not create a new session' do
        expect { post '/login', params: params }.not_to(change { provisional_user.sessions.count })
      end

      it 'triggers a ConfirmProvisionalUserEmail email and redirects to the explanatory page' do
        expect { post '/login', params: params }.to have_enqueued_mail(UserMailer, :confirm_provisional_user_email)

        expect(provisional_user.reload.activation_pin).to be_present
        expect(response).to have_http_status(:redirect)
        expect(response).to redirect_to('/await-confirmation')
      end
    end

    context 'with invalid credentials' do
      let(:params) { { email: user.email, password: 'wrong_password' } }

      it 'redirects with error' do
        post '/login', params: params

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'GET /logout' do
    before { sign_in(user) }

    it 'destroys the current session' do
      expect { get '/logout' }.to change { user.sessions.count }.by(-1)

      expect(response).to have_http_status(:redirect)
      expect(response).to redirect_to('/login')
    end
  end
end
