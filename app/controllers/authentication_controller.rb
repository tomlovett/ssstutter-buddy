# frozen_string_literal: true

class AuthenticationController < ApplicationController
  allow_unauthenticated_access except: %i[change_password change_password_action]

  # GET /await-confirmation
  def await_confirmation
    render inertia: 'u/await-confirmation'
  end

  # GET /await-confirmation/resend-confirmation
  def resend_confirmation
    email = params[:email] || Current.user&.email

    return if email.blank?

    user = User.find_by(email:)

    return if user.blank?

    UserMailer.with(user:).confirmation_email.deliver_later

    head :ok
  end

  # GET /confirm
  def confirm
    @user = User.find_by(activation_pin: params[:pin])

    return redirect_to '/await-confirmation', alert: 'Invalid confirmation link.' if @user.nil?

    @user.update(confirmed_at: Time.current, activation_pin: nil)
    start_new_session_for @user

    redirect_url = if @user.participant?
                     "/p/participants/#{@user.participant.id}/edit"
                   else
                     "/r/researchers/#{@user.researcher.id}/edit"
                   end

    redirect_to "#{redirect_url}?confirmed=true", notice: 'Account confirmed!'
  end

  # GET /forgot-password
  def forgot_password
    render inertia: 'u/forgot-password'
  end

  # POST /forgot-password
  def forgot_password_action
    if (user = User.find_by(email: params[:email]))
      if user.confirmed_at.present?
        user.assign_activation_pin!

        UserMailer.with(user:).forgot_password_email.deliver_later
      else
        UserMailer.with(user:).confirmation_email.deliver_later
      end
    end

    redirect_to login_path, notice: 'Check your email for reset instructions.'
  end

  # GET /reset-password/:activation_pin
  def reset_password
    @user = User.find_by(activation_pin: params[:activation_pin])

    return redirect_to forgot_password_path, alert: 'Invalid password reset link.' if @user.nil?

    @user.update(activation_pin: nil)
    start_new_session_for @user

    redirect_to change_password_path, notice: 'Your password has been reset. Please enter a new one.'
  end

  # GET /change-password
  def change_password
    render inertia: 'u/change-password'
  end

  # PUT /change-password
  def change_password_action
    if Current.user.update(params.permit(:password, :password_confirmation))
      redirect_to Current.user.home_page, notice: 'Password has been changed!'
    else
      head :unprocessable_entity, alert: 'Problem resetting password.'
    end
  end
end
