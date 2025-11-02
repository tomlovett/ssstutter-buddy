# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'R::StudiesController' do
  let(:researcher) { create(:researcher) }
  let(:user) { researcher.user }
  let(:study) { create(:study, researcher:) }

  before { sign_in(user) }

  describe 'GET /r/studies' do
    it 'renders the studies index page' do
      get '/r/studies'

      expect(response).to have_http_status(:success)
      expect(response.body).to include('r/Studies/index')
    end
  end

  describe 'POST /r/studies' do
    let(:valid_params) do
      {
        study: {
          title: 'Test Study',
          short_desc: 'Short description',
          long_desc: 'Long description',
          methodologies: 'Survey',
          location_type: 'digital',
          min_age: 18,
          max_age: 65,
          total_hours: 2,
          total_sessions: 1,
          duration: '1 week',
          remuneration: 50
        }
      }
    end

    it 'creates a new study successfully' do
      expect { post '/r/studies', params: valid_params }.to change(Study, :count).by(1)

      expect(response).to redirect_to("/r/studies/#{Study.last.id}/edit")
    end
  end

  describe 'GET /r/studies/:id' do
    context 'with a published study' do
      before { study.update!(published_at: Time.current) }

      it 'returns a successful response' do
        get "/r/studies/#{study.id}"

        expect(response).to have_http_status(:success)
        expect(response.body).to include(study.title)
        expect(response.body).to include('r/Studies/show')
      end
    end

    context 'when study is not published' do
      before { study.update!(published_at: nil) }

      it 'redirects to edit page' do
        get "/r/studies/#{study.id}"

        expect(response).to redirect_to("/r/studies/#{study.id}/edit")
      end
    end
  end

  describe 'GET /r/studies/:id/edit' do
    it 'renders the study edit page' do
      get "/r/studies/#{study.id}/edit"

      expect(response).to have_http_status(:success)
      expect(response.body).to include('r/Studies/edit')
    end
  end

  describe 'PUT /r/studies/:id' do
    it 'updates the study successfully' do
      put "/r/studies/#{study.id}", params: {
        study: { title: 'Updated Title' }
      }

      expect(response).to have_http_status(:redirect)
    end
  end

  describe 'GET /r/studies/verify_status' do
    let(:verify_active_token) { Rails.application.message_verifier('study_verification').generate({ study_id: study.id, action: 'verify_active' }) }
    let(:mark_inactive_token) { Rails.application.message_verifier('study_verification').generate({ study_id: study.id, action: 'mark_inactive' }) }

    context 'when confirming the study is still active' do
      it 'verifies the status of the study successfully' do
        get "/r/studies/verify_status?token=#{verify_active_token}"
        
        expect(response).to have_http_status(:success)
        expect(response.body).to include('r/Studies/verify/VerifyActive')
      end

      context 'when the study is already closed' do
        before { study.update!(closed_at: Time.current) }
        
        it 'returns the already closed page' do
          get "/r/studies/verify_status?token=#{verify_active_token}"
        
          expect(response).to have_http_status(:success)
          expect(response.body).to include('r/Studies/verify/AlreadyClosed')
        end
      end
    end
    
    context 'when marking the study as inactive' do
      it 'marks the study as inactive successfully' do
        get "/r/studies/verify_status?token=#{mark_inactive_token}"
        
        expect(response).to have_http_status(:success)
        expect(response.body).to include('r/Studies/verify/MarkInactive')
      end
    end
  end

  describe 'POST /r/studies/:id/publish' do
    before do
      study.update!(published_at: nil)
      allow(PublishStudy).to receive(:new).with(study:).and_return(instance_double(PublishStudy, call: true))
    end

    context 'when the study is not published' do
      it 'publishes the study successfully' do
        post "/r/studies/#{study.id}/publish", params: { study: { title: 'Updated Title' } }

        expect(PublishStudy).to have_received(:new).with(study:)
        expect(study.reload.title).to eq('Updated Title')
        expect(response).to have_http_status(:redirect)
      end
    end
  end

  describe 'GET /r/studies/closed' do
    it 'renders the closed studies page' do
      get '/r/studies/closed'
      expect(response).to have_http_status(:success)
      expect(response.body).to include('r/Studies/closed')
    end
  end
end
