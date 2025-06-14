# frozen_string_literal: true

module ControllerSpecHelper
  # def set_session(user)
  #   session = { user_id: user&.id }
  #   allow_any_instance_of(ApplicationController).to receive(:session).and_return(session)
  # end

  def token_generator(user_id)
    return nil if user_id.nil?

    JsonWebToken.encode(user_id:)
  end

  def expired_token_generator(user_id)
    JsonWebToken.encode({ user_id: }, Time.now.to_i - 10)
  end

  def valid_headers
    {
      'Authorization' => token_generator(user&.id),
      'Content-Type' => 'application/json'
    }
  end

  def invalid_headers
    {
      'Authorization' => nil,
      'Content-Type' => 'application/json'
    }
  end
end
