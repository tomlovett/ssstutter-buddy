# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'P::StudiesController' do
  let(:participant) { create(:participant) }
  let(:user) { participant.user }
  let(:researcher) { create(:researcher) }
  let(:study) { create(:study, researcher: researcher) }

  before { sign_in(user) }

  describe 'GET /p/studies/:id' do
    it 'returns a successful response' do
      get "/p/studies/#{study.id}"

      expect(response).to have_http_status(:success)
      expect(response.body).to include('p/Studies/show')
    end
  end

  describe 'GET /p/digital-studies' do
    it 'returns a successful response' do
      get '/p/digital-studies'

      expect(response).to have_http_status(:success)
      expect(response.body).to include('p/Studies/digital-studies')
    end
  end
end
