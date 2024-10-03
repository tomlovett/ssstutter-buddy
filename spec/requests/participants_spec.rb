# frozen_string_literal: true

require 'rails_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to test the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator. If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails. There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.

RSpec.describe '/participants' do
  # This should return the minimal set of attributes required to create a valid
  # Participant. As you add validations to Participant, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) do
    skip('Add a hash of attributes valid for your model')
  end

  let(:invalid_attributes) do
    skip('Add a hash of attributes invalid for your model')
  end

  describe 'GET /show' do
    it 'renders a successful response' do
      participant = Participant.create! valid_attributes
      get participant_url(participant)
      expect(response).to be_successful
    end
  end

  describe 'GET /new' do
    it 'renders a successful response' do
      get new_participant_url
      expect(response).to be_successful
    end
  end

  describe 'GET /edit' do
    it 'renders a successful response' do
      participant = Participant.create! valid_attributes
      get edit_participant_url(participant)
      expect(response).to be_successful
    end
  end

  describe 'POST /create' do
    context 'with valid parameters' do
      it 'creates a new Participant' do
        expect do
          post participants_url, params: { participant: valid_attributes }
        end.to change(Participant, :count).by(1)
      end

      it 'redirects to the created participant' do
        post participants_url, params: { participant: valid_attributes }
        expect(response).to redirect_to(participant_url(Participant.last))
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new Participant' do
        expect do
          post participants_url, params: { participant: invalid_attributes }
        end.not_to change(Participant, :count)
      end

      it "renders a response with 422 status (i.e. to display the 'new' template)" do
        post participants_url, params: { participant: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'PATCH /update' do
    context 'with valid parameters' do
      let(:new_attributes) do
        skip('Add a hash of attributes valid for your model')
      end

      it 'updates the requested participant' do
        participant = Participant.create! valid_attributes
        patch participant_url(participant), params: { participant: new_attributes }
        participant.reload
        skip('Add assertions for updated state')
      end

      it 'redirects to the participant' do
        participant = Participant.create! valid_attributes
        patch participant_url(participant), params: { participant: new_attributes }
        participant.reload
        expect(response).to redirect_to(participant_url(participant))
      end
    end

    context 'with invalid parameters' do
      it "renders a response with 422 status (i.e. to display the 'edit' template)" do
        participant = Participant.create! valid_attributes
        patch participant_url(participant), params: { participant: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'DELETE /destroy' do
    it 'destroys the requested participant' do
      participant = Participant.create! valid_attributes
      expect do
        delete participant_url(participant)
      end.to change(Participant, :count).by(-1)
    end

    it 'redirects to the participants list' do
      participant = Participant.create! valid_attributes
      delete participant_url(participant)
      expect(response).to redirect_to(participants_url)
    end
  end
end