# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'P::BaseController' do
  subject { get path }

  let(:user) { create(:user) }
  let(:study) { create(:study) }
  let(:path) { "/p/studies/#{study.id}" }
  let(:private_path) { '/p/connections' }
  let(:expected_redirect_path) { nil }

  before { sign_in(user) if user.present? }

  shared_examples 'the request succeeds' do
    it 'lands the user at the requested path' do
      subject

      expect(response).to have_http_status(:success).or have_http_status(:ok)
    end
  end

  shared_examples 'the request fails' do
    it 'does not land the user at the requested path' do
      subject

      expect(response).not_to have_http_status(:success)
      expect(response).not_to have_http_status(:ok)
    end

    it 'redirects the user to the expected path' do
      subject

      expect(response).to redirect_to(expected_redirect_path)
    end
  end

  context 'with an authenticated participant' do
    let(:user) { create(:user, :participant) }

    context 'when accessing a public route' do
      it_behaves_like 'the request succeeds'
    end

    context 'when accessing their participant profile page' do
      let(:path) { "/p/participants/#{user.participant.id}/edit" }

      it_behaves_like 'the request succeeds'
    end

    context 'when trying to view another participant\'s profile page' do
      let(:other_participant) { create(:participant) }
      let(:path) { "/p/participants/#{other_participant.id}" }
      let(:expected_redirect_path) { '/p' }

      it_behaves_like 'the request fails'
    end
  end

  context 'with an authenticated researcher' do
    let(:user) { create(:user, :researcher) }
    let(:expected_redirect_path) { '/r' }

    it_behaves_like 'the request fails'
  end

  context 'with an anonymous user' do
    let(:user) { nil }
    let(:expected_redirect_path) { '/p/digital-studies' }

    context 'when accessing a public route' do
      it_behaves_like 'the request succeeds'
    end

    context 'when accessing a non-public route' do
      let(:path) { private_path }

      it_behaves_like 'the request fails'
    end
  end

  context 'with a user who has registered but has not selected a role' do
    let(:user) { create(:user, participant: nil, researcher: nil) }
    let(:expected_redirect_path) { "/u/#{user.id}/select-role" }

    context 'when accessing a public route' do
      it_behaves_like 'the request fails'
    end

    context 'when accessing a non-public route' do
      let(:path) { private_path }

      it_behaves_like 'the request fails'
    end
  end
end
