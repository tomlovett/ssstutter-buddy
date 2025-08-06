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
    before { sign_in(user) }

    it 'returns a successful response' do
      get '/confirm', params: { token: 'valid_token' }
      expect(response).to have_http_status(:redirect)
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

    context 'with invalid email' do
      it 'returns success' do
        post '/forgot-password', params: { email: 'invalid@example.com' }

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'GET /reset-password' do
    before { user.update!(activation_pin: '123456') }

    it 'returns a successful response' do
      get '/reset-password', params: { pin: user.activation_pin }

      expect(user.reload.activation_pin).to be_nil
      expect(response).to have_http_status(:redirect)
    end
  end

  describe 'GET /change-password' do
    before { sign_in(user) }

    it 'renders the change password page' do
      get '/change-password'

      expect(response).to have_http_status(:success)
      expect(response.body).to include('u/change-password')
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
  end
end
