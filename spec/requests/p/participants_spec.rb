# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'P::ParticipantsController' do
  let(:participant) { create(:participant) }
  let(:user) { participant.user }

  before { sign_in(user) }

  describe 'GET /p/' do
    it 'returns a successful response' do
      get '/p/'

      expect(response).to have_http_status(:success)
      expect(response.body).to include('p/Participants/home')
    end
  end

  describe 'GET /p/participants/:id' do
    it 'returns a successful response' do
      get "/p/participants/#{participant.id}"

      expect(response).to have_http_status(:success)
      expect(response.body).to include('p/Participants/show')
    end
  end

  describe 'GET /p/participants/:id/edit' do
    it 'returns a successful response' do
      get "/p/participants/#{participant.id}/edit"

      expect(response).to have_http_status(:success)
      expect(response.body).to include('p/Participants/edit')
    end
  end

  describe 'PUT /p/participants/:id' do
    it 'updates the participant successfully' do
      put "/p/participants/#{participant.id}", params: {
        participant: { codename: 'NewCodename' }
      }
      expect(response).to have_http_status(:redirect)
    end
  end
end
