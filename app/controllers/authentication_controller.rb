# frozen_string_literal: true

class AuthenticationController < ApplicationController
  allow_unauthenticated_access
  before_action :set_user_by_activation_pin, only: %i[reset_password reset_password_action confirm]

  # GET /forgot-password
  def forgot_password
    render inertia: 'u/forgot_password'
  end

  # GET /confirm
  def confirm
    @user.update(confirmed_at: Time.current, activation_pin: nil)
    start_new_session_for @user

    redirect_to @user.home_page, notice: 'Email confirmed!'
  end

  # GET /reset-password/:activation_pin
  def reset_password
    user = Session.find_by(id: cookies.signed[:session_id])&.user

    user&.assign_activation_pin!

    render inertia: 'u/reset_password', props: { user: }
  end

  # POST /forgot-password
  def forgot_password_action
    if (user = User.find_by(email: params[:email]))
      if user.confirmed_at.present?
        user.assign_activation_pin!

        UserMailer.with(user: @user).password_reset_email.deliver_later
      else
        UserMailer.with(user: @user).confirmation_email.deliver_later
      end
    end

    redirect_to login_path, notice: 'Check your email for reset instructions.'
  end

  # POST /reset-password
  def reset_password_action
    if @user.update(params.permit(:password, :password_confirmation))
      # reset the activation pin
      @user.assign_activation_pin!

      redirect_to login_path, notice: 'Password has been reset.'
    else
      redirect_to edit_password_path(params[:activation_pin]), alert: 'Problem resetting password.'
    end
  end

  private

  def set_user_by_activation_pin
    @user = User.find_by!(activation_pin: params[:activation_pin])
  rescue ActiveSupport::MessageVerifier::InvalidSignature
    redirect_to reset_password_path(pin: params[:activation_pin]),
                alert: 'Password reset link is invalid or has expired.'
  end
end
