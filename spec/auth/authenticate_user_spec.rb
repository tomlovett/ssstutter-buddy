require 'rails_helper'

RSpec.describe AuthenticateUser do
  subject(:invalid_auth_obj) { described_class.new('test@example.com', 'wrongpassword') }

  let(:user) { create(:user, email: 'test@example.com', password: 'password123') }

  let(:valid_auth_obj) { described_class.new(user.email, 'password123') }

  describe '#call' do
    context 'when valid credentials' do
      it 'returns an auth token' do
        token = valid_auth_obj.call
        expect(token).not_to be_nil
      end
    end

    context 'when invalid credentials' do
      it 'raises an authentication error' do
        expect { invalid_auth_obj.call }
          .to raise_error(
            ExceptionHandler::AuthenticationError,
            /Invalid credentials/
          )
      end
    end
  end
end
