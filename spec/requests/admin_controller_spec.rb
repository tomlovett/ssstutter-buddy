# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'AdminController' do
  let(:admin_user) { create(:user, email: 'admin@admin.com') }

  describe 'GET /admin/stats' do
    context 'when the user is an admin' do
      before do
        sign_in(admin_user)
        stub_const('ENV', ENV.to_hash.merge('ADMIN_EMAILS' => "email@email.com, #{admin_user.email}"))
      end

      it 'processes the stats action without throwing errors' do
        expect { get '/admin/stats' }.not_to raise_error

        expect(response).to have_http_status(:success)
        expect(response.body).to include('admin/stats')
      end
    end

    context 'when the user is not an admin' do
      before { sign_in(create(:user)) }

      it 'redirects to the home page' do
        get '/admin/stats'
        expect(response).to have_http_status(:redirect)
      end
    end
  end
end
