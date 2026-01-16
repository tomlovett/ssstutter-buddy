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
                   elsif @user.researcher?
                     "/r/researchers/#{@user.researcher.id}/edit"
                   else
                     @user.home_page
                   end

    redirect_to "#{redirect_url}?confirmed=true", notice: 'Account confirmed!'
  end

  # GET /forgot-password
  def forgot_password
    render inertia: 'u/forgot-password'
  end

  # POST /forgot-password
  def forgot_password_action
    return head :unprocessable_entity if params[:email].blank?

    user = User.find_by(email: params[:email])

    return head :ok

    user.assign_activation_pin!

    if user.provisional?
      UserMailer.with(user:).confirm_provisional_user_email.deliver_later
    else
      UserMailer.with(user:).forgot_password_email.deliver_later
    end

    head :ok
  end

  # GET /reset-password/:pin
  def reset_password
    @user = User.find_by(activation_pin: params[:pin].to_s)

    return redirect_to forgot_password_path, alert: 'Invalid password reset link.' if @user.nil?

    start_new_session_for @user

    redirect_to change_password_path, notice: 'Your password has been reset. Please set a new one.'
  end

  # GET /change-password
  def change_password
    return redirect_to '/login' if Current.user.blank?

    render inertia: 'u/change-password'
  end

  # PUT /change-password
  def change_password_action
    if Current.user.update(params.permit(:password, :password_confirmation))
      Current.user.update(provisional: false) if Current.user.provisional?

      redirect_to Current.user.home_page, notice: 'Password has been changed!'
    else
      head :unprocessable_entity, alert: 'Problem resetting password.'
    end
  end

  # GET /confirm-provisional
  def confirm_provisional
    return redirect_to Current.user.home_page if Current.user.present?

    return render inertia: 'u/confirm-provisional' if params[:id].blank? || params[:pin].blank?

    @user = User.find_by(id: params[:id], provisional: true)

    if @user&.activation_pin == params[:pin] && @user.updated_at > 10.minutes.ago
      start_new_session_for @user
      return redirect_to '/change-password'
    end

    render inertia: 'u/confirm-provisional'
  end
end
