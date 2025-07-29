# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'R::ConnectionsController' do
  let(:researcher) { create(:researcher) }
  let(:user) { researcher.user }
  let(:study) { create(:study, researcher:) }
  let(:participant) { create(:participant) }
  let(:connection) { create(:connection, study:, participant:, status: Connection::STUDY_BEGAN) }

  before { sign_in(user) }

  describe 'PUT /r/connections/:id' do
    context 'when the researcher owns the study' do
      it 'updates the connection status successfully' do
        put "/r/connections/#{connection.id}", params: { status: Connection::STUDY_COMPLETED }

        expect(response).to have_http_status(:no_content)
        expect(connection.reload.status).to eq(Connection::STUDY_COMPLETED)
      end

      it 'returns unprocessable entity for invalid status' do
        put "/r/connections/#{connection.id}", params: { status: 'invalid_status' }

        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.parsed_body).to have_key('status')
      end
    end

    context 'when the researcher does not own the study' do
      let(:other_researcher) { create(:researcher) }
      let(:other_study) { create(:study, researcher: other_researcher) }
      let(:other_connection) { create(:connection, study: other_study, participant:) }

      it 'returns unauthorized' do
        put "/r/connections/#{other_connection.id}", params: { status: Connection::STUDY_COMPLETED }

        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when connection does not exist' do
      it 'returns not found' do
        put '/r/connections/999999', params: { status: Connection::STUDY_COMPLETED }

        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
