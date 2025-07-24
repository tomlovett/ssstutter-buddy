# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'P::ResearchersController' do
  let(:participant) { create(:participant) }
  let(:user) { participant.user }
  let(:researcher) { create(:researcher) }

  before do
    sign_in(user)
  end

  describe 'GET /p/researchers/:id' do
    it 'returns a successful response' do
      get "/p/researchers/#{researcher.id}"

      expect(response).to have_http_status(:success)
      expect(response.body).to include('p/Researchers/show')
    end
  end
end
