# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AuthenticateUser do
  subject(:auth_user) { described_class.new(user.email, password) }

  let(:user) { create(:user, email: 'test@example.com', password: 'password123') }
  let(:password) { 'password123' }

  describe '#call' do
    context 'with valid credentials' do
      it 'returns an auth token' do
        token = auth_user.call
        expect(token).not_to be_nil
      end
    end

    context 'with invalid credentials' do
      let(:password) { 'wrongPassword' }

      it 'raises an authentication error' do
        expect { auth_user.call }.to raise_error(
          ExceptionHandler::AuthenticationError,
          /Invalid credentials/
        )
      end
    end
  end
end
