class OmniauthCallbacksController < ApplicationController
  skip_before_action :authenticate_request

  def google_oauth2
    @user = User.from_omniauth(request.env['omniauth.auth'])

    if @user.persisted?
      token = jwt_encode(user_id: @user.id)
      render json: { token: }, status: :ok
    else
      render json: { error: 'There was a problem signing you in through Google. Please register or try signing in later.' },
             status: :unprocessable_entity
    end
  end

  private

  def jwt_encode(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end
end
