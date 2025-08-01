# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UserInvitationsController do
  let(:user) { create(:user) }

  before { sign_in(user) }

  describe 'POST /user_invitations' do
    context 'with valid email' do
      let(:valid_params) { { email: 'test@example.com' } }

      it 'creates a new user invitation and returns created status' do
        expect do
          post user_invitations_path, params: valid_params
        end.to change(UserInvitation, :count).by(1)

        expect(UserInvitation.last.invited_by_id).to eq(user.id)
        expect(response).to have_http_status(:ok)
      end
    end

    context 'with invalid parameters' do
      let(:invalid_params) { { email: 'invalid-email' } }

      it 'does not create a user invitation and returns unprocessable entity status' do
        expect do
          post user_invitations_path, params: invalid_params
        end.not_to change(UserInvitation, :count)

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context 'with duplicate email' do
      let(:duplicate_params) { { email: 'test@example.com' } }

      before { create(:user_invitation, email: 'test@example.com') }

      it 'does not create a duplicate user invitation but returns ok status' do
        expect do
          post user_invitations_path, params: duplicate_params
        end.not_to change(UserInvitation, :count)

        expect(response).to have_http_status(:ok)
      end
    end
  end
end
