# frozen_string_literal: true

class AuthenticationController < ApplicationController
  # skip_before_action :authenticate_request

  # GET /login
  def login
    render inertia: 'u/login'
  end

  # GET /forgot-password
  def forgot_password
    render inertia: 'u/forgot_password'
  end

  # POST /auth/forgot-password
  def forgot_password_action
    @user = User.find_by(email: params[:email])

    if @user.present?
      # TODO: Send password reset email
    end

    render json: { message: 'Password reset instructions sent' }, status: :ok
  end

  # POST /auth/login
  def login_action
    @user = User.find_by(email: params[:email])

    if @user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: @user.id)
      redirect = @user.participant.present? ? 'p/home' : 'r/home'
      render json: { token:, redirect: }, status: :ok
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end
  end
end
