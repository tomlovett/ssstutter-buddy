# frozen_string_literal: true

class OmniauthCallbacksController < ApplicationController
  skip_before_action :authenticate_request

  def google_oauth2
    @user = User.from_omniauth(request.env['omniauth.auth'])

    if @user.persisted?
      token = JsonWebToken.encode(user_id: @user.id)
      render json: { token: }, status: :ok
    else
      error = 'There was a problem signing you in through Google. Please register or try signing in later.'
      render json: { error: }, status: :unprocessable_entity
    end
  end
end
