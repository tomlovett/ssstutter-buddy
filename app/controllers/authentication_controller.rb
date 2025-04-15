# frozen_string_literal: true

class AuthenticationController < ApplicationController
  allow_unauthenticated_access
  before_action :set_user_by_token, only: %i[reset_password reset_password_action confirm]

  # GET /forgot-password
  def forgot_password
    render inertia: 'u/forgot_password'
  end

  # GET /confirm/:token
  def confirm
    @user.update(confirmed_at: Time.current, activation_pin: nil)
    start_new_session_for @user

    redirect_to @user.home_page, notice: 'Email confirmed!'
  end

  # GET /reset-password/:token
  def reset_password
    render inertia: 'u/reset_password', props: { user: @user }
  end

  # POST /forgot-password
  def forgot_password_action
    if (user = User.find_by(email: params[:email]))
      if user.confirmed_at.present?
        user.generate_password_reset_token

        UserMailer.with(user: @user).password_reset_email.deliver_later
      else
        UserMailer.with(user: @user).confirmation_email.deliver_later
      end
    end

    redirect_to login_path, notice: 'Check your email for reset instructions.'
  end

  # POST /reset-password/:token
  def reset_password_action
    if @user.update(params.permit(:password, :password_confirmation))
      redirect_to login_path, notice: 'Password has been reset.'
    else
      redirect_to edit_password_path(params[:token]), alert: 'Passwords did not match.'
    end
  end

  private

  def set_user_by_token
    @user = User.find_by!(password_reset_token: params[:token])
  rescue ActiveSupport::MessageVerifier::InvalidSignature
    redirect_to reset_password_path(token: params[:token]), alert: 'Password reset link is invalid or has expired.'
  end
end
