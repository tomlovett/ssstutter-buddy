# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'AuthenticationController' do
  let(:user) { create(:user) }

  describe 'GET /await-confirmation' do
    it 'renders the confirmation page' do
      get '/await-confirmation'

      expect(response).to have_http_status(:success)
      expect(response.body).to include('u/await-confirmation')
    end
  end

  describe 'GET /await-confirmation/resend-confirmation' do
    context 'when passed an email' do
      it 'returns a successful response' do
        get '/await-confirmation/resend-confirmation', params: { email: user.email }

        expect(response).to have_http_status(:ok)
      end
    end

    context 'when the user is signed in' do
      before { sign_in(user) }

      it 'returns a successful response' do
        get '/await-confirmation/resend-confirmation'

        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe 'GET /confirm' do
    before { user.update!(activation_pin: '123456') }

    context 'when user has a participant' do
      let!(:participant) { create(:participant, user:) }

      it 'confirms user and creates new session' do
        expect { get '/confirm', params: { pin: user.activation_pin } }.to change { user.sessions.count }.by(1)

        expect(user.reload.confirmed_at).to be_present
        expect(user.activation_pin).to be_nil
        expect(response).to have_http_status(:redirect)
        expect(response).to redirect_to("/p/participants/#{participant.id}/edit?confirmed=true")
      end
    end

    context 'when user is a researcher' do
      let!(:researcher) { create(:researcher, user:) }

      it 'confirms user and creates new session' do
        expect { get '/confirm', params: { pin: user.activation_pin } }.to change { user.sessions.count }.by(1)

        expect(user.reload.confirmed_at).to be_present
        expect(user.activation_pin).to be_nil
        expect(response).to have_http_status(:redirect)
        expect(response).to redirect_to("/r/researchers/#{researcher.id}/edit?confirmed=true")
      end
    end

    context 'when user has no role yet' do
      it 'confirms user and creates new session' do
        expect { get '/confirm', params: { pin: user.activation_pin } }.to change { user.sessions.count }.by(1)

        expect(user.reload.confirmed_at).to be_present
        expect(user.activation_pin).to be_nil
        expect(response).to have_http_status(:redirect)
        expect(response).to redirect_to("/u/#{user.id}/select-role?confirmed=true")
      end
    end

    context 'with invalid pin' do
      it 'redirects to await confirmation' do
        get '/confirm', params: { pin: 'invalid' }

        expect(response).to redirect_to('/await-confirmation')
        expect(flash[:alert]).to eq('Invalid confirmation link.')
      end
    end
  end

  describe 'GET /confirm-provisional' do
    context 'when logged in' do
      before { sign_in(user) }

      it 'redirects to the user\'s home page' do
        get '/confirm-provisional', params: { id: user.id, pin: user.activation_pin }

        expect(response).to have_http_status(:redirect)
        expect(response).to redirect_to(user.home_page)
      end
    end

    context 'when passing an activation pin and id' do
      context 'with a provisional user with that activation pin' do
        let(:provisional_user) { create(:user, :provisional, activation_pin:, updated_at: 5.minutes.ago) }
        let(:activation_pin) { '123456' }

        it 'logs the user in and redirects them to set their password but does not convert them to a regular user' do
          expect { get '/confirm-provisional', params: { id: provisional_user.id, pin: activation_pin } }
            .to(change { provisional_user.sessions.count }.by(1))

          expect(provisional_user.reload.provisional).to be true
          expect(response).to have_http_status(:redirect)
          expect(response).to redirect_to('/change-password')
        end

        context 'with an expired link' do
          let(:provisional_user) { create(:user, :provisional, activation_pin:, updated_at: 11.minutes.ago) }

          it 'does not convert the user and renders the page to request a new email' do
            expect { get '/confirm-provisional', params: { id: provisional_user.id, pin: activation_pin } }
              .not_to(change { provisional_user.reload.provisional })

            expect(response).to have_http_status(:success)
            expect(response.body).to include('u/confirm-provisional')
          end
        end

        context 'with an invalid activation code' do
          it 'renders the page to request a new email' do
            expect { get '/confirm-provisional', params: { id: provisional_user.id, pin: 'wrong_code' } }
              .not_to(change { provisional_user.reload.provisional })

            expect(provisional_user.reload.provisional).to be true
            expect(response).to have_http_status(:success)
            expect(response.body).to include('u/confirm-provisional')
          end
        end
      end
    end
  end

  describe 'GET /forgot-password' do
    it 'renders the forgot password page' do
      get '/forgot-password'

      expect(response).to have_http_status(:success)
      expect(response.body).to include('u/forgot-password')
    end
  end

  describe 'POST /forgot-password' do
    it 'sends reset email successfully' do
      post '/forgot-password', params: { email: user.email }

      expect(user.reload.activation_pin).to be_present
      expect(response).to have_http_status(:ok)
    end

    context 'when the user is a provisional user' do
      let(:provisional_user) { create(:user, :provisional) }

      it 'sends a provisional confirmation email' do
        expect do
          post '/forgot-password',
               params: { email: provisional_user.email }
        end.to have_enqueued_mail(UserMailer, :confirm_provisional_user_email)

        expect(provisional_user.reload.activation_pin).to be_present
        expect(response).to have_http_status(:ok)
      end
    end

    context 'with invalid email' do
      it 'returns success' do
        post '/forgot-password', params: { email: 'invalid@example.com' }

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'GET /reset-password?pin=123456' do
    before { user.update!(activation_pin: '123456') }

    it 'resets password and creates new session' do
      expect { get "/reset-password?pin=#{user.activation_pin}" }.to change { user.sessions.count }.by(1)

      expect(user.reload.activation_pin).to be_nil
      expect(response).to have_http_status(:redirect)
      expect(response).to redirect_to('/change-password')
    end

    context 'with invalid pin' do
      it 'redirects to forgot password' do
        get '/reset-password?pin=654321'

        expect(response).to redirect_to('/forgot-password')
        expect(flash[:alert]).to eq('Invalid password reset link.')
      end
    end
  end

  describe 'GET /change-password' do
    before { sign_in(user) }

    it 'renders the change password page' do
      get '/change-password'

      expect(response).to have_http_status(:success)
      expect(response.body).to include('u/change-password')
    end

    context 'when not logged in' do
      before { sign_out }

      it 'redirects to login' do
        get '/change-password'

        expect(response).to have_http_status(:redirect)
        expect(response).to redirect_to('/login')
      end
    end
  end

  describe 'PUT /change-password' do
    before { sign_in(user) }

    it 'changes password successfully' do
      put '/change-password', params: {
        password: 'new_password',
        password_confirmation: 'new_password'
      }
      expect(response).to have_http_status(:redirect)
    end

    context 'with a provisional user' do
      let(:user) { create(:user, :provisional) }

      it 'sets the password and removes their provisional status' do
        expect do
          put '/change-password', params: {
            password: 'new_password',
            password_confirmation: 'new_password'
          }
        end.to change { user.reload.provisional }.from(true).to(false)

        expect(response).to have_http_status(:redirect)
        expect(response).to redirect_to(user.home_page)
      end
    end
  end
end
