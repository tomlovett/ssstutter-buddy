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

  describe 'POST /p/connections' do
    let(:valid_params) do
      {
        connection: {
          study_id: study.id,
          invitation_status: 'interested'
        }
      }
    end

    it 'creates a new connection successfully' do
      expect { post '/p/connections', params: valid_params }.to change(Connection, :count).by(1)

      expect(response).to have_http_status(:redirect)
    end

    context 'with invalid params' do
      it 'returns an error' do
        post '/p/connections', params: { connection: { study_id: nil } }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'PUT /p/connections/:id' do
    it 'updates the connection successfully' do
      put "/p/connections/#{connection.id}", params: {
        connection: { invitation_status: 'not interested' }
      }
      expect(response).to have_http_status(:redirect)
    end

    context 'with invalid params' do
      it 'returns an error' do
        put "/p/connections/#{connection.id}", params: {
          connection: { invitation_status: '' }
        }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
