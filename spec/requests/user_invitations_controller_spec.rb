# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UserInvitationsController do
  let(:user) { create(:user) }

  before { sign_in(user) }

  describe 'GET /invite' do
    it 'renders the invite page' do
      get '/invite'

      expect(response).to have_http_status(:success)
      expect(response.body).to include('invite')
    end
  end

  describe 'POST /invite' do
    let(:dummy_mailer) { instance_double(UserInvitationMailer, invitation_email: instance_double(ActionMailer::MessageDelivery, deliver_later: true)) }

    before { allow(UserInvitationMailer).to receive(:with).and_return(dummy_mailer) }

    context 'with valid email' do
      let(:valid_params) { { email: 'test@example.com' } }

      it 'creates a new user invitation and returns created status' do
        expect { post '/invite', params: valid_params }.to change(UserInvitation, :count).by(1)

        expect(UserInvitationMailer).to have_received(:with).with(
          recipient: 'test@example.com',
          invited_by_name: user.full_name
        )

        expect(UserInvitation.last.invited_by_id).to eq(user.id)
        expect(response).to have_http_status(:ok)
      end
    end

    context 'with invalid parameters' do
      let(:invalid_params) { { email: 'invalid-email' } }

      it 'does not create a user invitation and returns unprocessable entity status' do
        expect { post '/invite', params: invalid_params }.not_to change(UserInvitation, :count)

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context 'with existing user invitation record' do
      let(:duplicate_params) { { email: 'test@example.com' } }

      before { create(:user_invitation, email: 'test@example.com') }

      it 'does not create a duplicate user invitation but returns ok status' do
        expect { post '/invite', params: duplicate_params }.not_to change(UserInvitation, :count)

        expect(UserInvitationMailer).not_to have_received(:with)
        expect(response).to have_http_status(:ok)
      end
    end

    context 'with existing user record' do
      before { create(:user, email: 'test@example.com') }

      it 'does not create a user invitation but returns ok status' do
        expect { post '/invite', params: { email: 'test@example.com' } }.not_to change(UserInvitation, :count)

        expect(UserInvitationMailer).not_to have_received(:with)
        expect(response).to have_http_status(:ok)
      end
    end
  end
end
