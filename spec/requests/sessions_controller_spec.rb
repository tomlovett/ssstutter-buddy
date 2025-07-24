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
    context 'with valid credentials' do
      it 'logs in the user successfully' do
        post '/login', params: {
          email: user.email,
          password: user.password
        }
        expect(response).to have_http_status(:redirect)
      end
    end

    context 'with invalid credentials' do
      it 'redirects with error' do
        post '/login', params: {
          email: user.email,
          password: 'wrong_password'
        }
        expect(response).to have_http_status(:redirect)
      end
    end
  end

  describe 'GET /logout' do
    it 'returns a successful response' do
      get '/logout'
      expect(response).to have_http_status(:redirect)
    end
  end
end
