# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/users' do
  let(:user) { create(:user) }
  let(:headers) { valid_headers }

  describe 'GET /show' do
    it 'renders a successful response' do
      user = create(:user)
      get user_url(user), as: :json
      expect(response).to be_successful
    end
  end

  describe 'POST /create' do
    let(:user) { attributes_for(:user) }

    context 'with valid parameters' do
      it 'creates a new User' do
        expect do
          post users_url, params: { user: valid_attributes }, headers:, as: :json
        end.to change(User, :count).by(1)
      end

      it 'renders a JSON response with the new user' do
        post users_url, params: { user: attributes_for(:user) }, headers:, as: :json
        expect(response).to have_http_status(:created)
        expect(response.content_type).to match(a_string_including('application/json'))
      end
    end

    context 'with invalid parameters' do
      let(:user) { attributes_for(:user).delete(:first_name) }

      it 'does not create a new User' do
        expect do
          post users_url, params: { user: }, as: :json
        end.not_to change(User, :count)
      end

      it 'renders a JSON response with errors for the new user' do
        post users_url, params: { user: }, headers:, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to match(a_string_including('application/json'))
      end
    end
  end

  describe 'PATCH /update' do
    let(:new_attributes) { { first_name: 'Thelonious ' } }

    context 'with valid parameters' do
      it 'updates the requested user' do
        user = create(:user)
        patch user_url(user), params: { user: new_attributes }, headers:, as: :json
        user.reload
        expect(user.first_name).to eq('Thelonious')
      end

      it 'renders a JSON response with the user' do
        user = create(:user)
        patch user_url(user), params: { user: new_attributes }, headers:, as: :json
        expect(response).to have_http_status(:ok)
      end
    end

    context 'with invalid parameters' do
      let(:new_attributes) { { favorite_color: 'Thelonious ' } }

      it 'renders a JSON response with errors for the user' do
        user = create(:user)
        patch user_url(user), params: { user: }, headers:, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to match(a_string_including('application/json'))
      end
    end
  end

  describe 'DELETE /destroy' do
    it 'destroys the requested user' do
      user = create(:user)
      expect do
        delete user_url(user), headers:, as: :json
      end.to change(User, :count).by(-1)
    end
  end
end
