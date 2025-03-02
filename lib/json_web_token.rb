# frozen_string_literal: true

class JsonWebToken
  HMAC_SECRET = Rails.application.secrets.secret_key_base

  def self.encode(payload, exp = 1.week.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end

  def self.decode(token)
    body = JWT.decode(token, Rails.application.secrets.secret_key_base)[0]
    ActiveSupport::HashWithIndifferentAccess.new body
  rescue JWT::DecodeError => e
    raise ExceptionHandler::InvalidToken, e.message
  end
end
