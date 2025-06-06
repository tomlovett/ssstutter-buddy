# frozen_string_literal: true

class UserMailer < ApplicationMailer
  def confirmation_email
    @user = params[:user]
    @confirmation_url = Rails.root.join("/confirm?pin=#{@user.activation_pin}").to_s

    mail(
      to: @user.email,
      subject: 'Confirm your SSStutterBuddy account'
    )
  end

  def forgot_password_email
    @user = params[:user]
    @reset_url = Rails.root.join("/reset-password?token=#{@user.activation_pin}").to_s

    mail(
      to: @user.email,
      subject: 'Reset your SSStutterBuddy password'
    )
  end
end
