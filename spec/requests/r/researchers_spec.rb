# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'R::ResearchersController' do
  let(:researcher) { create(:researcher) }
  let(:user) { researcher.user }

  before do
    sign_in(user)
  end

  describe 'GET /r/' do
    it 'renders the researcher home page' do
      get '/r/'

      expect(response).to have_http_status(:success)
      expect(response.body).to include('r/Researchers/home')
    end
  end

  describe 'GET /r/researchers/:id' do
    it 'renders the researcher show page' do
      get "/r/researchers/#{researcher.id}"

      expect(response).to have_http_status(:success)
      expect(response.body).to include('r/Researchers/show')
    end
  end

  describe 'GET /r/researchers/new' do
    it 'renders the researcher edit page' do
      get '/r/researchers/new', params: { user_id: user.id }

      expect(response).to have_http_status(:success)
      expect(response.body).to include('r/Researchers/edit')
    end
  end

  describe 'GET /r/researchers/:id/edit' do
    it 'renders the researcher edit page' do
      get "/r/researchers/#{researcher.id}/edit"

      expect(response).to have_http_status(:success)
      expect(response.body).to include('r/Researchers/edit')
    end
  end

  describe 'PUT /r/researchers/:id' do
    it 'updates the researcher successfully' do
      put "/r/researchers/#{researcher.id}", params: {
        researcher: { bio: 'Updated bio' }
      }
      expect(response).to have_http_status(:ok)
    end

    it 'handles different field updates' do
      put "/r/researchers/#{researcher.id}", params: {
        researcher: { institution: 'New University' }
      }
      expect(response).to have_http_status(:ok)
    end
  end
end
