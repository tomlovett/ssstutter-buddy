# frozen_string_literal: true

class AuthenticationController < ApplicationController
  allow_unauthenticated_access except: %i[reset_password reset_password_action]

  # GET /await-confirmation
  def await_confirmation
    render inertia: 'u/await_confirmation'
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
    render inertia: 'u/forgot_password'
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

  # GET /reset-password
  def reset_password
    render inertia: 'u/reset_password'
  end

  # PUT /reset-password
  def reset_password_action
    if Current.user.update(params.permit(:password, :password_confirmation))
      redirect_to Current.user.home_page, notice: 'Password has been changed!'
    else
      head :unprocessable_entity, alert: 'Problem resetting password.'
    end
  end
end
