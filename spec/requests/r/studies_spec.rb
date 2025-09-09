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
    let(:study_params) { { title: 'Updated Title', short_desc: 'Updated description', flyer: nil } }

    it 'updates the study successfully' do
      put "/r/studies/#{study.id}", params: { study: study_params }

      expect(response).to have_http_status(:ok)
      expect(study.reload.title).to eq('Updated Title')
      expect(study.reload.short_desc).to eq('Updated description')
    end

    context 'with flyer upload' do
      let(:flyer_file) { fixture_file_upload('spec/fixtures/files/test_image.jpg', 'image/jpeg') }
      let(:study_params) { { title: 'Updated Title', flyer: flyer_file } }

      it 'attaches flyer successfully' do
        put "/r/studies/#{study.id}", params: { study: study_params }

        expect(response).to have_http_status(:ok)
        study.reload
        expect(study.title).to eq('Updated Title')
        expect(study.flyer).to be_attached
        expect(study.flyer.filename).to eq('test_image.jpg')
      end

      it 'updates study attributes and attaches flyer' do
        put "/r/studies/#{study.id}", params: { study: study_params }

        expect(response).to have_http_status(:ok)
        study.reload
        expect(study.title).to eq('Updated Title')
        expect(study.flyer).to be_attached
      end
    end

    context 'when flyer attachment fails' do
      let(:flyer_file) { fixture_file_upload('spec/fixtures/files/test_image.jpg', 'image/jpeg') }

      before do
        # Mock the flyer attachment to fail by stubbing the attach method
        allow(study).to receive(:flyer).and_return(
          instance_double(ActiveStorage::Attached::One, attach: -> { raise StandardError, 'Storage error' })
        )
      end

      it 'handles the errors gracefully' do
        put "/r/studies/#{study.id}", params: {
          study: {
            title: 'Updated Title',
            flyer: flyer_file
          }
        }

        # The controller will return :ok even if flyer attachment fails
        # because the study update succeeds and attach_flyer_if_present returns false
        expect(response).to have_http_status(:ok)
        expect(study.reload.title).to eq('Updated Title')
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

      it 'publishes study with flyer upload' do
        flyer_file = fixture_file_upload('spec/fixtures/files/test_image.jpg', 'image/jpeg')

        post "/r/studies/#{study.id}/publish", params: {
          study: { title: 'Updated Title', flyer: flyer_file }
        }

        expect(PublishStudy).to have_received(:new).with(study:)
        expect(study.reload.title).to eq('Updated Title')
        expect(study.flyer).to be_attached
        expect(response).to have_http_status(:redirect)
      end

      context 'with flyer attachment error' do
        before do
          # Mock the flyer attachment to fail by stubbing the attach method
          allow(study).to receive(:flyer).and_return(
            instance_double(ActiveStorage::Attached::One, attach: -> { raise StandardError, 'Storage error' })
          )
        end

        it 'handles flyer attachment errors during publish' do
          flyer_file = fixture_file_upload('spec/fixtures/files/test_image.jpg', 'image/jpeg')

          post "/r/studies/#{study.id}/publish", params: {
            study: { title: 'Updated Title', flyer: flyer_file }
          }

          # The controller will redirect to show page on success even if flyer attachment fails
          # because the study update succeeds and attach_flyer_if_present returns false
          expect(response).to have_http_status(:redirect)
          expect(response).to redirect_to("/r/studies/#{study.id}")
          expect(study.reload.title).to eq('Updated Title')
        end
      end
    end

    context 'when study is already published' do
      before { study.update!(published_at: Time.current) }

      it 'returns unprocessable entity' do
        post "/r/studies/#{study.id}/publish", params: { study: { title: 'Updated Title' } }

        expect(response).to have_http_status(:unprocessable_entity)
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

  describe 'authorization' do
    context 'when user is not authorized to update study' do
      let(:other_study) { create(:study) }

      it 'returns unauthorized for update' do
        put "/r/studies/#{other_study.id}", params: { study: { title: 'Unauthorized Update' } }

        expect(response).to have_http_status(:unauthorized)
        expect(response.body).to be_empty # head :unauthorized returns empty body
      end

      it 'returns unauthorized for publish' do
        post "/r/studies/#{other_study.id}/publish", params: {
          study: { title: 'Unauthorized Publish' }
        }

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'flyer attachment edge cases' do
    let(:flyer_file) { fixture_file_upload('spec/fixtures/files/test_image.jpg', 'image/jpeg') }

    context 'when replacing existing flyer' do
      before { study.flyer.attach(fixture_file_upload('spec/fixtures/files/test_image.jpg', 'image/jpeg')) }

      it 'replaces existing flyer' do
        initial_flyer_key = study.flyer.blob.key

        put "/r/studies/#{study.id}", params: { study: { flyer: flyer_file } }

        expect(response).to have_http_status(:ok)
        study.reload
        expect(study.flyer).to be_attached
        expect(study.flyer.blob.key).not_to eq(initial_flyer_key)
      end
    end

    context 'when passed a nil flyer' do
      it 'handles nil flyer parameter gracefully' do
        put "/r/studies/#{study.id}", params: { study: { title: 'Updated Title' } }

        expect(response).to have_http_status(:ok)
        expect(study.reload.title).to eq('Updated Title')
      end
    end
  end
end
