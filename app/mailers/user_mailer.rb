# frozen_string_literal: true

class UserMailer < ApplicationMailer
  def confirmation_email
    @user = params[:user]
    @confirmation_url = confirm_url(pin: @user.activation_pin)

    mail(
      to: @user.email,
      subject: 'Confirm your SSStutterBuddy account'
    )
  end

  def forgot_password_email
    @user = params[:user]
    @reset_url = reset_password_url(pin: @user.activation_pin)

    mail(
      to: @user.email,
      subject: 'Reset your SSStutterBuddy password'
    )
  end

  def confirm_provisional_user_email
    @user = params[:user]
    @confirmation_url = url_for(controller: 'authentication', action: 'confirm_provisional', id: @user.id,
                                pin: @user.activation_pin, only_path: false)

    mail(
      to: @user.email,
      subject: 'Confirm your SSStutterBuddy account'
    )
  end
end
