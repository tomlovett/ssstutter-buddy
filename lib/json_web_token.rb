# frozen_string_literal: true

class JsonWebToken
  HMAC_SECRET = Rails.application.credentials.secret_key_base

  def self.encode(payload, exp = 1.week.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, HMAC_SECRET)
  end

  def self.decode(token)
    body = JWT.decode(token, HMAC_SECRET)[0]
    ActiveSupport::HashWithIndifferentAccess.new body
  rescue JWT::DecodeError => e
    raise ExceptionHandler::InvalidToken, e.message
  end
end
