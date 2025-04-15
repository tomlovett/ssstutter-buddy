# frozen_string_literal: true

class PasswordsController < ApplicationController
  allow_unauthenticated_access
  before_action :set_user_by_token, only: %i[edit update]

  # GET /passwords/edit
  # Renders the password reset form
  # Params:
  #   token: string (password reset token)
  def edit
    @user = User.find_by(password_reset_token: params[:token])
    render inertia: 'u/reset_password'
  end

  # PATCH /passwords
  # Updates user password
  # Params:
  #   token: string (password reset token)
  #   password: string
  #   password_confirmation: string
  # Returns:
  #   On success: Redirects to login with success message
  #   On failure: Redirects back with error message
  def update
    if @user.update(params.permit(:password, :password_confirmation))
      redirect_to new_session_url, notice: 'Password has been reset.'
    else
      redirect_to edit_password_path(token: params[:token]), alert: 'Unable to reset your password.'
    end
  end

  private

  def set_user_by_token
    @user = User.find_by!(password_reset_token: params[:token])
  rescue ActiveSupport::MessageVerifier::InvalidSignature
    redirect_to new_password_url, alert: 'Password reset link is invalid or has expired.'
  end
end
