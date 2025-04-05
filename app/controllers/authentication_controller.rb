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

  # GET /confirm
  def confirm
    render inertia: 'u/confirm'
  end

  # POST /auth/confirm
  def confirm_action
    @user = User.find_by(activation_pin: params[:activation_pin])

    return head :unprocessable_entity if @user.nil? || @user.updated_at <= 10.minutes.ago # PIN must be used within 10 minutes

    @user.update(confirmed_at: Time.current, activation_pin: nil)
    render json: { redirect: @user.home_page }, status: :ok
  end

  # POST /auth/forgot-password
  def forgot_password_action
    @user = User.find_by(email: params[:email])

    if @user.present?
      if @user.confirmed_at.present?
        # TODO: Send password reset email
      else
        # TODO: Send confirmation email
      end
    end

    render json: { message: 'Password reset instructions sent' }, status: :ok
  end

  # POST /auth/login
  def login_action
    @user = User.find_by(email: params[:email])

    if @user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: @user.id)
      render json: { token:, redirect: @user.home_page }, status: :ok
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end
  end
end
