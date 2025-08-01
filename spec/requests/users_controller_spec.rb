# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'UsersController' do
  let(:user) { create(:user) }

  describe 'GET /signup' do
    it 'renders the signup page' do
      get '/signup'

      expect(response).to have_http_status(:success)
      expect(response.body).to include('u/signup')
    end
  end

  describe 'POST /signup' do
    let(:valid_params) do
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        password_confirmation: 'password123'
      }
    end

    it 'creates a new user successfully' do
      expect do
        post '/signup', params: valid_params
      end.to change(User, :count).by(1)
      expect(response).to have_http_status(:redirect)
    end

    context 'with invalid params' do
      it 'returns an error' do
        post '/signup', params: { email: 'invalid' }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context 'with existing user invitation' do
      let!(:user_invitation) { create(:user_invitation, email: 'invited@example.com') }
      let(:invited_params) do
        {
          first_name: 'Jane',
          last_name: 'Smith',
          email: 'invited@example.com',
          password: 'password123',
          password_confirmation: 'password123'
        }
      end

      it 'accepts the user invitation when user signs up' do
        expect do
          post '/signup', params: invited_params
        end.to change(User, :count).by(1)

        expect(user_invitation.reload.accepted_at).to be_present
        expect(response).to have_http_status(:redirect)
      end
    end
  end

  describe 'GET /u/:id' do
    before { sign_in(user) }

    it 'renders the user show page' do
      get "/u/#{user.id}"

      expect(response).to have_http_status(:success)
      expect(response.body).to include('u/show')
    end
  end

  describe 'GET /u/:id/edit' do
    before { sign_in(user) }

    it 'renders the user edit page' do
      get "/u/#{user.id}/edit"

      expect(response).to have_http_status(:success)
      expect(response.body).to include('u/edit')
    end
  end

  describe 'PUT /u/:id' do
    before { sign_in(user) }

    it 'updates the user successfully' do
      put "/u/#{user.id}", params: {
        first_name: 'Jane'
      }
      expect(response).to have_http_status(:no_content)
    end
  end

  describe 'GET /u/:id/select-role' do
    before { sign_in(user) }

    it 'renders the select role page' do
      get "/u/#{user.id}/select-role"

      expect(response).to have_http_status(:success)
      expect(response.body).to include('u/select-role')
    end
  end

  describe 'POST /u/:id/select-role' do
    before { sign_in(user) }

    it 'selects a role successfully' do
      post "/u/#{user.id}/select-role", params: {
        role: 'participant'
      }
      expect(response).to have_http_status(:redirect)
    end
  end
end
