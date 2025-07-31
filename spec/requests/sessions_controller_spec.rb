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
        expect(response).to redirect_to(user.home_page)
      end

      context 'when return_to_after_authenticating is set' do
        let(:user) { create(:participant).user }

        context 'when the return_to_after_authenticating url is valid' do
          it 'redirects to the return_to_after_authenticating url' do
            # First, trigger the authentication requirement to set the session
            get '/p/studies/19'

            # Now login with the session already set
            post '/login', params: {
              email: user.email,
              password: user.password
            }

            expect(response).to redirect_to('/p/studies/19')
          end
        end

        context 'when the return_to_after_authenticating url is to logout' do
          it 'redirects to the home page' do
            get '/logout'

            post '/login', params: {
              email: user.email,
              password: user.password
            }

            expect(response).to redirect_to(user.home_page)
          end
        end
      end
    end

    context 'with invalid credentials' do
      it 'redirects with error' do
        post '/login', params: {
          email: user.email,
          password: 'wrong_password'
        }

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'GET /logout' do
    it 'returns a successful response' do
      get '/logout'

      expect(response).to have_http_status(:redirect)
      expect(response).to redirect_to('/login')
    end
  end
end
