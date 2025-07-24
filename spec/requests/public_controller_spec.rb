# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'PublicController' do
  describe 'GET /' do
    it 'renders the home page' do
      get '/'

      expect(response).to have_http_status(:success)
      expect(response.body).to include('Public/home')
    end
  end

  describe 'GET /faq' do
    it 'renders the FAQ page' do
      get '/faq'

      expect(response).to have_http_status(:success)
      expect(response.body).to include('Public/FAQ')
    end
  end

  describe 'GET /researchers' do
    it 'renders the researchers page' do
      get '/researchers'

      expect(response).to have_http_status(:success)
      expect(response.body).to include('Public/researchers')
    end
  end

  describe 'GET /participants' do
    it 'renders the participants page' do
      get '/participants'

      expect(response).to have_http_status(:success)
      expect(response.body).to include('Public/participants')
    end
  end
end
