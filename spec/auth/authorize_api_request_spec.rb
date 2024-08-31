# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AuthorizeApiRequest do
  subject(:request_obj) { described_class.new(header) }

  let(:user) { create(:user) }
  let(:header) { { 'Authorization' => token_generator(user.id) } }

  let(:invalid_request_obj) { described_class.new({}) }

  describe '#call' do
    context 'with valid request' do
      it 'returns user object' do
        result = request_obj.call
        expect(result[:user]).to eq(user)
      end
    end

    context 'with invalid request' do
      context 'with missing token' do
        it 'raises a MissingToken error' do
          expect { invalid_request_obj.call }.to raise_error(ExceptionHandler::MissingToken, 'Missing token')
        end
      end

      context 'with token belonging to other user' do
        subject(:invalid_request_obj) do
          described_class.new({ 'Authorization' => token_generator(5) })
        end

        it 'raises an InvalidToken error' do
          expect { invalid_request_obj.call }.to raise_error(ExceptionHandler::InvalidToken, /Invalid token/)
        end
      end

      context 'with expired token' do
        subject(:invalid_request_obj) { described_class.new(header) }

        let(:header) { { 'Authorization' => expired_token_generator(user.id) } }

        it 'raises ExpiredSignature error' do
          expect { invalid_request_obj.call }.to raise_error(ExceptionHandler::InvalidToken, /Signature has expired/)
        end
      end

      context 'with fake token' do
        let(:header) { { 'Authorization' => 'gibberish' } }
        let(:invalid_request_obj) { described_class.new(header) }

        it 'handles JWT::DecodeError' do
          expect do
            invalid_request_obj.call
          end.to raise_error(ExceptionHandler::InvalidToken, /Not enough or too many segments/)
        end
      end
    end
  end
end
