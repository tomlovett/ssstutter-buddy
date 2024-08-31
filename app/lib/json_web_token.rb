# frozen_string_literal: true

class JsonWebToken
  HMAC_SECRET = Rails.application.secret_key_base

  # def self.encode(payload, exp = 24.hours.from_now)
  def self.encode(payload, exp = 24.years.from_now)
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
