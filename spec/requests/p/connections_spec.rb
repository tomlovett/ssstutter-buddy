# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'P::ConnectionsController' do
  let(:participant) { create(:participant) }
  let(:researcher) { create(:researcher) }
  let(:study) { create(:study, researcher:) }
  let(:connection) { create(:connection, participant:, study:) }

  before { sign_in(participant.user) }

  describe 'GET /p/connections' do
    it 'returns a successful response' do
      get '/p/connections'

      expect(response).to have_http_status(:success)
      expect(response.body).to include('p/Connections/index')
    end
  end
end
